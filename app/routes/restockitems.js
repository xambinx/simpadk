var ut = require('util');
var exp = require('express');
var mysql = require('mysql');
var app = exp();
var connection = require('../config/db');
var apikey = require('../config/apikey');
var rowcount=30;

app.get("/api/:key/restockitems/",function(req,response){
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			restockitemview(0,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.get("/api/:key/restockitems/:id/",function(req,response){
	var id=req.params.id;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			restockitemview(id,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}

	});
	
});
app.get("/api/:key/restockitems/:id/:page",function(req,response){
	var id=req.params.id;
	var page=req.params.page;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			restockitemview(id,page,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.post("/api/:key/restockitems",function(req,response){

	var restockitem_id=req.body.restockitem_id;
	var restock_id=req.body.restock_id;
	var product_id=req.body.product_id;
	var price=req.body.price;
	var quantity=req.body.quantity;
	var subtotal=req.body.subtotal;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			restockitemsave(restockitem_id,restock_id,product_id,price,quantity,subtotal,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.delete("/api/:key/restockitems/:id/:permanent",function(req,response){
	var id=req.params.id;
	var permanent=req.params.permanent;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			restockitemdelete(id,permanent,function(res){
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

function restockitemview(id,page,isactive, cb){
var q=ut.format("CALL `sp_ri_viewrestockitemlist`(%d, %d, %d, %d);",id,page,rowcount,isactive);

	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function restockitemsave(restockitem_id,restock_id,product_id,price,quantity,subtotal,cb){
var q=ut.format("CALL `sp_ri_saverestockitem`( %d, %d, %d, %d, %d, %d);",restockitem_id,restock_id,product_id,price,quantity,subtotal);
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function restockitemdelete(merk_id,delete_permanent,cb){
var q=ut.format("CALL `sp_ri_deleterestockitem`(%d, %d);",merk_id,delete_permanent);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

module.exports = app;