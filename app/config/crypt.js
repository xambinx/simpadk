var _crypt = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'kawairitsu';

var encrypt = function(text){
  var cipher = _crypt.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
};
 
var decrypt = function(text){
  var decipher = _crypt.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
};

module.exports.encrypt =encrypt;
module.exports.decrypt =decrypt;
