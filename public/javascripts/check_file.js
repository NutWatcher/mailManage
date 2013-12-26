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
}
function ajax_fileToDb(filename) {
    $('#upBackInfo tbody').empty();
    $('#upBackInfo thead').empty();
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
                $('#fileUpOtherInfo').text(msg.msg);
            }
            else{
                $('#fileUpInfo').text("导入成功！！！");
                $('#fileUpOtherInfo').text(msg.msg);
                var t = $('#upBackInfo tbody');
                $('#upBackInfo thead').append("<tr><th>错误信息</th></tr>");
                for(var i = 0 ; i < msg.backInfo.length ; i ++ ){
                    var value = msg.backInfo[i];
                    if(i%2 ==0){
                        t.append("<tr><td class='tEven'>第"+ value.row +"条记录："+ value.msg +"</td></tr>");
                    }
                    else{
                        t.append("<tr><td>第"+ value.row +"条记录："+ value.msg +"</td></tr>");
                    }
                }
                $('#upBackInfo')
            }
        },
        error: function (xmlHttpRequest, error){
            alert(error.toString());
            $('#fileUpInfo').text("导入失败！！！");
            $('#fileUpOtherInfo').text(error.toString());
        }
    });
}