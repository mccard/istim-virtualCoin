/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

var http = require('http');
var user = req.param("userId");
var cash = parseFloat(req.param("cash"));
var id_grande;
     
     var response = 'nothing';
     var url = 'http://istim-user.nodejitsu.com/user';
     var url2 = 'http://istim-user.nodejitsu.com/getAllAuthenticated';

     http.get(url, function(res) {
         var body = '';

         res.on('data', function(chunk) {
             body += chunk;
         });

         res.on('end', function() {
         response = JSON.parse(body);
         for (var i = response.length - 1; i >= 0; i--) {
        	if(response[i].email == user){
        	   id_grande = response[i].id;
        	}
       };

       var querystring = require('querystring');

       var data = querystring.stringify({
        userId: id_grande
       })
                    var options = {
    hostname: 'istim-user.nodejitsu.com',
    port: 80,
    path: '/authenticated',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    }
  };
      var str = '';

  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      str += chunk;
    });

    res.on('end', function() {
    var users = JSON.parse(str);
    if(users.authenticated == "yes"){
      return next();
    }
    else {
      return res.forbidden('You are not permitted to perform this action.');
    }
    });
  });
  req.write(data);
  req.end();
         });
     }).on('error', function(e) {
         console.log("Got error: ", e);
     });

    


  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller


  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
};
