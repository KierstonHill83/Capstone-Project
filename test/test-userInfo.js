process.env.NODE_ENV = 'test';

var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app.js');
var models = require('../server/models/index');

var should = chai.should();
chai.use(chaiHttp);

describe('userInfo routes', function() {

  beforeEach(function(done) {
    models.userInfo.sync({
      force: true
    }).then(function() {
      models.userInfo.create({
        username: 'Kierston',
        password: 'test',
        name: 'Sally',
        email: 'sally@sally.com',
        age: 20,
        gender: 'female',
        location: 'boulder'
      }).then(function() {
        done();
      });
    });
  });

  afterEach(function(done) {
    models.userInfo.sync({
      force: true
    }).then(function() {
      done();
    });
  });

  it('should list ALL users', function(done) {
    chai.request(server)
      .get('/api/users')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.length(1);
        res.body.should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('username');
        res.body[0].should.have.property('password');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('email');
        res.body[0].should.have.property('age');
        res.body[0].should.have.property('gender');
        res.body[0].should.have.property('location');
        res.body[0].username.should.equal('Kierston');
        res.body[0].password.should.equal('test');
        res.body[0].name.should.equal('Sally');
        res.body[0].email.should.equal('sally@sally.com');
        res.body[0].age.should.equal(20);
        res.body[0].gender.should.equal('female');
        res.body[0].location.should.equal('boulder');
        done();
      });
  });

  it('should list SINGLE user', function(done) {
    chai.request(server)
      .get('/api/user/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('username');
        res.body.should.have.property('password');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        res.body.should.have.property('age');
        res.body.should.have.property('gender');
        res.body.should.have.property('location');
        res.body.username.should.equal('Kierston');
        res.body.password.should.equal('test');
        res.body.name.should.equal('Sally');
        res.body.email.should.equal('sally@sally.com');
        res.body.age.should.equal(20);
        res.body.gender.should.equal('female');
        res.body.location.should.equal('boulder');
        done();
      });
  });

  it('should add a SINGLE user', function(done) {
    chai.request(server)
      .post('/api/users')
      .send({
        username: 'Matt',
        password: 'fish',
        name: 'Matthew',
        email: 'matt@matt.com',
        age: 34,
        gender: 'male',
        location: 'miami'
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('username');
        res.body.should.have.property('password');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        res.body.should.have.property('age');
        res.body.should.have.property('gender');
        res.body.should.have.property('location');
        res.body.username.should.equal('Matt');
        res.body.password.should.equal('fish');
        res.body.name.should.equal('Matthew');
        res.body.email.should.equal('matt@matt.com');
        res.body.age.should.equal(34);
        res.body.gender.should.equal('male');
        res.body.location.should.equal('miami');
        done();
      });
  });

  it('should update SINGLE user', function(done) {
    chai.request(server)
      .put('/api/user/1')
      .send({'name': 'Heather'})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('username');
        res.body.should.have.property('password');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        res.body.should.have.property('age');
        res.body.should.have.property('gender');
        res.body.should.have.property('location');
        res.body.username.should.equal('Kierston');
        res.body.password.should.equal('test');
        res.body.name.should.equal('Heather');
        res.body.email.should.equal('sally@sally.com');
        res.body.age.should.equal(20);
        res.body.gender.should.equal('female');
        res.body.location.should.equal('boulder');
        done();
      });
  });

  it('should delete SINGLE user', function(done) {
    chai.request(server)
      .delete('/api/user/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        chai.request(server)
          .get('/api/user/1')
          .end(function(error, response) {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.deep.equal({});
            done();
          });
      });
  });


});