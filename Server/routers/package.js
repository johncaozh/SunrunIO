var express = require("express");
var packageModel = require("../db/package");
var api = require("../utilities/api");

var router = express.Router();

router.post("/packages", function (req, res, next) {
    packageModel.find({
            name: req.body.name,
            _product: req.body._product,
        })
        .then(function (docs) {
            if (docs && docs.length > 0) {
                api.attachData2Response(409, "已存在同名项。", docs, res);
                next();
            } else {
                api.attachData2Request(req.userId, req.userId, req);
                packageModel.create(req.body).then(function (docs) {
                    api.attachData2Response(200, "创建成功", docs, res);
                    next();
                }, function (error) {
                    api.attachData2Response(500, error, null, res);
                    next();
                });
            }
        })
});

router.get("/packages/:packageId", function (req, res, next) {
    var packageId = req.params.packageId;
    packageModel.findById(packageId).populate("_platform").then(function (doc) {
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

router.put("/packages/:packageId", function (req, res, next) {
    var packageId = req.params.packageId;
    api.attachData2Request(null, req.userId, req);
    packageModel.findByIdAndUpdate(packageId, req.body).then(function (doc) {
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

router.delete("/packages/:packageId", function (req, res, next) {
    var packageId = req.params.packageId;
    packageModel.findByIdAndRemove(packageId).then(function (doc) {
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