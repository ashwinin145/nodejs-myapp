var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
const http = require('http');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
//...Brute Force Attack.............
var RateLimit = require('express-rate-limit');
app.enable('trust proxy'); 

var apiLimiter = new RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 3, 
  delayMs: 0 
});

app.use('/api/', apiLimiter);

//....Database Connection Middleware....
const mysqlCOnn = require('./Model/mysqlcon');
dbconnMiddleware = async function dbconn(req, res, next) {
  try {
    req.mysqlConnection = await mysqlCOnn.getConnection();
    res.status(200);
    next();
  } catch (error) {
    res.send('database is busy');
  }
}
//....Clustering.......
var express = require('express'),
cluster = require('cluster'),
os = require('os');
// If in the master process, create a worker for each CPU.
if (cluster.isMaster) {
for (var i = 0; i < os.cpus().length; i += 1) {
  cluster.fork();
}
// When process dies, replace it.
cluster.on('exit', function () {
  cluster.fork();
});
return;
}
app.get('/clustered', function (req, res) {
res.send('Running on worker with id #' + cluster.worker.id);
});


app.use('/auth', dbconnMiddleware, require('./controller/authentication'));
app.use('/api/auth', dbconnMiddleware, require('./controller/authentication'));

app.get('/check', (req, res) => {
  res.send("I am from check");
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 3000;
http.createServer(app).listen(port, () => {
  console.log("I am running at the port" + port);
})
module.exports = app;
