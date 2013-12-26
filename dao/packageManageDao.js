/**
 * Created by lyy on 13-12-26.
 */
var Db = require('./baseDao') ;
exports.getBatchFile = function(lenth ,cb ){
    Db.queryDb("SELECT * FROM tbatchfile order by idtBatchFile desc limit "+ lenth +";",cb);
}