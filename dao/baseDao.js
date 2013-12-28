/**
 * Created by lyy on 13-12-25.
 */
/**
 * Created by lyy on 13-12-24.
 */
var mysql = require('mysql')
    ,moment = require('moment');

var config = require('../config')
    ,dbConfig = require('../configDB');

var log = require('../controllers/errLog');

var pool  = mysql.createPool(config.mysqlConfig);
var queryDbStream = function (strSqls, cb, endCb) {
    var strSql = "" ;
    for ( var i = 0 ; i < strSqls.length ; i ++ ){
        strSql += strSqls[i] ;
    }
    pool.getConnection(function(err, connection) {
        // Use the connection
        if (err) {
            cb(err);
            return ;
        }
        var query = connection.query(strSql);
        query
            .on('error', function(err) {
                // Handle error, an 'end' event will be emitted after this as well
                if (err) {
                    cb(err);
                }
            })
            .on('fields', function(fields, index) {
                // the fields for the result rows that follow
            })
            .on('result', function(row, index) {
                // index refers to the statement this result belongs to (starts at 0)
                if ( cb ){
                    cb("",row,index) ;
                }
            })
            .on('end', function() {
                // all rows have been received
                connection.release();
                endCb();
            });
    });
};
var queryDb = function (strSql,cb) {
    pool.getConnection(function(err, connection) {
        if (err) {
            cb(err);
            return ;
        }
        connection.query( strSql , function(err, rows) {
            // And done with the connection.
            if (err) {
                cb(err);
                return;
            }
            cb(err, rows);

            connection.release();
            // Don't use the connection here, it has been returned to the pool.
        });
    });
};

exports.createTableDb = function (cb) {
    queryDbStream(dbConfig.initSql,function(err,row,index){
        if (err) {
            cb(err);
            return ;
        }
        else{
            log.info(dbConfig.initSql[index] , "数据库初始化完成！" + moment().format('YYYY-MM-DD HH:mm:ss.SSS'));
            console.info(dbConfig.initSql[index] , "数据库初始化完成！" + moment().format('YYYY-MM-DD HH:mm:ss.SSS'));
        }
    }, function(){
        log.info("数据库初始化完成！" + moment().format('YYYY-MM-DD HH:mm:ss.SSS'));
        console.info("数据库初始化完成！" + moment().format('YYYY-MM-DD HH:mm:ss.SSS'));
        cb() ;
    });
};

exports.dropTableDb = function (cb) {
    queryDbStream(dbConfig.dropSql,function(err,row,index){
        if (err) {
            cb(err);
            return ;
        }
        else{
            log.info(dbConfig.dropSql[index] , "数据库删除完成！" + moment().format('YYYY-MM-DD HH:mm:ss.SSS'));
        }
    }, function(){
        log.info("数据库删除完成！" + moment().format('YYYY-MM-DD HH:mm:ss.SSS'));
        cb();
    });
};

exports.queryDb = function (strSql,cb) {
    queryDb(strSql,cb);
};
exports.queryDbStream = function (strSql,cb) {
    queryDbStream(strSql,cb);
};
