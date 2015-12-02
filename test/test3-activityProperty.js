process.env.NODE_ENV = 'test';

var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app.js');
var models = require('../server/models/index');

var should = chai.should();
chai.use(chaiHttp);

describe('activityProperty routes', function() {

  beforeEach(function(done) {
    models.activityProperty.sync({
      force: true
    }).then(function() {
      models.activityProperty.create({
        propertyName: 'Distance',
        propertyValue: '5 miles',
      }).then(function() {
        done();
      });
    });
  });

  afterEach(function(done) {
    models.activityProperty.sync({
      force: true
    }).then(function() {
      done();
    });
  });

  it('should list ALL activityProperties', function(done) {
    chai.request(server)
      .get('/api/activityProperties')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.length(1);
        res.body.should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('propertyName');
        res.body[0].should.have.property('propertyValue');
        res.body[0].propertyName.should.equal('Distance');
        res.body[0].propertyValue.should.equal('5 miles');
        done();
      });
  });

  it('should list SINGLE activityProperty', function(done) {
    chai.request(server)
      .get('/api/activityProperty/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('propertyName');
        res.body.should.have.property('propertyValue');
        res.body.propertyName.should.equal('Distance');
        res.body.propertyValue.should.equal('5 miles');
        done();
      });
  });

  xit('should add a SINGLE activityProperty', function(done) {
    chai.request(server)
      .post('/api/activityProperties')
      .send({
        propertyName: 'Pace',
        propertyValue: '10 minutes',
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('propertyName');
        res.body.should.have.property('propertyValue');
        res.body.propertyName.should.equal('Pace');
        res.body.propertyValue.should.equal('10 minutes');
        done();
      });
  });

  it('should update SINGLE activityProperty', function(done) {
    chai.request(server)
      .put('/api/activityProperty/1')
      .send({
        'propertyName': 'Distance', 
        'propertyValue': '8 miles'
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('propertyName');
        res.body.should.have.property('propertyValue');
        res.body.propertyName.should.equal('Distance');
        res.body.propertyValue.should.equal('8 miles');
        done();
      });
  });

  it('should delete SINGLE activityProperty', function(done) {
    chai.request(server)
      .delete('/api/activityProperty/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        chai.request(server)
          .get('/api/activityProperty/1')
          .end(function(error, response) {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.deep.equal({});
            done();
          });
      });
  });


});