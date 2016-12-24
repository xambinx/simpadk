var ut = require('util');
var exp = require('express');
var mysql = require('mysql');
var app = exp();
var connection = require('../config/db');
var apikey = require('../config/apikey');
var rowcount=30;

app.get("/api/:key/utang/",function(req,response){
	var key=req.params.key;
    
	isLogged(key,function(log){
		if(log){
			var res;
			viewutang(0,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.get("/api/:key/piutang/",function(req,response){
	var key=req.params.key;
    
	isLogged(key,function(log){
		if(log){
			var res;
			viewpiutang(0,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.get("/api/:key/utang/:id/",function(req,response){
	var key=req.params.key;
    var id=req.params.id;
    
	isLogged(key,function(log){
		if(log){
			var res;
			viewutang(id,page,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.get("/api/:key/utang/:id/:page",function(req,response){
	var key=req.params.key;
    var id=req.params.id;
    
	isLogged(key,function(log){
		if(log){
			var res;
			viewutang(id,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.get("/api/:key/piutang/:id",function(req,response){
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			viewpiutang(id,page,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.get("/api/:key/piutang/:id/:page",function(req,response){
	var key=req.params.key;
    var id=req.params.id;
    
	isLogged(key,function(log){
		if(log){
			var res;
			viewpiutang(id,1,function(res){
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

function viewpiutang(id,page,cb){
var q=ut.format("CALL `simpadk`.`sp_pi_viewpiutanglist`(%d, %d, %d);",id,page,rowcount);
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function viewutang(id,page,cb){
var q=ut.format("CALL `simpadk`.`sp_ut_viewutanglist`(%d, %d, %d);",id,page,rowcount);
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};



module.exports = app;