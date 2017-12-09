var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var env = require("./utilities/env");
var routerTransfer = require("./routers/transfer");
var routerProduct = require("./routers/product");
var routerUser = require("./routers/user");
var routerFaq = require("./routers/faq");
var routerDocument = require("./routers/document");
var routerVersion = require("./routers/version");
var routerPlatform = require("./routers/platform");
var routerPackage = require("./routers/package");
var routerIam = require("./routers/iam");
var email = require("./utilities/email");
var im = require("./utilities/im");
var common = require('./utilities/common');
var api = require('./utilities/api');
var log = require('./utilities/log');
var logger = require('./utilities/log').logger;

var promise = mongoose.connect(env.serverEndConfig.mongoDB, {
    useMongoClient: true
});

promise.then(db => {
        logger.info("连接数据库成功。");
    })
    .catch(error => {
        logger.fatal("连接数据库失败：" + error);
    });

var app = express();
log.use(app);
app.use(express.static(env.serverEndConfig.staticFileDir));
app.use(cookieParser());
app.use(session({
    secret: 'sunrunio38288446',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

app.use(bodyParser.json({
    limit: '10mb'
}));
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '10mb'
}));



//允许跨域访问
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", env.frontEndConfig.endpoint);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method === "OPTIONS") {
        res.send(200);
        return;
    }

    var userId = 'Anonymous User';

    if (req.session.userId) {
        req.Authenticationed = true;
        req.userId = req.session.userId;
        userId = req.session.userId;
    }

    logger.info(`url:${req.url},method:${req.method},request by ${userId}`);

    // if (req.method !== 'GET' && !req.Authenticationed) {
    //     res.status(403);
    //     res.end();
    //     return;
    // }

    next();
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    logger.error(`url:${req.url},method:${req.method},error:${err.message}`);
});

app.use("/", routerTransfer);
app.use("/", routerProduct);
app.use("/", routerUser);
app.use("/", routerFaq);
app.use("/", routerDocument);
app.use("/", routerVersion);
app.use("/", routerPlatform);
app.use("/", routerPackage);
app.use("/", routerIam.router);

//生成特定格式的响应
app.use(function (req, res, next) {
    if (res.code != 200)
        logger.error(`url:${req.url},error:${res.msg}`)

    var resData = {
        code: res.code,
        msg: res.msg,
        data: res.data
    }

    res.status(res.code).json(resData);

    if (res.code == 200) {
        email.parse(req, res);
        im.parse(req, res);
    }
});

app.get('/', function (req, res) {
    res.send('sunrunio');
});

var server = app.listen(3000, function () {
    var host = common.getServerIp();
    var port = server.address().port;
    env.serverEndConfig.endpoint = `http://${host}:${port}`;
    env.serverEndConfig.downloadResUrl = `http://${host}:${port}/download/`;
    logger.info(`listening at ${env.serverEndConfig.endpoint}`);
    logger.info("正在同步IAM用户...");
    routerIam.syncIamUsers()
        .then(res => {
            logger.info("同步IAM用户完成。");
        })
        .catch(error => {
            logger.fatal("同步IAM用户失败。");
        });
});