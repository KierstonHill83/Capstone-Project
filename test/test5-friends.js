process.env.NODE_ENV = 'test';

var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app.js');
var models = require('../server/models/index');

var should = chai.should();
chai.use(chaiHttp);

describe('friends routes', function() {

  beforeEach(function(done) {
    models.friends.sync({
      force: true
    }).then(function() {
      models.friends.create({
        status: 'Pending'
      }).then(function() {
        done();
      });
    });
  });

  afterEach(function(done) {
    models.friends.sync({
      force: true
    }).then(function() {
      done();
    });
  });

  it('should list ALL friends', function(done) {
    chai.request(server)
      .get('/api/friends')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.length(1);
        res.body.should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('status');
        res.body[0].status.should.equal('Pending');
        done();
      });
  });

  it('should list SINGLE friend', function(done) {
    chai.request(server)
      .get('/api/friend/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('status');
        res.body.status.should.equal('Pending');
        done();
      });
  });

  xit('should add a SINGLE friend', function(done) {
    chai.request(server)
      .post('/api/friends')
      .send({
        status: 'Friend'
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('Friend');
        done();
      });
  });

  it('should update SINGLE friend', function(done) {
    chai.request(server)
      .put('/api/friend/1')
      .send({'status': 'Enemy'})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('Enemy');
        done();
      });
  });

  it('should delete SINGLE friend', function(done) {
    chai.request(server)
      .delete('/api/friend/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        chai.request(server)
          .get('/api/friend/1')
          .end(function(error, response) {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.deep.equal({});
            done();
          });
      });
  });


});