var ut = require('util');
var exp = require('express');
var mysql = require('mysql');
var app = exp();
var connection = require('../config/db');
var apikey = require('../config/apikey');
var rowcount=30;

app.get("/api/:key/customerprices",function(req,response){
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			customerpriceview(0,0,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.get("/api/:key/customerprices/:id/:productid/",function(req,response){
	var id=req.params.id;
	var key=req.params.key;
	var product_id=req.params.productid;
	
	isLogged(key,function(log){
		if(log){
			var res;
			customerpriceview(id,product_id,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}

	});
	
});
app.get("/api/:key/customerprices/:id/:productid/:page",function(req,response){
	var id=req.params.id;
	var page=req.params.page;
	var key=req.params.key;
	var product_id=req.params.productid;

	isLogged(key,function(log){
		if(log){
			var res;
			customerpriceview(id,product_id,page,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.post("/api/:key/customerprices",function(req,response){
	var customerprice_id=req.body.customerprice_id;
	var customer_id=req.body.customer_id;
	var product_id=req.body.product_id;
	var price=req.body.price;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			customerpricesave(customerprice_id,customer_id,product_id,price,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.delete("/api/:key/customerprices/:id/:permanent",function(req,response){
	var id=req.params.id;
	var permanent=req.params.permanent;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			customerpricedelete(id,permanent,function(res){
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

function customerpriceview(id,product_id,page,isactive, cb){
var q=ut.format("CALL `simpadk`.`sp_cp_viewcustomerpricelist`(%d,%d, %d, %d, %d);",id,product_id,page,rowcount,isactive);
	console.log("query",q)
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function customerpricesave(customerprice_id, customer_id,product_id,price,cb){
var q=ut.format("CALL `simpadk`.`sp_cp_savecustomerprice`( %d, %d, %d, %d);",customerprice_id, customer_id,product_id,price);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function customerpricedelete(merk_id,delete_permanent,cb){
var q=ut.format("CALL `simpadk`.`sp_cp_deletecustomerprice`(%d, %d);",merk_id,delete_permanent);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

module.exports = app;