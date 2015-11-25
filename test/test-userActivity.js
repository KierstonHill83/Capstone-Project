process.env.NODE_ENV = 'test';

var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app.js');
var models = require('../server/models/index');

var should = chai.should();
chai.use(chaiHttp);

describe('userActivity routes', function() {

  beforeEach(function(done) {
    models.userActivity.sync({
      force: true
    }).then(function() {
      models.userActivity.create({
        userActivity: 'running'
      }).then(function() {
        done();
      });
    });
  });

  afterEach(function(done) {
    models.userActivity.sync({
      force: true
    }).then(function() {
      done();
    });
  });

  it('should list ALL userActivities', function(done) {
    chai.request(server)
      .get('/api/userActivities')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.length(1);
        res.body.should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('userActivity');
        res.body[0].userActivity.should.equal('running');
        done();
      });
  });

  it('should list SINGLE userActivity', function(done) {
    chai.request(server)
      .get('/api/userActivity/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('userActivity');
        res.body.userActivity.should.equal('running');
        done();
      });
  });

  it('should add a SINGLE userActivities', function(done) {
    chai.request(server)
      .post('/api/userActivities')
      .send({
        userActivity: 'biking'
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('userActivity');
        res.body.userActivity.should.equal('biking');
        done();
      });
  });

  it('should update SINGLE userActivity', function(done) {
    chai.request(server)
      .put('/api/userActivity/1')
      .send({'userActivity': 'swimming'})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('userActivity');
        res.body.userActivity.should.equal('swimming');
        done();
      });
  });

  it('should delete SINGLE userActivity', function(done) {
    chai.request(server)
      .delete('/api/userActivity/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        chai.request(server)
          .get('/api/userActivity/1')
          .end(function(error, response) {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.deep.equal({});
            done();
          });
      });
  });


});