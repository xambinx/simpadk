var ut = require('util');
var exp = require('express');
var mysql = require('mysql');
var app = exp();
var connection = require('../config/db');
var apikey = require('../config/apikey');
var rowcount=30;

app.post("/api/:key/reports/restock/",function(req,response){
	var supplier_id=req.body.supplier_id;
	var date_from=req.body.date_from;
	var date_to=req.body.date_to;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			reportrestock(date_from,date_to,supplier_id,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.post("/api/:key/reports/order/",function(req,response){
	var customer_id=req.body.customer_id;
	var date_from=req.body.date_from;
	var date_to=req.body.date_to;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			reportorder(date_from,date_to,customer_id,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});

app.post("/api/:key/reports/utang/",function(req,response){
	var supplier_id=req.body.supplier_id;
	var date_from=req.body.date_from;
	console.log(date_from);
	var date_to=req.body.date_to;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			reportutang(date_from,date_to,supplier_id,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.post("/api/:key/reports/piutang/",function(req,response){
	var customer_id=req.body.customer_id;
	var date_from=req.body.date_from;
	var date_to=req.body.date_to;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			reportpiutang(date_from,date_to,customer_id,function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});


app.post("/api/:key/reports/stock/",function(req,response){
	var supplier_id=req.body.supplier_id;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			reportstock(function(res){
				response.send(res);
			});
		}else{
			response.send("invalid apikey");
		}
	});
	
});
app.post("/api/:key/reports/cashflow/",function(req,response){
	var date_from=req.body.date_from;
	var date_to=req.body.date_to;
	var key=req.params.key;
	isLogged(key,function(log){
		if(log){
			var res;
			reportcashflow(date_from,date_to,function(res){
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

function reportorder(date_from,date_to,customer_id,cb){
var q=ut.format("CALL `simpadk`.`sp_od_reportorder`( '%s', '%s', %d);",date_from,date_to,customer_id);
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function reportrestock(date_from,date_to,supplier_id,cb){
var q=ut.format("CALL `simpadk`.`sp_rs_reportrestock`( '%s', '%s', %d);",date_from,date_to,supplier_id);
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function reportpiutang(date_from,date_to,customer_id,cb){
var q=ut.format("CALL `simpadk`.`sp_pi_reportpiutang`( '%s', '%s', %d);",date_from,date_to,customer_id);
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function reportutang(date_from,date_to,supplier_id,cb){
var q=ut.format("CALL `simpadk`.`sp_ut_reportutang`( '%s', '%s', %d);",date_from,date_to,supplier_id);
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};


function reportstock(cb){
var q=ut.format("CALL `simpadk`.`sp_pr_reportstock`();");
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};
function reportcashflow(date_from,date_to,cb){
var q=ut.format("CALL `simpadk`.`sp_cf_viewcashflow`( '%s', '%s');",date_from,date_to);
	console.log(q);
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};


module.exports = app;