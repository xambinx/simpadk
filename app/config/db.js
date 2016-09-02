var mysql = require('mysql');
var config = require("./config");
db = config.database;
var connection = mysql.createConnection({
	  host     : db.host,
	  user     : db.user,
	  password : db.password,
	  database : db.db_name
	});
module.exports = connection;