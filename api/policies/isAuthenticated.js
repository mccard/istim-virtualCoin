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
                      http.get(url2, function(res) {
                       var body = '';

                       res.on('data', function(chunk) {
                           body += chunk;
                       });

                       res.on('end', function() {
                       response = JSON.parse(body);
                       for (var i = response.length - 1; i >= 0; i--) {
                        console.log("IDGRANDE!!!", id_grande);
                        console.log("response[i].userId", response[i].userId);
                          if(response[i].userId == id_grande){
                              return next();
                          }
                     };
                       return res.forbidden('You are not permitted to perform this action.');

                       });
                   }).on('error', function(e) {
                       console.log("Got error: ", e);
                   });

         });
     }).on('error', function(e) {
         console.log("Got error: ", e);
     });

    


  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller


  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
};
