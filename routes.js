/**
 * Module dependencies.
 */


var index = require('./controllers/index');
var user = require('./controllers/user');
var fileLoad = require('./controllers/fileLoad')
    ,mailePackageManage = require('./controllers/mailePackageManage')
    ,stateCompare = require('./controllers/cStateCompare')
    ,admin = require('./controllers/admin')
    ,mailManage = require('./controllers/mailManage')
    ,exportFile = require('./controllers/exportFile')
    ,batchFileManage = require('./controllers/batchFileManage');

module.exports = function (app) {
    // home page
    app.get('/', index.index);
    app.get('/admin', admin.index);
    app.get('/mailManage', index.index);
    app.get('/packageManage', mailePackageManage.index);
    app.get('/stateCompare', stateCompare.index);
    app.get('/fileUpload', fileLoad.index);

    app.get('/users', user.list);

    app.post('/stateCompare', stateCompare.compare);
    app.post('/resetStateName', stateCompare.resetStateName);
    app.post('/resetDB',admin.resetDB);


    app.post('/upfile', fileLoad.fileUp);
    app.post('/fileToDb', fileLoad.fileUpToDB);
    app.post('/addMailPackage', mailePackageManage.addNewPackage);
    app.post('/insertMailToPackage',mailManage.insertMailToPackage);
    app.post('/resetMail',mailManage.resetMail);
    app.get('/getMailPackage', mailePackageManage.getDataByLen);
    app.get('/getMailPackageInfo', mailePackageManage.getManageDataByLen);
    app.get('/getMailPackageMailCount',mailePackageManage.getMailPackageMailCount);

    app.post('/delBatchFile',batchFileManage.delBatchFile);

    app.post('/exportTxt',exportFile.exportTxt);
};