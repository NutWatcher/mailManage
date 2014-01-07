/**
 * Created by lyy on 13-12-26.
 */

var mailPackageDB = require('../dao/tMailPackageDao')
    ,batchFileDB = require('../dao/batchFileDAO')
    ,log = require('./errLog');
exports.index = function (req, res, next) {
    res.render('packageManage',{});
};
exports.addNewPackage = function (req, res, next) {
    mailPackageDB.insertData({"tMailPackageName":""}, function(err, rows){
        if (err){
            log.error(err);
            res.send({"success":false,"data":"插入包名出错！！！" + err.message });
            return ;
        }
        else{
            mailPackageDB.getLatestData(function(err, rows){
                if (err){
                    log.error(err);
                    res.send({"success":false,"data":"获取新增包名出错！！！" + err.message });
                    return ;
                }
                else{
                    res.send({"success":true,"data":rows[0].idtMailPackage });
                }
            });
        }
    }) ;
};
exports.getDataByLen = function (req, res, next) {
    mailPackageDB.getDataByLen(req.query.len, function(err, rows){
        if (err){
            log.error(err);
            res.send({"success":false,"data":"获取包名信息出错！！！" + err.message });
            return ;
        }
        else{
            res.send({"success":true,"data":rows });
        }
    }) ;
};
exports.getManageDataByLen = function (req, res, next){
    mailPackageDB.getManageDataByLen(req.query.start, req.query.length, function(err, rows){
        if (err){
            log.error(err);
            res.send({"success":false,"data":"获取数据信息出错！！！" + err.message });
            return ;
        }
        else{
            res.send({"success":true,"data":rows });
        }
    } );
};
exports.getMailPackageMailCount = function (req, res, next){
    mailPackageDB.getMailPackageMailCount(req.query.packageId, function(err, rows){
        if (err){
            log.error(err);
            res.send({"success":false,"data":"获取数据信息出错！！！" + err.message });
            return ;
        }
        else{
            res.send({"success":true,"data":rows });
        }
    } );
};
exports.getBatchFileCount = function (req, res, next){
    batchFileDB.getCount(function(err, rows){
        if (err){
            log.error(err);
            res.send({"success":false,"data":"获取数据信息出错！！！" + err.message });
            return ;
        }
        else{
            res.send({"success":true,"data":rows[0].count });
        }
    });
};
