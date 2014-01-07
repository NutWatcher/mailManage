/**
 * Created by lyy on 13-12-25.
 */
var Db = require('./baseDao') ;
exports.insertBatch = function(fileName ,cb ){
    Db.queryDb("INSERT INTO `tbatchfile` (`cBatchFileName`) VALUES ('"+ fileName +"');",cb);
}
exports.insertMail = function(mails ,cb ){
    if (mails.length == 0 ){
        cb({"message":"数据为空,请检查数据编码格式"});
    }
    var str = "INSERT INTO `mailinfo` ( `mailAccount`, `mailCountry`, `mailWeight`, `packageId`, `batchId`) VALUES " ;
    for (var i = 0 ; i < mails.length ; i ++ ){
        if (i != 0){
            str += ",";
        }
        str += "('"+ mails[i].mailAccount +"', '"+ mails[i].countroy +"', '"+ mails[i].weight +"', '0', '"+ mails[i].idBatchFile +"')" ;
    }
    str += ";";
    Db.queryDb(str,cb);
}
exports.getBatchId = function(fileName ,cb ){
    var str = " SELECT idtBatchFile FROM tbatchfile where cBatchFileName = '"+ fileName +"'" ;
    Db.queryDb(str,cb);
}
