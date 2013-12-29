/**
 * Module dependencies.
 */


var index = require('./controllers/index');
var user = require('./controllers/user');
var fileLoad = require('./controllers/fileLoad')
    ,mailePackageManage = require('./controllers/mailePackageManage')
    ,stateCompare = require('./controllers/cStateCompare')
    ,admin = require('./controllers/admin');

module.exports = function (app) {
    // home page
    app.get('/', index.index);
    app.get('/admin', admin.index);
    app.get('/packageManage', mailePackageManage.index);
    app.get('/stateCompare', stateCompare.index);

    app.get('/users', user.list);

    app.post('/stateCompare', stateCompare.compare);
    app.post('/resetStateName', stateCompare.resetStateName);
    app.post('/resetDB',admin.resetDB);


    app.post('/upfile', fileLoad.fileUp);
    app.post('/fileToDb', fileLoad.fileUpToDB);
    app.post('/addMailPackage', mailePackageManage.addNewPackage);
    app.get('/getMailPackage', mailePackageManage.getDataByLen);
};