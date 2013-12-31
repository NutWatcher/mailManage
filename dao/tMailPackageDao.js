/**
 * Created by lyy on 13-12-26.
 */
var Db = require('./baseDao') ;
exports.getDataByLen= function(length ,cb ){
    Db.queryDb("SELECT * FROM tmailpackage order by idtMailPackage desc limit "+ length +";",cb);
};
exports.getManageDataByLen= function(start ,length ,cb ){
    var strSql = "SELECT b.cBatchFileName,a.batchId,a.packageId,count(1) mailNum,count(distinct a.packageId) " +
        "FROM mailinfo a left join tbatchfile b on a.batchId = b.idtBatchFile " +
        "where a.batchId in ( " +
        "SELECT * FROM( " +
        "SELECT idtBatchFile FROM tbatchfile order by tbatchfile.idtBatchFile desc limit "
        + start + " , " + length + ") as t1)" +
        " group by a.batchId , a.packageId; "
    Db.queryDb(strSql, cb);
};
exports.insertData= function(data ,cb ){
    Db.queryDb("INSERT INTO `tmailpackage` (`tMailPackageName`) VALUES ('"+ data.tMailPackageName +"');",cb);
};
exports.getLatestData= function(cb ){
    var srSql = "SELECT * FROM tmailpackage order by idtMailPackage desc limit 1;" ;
    Db.queryDb(srSql,cb);
};