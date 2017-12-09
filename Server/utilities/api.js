var env = require("./env");

function attachData2Response(code, msg, data, res) {
    res.code = code;
    res.msg = msg;
    res.data = data;
}

function attachData2Request(createUser, lastUpdateUser, req) {
    if (createUser)
        req.body._createUser = createUser;

    if (lastUpdateUser)
        req.body._lastUpdateUser = lastUpdateUser;
}

function generateUrl(fileTag) {
    return env.serverEndConfig.endpoint + "/" + fileTag;
}

module.exports = {
    attachData2Response,
    attachData2Request,
    generateUrl
}