
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var domain = require('domain');

var config = require('./config');
var startApp = require('./controllers/startApp') ;

var server = http.createServer();
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser({uploadDir:config.fileDir + config.fileUpLoadDir}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req,res, next) {
    var d = domain.create();
    //监听domain的错误事件
    d.on('error', function (err) {
        //logger.error(err);
        res.statusCode = 500;
        res.json({sucess:false, data: '服务器异常'});
        d.dispose();
    });

    d.add(req);
    d.add(res);
    d.run(next);
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

startApp.startApp();
routes(app);//路由

server.on('request', app);
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

/*http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/