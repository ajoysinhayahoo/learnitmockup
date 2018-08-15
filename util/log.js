const log4js = require('log4js');
log4js.configure({
    appenders: { lite: { type: 'file', filename: 'lite.log' } },
    categories: { default: { appenders: ['lite'], level: 'debug' } }
});

const liteLogger = log4js.getLogger('lite');

module.exports = {
            liteLogger		: liteLogger
}