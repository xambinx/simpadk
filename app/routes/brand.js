var ut = require('util');
var exp = require('express');
var mysql = require('mysql');
var app = exp();
var connection = require('../config/db');
var rowcount=30;

app.get("/brands",function(req,response){
	var res;
	brandview(0,1,1,function(res){
		response.send(res);
	});
});
app.get("/brands/:id/",function(req,response){
	var id=req.params.id;
	var res;
	brandview(id,1,1,function(res){
		response.send(res);
	});
});
app.get("/brands/:id/:page",function(req,response){
	var id=req.params.id;
	var page=req.params.page;
	var res;
	brandview(id,page,1,function(res){
		response.send(res);
	});
});

app.post("/brands",function(req,response){
	var brand_id=req.body.brand_id;
	var merk_id=req.body.merk_id;
	var satuan_id=req.body.satuan_id;
	var brand_nama=req.body.brand_nama;
	var remarks=req.body.remarks;
	var isactive=req.body.isactive;
	var res;
	brandsave(brand_id,merk_id,satuan_id,brand_nama,remarks,isactive,function(res){
		response.send(res);
	});
});

app.post("/brands",function(req,response){
	var merk_id=req.body.merk_id;
	var merk_nama=req.body.merk_nama;
	var remarks=req.body.remarks;
	var isactive=req.body.isactive;
	var res;
	brandsave(merk_id,merk_nama,remarks,isactive,function(res){
		response.send(res);
	});
});

app.delete("/brands/:id/:permanent",function(req,response){
	var id=req.params.id;
	var permanent=req.params.permanent;
	var res;
	branddelete(id,permanent,function(res){
		response.send(res);
	});
});


function brandview(id,page,isactive, cb){
var q=ut.format("CALL `simpadk`.`sp_mr_viewmerklist`(%d, %d, %d, %d);",id,page,rowcount,isactive);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function brandsave(merk_id,merk_nama,remarks,isactive,cb){
var q=ut.format("CALL `simpadk`.`sp_mr_savemerk`( %d, '%s', '%s', %d);",merk_id,merk_nama,remarks,isactive);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

function branddelete(brand_id,delete_permanent,cb){
var q=ut.format("CALL `simpadk`.`sp_mr_deletemerk`(%d, %d);",brand_id,delete_permanent);
	
connection.query(q, function(err, rows, fields) {
		if(err)
		console.log(err); // null
	  	return cb(rows[0]);
	});
};

module.exports = app;