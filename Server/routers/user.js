var express = require("express");
var userModel = require("../db/user");
var api = require("../utilities/api");
var env = require("../utilities/env");

var router = express.Router();

router.get("/users", function (req, res, next) {
    userModel.find({}).populate("_iamUser").populate("_product").then(function (docs) {
        api.attachData2Response(200, "获取成功", docs, res);
        next();
    }, function (error) {
        api.attachData2Response(500, error, null, res);
        next();
    });
});

router.post("/users", function (req, res, next) {
    userModel.find({
            _iamUser: req.body._iamUser,
            _product: req.body._product,
        })
        .then(function (docs) {
            if (docs && docs.length > 0) {
                api.attachData2Response(409, "已存在同名项。", docs, res);
                next();
            } else {
                api.attachData2Request(req.userId, req.userId, req);
                userModel.create(req.body).then(function (docs) {
                    api.attachData2Response(200, "创建成功", docs, res);
                    next();
                }, function (error) {
                    api.attachData2Response(500, error, null, res);
                    next();
                });
            }
        })
        .catch(error => {
            api.attachData2Response(500, error, null, res);
            next();
        })
});

router.get("/users/:userId", function (req, res, next) {
    var userId = req.params.userId;
    userModel.findById(userId).populate('_iamUser').then(function (doc) {
        if (doc)
            api.attachData2Response(200, "获取成功。", doc, res);
        else
            api.attachData2Response(410, "该项已被移除。", doc, res);
        next();
    }, function (error) {
        api.attachData2Response(500, error, null, res);
        next();
    });
});

router.put("/users/:userId", function (req, res, next) {
    var userId = req.params.userId;
    api.attachData2Request(null, req.userId, req);
    userModel.findByIdAndUpdate(userId, req.body).then(function (doc) {
        if (doc)
            api.attachData2Response(200, "更新成功。", doc, res);
        else
            api.attachData2Response(410, "该项已被移除。", doc, res);
        next();
    }, function (error) {
        api.attachData2Response(500, error, null, res);
        next();
    });
});

router.delete("/users/:userId", function (req, res, next) {
    var userId = req.params.userId;
    userModel.findByIdAndRemove(userId).then(function (doc) {
        if (doc)
            api.attachData2Response(200, "删除成功。", doc, res);
        else
            api.attachData2Response(410, "该项已被移除。", doc, res);
        next();
    }, function (error) {
        api.attachData2Response(500, error, null, res);
        next();
    });
});

module.exports = router;