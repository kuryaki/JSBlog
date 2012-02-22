
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var articleProvider = require('./articleprovider-memory').ArticleProvider;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var articleProvider = new ArticleProvider();

// Routes

app.get('/', function(req, res){
    articleProvider.findAll(function(error, docs){
        res.render('index.jade', { locals: {
            title: 'Kuryaki\'s Blog',
            articles:docs
            }
        });
    });
});

app.get('/new', function(req, res){
    res.render('blog_new.jade', {locals: {
        title: 'New Post'
    }
    });
});

app.post('/new', function(req, res){
    articleProvider.save({
        title: req.param('title'),
        body: req.param('body')
        },
        function error(error, docs){
            res.redirect('/');
    });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
