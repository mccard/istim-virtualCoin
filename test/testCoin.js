before(function(done) {
  // Lift Sails and store the app reference
  require('sails').lift({

    // turn down the log level so we can view the test results
    log: {
      level: 'error'
    },

  }, function(err, sails) {
       // export properties for upcoming tests with supertest.js
       sails.localAppURL = localAppURL = ( sails.usingSSL ? 'https' : 'http' ) + '://' + sails.config.host + ':' + sails.config.port + '';
       // save reference for teardown function
       done(err);
     });

});

var supertest = require("supertest")

describe('HTTP Sails Test:', function () {
  describe('HTTP SuperTests:', function () {

    it ('should request "/Coin" on server', function (done) {
      supertest(sails.express.app)
        .get('/Coin')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })
  })
})