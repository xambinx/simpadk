
var ut = require('util');
var mysql = require('mysql');
var connection = require('../config/db');

var checkapikey = function (apikey,user_id,cb){
  var q=ut.format("CALL `simpadk`.`sp_api_checkapikey`('%s',%d);",apikey,user_id);
  connection.query(q, function(err, rows, fields) {
    if(err)
    console.log(err); // null
      return cb(rows[0]);
  });
};
var createapikey = function (user_id,_apikey,_user_level,cb){
  var q=ut.format("CALL `simpadk`.`sp_api_insertapikey`(%d,'%s',%d);",user_id,_apikey,_user_level);
  connection.query(q, function(err, rows, fields) {
    if(err)
    console.log(err); // null
    console.log("apikey registered");
      return cb(rows[0]);
  });
};

module.exports.checkapikey =checkapikey;
module.exports.createapikey =createapikey;
