/**
 * Created by lyy on 13-12-28.
 */
var moment = require('moment');

var baseDb = require('../dao/baseDao') ;
var log = require('../controllers/errLog');

exports.index = function(req, res){
    res.render("admin",{});
};
exports.resetDB = function(req, res){
    log.infoTime(req.connection.remoteAddress + "重置数据库");
    baseDb.dropTableDb(function(err){
        if (err) {
            log.error(err);
            res.send({"success":false,"data":"数据库出错！！！" + err.message});
        }
        else{
            baseDb.createTableDb(function(err){
                if (err) {
                    log.error(err);
                    res.send({"success":false,"data":"数据库出错！！！" + err.message});
                }
                else{
                    res.send({"success":true,"data":"数据库已重置！！！"});
                }
            });
        }
    });
};