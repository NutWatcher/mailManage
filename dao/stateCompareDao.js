/**
 * Created by lyy on 13-12-27.
 */
var Db = require('./baseDao') ;
exports.getAll = function(cb ){
    Db.queryDb("SELECT * FROM stateCompare;",cb);
};
exports.addValue = function(stateCompares, cb ){
    var str = "INSERT INTO `stateCompare` (`stateName`) VALUES " ;
    for (var i = 0 ; i < stateCompares.length ; i ++ ){
        if (i != 0){
            str += ",";
        }
        str += "('"+ stateCompares[i] +"')" ;
    }
    str += ";";
    Db.queryDb(str,cb);
};
exports.addValue = function(stateCompares, cb ){
    var str = "INSERT INTO `stateCompare` (`stateName`) VALUES " ;
    for (var i = 0 ; i < stateCompares.length ; i ++ ){
        if (i != 0){
            str += ",";
        }
        str += "('"+ stateCompares[i] +"')" ;
    }
    str += ";";
    Db.queryDb(str,cb);
};
exports.truncate = function(cb){
    var str = "TRUNCATE TABLE statecompare;";
    Db.queryDb(str,cb);
};