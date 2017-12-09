var express = require("express");
var platformModel = require("../db/platform");
var api = require("../utilities/api");

var router = express.Router();

router.get("platforms", function (req, res, next) {
    var filterOptions = {};
    if (!req.Authenticationed) {
        filterOptions.public = true;
    };

    platformModel.find(filterOptions).then(function (docs) {
        api.attachData2Response(200, "获取成功", docs, res);
        next();
    }, function (error) {
        api.attachData2Response(500, error, null, res);
        next();
    });
});

router.post("/platforms", function (req, res, next) {
    platformModel.find({
            name: req.body.name,
            _product: req.body._product,
        })
        .then(function (docs) {
            if (docs && docs.length > 0) {
                api.attachData2Response(409, "已存在同名项。", docs, res);
                next();
            } else {
                api.attachData2Request(req.userId, req.userId, req);
                platformModel.create(req.body).then(function (docs) {
                    api.attachData2Response(200, "创建成功", docs, res);
                    next();
                }, function (error) {
                    api.attachData2Response(500, error, null, res);
                    next();
                });
            }
        })
});

router.get("/platforms/:platformId", function (req, res, next) {
    var platformId = req.params.platformId;
    platformModel.findById(platformId).then(function (doc) {
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

router.get("/platforms/:platformId/packages", function (req, res, next) {
    var platformId = req.params.platformId;
    platformModel.find({
        _platform: platformId
    }).then(function (docs) {
        api.attachData2Response(200, "获取成功", docs, res);
        next();
    }, function (error) {
        api.attachData2Response(500, error, null, res);
        next();
    });
});

router.put("/platforms/:platformId", function (req, res, next) {
    var platformId = req.params.platformId;
    api.attachData2Request(null, req.userId, req);
    platformModel.findByIdAndUpdate(platformId, req.body).then(function (doc) {
        if (doc)
            api.attachData2Response(200, "更新成功。", doc, res);
        else
            api.attachData2Response(410, "该项已被移除。", doc, res);
    }, function (error) {
        api.attachData2Response(500, error, null, res);
        next();
    });
});

router.delete("/platforms/:platformId", function (req, res, next) {
    var platformId = req.params.platformId;
    platformModel.findByIdAndRemove(platformId).then(function (doc) {
        doc.remove(); //Model.remove not fired the pre/post hook ,need call documente.remove

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