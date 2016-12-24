var ut = require('util');
var exp = require('express');
var mysql = require('mysql');
var app = exp();
var connection = require('../config/db');
var apikey = require('../config/apikey');
var rowcount=30;

app.get("/api/:key/restocks",function(req,response){
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			restockview(0,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.get("/api/:key/restocks/:id/",function(req,response){
	var id=req.params.id;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			restockview(id,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}

	});
	
});
app.get("/api/:key/restocks/:id/:page",function(req,response){
	var id=req.params.id;
	var page=req.params.page;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			restockview(id,page,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.post("/api/:key/restocks",function(req,response){
	
	var restock_id=req.body.restock_id;
	var restock_date=req.body.restock_date;
	var user_id=req.body.user_id;
	var supplier_id=req.body.supplier_id;
	var total=req.body.total;
	var discount=req.body.discount;
	var grand_total=req.body.grand_total;
	var delivery_date=req.body.delivery_date;
	var isdelivered=req.body.isdelivered;
	var remarks=req.body.remarks;
	var due_date=req.body.due_date;
	var isdebt=req.body.isdebt;
	
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			restocksave(restock_id,restock_date,user_id,supplier_id,total,discount,grand_total,due_date,isdebt,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.delete("/api/:key/restocks/:id/:permanent",function(req,response){
	var id=req.params.id;
	var permanent=req.params.permanent;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			restockdelete(id,permanent,function(res){
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

function restockview(id,page,isactive, cb){
var q=ut.format("CALL `simpadk`.`sp_rs_viewrestocklist`(%d, %d, %d, %d);",id,page,rowcount,isactive);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function restocksave(restock_id,restock_date,user_id,supplier_id,total,discount,grand_total,due_date,isdebt,cb){
var q=ut.format("CALL `simpadk`.`sp_rs_saverestock`( %d, '%s', %d, %d, %d, %d, %d,'%s',%d);",restock_id,restock_date,user_id,supplier_id,total,discount,grand_total,due_date,isdebt);
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function restockdelete(merk_id,delete_permanent,cb){
var q=ut.format("CALL `simpadk`.`sp_rs_deleterestock`(%d, %d);",merk_id,delete_permanent);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

module.exports = app;