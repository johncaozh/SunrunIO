var path = require('path')

//服务端配置
const serverEndConfig = {
    endpoint: "", //服务端接口地址
    downloadResUrl: "", //下载资源的Url
    mongoDB: "mongodb://localhost:27017/admin", //mongoDB数据库连接字符串
    staticFileDir: path.resolve(__dirname, "../files"), //用于存放文件的文件夹绝对路径
    emailEjsFileDir: path.resolve(__dirname, "../static/template/email"), //用于存放Email EJS文件的目录绝对路径
    imEjsFileDir: path.resolve(__dirname, "../static/template/im"), //用于存放IM EJS文件的目录绝对路径
}

//前端配置
const frontEndConfig = {
    endpoint: "http://10.11.13.252:8081",
    detailUrlPrefix_doc: "http://10.11.13.252:8081/docs/",
    detailUrlPrefix_faq: "http://10.11.13.252:8081/faqs/",
    detailUrlPrefix_package: "http://10.11.13.252:8081/packages/",
    detailUrlPrefix_platform: "http://10.11.13.252:8081/platforms/",
    detailUrlPrefix_version: "http://10.11.13.252:8081/versions/",
    detailUrlPrefix_user: "http://10.11.13.252:8081/users/",
}

//通知系统配置
const notificationConfig = {
    sunrunIM: {
        id: "75c52e44f112487a8c49992500d6f412", //本系统在SunrunIM平台上的业务账号
        // api: "https://10.21.21.42:8443/skapi/v2/business/send", //sunrunIM用于发送消息的API接口
        api: "https://10.50.0.16:8443/skapi/v2/business/send", //sunrunIM用于发送消息的API接口
    },
    email: {
        host: "smtp.exmail.qq.com",
        port: 465,
        id: "sunrunio@gzsunrun.cn",
        pwd: "Sr123456"
    }
};

const iamConfig = {
    service: "https://10.50.0.5:9531/iam",
    access_key: "A3siA4JN5dKH9zVmgm2C5hImLrtXuE645",
    access_secret: "bLyEJ3YhgAJiSC6bwwFgFO5vsN7Skr",
    registerProductName: "pm",
}

module.exports = {
    serverEndConfig,
    frontEndConfig,
    notificationConfig,
    iamConfig
}