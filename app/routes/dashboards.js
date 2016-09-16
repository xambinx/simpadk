var ut = require('util');
var exp = require('express');
var mysql = require('mysql');
var app = exp();
var connection = require('../config/db');
var apikey = require('../config/apikey');
var rowcount=30;

app.get("/api/:key/dashboards/saleswidget",function(req,response){
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			var currentTime = new Date();
			dashboardsales(currentTime.toISOString().substring(0, 10),function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.get("/api/:key/dashboards/delivery",function(req,response){
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			dashboarddelivery(function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.get("/api/:key/dashboards/stock",function(req,response){
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			dashboardstock(function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

function isLogged(key,cb){
	apikey.checkapikey(key,0,function(ret){
		if(ret.length==0){
			return cb(false);

		}else{
			return cb(true);
		}
	});

}

function dashboardsales(datepointer, cb){
var q=ut.format("CALL `simpadk`.`sp_ds_getsalescount`('%s');",datepointer);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function dashboarddelivery( cb){
var q=ut.format("CALL `simpadk`.`sp_ds_getpendingdeliveredorder`;");
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function dashboardstock( cb){
var q=ut.format("CALL `simpadk`.`sp_ds_getminstock`;");
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

module.exports = app;