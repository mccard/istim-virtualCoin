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
var should = require("should");

 describe('when requesting create on api only by passing userId', function () {

    it ('should create an object at Model Coin with the userId given and its cash should be 0', function (done) {
      supertest(sails.express.app)
        .get('/Coin/create?userId=nDummyObject')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          Coin.findOneByUserId("nDummyObject").done(function(err, coin){         
          assert.equal(coin.userId, "nDummyObject");
          assert.equal(coin.cash, 0);
           done();          
        })
        })
    })
  })

  describe('when requesting create on api by passing userId and cash', function () {

    it ('should create an object at Model Coin with the userId and cash given', function (done) {
      supertest(sails.express.app)
        .get('/Coin/create?userId=nDummyObjectCash&cash=45')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          Coin.findOneByUserId("nDummyObjectCash").done(function(err, coin){         
          assert.equal(coin.userId, "nDummyObjectCash");
          assert.equal(coin.cash, 45);
           done();          
        })
        })
    })
  })

  describe('when requesting update on api by passing userId and cash', function () {

    it ('should update the existing object with the cash given', function (done) {
      supertest(sails.express.app)
        .get('/Coin/update?userId=nDummyObject&cash=40')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          Coin.findOneByUserId("nDummyObject").done(function(err, coin){         
          assert.equal(coin.userId, "nDummyObject");
          assert.equal(coin.cash, 40);
           done();          
        })
        })
    })
  })

describe('when requesting update on api by passing userId and newUser', function () {

    it ('should update the existing object with the newUser given', function (done) {
      supertest(sails.express.app)
        .get('/Coin/update?userId=nDummyObjectCash&newUser=DummyObjectCash')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          Coin.findOneByUserId("DummyObjectCash").done(function(err, coin){         
          assert.equal(coin.userId, "DummyObjectCash");
           done();          
        })
        })
    })
  })

describe('when requesting update on api by passing userId, cash and newUser', function () {

    it ('should update the existing object with the cash and newUser given', function (done) {
      supertest(sails.express.app)
        .get('/Coin/update?userId=nDummyObject&cash=45&newUser=DummyObject')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          Coin.findOneByUserId("DummyObject").done(function(err, coin){         
          assert.equal(coin.userId, "DummyObject");
          assert.equal(coin.cash, 45);
           done();          
        })
        })
    })
  })

  describe('when requesting /coin', function () {

    it ('should retrieve an array of "Coins"', function (done) {
      supertest(sails.express.app)
        .get('/coin')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          res.body.should.be.instanceof(Array);
        //  console.info(res.text);
        //  result = JSON.parse(res.text)[0];
        //  var cash = res.body[0].cash;
        for (var i = (res.body).length - 1; i >= 0; i--) {
          assert.equal(res.body[i].cash, 45);
        };
          done();    
      })
    })
  })

  describe('when requesting show on api by passing userId', function () {

    it ('should retrieve the instance of Coin that has this userId', function (done) {
      supertest(sails.express.app)
        .get('/coin/show?userId=DummyObject')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
        //  console.info(res.text);
        //  result = JSON.parse(res.text)[0];
        //  var cash = res.body[0].cash;
        for (var i = (res.body).length - 1; i >= 0; i--) {
          assert.equal(res.body[i].userId, 'DummyObject');
          assert.equal(res.body[i].cash, 45);
        };
          done();    
      })
    })
  })
 
  describe('when requesting credit on api by passing userId and cash', function () {

    var credit;

    it ('', function (done) {
      supertest(sails.express.app)
        .get('/coin/show?userId=DummyObjectCash')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          result = JSON.parse(res.text);    
          credit = result.cash;
          done();   
      })
    }),

    it ('should add the amount of credit given to the user provided', function (done) {
      supertest(sails.express.app)
        .get('/coin/credit?userId=DummyObjectCash&cash=20')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          result = JSON.parse(res.text); 
          assert.equal(result.userId, 'DummyObjectCash');
          assert.equal(result.cash, credit + 20);
          done();   
      })
    }),

    it ('the cash should be up-to-date', function (done) {
      supertest(sails.express.app)
        .get('/coin/show?userId=DummyObjectCash')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          result = JSON.parse(res.text);         
          assert.equal(result.userId, 'DummyObjectCash');
          assert.equal(result.cash, credit + 20);
          done();    
      })
    })
  })

describe('when requesting debit on api by passing userId and cash', function () {

    var credit;

    it ('', function (done) {
      supertest(sails.express.app)
        .get('/coin/show?userId=DummyObjectCash')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          result = JSON.parse(res.text);    
          credit = result.cash;
          done();   
      })
    }),

    it ('should debit the cash given', function (done) {
      supertest(sails.express.app)
        .get('/coin/debit?userId=DummyObjectCash&cash=20')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          result = JSON.parse(res.text); 
          assert.equal(result.userId, 'DummyObjectCash');
          assert.equal(result.cash, credit - 20);
          done();   
      })
    }),

    it ('the cash should be up-to-date', function (done) {
      supertest(sails.express.app)
        .get('/coin/show?userId=DummyObjectCash')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          result = JSON.parse(res.text);         
          assert.equal(result.userId, 'DummyObjectCash');
          assert.equal(result.cash, credit - 20);
          done();    
      })
    })
  })

describe('when requesting destroy on api by passing userId', function () {

    var dummy1;
    var dummy2;

    it ('', function (done) {
      supertest(sails.express.app)
        .get('/coin')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          result = JSON.parse(res.text)[0];
          result2 = JSON.parse(res.text)[1];
          dummy1 = result.userId;
          dummy2 = result2.userId;
          console.info(dummy2);
          done();   
      })
    }),

    it ('should destroy the existing Coin> dummy1', function (done) {
      supertest(sails.express.app)
        .get('/coin/destroy?userId='+ dummy1)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          result = JSON.parse(res.text);         
          assert.equal(result.userId, 'DummyObject');
          done();   
      })
    }),

    it ('should destroy the existing Coin: dummy2', function (done) {
      supertest(sails.express.app)
        .get('/coin/destroy?userId='+ dummy2)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          result = JSON.parse(res.text);         
          assert.equal(result.userId, 'DummyObjectCash');
          done();   
      })
    }),

    it ('the destroyed instance should not be there anymore', function (done) {
      supertest(sails.express.app)
        .get('/coin/show?userId=DummyObject')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function(err, res) {
          assert.equal(res.status, 404);
          done();    
      })
    })
  })

after(function(done) {
  sails.lower(done);
});