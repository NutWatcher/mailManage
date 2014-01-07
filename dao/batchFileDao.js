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

exports.getByBatchId = function(batchId ,cb ){
    var strSql = "SELECT * FROM tbatchfile where idtBatchFile = '"+ batchId +"';";
    Db.queryDb(strSql,cb);
};
exports.getCount = function(cb ){
    var strSql = "SELECT count(*) count FROM tbatchfile ;";
    Db.queryDb(strSql,cb);
};