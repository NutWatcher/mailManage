/**
 * Created by lyy on 13-12-22.
 */
function ajax_getBatchFile(cb) {
    $.ajax({
        type: "GET",
        url: "./getBatchFile",
        timeout: 5000
    });
};
function ajax_callback(result,info,filename) {
    //处理结果
    switch(result) {
        case 1:
            $('#fileUpInfo').text("上传成功，导入中，请稍后！！！");
            $('#fileUpOtherInfo').text(info);
            ajax_fileToDb(filename);
            break;
        case 2:
            alert("文件名非法，请重新上传！");
            break;
        case 3:
            alert("文件不存在，请重新上传！");
            break;
        default :
            alert("合法");
    }
    return ;
};
function ajax_fileToDb(filename) {
    $('#upBackInfo tbody').empty();
    $.ajax({
        type: "POST",
        url: "./fileToDb",
        timeout: 5000,
        data: {
            filename:filename
        },
        success: function(msg){
            if (msg.success == false){
                $('#fileUpInfo').text("导入失败！！！");
                $('#pInfo').text(msg.msg);
            }
            else{
                $('#fileUpInfo').text("导入成功！！！");
                $('#pInfo').text(msg.msg);
                var t = $('#upBackInfo tbody');
                for(var i = 0 ; i < msg.backInfo.length ; i ++ ){
                    var value = msg.backInfo[i];
                    t.append("<tr><td><span>第"+ value.row +"条记录："+ value.msg +"</span></td></tr>");
                }
                t.find("tr:odd").addClass("tEven");
            }
        },
        error: function (xmlHttpRequest, error){
            alert(error.toString());
            $('#fileUpInfo').text("导入失败！！！");
            $('#pInfo').text(error.toString());
        }
    });
};
function addMailPackage(cb){
    $.ajax({
        method: 'POST',
        url: './addMailPackage',
        success: function(msg){
            cb(msg);
        },
        error: function(xmlHttpRequest, err){
            alert(err.toString());
            $('#pInfo').text("新建包失败！！！" + err.toString());
        }
    })
};
function getMailPackage(len, cb){
    $.ajax({
        method: 'GET',
        url: './getMailPackage',
        data:{
            len : len
        },
        success: function(msg){
            cb(msg);
        },
        error: function(xmlHttpRequest, err){
            alert(err.toString());
            $('#pInfo').text("获取包信息失败！！！" + err.toString());
        }
    })
};
function getMailPackageInfo(start, len, cb){
    $.ajax({
        method: 'GET',
        url: './getMailPackageInfo',
        data:{
            length : len,
            start: start
        },
        success: function(msg){
            cb(msg);
        },
        error: function(xmlHttpRequests, err){
            alert(err.toString());
            $('#pInfo').text("获取包信息失败！！！" + err.toString());
        }
    })
};
function getMailPackageMailCount(packageId, cb){
    $.ajax({
        method: 'get',
        url: './getMailPackageMailCount',
        data:{
            packageId : packageId
        },
        success: function(msg){
            cb(msg);
        },
        error: function(xmlHttpRequest, err){
            alert(err.toString());
            $('#pInfo').text("获取包数量失败！！！" + err.toString());
        }
    })
};
function insertMailToPackage(mailName, packageId, cb){
    $.ajax({
        method: 'POST',
        url: './insertMailToPackage',
        data:{
            mailName : mailName,
            packageId: packageId
        },
        success: function(msg){
            cb(msg);
        },
        error: function(xmlHttpRequest, err){
            alert(err.toString());
            $('#pInfo').text("返回信息失败！！！" + err.toString());
        }
    })
};
function delBatchFile(fileName, cb){
    $.ajax({
        method: 'POST',
        url: './delBatchFile',
        data:{
            fileName : fileName
        },
        success: function(msg){
            cb(msg);
        },
        error: function(xmlHttpRequest, err){
            alert(err.toString());
            $('#pInfo').text("删除失败！！！" + err.toString());
        }
    })
};
function resetMail(mailName, cb){
    $.ajax({
        method: 'POST',
        url: './resetMail',
        data:{
            mailName : mailName
        },
        success: function(msg){
            cb(msg);
        },
        error: function(xmlHttpRequest, err){
            alert(err.toString());
            $('#pInfo').text("删除失败！！！" + err.toString());
        }
    })
};
function getBatchFileCount(cb){
    $.ajax({
        method: 'POST',
        url: './getBatchFileCount',
        data:{},
        success: function(msg){
            cb(msg);
        },
        error: function(xmlHttpRequest, err){
            alert(err.toString());
            $('#pInfo').text("获取总数失败！！！" + err.toString());
        }
    })
};