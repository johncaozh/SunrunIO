var nodemailer = require('nodemailer')
var env = require('./env')
var userModel = require('../db/user')
var productModel = require('../db/product')
var iamUserModel = require('../db/iamUser')
var ejs = require('ejs')
var fs = require('fs')
var common = require('../utilities/common')
var path = require('path')
var logger = require('../utilities/log').logger

var smtpTransport = nodemailer.createTransport({
    host: env.notificationConfig.email.host,
    port: env.notificationConfig.email.port,
    secure: true, // use SSL
    auth: {
        user: env.notificationConfig.email.id,
        pass: env.notificationConfig.email.pwd
    }
});

function sendMail(recipient, subject, html) {
    smtpTransport.sendMail({
        from: env.notificationConfig.email.id,
        to: recipient,
        subject: subject,
        html: html
    }, function (error, response) {
        if (error) {
            logger.error(`发送收邮件失败：${error}`);
        } else {
            logger.info(`发送邮件成功`);
        }
    });
}

function getRecipients(productId) {
    return userModel
        .find({
            _product: productId
        })
        .populate("_iamUser")
        .then(function (docs) {
            var emails = [];
            docs.forEach(i => emails.push(i._iamUser.email));
            return emails.join(';');
        });
}

function createSubject(productId, userId, segment) {
    return productModel.findById(productId).then(function (docs) {
        return iamUserModel.findById(userId).then(function (docs1) {
            return `来自产品 ${docs.name} 的消息：${docs1.name}${segment}`;
        })
    });
}

function createHtml(context, filePath) {
    var template = fs.readFileSync(filePath).toString();
    return ejs.render(template, context);
}

function parse(req, res) {
    if (req.method == "POST" && req.body && req.body._product) {
        var emailContext = {
            subject: '',
            recipients: '',
            html: '',
            ejsFileName: null,
            ejsContext: {
                webEndpoint: env.frontEndConfig.endpoint,
            }
        }

        var subjectSegment = '有新的动态';

        var recipients = getRecipients(req.body._product).then(function (recipients) {
            if (!recipients || recipients.length == 0)
                return;

            emailContext.recipients = recipients;

            if (req.url === "/faqs") {
                subjectSegment = "发布了新的FAQ";
                emailContext.ejsFileName = "faq";
                emailContext.ejsContext.title = req.body.name;
                emailContext.ejsContext.content = req.body.desc;
                emailContext.ejsContext.detailUrl = env.frontEndConfig.detailUrlPrefix_faq + res.data._id;
            } else if (req.url === "/documents") {
                subjectSegment = "上传了新的文档";
                emailContext.ejsFileName = "doc";
                emailContext.ejsContext.title = req.body.name;
                emailContext.ejsContext.size = common.getFriendlySizeUnit(req.body.size);
                emailContext.ejsContext.detailUrl = env.frontEndConfig.detailUrlPrefix_doc + res.data._id;
                emailContext.ejsContext.downloadUrl = env.serverEndConfig.downloadResUrl + res.data._id;
            } else if (req.url === "/packages") {
                subjectSegment = `发布了新的安装包`;
                emailContext.ejsFileName = "package";
                emailContext.ejsContext.title = req.body.name;
                emailContext.ejsContext.size = common.getFriendlySizeUnit(req.body.size);
                emailContext.ejsContext.desc = req.body.desc;
                emailContext.ejsContext.detailUrl = env.frontEndConfig.detailUrlPrefix_package + res.data._id;
                emailContext.ejsContext.downloadUrl = env.serverEndConfig.downloadResUrl + res.data._id;
            } else if (req.url === "/versions") {
                subjectSegment = "创建了新的大版本";
                emailContext.ejsFileName = "version";
                emailContext.ejsContext.title = req.body.name;
                emailContext.ejsContext.desc = req.body.desc;
                emailContext.ejsContext.detailUrl = env.frontEndConfig.detailUrlPrefix_version + res.data._id;
            } else if (req.url === "/platforms") {
                subjectSegment = "添加了新的平台支持";
                emailContext.ejsFileName = "platform";
                emailContext.ejsContext.title = req.body.name;
                emailContext.ejsContext.desc = req.body.desc;
                emailContext.ejsContext.detailUrl = env.frontEndConfig.detailUrlPrefix_platform + res.data._id;
            } else if (req.url === "/users") {
                subjectSegment = `添加了新的用户`;
                emailContext.ejsFileName = "user";
                emailContext.ejsContext.title = "新增的用户：";
                emailContext.ejsContext.desc = req.body.name;
                emailContext.ejsContext.detailUrl = env.frontEndConfig.detailUrlPrefix_user + res.data._id;
            } else {
                return;
            }

            return createSubject(req.body._product, req.userId, subjectSegment);
        }).then(function (subject) {
            if (subject && subject.length > 0) {
                emailContext.subject = subject;
                var ejsFilePath = path.join(env.serverEndConfig.emailEjsFileDir, `${emailContext.ejsFileName}.ejs`);
                emailContext.html = createHtml(emailContext.ejsContext, ejsFilePath);
                sendMail(emailContext.recipients, emailContext.subject, emailContext.html);
            }
        }, function (error) {
            logger.error(`解析发送邮件出错：${error}`);
        });
    }
}

module.exports = {
    parse
};