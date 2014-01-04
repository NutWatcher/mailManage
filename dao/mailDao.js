/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-1-4
 * Time: 上午8:54
 * To change this template use File | Settings | File Templates.
 */

/**
 * Created by lyy on 13-12-26.
 */
var Db = require('./baseDao') ;
exports.insertPackageId = function(packageId , mailName ,cb ){
    var strSql = "UPDATE `mailinfo` SET `packageId`='"+ packageId +"' WHERE `mailAccount`='"+ mailName +"';";
    Db.queryDb(strSql,cb);
};
exports.getMailInfo = function(mailName ,cb ){
    var strSql = "SELECT * FROM test.mailinfo where mailAccount = '"+ mailName +"';";
    Db.queryDb(strSql,cb);
};
exports.getMailByPackageId = function(packageId ,cb ){
    var strSql = "SELECT * FROM test.mailinfo where packageId = '"+ packageId +"';";
    Db.queryDb(strSql,cb);
};
exports.delBatchFile = function(fileName ,cb ){
    var strSql = "DELETE FROM `test`.`tbatchfile` WHERE `cBatchFileName`='"+ fileName +"';";
    Db.queryDb(strSql,cb);
};
exports.delMailWithBatchFileName = function(fileName ,cb ){
    var strSql = "DELETE FROM test.mailinfo where batchId = " +
        "(SELECT idtBatchFile FROM test.tbatchfile where cBatchFileName = '"+ fileName +"');";
    Db.queryDb(strSql,cb);
};