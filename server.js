const https = require('https');
const fs = require('fs');
const path = require('path');
const configs = require('konfig')();

var app = module.exports = (() => { // application

  const express        = require('express');
  const bodyParser     = require('body-parser');
  const cookieParser   = require('cookie-parser');
  const methodOverride = require('method-override');
  // const session        = require('express-session');
  const compression    = require('compression');
  // const MongoStore     = require('connect-mongo')(session);

  // let options = {
  //   secret: process.env.COOKIE_SECRET || configs.app.COOKIE_SECRET,
  //   saveUninitialized: true,
  //   resave: false,
  //   // cookie: maxAge: 2 * 60 * 60 * 1000
  //   store: new MongoStore({
  //     url: process.env.MONGOLAB_URI || configs.app.MONGODB_URI,
  //     collection: 'sessions',
  //     clear_interval: 7 * 24 * 60 * 60, // 7days
  //     auto_reconnect: true
  //   })
  // };

  let cacheOptions = {
    dotfiles: 'ignore',
    etag: true,
    extensions: [
      'css',
      'js',
      'jpg',
      'png',
      'gif'
    ],
    index: false,
    maxAge: 86400000 * 30, // 30日
    redirect: false,
    setHeaders(res, path, stat) {
      res.set({'x-timestamp': Date.now()});
    }
  };

  app = express();
  app.disable('x-powered-by');
  app.set('port', process.env.PORT || configs.app.PORT || 3000);
  app.set('views', path.join(__dirname, 'public', 'views'));
  app.set('view engine', 'pug');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(cookieParser());
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
  app.use(methodOverride());
  // app.use(session(options));
  app.use(compression({level: 9}));

  let env = process.env.NODE_ENV || 'development';

  // development only
  if (env === 'development') {
    console.log(configs.app);
    app.use(express.static(path.join(__dirname, 'public')));
    app.locals.pretty = true;
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      return res.render("error", {
        message: err.message,
        error: err
      });
    });
  }

  // production only
  if (env === 'production') {
    console.log(process.env);
    app.use(express.static(path.join(__dirname, 'public'), cacheOptions));
  }

  return app;
})();



(() => { // routes, session
  (require('./server/routes/api'))(app);
  (require('./server/routes/routes'))(app);
})();


(() => { //server

  /**
   * http
   */
  app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
  });


  /**
   * For https
   */
  // let hskey   = fs.readFileSync(path.resolve('keys', 'app-key.pem'));
  // let hscert  = fs.readFileSync(path.resolve('keys', 'app-cert.pem'));

  // let httpsOptions = {
  //   key: hskey,
  //   cert: hscert
  // };

  // return https.createServer(httpsOptions, app).listen(app.get("port"), () => console.log(`Express server listening on port ${app.get("port")}`)
  // );
})();
