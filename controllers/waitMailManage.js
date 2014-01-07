/**
 * Created by lyy on 14-1-7.
 */


var mailDB = require('../dao/mailDao')
    batchFileDB = require('../dao/batchFileDao')
    ,log = require('./errLog');
exports.index= function (req, res){
    var batchId = req.query.batchId ;
    batchFileDB.getByBatchId(batchId,function(err, rows){
        if (err){
            log.error(err);
            res.render('waitMailManage',{"data":[],"batchFileName":"","pInfo":"获取失败" + err.message});
        }
        else{
            mailDB.getWaitMailByBatchId(batchId,function(err, rowsT){
                if (err){
                    log.error(err);
                    res.render('waitMailManage',{"data":[],"batchFileName":"","pInfo":"获取失败" + err.message});
                }
                else{
                    res.render('waitMailManage',{"data":rowsT,"pInfo":"","batchFileName":rows[0].cBatchFileName });
                }
            });
        }
    });

};