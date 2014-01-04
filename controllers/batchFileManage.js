/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-1-4
 * Time: 下午9:37
 * To change this template use File | Settings | File Templates.
 */
var mailDb = require('../dao/mailDao');
var log = require('./errLog');

exports.delBatchFile = function(req, res, next){
    var fileName = req.body.fileName ;
    mailDb.delMailWithBatchFileName(fileName,function(err,rows){
        if (err){
            log.error(err);
            res.send({"success":false,"data":"删除邮件出错！！！" + err.message });
            return ;
        }
        else{
            mailDb.delBatchFile(fileName, function(err,rows){
                if (err){
                    log.error(err);
                    res.send({"success":false,"data":"删除邮件名出错！！！" + err.message });
                    return ;
                }
                else{
                    res.send({"success":true,"data":"删除成功！！！"  });
                }
            })
        }
    })

};