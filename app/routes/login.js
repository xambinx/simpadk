var ut = require('util');
var exp = require('express');
var mysql = require('mysql');
var app = exp();
var connection = require('../config/db');
var apikey = require('../config/apikey');
var _crypt = require('../config/crypt');
var user_nama = "";
var password = "";
var res;

app.post("/login",function(req,response){
	user_nama=req.body.user_nama;
	password=req.body.password;
	console.log("logging in...")
	checklogin(user_nama,password,function(res){
		console.log("res",res)
		if(res.length>0){

			var user_id=res[0].user_id;
			var user_level=res[0].user_level;
			apikey.checkapikey("",user_id,function(ret){
				if(ret.length==0){
					var now = new Date();
					var _apikey = _crypt.encrypt(user_nama+now.getFullYear()+now.getMonth()+now.getDay()+now.getHours()+now.getMinutes()+now.getMilliseconds());
					apikey.createapikey(user_id,_apikey,user_level,function(usr){
							response.send(usr);
					});
				}else{
					response.send(ret);
				}				
			});
		}else{
			response.send("Invalid user/password");
		}
	});
});

function checklogin(username,password, cb){
	var q=ut.format("CALL `simpadk`.`sp_us_checklogin`('%s', '%s');",username,password);
	connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
		console.log("result",rows,q)
	  	return cb(rows[0]);
	});
};

module.exports = app;