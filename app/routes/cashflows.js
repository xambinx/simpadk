var ut = require('util');
var exp = require('express');
var mysql = require('mysql');
var app = exp();
var connection = require('../config/db');
var apikey = require('../config/apikey');
var rowcount=30;

app.post("/api/:key/cashflows/bayarutang",function(req,response){
	var bayar_date=req.body.bayar_date;
	var restock_id=req.body.restock_id;
	var value_bayar=req.body.value_bayar;
	var remarks=req.body.remarks;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			bayarutang(bayar_date,restock_id,value_bayar,remarks,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.post("/api/:key/cashflows/bayarpiutang",function(req,response){
	var bayar_date=req.body.bayar_date;
	var order_id=req.body.order_id;
	var value_bayar=req.body.value_bayar;
	var remarks=req.body.remarks;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			bayarpiutang(bayar_date,order_id,value_bayar,remarks,function(res){
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

function bayarutang(bayar_date,restock_id,value_bayar,remarks,cb){
var q=ut.format("CALL `sp_ut_bayarutang`( '%s', %d, %d, '%s');",bayar_date,restock_id,value_bayar,remarks);
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};
function bayarpiutang(bayar_date,order_id,value_bayar,remarks,cb){
var q=ut.format("CALL `sp_pi_bayarpiutang`(  '%s', %d, %d, '%s');",bayar_date,order_id,value_bayar,remarks);
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

module.exports = app;