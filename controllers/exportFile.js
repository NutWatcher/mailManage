/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-1-4
 * Time: 下午2:55
 * To change this template use File | Settings | File Templates.
 */
var format = require('util').format
    ,fs = require('fs')
    ,iconv = require('iconv-lite');

var config = require('../config')
    ,mailDB = require('../dao/mailDao')
    ,log = require('./errLog');

var creatFile = function(formData, dbData, cb){
    var target_path = config.fileDir + config.fileExportDir + "/" + formData.packageId + ".txt";
    var fileWriteStream = fs.createWriteStream(target_path);
    var str = "" ;

    str ="#HEAD|"+
        formData.branchId +"|"+
        formData.userId +"|"+
        formData.date+"|"+
        formData.mailInfo+"|"+
        formData.manageInfo+"|"+
        formData.printInfo+"|"+
        dbData.length +"|\r\n";
    fileWriteStream.write(str);
    for ( var i = 0 ; i < dbData.length ; i ++ ){
        str = "#ITEM|"+ (i+1).toString() +"||||"+ dbData[i].mailCountry +"||||"+ dbData[i].mailWeight +"|"+
            dbData[i].mailAccount +"|||||||||||||||||||||||||||||\r\n";
        fileWriteStream.write(iconv.encode(str, 'GBK'));
    }
    fileWriteStream.end();
    fileWriteStream.on('finish', function() {
        cb(target_path);
    });
};
exports.exportTxt = function (req, res, next) {
    var packageId = req.body.packageId ;
    mailDB.getMailByPackageId(packageId, function(err, rows){
        if (err){
            log.error(err);
            res.send({"success":false,"data":"数据库出错！！！" + err.message });
            return ;
        }
        else{
            creatFile(req.body, rows, function(filePath){
                res.download(filePath);
                /*res.header('Content-Type', filePath.contentType);
                res.header('Content-Disposition', 'attachment; filename='+filePath.filename);
                return filePath.stream(true).pipe(res);  */
            });
        }
    });
};