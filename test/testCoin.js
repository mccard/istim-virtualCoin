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
var assert = require("assert");

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

  describe('HTTP SuperTests:', function () {

    it ('should create an object at Model Coin only by passing userId', function (done) {
      supertest(sails.express.app)
        .get('/Coin/create?userId=teste2')
        .expect('Content-Type', /json/)
        .expect(200, done)
        .end(function(err, res) {
          Coin.findOneByUserId("teste2").done(function(err, coin){         
          assert.equal(coin.userId, "teste2");
          assert.equal(coin.cash, 0);
           done();          
        })
        })
    })
  })

  describe('HTTP SuperTests:', function () {

    it ('should create an object at Model Coin by passing userId and cash', function (done) {
      supertest(sails.express.app)
        .get('/Coin/create?userId=teste&cash=50')
        .expect('Content-Type', /json/)
        .expect(200, done)
        .end(function(err, res) {
          Coin.findOneByUserId("teste").done(function(err, coin){         
          assert.equal(coin.userId, "teste");
          assert.equal(coin.cash, 50);
           done();          
        })
        })
    })
  })

after(function(done) {
  sails.lower(done);
});