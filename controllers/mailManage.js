/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-1-4
 * Time: 上午8:52
 * To change this template use File | Settings | File Templates.
 */

var mailDB = require('../dao/mailDao')
    ,log = require('./errLog');

exports.insertMailToPackage= function (req, res){
    var mailName = req.body.mailName
        , packageId = req.body.packageId ;

    mailDB.getMailInfo(mailName, function(err, rows){
        if (err){
            log.error(err);
            res.send({"success":false,"data":mailName + " 没有该邮件！！！" + err.message });
        }
        else if ( rows.length == 0 ){
            res.send({"success":false,"data":mailName + " 没有该邮件！！！"});
        }
        else if ( rows[0].packageId != 0 ){
            res.send({"success":false,"data":mailName + " 该邮件已经绑定到邮包： "+ rows[0].packageId });
        }
        else{
            mailDB.insertPackageId(packageId, mailName, function(err){
                if (err){
                    log.error(err);
                    res.send({"success":false,"data":mailName + " 邮件绑定到邮包出错！！！" + err.message });
                }
                else{
                    res.send({"success":true,"data":rows[0] });
                }
            });
        }
    });
};
exports.resetMail = function(req, res){
    mailDB.insertPackageId(0, req.body.mailName, function(err){
        if (err){
            log.error(err);
            res.send({"success":false,"data":req.body.mailName + " 邮件重置出错！！！" + err.message });
        }
        else{
            res.send({"success":true,"data": req.body.mailName + " 已重置！！！" });
        }
    });
};