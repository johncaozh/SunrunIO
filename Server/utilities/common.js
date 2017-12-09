function getFriendlySizeUnit(bytes) {
    var s = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    var e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
};

function getServerIp() {
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var values = Object.keys(ifaces)
        .filter(function (name) {
            return !name.startsWith("VMware Network Adapter")
        }).map(function (name) {
            return ifaces[name];
        });
    values = [].concat.apply([], values).filter(function (val) {
        return val.family == 'IPv4' && val.internal == false;
    });

    return values.length ? values[0].address : '0.0.0.0';
}

module.exports = {
    getFriendlySizeUnit,
    getServerIp
}