var request = require('request');
var rq = require('request-promise');
var express = require("express");
var iamUserModel = require('../db/iamUser');
var api = require("../utilities/api");
var env = require("../utilities/env");
var session = require('express-session');
var logger = require('../utilities/log').logger;

var router = express.Router();
var accessToken = null;
rq.rejectUnauthorized = false;

router.get("/iam/users", function (req, res, next) {
    var shouldSync = req.query.sync;
    if (shouldSync) {
        syncIamUsers()
            .then(result => {
                iamUserModel.find().then(function (docs) {
                    api.attachData2Response(200, "获取成功", docs, res);
                    next();
                }, function (error) {
                    api.attachData2Response(500, error, null, res);
                    next();
                });
            })
            .catch(error => {
                api.attachData2Response(500, error, null, res);
                next();
            })
    } else {
        iamUserModel.find().then(function (docs) {
            api.attachData2Response(200, "获取成功", docs, res);
            next();
        }, function (error) {
            api.attachData2Response(500, error, null, res);
            next();
        });
    }
});

router.get("/iam/login", function (req, res, next) {
    var st = req.query.st;
    if (!st) {
        api.attachData2Response(403, "ST为空", null, res);
        next();
    }

    var getAcessTokenUrl = `${env.iamConfig.service}/oauth2/token?grant_type=client_credentials&access_key=${env.iamConfig.access_key}&access_secret=${env.iamConfig.access_secret}&scope=sunruniam-api:*:*:*`

    rq({
            url: getAcessTokenUrl,
            rejectUnauthorized: false
        })
        .then(getAccessTokenRes => {
            var getAcessTokenJO = JSON.parse(getAccessTokenRes);
            accessToken = getAcessTokenJO.access_token;
            var validateSTUrl = `${env.iamConfig.service}/sso/service_validate?st=${st}&service=${env.iamConfig.registerProductName}`
            return rq({
                url: validateSTUrl,
                rejectUnauthorized: false
            })
        })
        .then(validateSTRes => {
            var validateSTJO = JSON.parse(validateSTRes);
            var getUserDetailUrl = `${env.iamConfig.service}/user/get?access_token=${accessToken}&user_id=${validateSTJO.user_id}`;
            return rq({
                url: getUserDetailUrl,
                rejectUnauthorized: false
            })
        })
        .then(getUserDetailRes => {
            var getUserDetailJO = JSON.parse(getUserDetailRes);
            req.session.regenerate(function (err) {
                if (err) {
                    api.attachData2Response(403, error, null, res);
                    next();
                } else {
                    iamUserModel.findOne({
                            iamId: getUserDetailJO.name
                        }).then(data => {
                            req.session.userId = data._id.toString();
                            req.session.save();
                            api.attachData2Response(200, null, getUserDetailJO, res);
                            next();
                        })
                        .catch(error => {
                            api.attachData2Response(403, error, null, res);
                            next();
                        })
                }
            });
        })
        .catch(error => {
            api.attachData2Response(403, error, null, res);
            next();
        })
});

router.post("/iam/logout", function (req, res, next) {
    req.session.destroy();
    api.attachData2Response(200, null, null, res);
    next();
});

function syncIamUsers() {
    return new Promise(function (resolve, reject) {
        var getAcessTokenUrl = `${env.iamConfig.service}/oauth2/token?grant_type=client_credentials&access_key=${env.iamConfig.access_key}&access_secret=${env.iamConfig.access_secret}&scope=sunruniam-api:*:*:*`

        rq({
                url: getAcessTokenUrl,
                rejectUnauthorized: false
            })
            .then(getAccessTokenRes => {
                var getAcessTokenJO = JSON.parse(getAccessTokenRes);
                accessToken = getAcessTokenJO.access_token;
                var getDomainListUrl = `${env.iamConfig.service}/domain/list?access_token=${accessToken}`;
                return rq({
                    url: getDomainListUrl,
                    rejectUnauthorized: false
                });
            })
            .then(getDomainListRes => {
                var getDomainListJO = JSON.parse(getDomainListRes);

                //获取默认域（name为sunrun，如果没有，则选择第一个域作为默认域名）
                var defaultDomain = getDomainListJO.domains.find(d => d.name === "sunrun") || getDomainListJO.domains[0];
                var getUserListUrl = `${env.iamConfig.service}/org/list?access_token=${accessToken}&domain_id=${defaultDomain.id}&type=2&depth=0`;
                return rq({
                    url: getUserListUrl,
                    rejectUnauthorized: false
                });
            })
            .then(getUserListRes => {
                var getUserListJO = JSON.parse(getUserListRes);
                var getAllUserDetailArr = [];

                getUserListJO.orgs.forEach(element => {
                    var p = new Promise(function (resolve, reject) {
                        var getUserDetailUrl = `${env.iamConfig.service}/user/get?access_token=${accessToken}&user_id=${element.id}`;
                        rq({
                            url: getUserDetailUrl,
                            rejectUnauthorized: false
                        }).then(getUserDetailRes => {
                            resolve(getUserDetailRes);
                        }).catch(error => {
                            reject(error);
                        });
                    });

                    getAllUserDetailArr.push(p);
                })

                return Promise.all(getAllUserDetailArr);
            })
            .then(values => {
                values.forEach(element => {
                    var userDetailJO = JSON.parse(element);
                    var data = {
                        iamId: userDetailJO.name,
                        name: userDetailJO.real_name || userDetailJO.name,
                        email: userDetailJO.email || "czq@gzsunrun.cn",
                    };

                    iamUserModel.findOneAndUpdate({
                        iamId: data.iamId
                    }, data).then(res => {
                        if (!res)
                            iamUserModel.create(data);
                    }).catch(error => {
                        logger.error(`将iam用户 ${data.iamId} 插入数据库出错：${error}`);
                    })
                });

                resolve(true);
            })
            .catch(error => {
                logger.error(`同步iam用户出错：${error}`);
                reject(false);
            });
    });
}

module.exports = {
    router,
    syncIamUsers
};