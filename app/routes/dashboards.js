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

app.get("/api/:key/dashboards/graphic/:type",function(req,response){
	var key=req.params.key;
	var type=req.params.type;
	
	isLogged(key,function(log){
		if(log){
			var res;
			var listDay=new Array(2);
			var listMonth=new Array(2);
			
			var currentTime = new Date();
			var date = new Date(), y = date.getFullYear(), m = date.getMonth();
			var firstDay = new Date(y, m, 1);
			var lastDay = new Date(y, m + 1, 0);
			dashboardgraphic(type,function(res){
				if(type=="month"){
					for (i=1;i<=12;i++){
						var value=0;
						for (item in res) {
						    if(item.Qty!=null && item.order_date==i){
					    		value=item.Qty;	
					    	}
						}
						listDay.push(i,value);
					}
					response.send(listDay);
				}else{
					for (i=firstDay;i<=lastDay;i++){
						var value=0;
						for (item in res) {
						    if(i==item.order_date){
						    	if(item.Qty!=null && item.order_date==i){
						    		value=item.Qty;	
						    	}
						    	
						    }
						}
						listMonth.push(i,value);
					}

					response.send(listMonth);
				}
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

function dashboardgraphic(type, cb){
var q=ut.format("CALL `simpadk`.`sp_ds_getgraphic`('%s','%s');",type,'2016-09-01');
	
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