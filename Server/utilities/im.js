var env = require('./env')
var userModel = require('../db/user')
var productModel = require('../db/product')
var iamUserModel = require('../db/iamUser')
var ejs = require('ejs')
var fs = require('fs')
var common = require('../utilities/common')
var path = require('path')
var logger = require('../utilities/log').logger
var rq = require('request-promise');
var qs = require("qs");
var moment = require('moment');

function getProjectUsers(productId) {
    return userModel
        .find({
            _product: productId
        })
        .populate("_iamUser")
        .then(function (docs) {
            var users = [];
            docs.forEach(i => users.push(i._iamUser.iamId));
            return users;
        });
}

function generateHtmlDocument(context, filePath) {
    var template = fs.readFileSync(filePath).toString();
    return ejs.render(template, context);
}

function generateMessageBody(businessTitle, fromUserId, htmlDocument, navigationUrl, timeSend) {
    return {
        businessTitle,
        fromUserId,
        htmlDocument,
        navigationUrl,
        timeSend,
        type: 50,
    }
}

function sendMessage(fromUserId, toUserId, msgBody) {
    var contentJO = {
        action: "send_message",
        from: fromUserId,
        to: toUserId,
        bodyContent: msgBody
    };

    var postJO = {
        content:  (contentJO)
    }

    rq({
            url: env.notificationConfig.sunrunIM.api,
            rejectUnauthorized: false,
            method: 'POST',
            form: qs.stringify(postJO),
        })
        .then(res => {
            logger.info(`向用户 ${toUserId} 发送消息成功。`);
        })
        .catch(error => {
            logger.error(`向用户 ${toUserId} 发送消息失败：${error}`);
        })
}

function parse(req, res) {
    if (req.method == "POST" && req.body && req.body._product) {
        getProjectUsers(req.body._product).then(function (projectUsers) {
            if (!projectUsers || projectUsers.length == 0)
                return;

            var imMessageContext = {
                title: '',
                content: '',
                navigationUrl: '',
                ejsFileName: '',
                logoUrl: '',
            }

            productModel
                .findById(req.body._product)
                .then(function (docs) {
                    imMessageContext.title = `来自产品 ${docs.name} 的消息`;

                    if (req.url === "/faqs") {
                        imMessageContext.ejsFileName = "faq";
                        imMessageContext.content = "发布了新的FAQ";
                        imMessageContext.navigationUrl = env.frontEndConfig.detailUrlPrefix_faq + res.data._id;
                    } else if (req.url === "/documents") {
                        imMessageContext.ejsFileName = "doc";
                        imMessageContext.content = "上传了新的文档";
                        imMessageContext.navigationUrl = env.frontEndConfig.detailUrlPrefix_doc + res.data._id;
                    } else if (req.url === "/packages") {
                        imMessageContext.ejsFileName = "package";
                        imMessageContext.content = `发布了新的安装包`;
                        imMessageContext.navigationUrl = env.frontEndConfig.detailUrlPrefix_package + res.data._id;
                    } else if (req.url === "/versions") {
                        imMessageContext.ejsFileName = "version";
                        imMessageContext.content = "创建了新的大版本";
                        imMessageContext.navigationUrl = env.frontEndConfig.detailUrlPrefix_version + res.data._id;
                    } else if (req.url === "/platforms") {
                        imMessageContext.ejsFileName = "platform";
                        imMessageContext.content = "添加了新的平台支持";
                        imMessageContext.navigationUrl = env.frontEndConfig.detailUrlPrefix_platform + res.data._id;
                    } else if (req.url === "/users") {
                        imMessageContext.ejsFileName = "user";
                        imMessageContext.content = `添加了新的用户`;
                        imMessageContext.navigationUrl = env.frontEndConfig.detailUrlPrefix_user + res.data._id;
                    } else {
                        return;
                    }

                    imMessageContext.logoUrl = `${env.serverEndConfig.endpoint}/_${imMessageContext.ejsFileName}.png`;
                    return iamUserModel.findById(req.userId);
                })
                .then(docs1 => {
                    imMessageContext.content = `${docs1.name}${imMessageContext.content}`;
                    var ejsFilePath = path.join(env.serverEndConfig.imEjsFileDir, `${imMessageContext.ejsFileName}.ejs`);
                    var htmlDocument = generateHtmlDocument(imMessageContext, ejsFilePath);
                    var timeSend = new moment().format('YYYY-MM-DD HH:mm:ss');
                    var fromUserId = env.notificationConfig.sunrunIM.id

                    projectUsers.forEach(element => {
                        var toUserId = `${element}\\40sunrun`;
                        var msgBody = generateMessageBody(imMessageContext.title, fromUserId, htmlDocument, imMessageContext.navigationUrl, timeSend)
                        sendMessage(fromUserId, toUserId, JSON.stringify(msgBody));
                    });
                });
        })
    }
}

module.exports = {
    parse
};