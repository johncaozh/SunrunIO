var express = require("express");
var versionModel = require("../db/version");
var api = require("../utilities/api");

var router = express.Router();

router.get("/versions", function (req, res, next) {
    var filterOptions = {};
    if (!req.Authenticationed) {
        filterOptions.public = true;
    };

    versionModel.find(filterOptions).then(function (docs) {
        api.attachData2Response(200, "获取成功", docs, res);
        next();
    }, function (error) {
        api.attachData2Response(500, error, null, res);
        next();
    });
});

router.post("/versions", function (req, res, next) {
    versionModel.find({
            name: req.body.name,
            _product: req.body._product,
        })
        .then(function (docs) {
            if (docs && docs.length > 0) {
                api.attachData2Response(409, "已存在同名项。", docs, res);
                next();
            } else {
                api.attachData2Request(req.userId, req.userId, req);
                versionModel.create(req.body).then(function (docs) {
                    api.attachData2Response(200, "创建成功", docs, res);
                    next();
                }, function (error) {
                    api.attachData2Response(500, error, null, res);
                    next();
                });
            }
        })
});

router.get("/versions/:versionId", function (req, res, next) {
    var versionId = req.params.versionId;
    versionModel.findById(versionId).then(function (doc) {
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

router.put("/versions/:versionId", function (req, res, next) {
    var versionId = req.params.versionId;
    api.attachData2Request(null, req.userId, req);
    versionModel.findByIdAndUpdate(versionId, req.body).then(function (doc) {
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

router.delete("/versions/:versionId", function (req, res, next) {
    var versionId = req.params.versionId;
    versionModel.findByIdAndRemove(versionId).then(function (doc) {
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