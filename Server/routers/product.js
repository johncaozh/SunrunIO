var express = require("express");
var productModel = require("../db/product");
var userModel = require("../db/user");
var faqModel = require("../db/faq");
var documentModel = require("../db/document");
var versionModel = require("../db/version");
var platformModel = require("../db/platform");
var packageModel = require("../db/package");
var api = require("../utilities/api");

var router = express.Router();

router.get("/products", function (req, res, next) {
    var filterOptions = {};
    if (!req.Authenticationed) {
        filterOptions.public = true;
    };

    productModel.find(filterOptions).populate('_createUser').populate('_lastUpdateUser').then(function (docs) {
        api.attachData2Response(200, "获取成功", docs, res);
        next();
    }, function (error) {
        api.attachData2Response(500, error, null, res);
        next();
    });
});

router.post("/products", function (req, res, next) {
    productModel.find({
            name: req.body.name
        })
        .then(function (docs) {
            if (docs && docs.length > 0) {
                api.attachData2Response(409, "已存在同名项。", docs, res);
                next();
            } else {
                api.attachData2Request(req.userId, req.userId, req);
                productModel.create(req.body).then(function (docs) {
                    api.attachData2Response(200, "创建成功", docs, res);
                    next();
                }, function (error) {
                    api.attachData2Response(500, error, null, res);
                    next();
                });
            }
        })
});

router.get("/products/:productId", function (req, res, next) {
    var productId = req.params.productId;
    productModel
        .findById(productId)
        .populate('_createUser')
        .populate('_lastUpdateUser')
        .sort({
            name: "ascending"
        })
        .then(function (doc) {
            if (doc)
                api.attachData2Response(200, "获取成功", doc, res);
            else
                api.attachData2Response(410, "该项已被移除。", doc, res);

            next();
        }, function (error) {
            api.attachData2Response(500, error, null, res);
            next();
        });
});

router.get("/products/:productId/users", function (req, res, next) {
    var productId = req.params.productId;

    var filterData = {
        _product: productId
    };

    if (!req.Authenticationed) {
        filterData.public = true;
    };

    userModel
        .find(filterData)
        .populate("_iamUser")
        .populate("_product")
        .populate('_createUser')
        .populate('_lastUpdateUser')
        .sort({
            "_iamUser.name": "ascending"
        })
        .then(function (docs) {
            api.attachData2Response(200, "获取成功", docs, res);
            next();
        }, function (error) {
            api.attachData2Response(500, error, null, res);
            next();
        });
});

router.get("/products/:productId/faqs", function (req, res, next) {
    var productId = req.params.productId;

    var filterData = {
        _product: productId
    };

    if (!req.Authenticationed) {
        filterData.public = true;
    };

    faqModel
        .find(filterData)
        .populate('_createUser')
        .populate('_lastUpdateUser')
        .sort({
            name: "ascending"
        })
        .then(function (docs) {
            api.attachData2Response(200, "获取成功", docs, res);
            next();
        }, function (error) {
            api.attachData2Response(500, error, null, res);
            next();
        });
});

router.get("/products/:productId/documents", function (req, res, next) {
    var productId = req.params.productId;

    var filterData = {
        _product: productId
    };

    if (!req.Authenticationed) {
        filterData.public = true;
    };

    documentModel
        .find(filterData)
        .populate('_createUser')
        .populate('_lastUpdateUser')
        .sort({
            name: "ascending"
        })
        .then(function (docs) {
            api.attachData2Response(200, "获取成功", docs, res);
            next();
        }, function (error) {
            api.attachData2Response(500, error, null, res);
            next();
        });
});

router.get("/products/:productId/versions", function (req, res, next) {
    var productId = req.params.productId;

    var filterData = {
        _product: productId
    };

    if (!req.Authenticationed) {
        filterData.public = true;
    };

    versionModel
        .find(filterData)
        .populate('_createUser')
        .populate('_lastUpdateUser')
        .sort({
            name: "descending"
        })
        .then(function (docs) {
            api.attachData2Response(200, "获取成功", docs, res);
            next();
        }, function (error) {
            api.attachData2Response(500, error, null, res);
            next();
        });
});

router.get("/products/:productId/platforms", function (req, res, next) {
    var productId = req.params.productId;

    var filterData = {
        _product: productId
    };

    if (!req.Authenticationed) {
        filterData.public = true;
    };

    platformModel
        .find(filterData)
        .populate('_createUser')
        .populate('_lastUpdateUser')
        .sort({
            name: "ascending"
        })
        .then(function (docs) {
            api.attachData2Response(200, "获取成功", docs, res);
            next();
        }, function (error) {
            api.attachData2Response(500, error, null, res);
            next();
        });
});

router.get("/products/:productId/packages", function (req, res, next) {
    var productId = req.params.productId;
    var versionId = req.query.versionId;
    var platformId = req.query.platformId;

    var filterData = {};

    if (!req.Authenticationed) {
        filterData.public = true;
    };

    if (versionId && platformId) {
        filterData = {
            _version: versionId,
            _platform: platformId
        }
    } else if (versionId) {
        filterData = {
            _version: versionId
        }
    } else if (platformId) {
        filterData = {
            _platform: platformId
        }
    } else {
        filterData = {
            _product: productId
        }
    }

    packageModel.find(filterData)
        .populate("_platform")
        .populate("_version")
        .populate('_createUser')
        .populate('_lastUpdateUser')
        .sort({
            version: "descending"
        })
        .then(function (docs) {
            //表示只需要获取每个平台的最新包
            var group = {};
            if (versionId && !platformId) {
                docs.forEach(d => {
                    var platformId = d._platform._id;
                    group[platformId] = group[platformId] || [];
                    group[platformId].push(d);
                });

                var eachPlatformNewestPackageArr = [];
                Object.keys(group).map(function (name) {
                    eachPlatformNewestPackageArr.push(group[name][0]);
                })
                api.attachData2Response(200, "获取成功", eachPlatformNewestPackageArr, res);
            } else
                api.attachData2Response(200, "获取成功", docs, res);
            next();
        }, function (error) {
            api.attachData2Response(500, error, null, res);
            next();
        });
});

router.put("/products/:productId", function (req, res, next) {
    var productId = req.params.productId;
    api.attachData2Request(null, req.userId, req);
    productModel.findByIdAndUpdate(productId, req.body).then(function (doc) {
        if (doc)
            api.attachData2Response(200, "更新成功", doc, res);
        else
            api.attachData2Response(410, "该项已被移除。", doc, res);

        next();
    }, function (error) {
        api.attachData2Response(500, error, null, res);
        next();
    });
});

router.delete("/products/:productId", function (req, res, next) {
    var productId = req.params.productId;
    productModel.findByIdAndRemove(productId).then(function (doc) {
        doc.remove(); //Model.remove not fired the pre/post hook ,need call documente.remove

        if (doc)
            api.attachData2Response(200, "移除成功。", doc, res);
        else
            api.attachData2Response(410, "该项已被移除。", doc, res);

        next();
    }, function (error) {
        api.attachData2Response(500, error, null, res);
        next();
    });
});

module.exports = router;