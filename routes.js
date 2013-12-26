/**
 * Module dependencies.
 */


var index = require('./controllers/index');
var user = require('./controllers/user');
var fileLoad = require('./controllers/fileLoad')
    ,packageManage = require('./controllers/packageManage');

module.exports = function (app) {
    // home page
    app.get('/', index.index);
    app.get('/users', user.list);
    app.get('/getBatchFile', packageManage.getBatchFile);

    app.post('/upfile', fileLoad.fileUp);
    app.post('/fileToDb', fileLoad.fileUpToDB);
};