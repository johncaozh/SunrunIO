var express = require("express");
var linkModel = require("../db/link");
var api = require("../utilities/api");

var router = express.Router();

router.get("/links", function (req, res, next) {
    var filterOptions = {};
    if (!req.Authenticationed) {
        filterOptions.public = true;
    };

    linkModel.find(filterOptions)
        .populate('_createUser')
        .populate('_lastUpdateUser').then(function (docs) {
            api.attachData2Response(200, "获取成功", docs, res);
            next();
        }, function (error) {
            api.attachData2Response(500, error, null, res);
            next();
        });
});

router.post("/links", function (req, res, next) {
    linkModel.find({
            name: req.body.name
        })
        .then(function (docs) {
            if (docs && docs.length > 0) {
                api.attachData2Response(409, "已存在同名项。", docs, res);
                next();
            } else {
                api.attachData2Request(req.userId, req.userId, req);
                linkModel.create(req.body).then(function (docs) {
                    api.attachData2Response(200, "创建成功", docs, res);
                    next();
                }, function (error) {
                    api.attachData2Response(500, error, null, res);
                    next();
                });
            }
        })
});

router.get("/links/:linkId", function (req, res, next) {
    var linkId = req.params.linkId;
    linkModel.findById(linkId).then(function (doc) {
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

router.put("/links/:linkId", function (req, res, next) {
    var linkId = req.params.linkId;
    api.attachData2Request(null, req.userId, req);
    linkModel.findByIdAndUpdate(linkId, req.body).then(function (doc) {
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

router.delete("/links/:linkId", function (req, res, next) {
    var linkId = req.params.linkId;
    linkModel.findByIdAndRemove(linkId).then(function (doc) {
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