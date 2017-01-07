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
			var listDay=[];
			var listMonth=[];
			
			var currentTime = new Date();
			var date = new Date(), y = date.getFullYear(), m = date.getMonth();
			var firstDay = new Date(y, m, 1).getDate();
			var lastDay = new Date(y, m + 1, -1).getDate();
			dashboardgraphic(type,currentTime.toISOString().substring(0, 10),function(res){
				if(type=="month"){
					for (i=0;i<=11;i++){
						var monthname=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
						var value=0;
						
						for (x=0;x<res.length;x++) {
							var item=res[x];
							if(item.Qty!=null && item.order_date==i+1){
					    		value=item.Qty;	
					    	}
						}
						var name=monthname[i];
						listDay.push({"label":name,"value":value});
					}
					response.send(listDay);
				}else{
					for (i=firstDay;i<=lastDay;i++){
						var value=0;
						for (x=0;x<res.length;x++) {
						    var item=res[x]
							if(i==item.order_date){
						    	if(item.Qty!=null && item.order_date==i){
						    		value=item.Qty;	
						    	}
						    	
						    }
						}
						listMonth.push({"label":i,"value":value});
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
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function dashboardgraphic(type,datepointer, cb){
var q=ut.format("CALL `simpadk`.`sp_ds_getgraphic`('%s','%s');",type,datepointer);
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
		console.log(rows[0]);
	  	return cb(rows[0]);
	});
};


function dashboarddelivery( cb){
var q=ut.format("CALL `simpadk`.`sp_ds_getpendingdeliveredorder`;");
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function dashboardstock( cb){
var q=ut.format("CALL `simpadk`.`sp_ds_getminstock`;");
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

module.exports = app;