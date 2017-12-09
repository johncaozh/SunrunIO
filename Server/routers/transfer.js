var express = require("express");
var multer = require("multer");
var api = require("../utilities/api");
var env = require("../utilities/env");
var documentModel = require("../db/document");
var packageModel = require("../db/package");
const fs = require('fs');
const path = require('path');

var router = express.Router();
var upload = multer({
    dest: env.serverEndConfig.staticFileDir
}).single('file');

// 单文件上传
router.post("/upload", upload, function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            api.attachData2Response(500, error, api.generateUrl(req.file.filename), res);
            next();
        } else {
            api.attachData2Response(200, "上传成功", api.generateUrl(req.file.filename), res);
            next();
        }
    });
});

router.get("/download/:fileId", function (req, res, next) {
    var fileId = req.params.fileId;
    documentModel.findById(fileId).then(function (doc) {
        if (doc) {
            var fileName = doc.name;
            var fileSize = doc.size;
            var filePath = doc.path;
            var index = filePath.lastIndexOf("\/");
            filePath = filePath.substring(index + 1);
            filePath = path.join(env.serverEndConfig.staticFileDir, filePath);
            res.download(filePath, fileName);
        } else {
            packageModel.findById(fileId).then(function (doc) {
                if (doc) {
                    var fileName = doc.name;
                    var fileSize = doc.size;
                    var filePath = doc.path;
                    var index = filePath.lastIndexOf("\/");
                    filePath = filePath.substring(index + 1);
                    filePath = path.join(env.serverEndConfig.staticFileDir, filePath);
                    res.download(filePath, fileName);
                } else {
                    api.attachData2Response(404, "文件不存在", doc, res);
                    next();
                }
            }, function (error) {
                api.attachData2Response(500, error, null, res);
                next();
            })
        }
    }, function (error) {
        api.attachData2Response(500, error, null, res);
        next();
    });
});

module.exports = router;