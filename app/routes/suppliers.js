var ut = require('util');
var exp = require('express');
var mysql = require('mysql');
var app = exp();
var connection = require('../config/db');
var apikey = require('../config/apikey');
var rowcount=30;

app.get("/api/:key/suppliers",function(req,response){
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			supplierview(0,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.get("/api/:key/suppliers/:id/",function(req,response){
	var id=req.params.id;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			supplierview(id,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}

	});
	
});
app.get("/api/:key/suppliers/:id/:page",function(req,response){
	var id=req.params.id;
	var page=req.params.page;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			supplierview(id,page,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.post("/api/:key/suppliers",function(req,response){
	var supplier_id=req.body.supplier_id;
	var name=req.body.name;
	var phone_no=req.body.phone_no;
	var address=req.body.address;
	var remarks=req.body.remarks;
	var isactive=req.body.isactive;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			suppliersave(supplier_id,name,phone_no,address,remarks,isactive,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.delete("/api/:key/suppliers/:id/:permanent",function(req,response){
	var id=req.params.id;
	var permanent=req.params.permanent;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			supplierdelete(id,permanent,function(res){
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

function supplierview(id,page,isactive, cb){
var q=ut.format("CALL `sp_sp_viewsupplierlist`(%d, %d, %d, %d);",id,page,rowcount,isactive);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function suppliersave(supplier_id,name,address,phone_no,remarks,isactive,cb){
var q=ut.format("CALL `sp_sp_savesupplier`( %d, '%s', '%s', '%s', '%s', %d);",supplier_id,name,address,phone_no,remarks,isactive);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function supplierdelete(merk_id,delete_permanent,cb){
var q=ut.format("CALL `sp_sp_deletesupplier`(%d, %d);",merk_id,delete_permanent);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

module.exports = app;