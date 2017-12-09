var log4js = require("log4js");

log4js.configure({
    appenders: {
        sunrunio: {
            type: 'dateFile',
            filename: 'logs/sunrunio_',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        console: {
            type: 'console'
        }
    },
    categories: {
        sunrunio: {
            appenders: ['console', 'sunrunio'],
            level: 'info'
        },
        default: {
            appenders: ['console', 'sunrunio'],
            level: 'trace'
        }
    }
});

var logger = log4js.getLogger('sunrunio');
exports.logger = logger;

exports.use = function (app) {
    app.use(log4js.connectLogger(logger, {
        level: log4js.levels.Debug
    }));
}