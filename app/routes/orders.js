var ut = require('util');
var exp = require('express');
var mysql = require('mysql');
var app = exp();
var connection = require('../config/db');
var apikey = require('../config/apikey');
var rowcount=30;

app.get("/api/:key/orders",function(req,response){
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			orderview(0,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.get("/api/:key/orders/:id/",function(req,response){
	var id=req.params.id;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			orderview(id,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}

	});
	
});
app.get("/api/:key/orders/:id/:page",function(req,response){
	var id=req.params.id;
	var page=req.params.page;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			orderview(id,page,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.post("/api/:key/orders",function(req,response){
	
	var order_id=req.body.order_id;
	var order_date=req.body.order_date;
	var user_id=req.body.user_id;
	var customer_id=req.body.customer_id;
	var total=req.body.total;
	var discount=req.body.discount;
	var grand_total=req.body.grand_total;
	var delivery_date=req.body.delivery_date;
	var isdelivered=req.body.isdelivered;
	var remarks=req.body.remarks;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			ordersave(order_id,order_date,user_id,customer_id,total,discount,grand_total,delivery_date,isdelivered,remarks,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.delete("/api/:key/orders/:id/:permanent",function(req,response){
	var id=req.params.id;
	var permanent=req.params.permanent;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			orderdelete(id,permanent,function(res){
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

function orderview(id,page,isactive, cb){
var q=ut.format("CALL `simpadk`.`sp_od_vieworderlist`(%d, %d, %d, %d);",id,page,rowcount,isactive);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function ordersave(order_id,order_date,user_id,customer_id,total,discount,grand_total,delivery_date,isdelivered,remarks,cb){
var q=ut.format("CALL `simpadk`.`sp_od_saveorder`( %d, '%s', %d, %d, %d, %d, %d, '%s', %d,'%s');",order_id,order_date,user_id,customer_id,total,discount,grand_total,delivery_date,isdelivered,remarks);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function orderdelete(merk_id,delete_permanent,cb){
var q=ut.format("CALL `simpadk`.`sp_od_deleteorder`(%d, %d);",merk_id,delete_permanent);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

module.exports = app;