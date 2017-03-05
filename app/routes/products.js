var ut = require('util');
var exp = require('express');
var mysql = require('mysql');
var apikey = require('../config/apikey');

var app = exp();
var connection = require('../config/db');
var _crypt = require('../config/crypt');
var rowcount=30;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/:key/products",function(req,response){
	var res;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			productview(0,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}

	});
});
app.get("/api/:key/products/customer/:customerid/:productid",function(req,response){
	var res;
	var key=req.params.key;
	var customerid=req.params.customerid;
	var productid=req.params.productid;
	isLogged(key,function(log){
		if(log){
			var res;
			productviewcustomer(productid,customerid,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}

	});
});
app.get("/api/:key/products/:id/",function(req,response){
	var id=req.params.id;
	var res;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			productview(id,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}

	});
	
});
app.get("/api/:key/products/:id/:page",function(req,response){
	var id=req.params.id;
	var page=req.params.page;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			productview(id,page,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}

	});
	
});

app.post("/api/:key/products",function(req,response){
	var product_id=req.body.product_id;
	var merk_id=req.body.merk_id;
	var satuan_id=req.body.satuan_id;
	var product_nama=req.body.product_nama;
	var remarks=req.body.remarks;
	var stock=req.body.stock;
	var min_stock=req.body.min_stock;
	var isactive=req.body.isactive;
	var supplier_price = req.body.supplier_price;
	var default_price = req.body.default_price;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			//console.log(req.body+" - "+req.body.product_id+" - "+req.body.product_nama);
			productsave(product_id,merk_id,satuan_id,product_nama,remarks,stock,min_stock,isactive,supplier_price,default_price,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}

	});
	
});

app.delete("/api/:key/products/:id/:permanent",function(req,response){
	var id=req.params.id;
	var permanent=req.params.permanent;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			productdelete(id,permanent,function(res){
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
function productview(id,page,isactive, cb){
var q=ut.format("CALL `sp_pr_viewproductlist`(%d, %d, %d, %d);",id,page,rowcount,isactive);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function productviewcustomer(productid,customerid, cb){
var q=ut.format("CALL `sp_pr_viewproductlistcustomer`(%d, %d);",productid,customerid);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function productsave(product_id,merk_id,satuan_id,product_nama,remarks,stock,min_stock,isactive,supplier_price,default_price,cb){
var q=ut.format("CALL `sp_pr_saveproduct`(%d,%d, %d, '%s', '%s', %d, %d, %d, %d,%d);",product_id,merk_id,satuan_id,product_nama,remarks,isactive,stock,min_stock,supplier_price,default_price);
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function productdelete(product_id,delete_permanent,cb){
var q=ut.format("CALL `sp_pr_deleteproduct`(%d, %d);",product_id,delete_permanent);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};


module.exports = app;