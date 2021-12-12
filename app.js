var express = require('express');
var app = express();
var routes = require('./routes/index');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var pouchmethods = require('./config/pouch');

app.use(passport.initialize());

require('./config/passport.js')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);


var port = 3000;
app.set('port', port);

var db = require('./models');
db.sequelize.sync().then(function(){
  console.log('db synced');
  app.listen(port, function() {
    console.log('Express server listening on port ' );
    pouchmethods.createPouchDatabase();
  });
})
.catch((err) =>{
  console.log(err);
})


