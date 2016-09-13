var ut = require('util');
var exp = require('express');
var mysql = require('mysql');
var app = exp();
var connection = require('../config/db');
var apikey = require('../config/apikey');
var rowcount=30;

app.get("/api/:key/orderitems",function(req,response){
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			orderitemview(0,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.get("/api/:key/orderitems/:id/",function(req,response){
	var id=req.params.id;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			orderitemview(id,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}

	});
	
});
app.get("/api/:key/orderitems/:id/:page",function(req,response){
	var id=req.params.id;
	var page=req.params.page;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			orderitemview(id,page,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.post("/api/:key/orderitems",function(req,response){

	var orderitem_id=req.body.orderitem_id;
	var order_id=req.body.order_id;
	var product_id=req.body.product_id;
	var customer_price_id=req.body.customer_price_id;
	var customer_price=req.body.customer_price;
	var quantity=req.body.quantity;
	var subtotal=req.body.subtotal;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			orderitemsave(orderitem_id,order_id,product_id,customer_price_id,customer_price,quantity,subtotal,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.delete("/api/:key/orderitems/:id/:permanent",function(req,response){
	var id=req.params.id;
	var permanent=req.params.permanent;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			orderitemdelete(id,permanent,function(res){
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

function orderitemview(id,page,isactive, cb){
var q=ut.format("CALL `simpadk`.`sp_oi_vieworderitemlist`(%d, %d, %d, %d);",id,page,rowcount,isactive);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function orderitemsave(orderitem_id,order_id,product_id,customer_price_id,customer_price,quantity,subtotal,cb){
var q=ut.format("CALL `simpadk`.`sp_oi_saveorderitem`( %d, %d, %d, %d, %d, %d, %d);",orderitem_id,order_id,product_id,customer_price_id,customer_price,quantity,subtotal);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function orderitemdelete(merk_id,delete_permanent,cb){
var q=ut.format("CALL `simpadk`.`sp_oi_deleteorderitem`(%d, %d);",merk_id,delete_permanent);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

module.exports = app;