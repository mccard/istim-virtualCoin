/**
 * CoinController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  create: function(req, res) {
    var user = req.param("userId");
    var cash = parseFloat(req.param("cash"));
    //if (req.session.user) {
      if (!user) return res.send(400, {error: 'Parameter \'userId\' Missing'});
      Coin.findOneByUserId(/*req.session.user.id*/user).done(function(err, coin){
        if (err) return res.send(500, {error: 'DB Error'});
        if (coin) return res.send(400, {error: 'User Already Cash Packet'});
        if (!cash) {
          Coin.create({userId: user, cash: 0}).done(function (err, coin) {
            if (err) return res.send(500, {error: 'Error Save Object'});
            res.send(200,coin);
          });
          
        } else {
          Coin.create({userId: user, cash: cash}).done(function(err, coin) {
            if (err) return res.send(500, {error: 'Error Save Object'});
            res.send(200,coin);
          });
          
        }
      });
    //}
  },

  destroy: function(req, res) {
    var user = req.param("userId");
    //if (req.session.user) {
      if (!user) return res.send(400, {error: 'Parameter \'userId\' Missing'});
      Coin.findOneByUserId(/*req.session.user.id*/user).done(function(err, coin) {
        if (err) return res.send(500, {error: 'DB Error'});
        if (!coin) return res.send(404, {error: 'User Not Found'});
        coin.destroy(function(err){
          if (err) return res.send(500, {error: 'Error Destroy Object'});
          res.send(200,coin);
        });
      });
    //}
  },

  update: function(req, res) {
    var user = req.param("userId");
    var cash = parseFloat(req.param("cash"));
    var newuser = req.param("newUser");
    if (!user) return res.send(400, {error: 'Parameter \'userId\' Missing'});
    Coin.findOneByUserId(user).done(function (err, coin) {
      if (err) return res.send(500, {error: 'DB Error'});
      if (!coin) return res.send(404, {error: 'User Not Found'});
      if (cash && !newuser) {
        coin.cash = cash;
      } else if (newuser && !cash) {
        coin.userId = newuser;
      } else if (cash && newuser) {
        coin.userId = newuser;
        coin.cash = cash;
      }
      coin.save(function(err){
        if (err) return res.send(500, {error: 'Error Save Object'});
        res.send(200, coin);
      });
    });
  },

  debit: function(req, res) {
    var user = req.param("userId");
    var cash = parseFloat(req.param("cash"));
    //if (req.session.user) {
      if (!user) return res.send(400,{error: 'Parameter \'userId\' Missing'});
      if (!cash) return res.send(400,{error: 'Parameter \'cash\' Missing'});
      Coin.findOneByUserId(/*req.session.user.id*/user).done(function(err, coin){
        if (err) return res.send(500, {error: 'DB Error'});
        if (!coin) return res.send(404,{ error: 'User Not Found'});
        if (coin.cash >= cash){
          coin.cash -= cash;
          coin.save(function(err) {
            if (err) return res.send(500,{error: 'Error Save Object'});
          });
          return res.send(200,coin);
        }
        return res.send(200,{error: 'Cash Insufficient'});
      });  
    //}
  },

  credit: function(req, res) {
    var user = req.param("userId");
    var cash = parseFloat(req.param("cash"));
     //if (req.session.user) {
      if (!user) return res.send(400,{error: 'Parameter \'userId\' Missing'});
      if (!cash) return res.send(400,{error: 'Parameter \'cash\' Missing'});
      Coin.findOneByUserId(/*req.session.user.id*/user).done(function(err, coin){
        if (err) return res.send(500, {error: 'DB Error'});
        if (!coin) return res.send(404,{ error: 'User Not Found'});
        if (cash >= 0){
          coin.cash += cash;
          coin.save(function(err) {
            if (err) return res.send(500,{error: 'Error Save Object'});
          });
          return res.send(200,coin);
        }
        return res.send(200,{error: 'Cash Value Invalid'});
      });  
    //}
  },

  _config: {}

};