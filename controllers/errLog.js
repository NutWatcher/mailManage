/**
 * Created by lyy on 13-12-25.
 */

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var util = require('util');
var os = require('os');

var config = require('../config');
var logDir = path.join(config.fileDir + config.fileLogDir);
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

var info = fs.createWriteStream(logDir + '/info.log', {flags: 'a', mode: '0666'});
var error = fs.createWriteStream(logDir + '/error.log', {flags: 'a', mode: '0666'});

var logger = new console.Console(info, error);

var format = function (msg) {
    var ret = '';
    if (!msg) {
        return ret;
    }

    var date = moment();
    var time = date.format('YYYY-MM-DD HH:mm:ss.SSS');
    if (msg instanceof Error) {
        var err = {
            name: msg.name,
            data: msg.data
        };

        err.stack = msg.stack;
        ret = util.format('%s %s: %s\nHost: %s\nData: %j\n%s\n\n',
            time,
            err.name,
            err.stack,
            os.hostname(),
            err.data,
            time
        );
        console.log(ret);
    } else {
        ret = time + ' ' + util.format.apply(util, arguments) + '\n';
    }
    return ret;
};

logger.log('log start');
logger.error('errLog start');
/*
var input = '{error: format}';
try {
    JSON.parse(input);
} catch (ex) {
    ex.data = input;
    logger.error(format(ex));
}*/
exports.error =function(err){
    logger.error(format(err));
};
exports.info =function(str){
    logger.log(str);
};
exports.infoTime =function(str){
    var date = moment();
    var time = date.format('YYYY-MM-DD HH:mm:ss.SSS');
    logger.log(str,time);
};