var express = require("express");
var faqModel = require("../db/faq");
var api = require("../utilities/api");

var router = express.Router();

router.get("/faqs", function (req, res, next) {
    var filterOptions = {};
    if (!req.Authenticationed) {
        filterOptions.public = true;
    };

    faqModel.find(filterOptions).then(function (docs) {
        api.attachData2Response(200, "获取成功", docs, res);
        next();
    }, function (error) {
        api.attachData2Response(500, error, null, res);
        next();
    });
});

router.post("/faqs", function (req, res, next) {
    faqModel.find({
            name: req.body.name,
            _product: req.body._product,
        })
        .then(function (docs) {
            if (docs && docs.length > 0) {
                api.attachData2Response(409, "已存在同名项。", docs, res);
                next();
            } else {
                api.attachData2Request(req.userId, req.userId, req);
                faqModel.create(req.body).then(function (docs) {
                    api.attachData2Response(200, "创建成功", docs, res);
                    next();
                }, function (error) {
                    api.attachData2Response(500, error, null, res);
                    next();
                });
            }
        })
});

router.get("/faqs/:faqId", function (req, res, next) {
    var faqId = req.params.faqId;
    faqModel.findById(faqId).then(function (doc) {
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

router.put("/faqs/:faqId", function (req, res, next) {
    var faqId = req.params.faqId;
    api.attachData2Request(null, req.userId, req);
    faqModel.findByIdAndUpdate(faqId, req.body).then(function (doc) {
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

router.delete("/faqs/:faqId", function (req, res, next) {
    var faqId = req.params.faqId;
    faqModel.findByIdAndRemove(faqId).then(function (doc) {
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