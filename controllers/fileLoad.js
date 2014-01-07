/**
 * Created by lyy on 13-12-25.
 */
var format = require('util').format
    ,fs = require('fs')
    ,csv = require('csv')
    ,iconv = require('iconv-lite');

var config = require('../config');
var fileUploadDb = require('../dao/fileUploadDao');
var log = require('./errLog');
exports.index = function(req, res, next){
    res.render('fileUpload',{});
};
exports.fileUp = function(req, res, next){
    if ( req.files != undefined && req.files.image.size != 0){
        if ( req.files.image.name.indexOf("\\") != -1 ){
            res.render("fileUpBack",{"bValue":2,"info":"",fileName:""});
        }
        var tmp_path = req.files.image.path
            ,target_path = config.fileDir + config.fileUpLoadDir + "/" +  req.files.image.name;

        var fileWriteStream = fs.createWriteStream(target_path)
            ,fileReadStream = fs.createReadStream(tmp_path);

        var chunks = [];
        var size = 0 ;
        fileReadStream
            .on('data', function (data) {
                chunks.push(data) ;
                size += data.length ;
            })
            .on('end', function(){
                var buf = Buffer.concat(chunks, size);
                var str = iconv.decode(buf, 'GBK');
                fileWriteStream.write(str) ;
            })
            .on('close', function () {
                fileWriteStream.end();
            });
        fileWriteStream
            .on('close', function () {
                log.info("写完成 " +  target_path);
                fs.unlink(tmp_path, function(err) {
                    if (err) {
                        log.error(err);
                        return ;
                    }
                    var info="上传 " + req.files.image.name + format(' (%d Kb) 到 ',req.files.image.size / 1024 | 0) + target_path ;
                    info = info.replace(new RegExp("\\\\","gm"),"\\\\");

                    res.render("fileUpBack",{"bValue":1,"info":info,fileName:req.files.image.name});
                });
            });
    }
    else{
        res.render("fileUpBack",{"bValue":3,"info":"",fileName:""});
    }
};
var readMailInfo = function(filePath, idBatchFile,  res , next){
    var backInfo =[];
    var insertInfo =[];
    csv()
        .from.stream(fs.createReadStream(filePath))
        .transform(function (row) {
           // row.unshift(row.pop());
            return row;
        })
        .on('record', function (row, index) {
            if (index != 0 ){
                if (row.length < 10 ){
                    backInfo.push({"row":index,"msg":"该记录不完整!"});
                    return ;
                }
                //console.log(row);

                var mail ={} ;
                mail.countroy = row[4].toString().trim();
                mail.mailAccount = row[9].toString().trim();
                mail.weight = row[8].toString().trim();
                mail.idBatchFile = idBatchFile.toString();
                if (mail.mailAccount == ""){
                    backInfo.push({"row":index,"msg":"没有条形码!"});
                    return ;
                }
                if (mail.countroy == ""){
                    backInfo.push({"row":index,"msg":"没有国家!"});
                    return ;
                }
                if (mail.weight == ""){
                    backInfo.push({"row":index,"msg":"没有重量!"});
                    return ;
                }
                insertInfo.push(mail);
            }
        })
        .on('end', function (count) {
            fileUploadDb.insertMail(insertInfo, function(err, rows){
                if (err) {
                    log.error(err);
                    res.send({"success":false,"msg":"插入邮件信息出错！！！" + err.message });
                }
                else{
                    log.info("插入邮件数量 " + insertInfo.length + "。" + filePath);
                    res.send({"success":true,"msg":"共插入邮件数量：" + insertInfo.length ,"backInfo":backInfo });
                }
            });
            log.info("读取邮件数量 " + count + "。" + filePath);
        })
        .on('error', function (err) {
            log.error(err);
            res.send({"success":false,"msg":"插入邮件信息出错！！！" + err.message });
        });
}
exports.fileUpToDB = function(req, res, next){
    var fileName =  req.body.filename ;
    var filePath = config.fileDir + config.fileUpLoadDir + "/" + fileName;
    fileUploadDb.insertBatch(fileName,function(err,rows){
        if (err) {
            log.error(err);
            res.send({"success":false,"msg":"插入文件名出错！！！" + err.message });
        }
        else{
            fileUploadDb.getBatchId(fileName, function(err, rows){
                if (err) {
                    log.error(err);
                    res.send({"success":false,"msg":"获取FileBatchId出错！！！" + err.message });
                }
                else{
                    var idBatchFile = rows[0].idtBatchFile ;
                    readMailInfo(filePath, idBatchFile, res ,next);
                }
            })
        }
    }) ;
}