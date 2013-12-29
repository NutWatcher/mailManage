/**
 * Created by lyy on 13-12-26.
 */
var Db = require('./baseDao') ;
exports.getDataByLen= function(length ,cb ){
    Db.queryDb("SELECT * FROM tmailpackage order by idtMailPackage desc limit "+ length +";",cb);
};
exports.insertData= function(data ,cb ){
    Db.queryDb("INSERT INTO `tmailpackage` (`tMailPackageName`) VALUES ('"+ data.tMailPackageName +"');",cb);
};
exports.getLatestData= function(cb ){
    var srSql = "SELECT * FROM tmailpackage order by idtMailPackage desc limit 1;" ;
    Db.queryDb(srSql,cb);
};