var ut = require('util');
var exp = require('express');
var mysql = require('mysql');
var app = exp();
var connection = require('../config/db');
var apikey = require('../config/apikey');
var rowcount=30;

app.get("/api/:key/users",function(req,response){
	var key=req.params.key; 
	isLogged(key,function(log){
		if(log){
			var res;
			userview(0,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.get("/api/:key/users/:id/",function(req,response){
	var id=req.params.id;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			userview(id,1,1,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.get("/api/:key/users/:id/:page",function(req,response){
	var id=req.params.id;
	var page=req.params.page;
	var res;
	userview(id,page,1,function(res){
		response.send(res);
	});
});

app.post("/api/:key/users",function(req,response){
	var user_id=req.body.user_id;
	var user_name=req.body.user_name;
	var password=req.body.password;
	var user_level=req.body.user_level;
	var isactive=req.body.isactive;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			usersave(user_id,user_name,password,user_level,isactive,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.delete("/api/:key/users/:id/:permanent",function(req,response){
	var id=req.params.id;
	var permanent=req.params.permanent;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			userdelete(id,permanent,function(res){
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

function userview(id,page,isactive, cb){
var q=ut.format("CALL `simpadk`.`sp_us_viewuserlist`(%d, %d, %d, %d);",id,page,rowcount,isactive);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function usersave(user_id,user_name,password,user_level,isactive,cb){
var q=ut.format("CALL `simpadk`.`sp_us_saveuser`( %d, '%s', '%s', %d, %d);",user_id,user_name,password,user_level,isactive);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function userdelete(user_id,delete_permanent,cb){
var q=ut.format("CALL `simpadk`.`sp_us_deleteuser`(%d, %d);",user_id,delete_permanent);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

module.exports = app;