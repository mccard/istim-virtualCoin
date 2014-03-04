/**
 * Coin
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  	attributes: {
		userId: {
			type: 'STRING',
			required: true
		},
		cash: 'FLOAT',
		beforeCreate: function(values, next) {
			Coin.findByUserId(values.userId, function(err, coin){
				if (!err)
					next();
			});
		}
  	}
};
