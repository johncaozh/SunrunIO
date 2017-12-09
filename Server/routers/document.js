var express = require("express");
var documentModel = require("../db/document");
var api = require("../utilities/api");

var router = express.Router();

router.get("/documents", function (req, res, next) {
    var filterOptions = {};
    if (!req.Authenticationed) {
        filterOptions.public = true;
    };

    documentModel.find(filterOptions).then(function (docs) {
        api.attachData2Response(200, "获取成功", docs, res);
        next();
    }, function (error) {
        api.attachData2Response(500, error, null, res);
        next();
    });
});

router.post("/documents", function (req, res, next) {
    documentModel.find({
            name: req.body.name,
            _product: req.body._product,
        })
        .then(function (docs) {
            if (docs && docs.length > 0) {
                api.attachData2Response(409, "已存在同名项。", docs, res);
                next();
            } else {
                api.attachData2Request(req.userId, req.userId, req);
                documentModel.create(req.body).then(function (docs) {
                    api.attachData2Response(200, "创建成功", docs, res);
                    next();
                }, function (error) {
                    api.attachData2Response(500, error, null, res);
                    next();
                });
            }
        })
});

router.get("/documents/:documentId", function (req, res, next) {
    var documentId = req.params.documentId;
    documentModel.findById(documentId).then(function (doc) {
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

router.put("/documents/:documentId", function (req, res, next) {
    var documentId = req.params.documentId;
    api.attachData2Request(null, req.userId, req);
    documentModel.findByIdAndUpdate(documentId, req.body).then(function (doc) {
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

router.delete("/documents/:documentId", function (req, res, next) {
    var documentId = req.params.documentId;
    documentModel.findByIdAndRemove(documentId).then(function (doc) {
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