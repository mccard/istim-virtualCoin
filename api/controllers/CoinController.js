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

  debit: function(req, res) {
    var user = req.param("userId");
    var cash = req.param("cash");
    //if (req.session.user) {
      if (!user) return res.send(400,{error: 'Parameter \'userId\' missing'});
      if (!cash) return res.send(400,{error: 'Parameter \'cash\' missing'});
      Coin.findOneByUserId(/*req.session.user.id*/user).done(function(err, coin){
        if (!coin) return res.send(404,{ error: 'User Not Found'});
        if (coin.cash >= cash){
          coin.cash -= cash;
          coin.save(function(err) {
            if (err) return res.send(500,{error: 'Error Save Object'});
            return res.send(200,coin);
          });
        }
        return res.send(200,{error: 'Cash Insufficient'});
      });  
    //}
  },

  _config: {}

};