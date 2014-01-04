/**
 * Created by lyy on 13-12-28.
 */

var fs = require('fs') ;

var config = require('../config')
    ,baseDb = require('../dao/baseDao');

var log = require('../controllers/errLog');

var startMakeDir = function(path){
    fs.exists(path, function (exists) {
        if ( !exists ){
            fs.mkdir(path,function(err){
                if (err){
                    log.error(err);
                    console.log(err) ;
                    throw err ;
                }
                log.info(path , "建立完成");
                console.log(path , "建立完成");
            });
        }
        else{
            log.info(path , "已存在！");
            console.log(path , "已存在！");
        }
    });
}
var makeChildDir = function(){
    startMakeDir(config.fileDir + config.fileUpLoadDir);
    startMakeDir(config.fileDir + config.fileInitDir);
    startMakeDir(config.fileDir + config.fileLogDir);
    startMakeDir(config.fileDir + config.fileExportDir);
};
exports.startApp = function(){
    baseDb.createTableDb(function(err){
        if (err) {
            log.error(err);
            console.log(err) ;
            throw err ;
        }
    }) ;
    fs.exists(config.fileDir, function (exists) {
        if ( !exists ){
            fs.mkdir(config.fileDir,function(err){
                if (err){
                    log.error(err);
                    console.log(err) ;
                    throw err ;
                }
                else {
                    log.info(config.fileDir , "建立完成！");
                    console.log(config.fileDir , "建立完成");
                    makeChildDir();
                }
            });
        }
        else{
            log.info(config.fileDir , "已存在！");
            console.log(config.fileDir , "已存在！");
            makeChildDir();
        }
    });
};
