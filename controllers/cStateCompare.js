
/**
 * Created by lyy on 13-12-27.
 */

var fs = require('fs');

var stateCompareDao = require('../dao/stateCompareDao');
var config = require('../config');
var log = require('./errLog');
exports.index = function(req, res){
    res.render('stateCompare', {});
};

exports.resetStateName = function(req, res){
    stateCompareDao.truncate(function(err){
        if(err){
            log.error(err);
            res.send({"success":false,"data":"数据库出错！！！" + err.message});
            return;
        }
        else{
            fs.readFile(config.fileDir + config.fileInitDir + '/stateName.json',function(err,data){
                if(err){
                    log.error(err);
                    res.send({"success":false,"data":"数据文件出错！！！" + err.message});
                    return;
                }
                try{
                    var jsonObj = JSON.parse(data);
                    stateCompareDao.addValue(jsonObj, function(err, rows){
                        if (err) {
                            log.error(err);
                            res.send({"success":false,"data":"数据库出错！！！" + err.message});
                        }
                        else{
                            res.send({"success":true,"data":"重置成功！！！" + rows.message + "条记录。" });
                        }
                    })
                }
                catch (err){
                    log.error(err);
                    res.send({"success":false,"data":err.message});
                }
            });
        }
    });
};
exports.compare = function(req, res, next){
    var strIn = req.body.textIn
        ,ObTextOut = []
        ,ArTextOut = []
        ,stateMap = []
        ,re;

    if ( !strIn ){
        res.send({"success":false,"data":"数据为空"});
        return ;
    }
    re = /"/i;
    if ( re.test(strIn) == true ){
        res.send({"success":false,"data":"数据中不能带有\""});
        return ;
    }

    ArTextOut = strIn.split("\n");

    for (var i = 0 ; i < ArTextOut.length ; i ++ ){
        ObTextOut.push({"compareStr":ArTextOut[i],"compareValue":""}) ;
    }
    stateCompareDao.getAll(function(err, rows){
        if (err) {
            log.error(err);
            res.send({"success":false,"data":"数据库出错！！！"});
        }
        var textOut = "" ;
        for ( var i = 0 ; i < rows.length ; i ++ ){
            stateMap = rows[i].stateName.trim().split(" ");
            for ( var j = 0 ; j < stateMap.length ; j ++ ){
                if ( stateMap[j].trim().length == 0 ){
                    continue ;
                }
                re = new RegExp(stateMap[j] , "i") ;
                for ( var k = 0 ; k < ObTextOut.length ; k ++ ){
                    if ( true == re.test(ObTextOut[k].compareStr) ){
                        ObTextOut[k].compareValue += "*" + rows[i].stateName ;
                    }
                }
            }
        }
        res.send({"success":true,"data":ObTextOut});
    })
};