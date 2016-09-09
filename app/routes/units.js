var ut = require('util');
var exp = require('express');
var mysql = require('mysql');
var app = exp();
var connection = require('../config/db');
var apikey = require('../config/apikey');
var rowcount=30;

app.get("/api/:key/units",function(req,response){
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			unitview(0,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.get("/api/:key/units/:id/",function(req,response){
	var id=req.params.id;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			unitview(id,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.get("/api/:key/units/:id/:page",function(req,response){
	var id=req.params.id;
	var page=req.params.page;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			unitview(id,page,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.post("/api/:key/units",function(req,response){
	var unit_id=req.body.unit_id;
	var satuan_id=req.body.satuan_id;
	var satuan_id=req.body.satuan_id;
	var unit_nama=req.body.unit_nama;
	var remarks=req.body.remarks;
	var isactive=req.body.isactive;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			unitsave(unit_id,satuan_id,satuan_id,unit_nama,remarks,isactive,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.post("/api/:key/units",function(req,response){
	var satuan_id=req.body.satuan_id;
	var satuan_nama=req.body.satuan_nama;
	var remarks=req.body.remarks;
	var isactive=req.body.isactive;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			unitsave(satuan_id,satuan_nama,remarks,isactive,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.delete("/api/:key/units/:id/:permanent",function(req,response){
	var id=req.params.id;
	var permanent=req.params.permanent;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			unitdelete(id,permanent,function(res){
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

function unitview(id,page,isactive, cb){
var q=ut.format("CALL `simpadk`.`sp_st_viewsatuanlist`(%d, %d, %d, %d);",id,page,rowcount,isactive);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function unitsave(satuan_id,satuan_nama,remarks,isactive,cb){
var q=ut.format("CALL `simpadk`.`sp_st_savesatuan`( %d, '%s', '%s', %d);",satuan_id,satuan_nama,remarks,isactive);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function unitdelete(satuan_id,delete_permanent,cb){
var q=ut.format("CALL `simpadk`.`sp_st_deletesatuan`(%d, %d);",satuan_id,delete_permanent);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

module.exports = app;