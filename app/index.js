var requireDir = require('require-dir');
var exp = require('express');
var app = exp();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
var routes = requireDir('./routes');
for (var i in routes) app.use('/', routes[i]);

var port=3000;
app.listen(port);
console.log("i'm listening to port:"+port);
