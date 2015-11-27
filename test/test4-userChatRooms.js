process.env.NODE_ENV = 'test';

var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app.js');
var models = require('../server/models/index');

var should = chai.should();
chai.use(chaiHttp);

describe('userChatRooms routes', function() {

  beforeEach(function(done) {
    models.userChatRooms.sync({
      force: true
    }).then(function() {
      models.userChatRooms.create({
        name: 'Kierston',
        conversation: 'Want to chat?',
      }).then(function() {
        done();
      });
    });
  });

  afterEach(function(done) {
    models.userChatRooms.sync({
      force: true
    }).then(function() {
      done();
    });
  });

  it('should list ALL chat rooms', function(done) {
    chai.request(server)
      .get('/api/userChatRooms')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.length(1);
        res.body.should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('conversation');
        res.body[0].name.should.equal('Kierston');
        res.body[0].conversation.should.equal('Want to chat?');
        done();
      });
  });

  it('should list SINGLE chat room', function(done) {
    chai.request(server)
      .get('/api/userChatRoom/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('name');
        res.body.should.have.property('conversation');
        res.body.name.should.equal('Kierston');
        res.body.conversation.should.equal('Want to chat?');
        done();
      });
  });

  it('should add a SINGLE chat room', function(done) {
    chai.request(server)
      .post('/api/userChatRooms')
      .send({
        name: 'Matt',
        conversation: 'Hello there!',
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('conversation');
        res.body.name.should.equal('Matt');
        res.body.conversation.should.equal('Hello there!');
        done();
      });
  });

  it('should update SINGLE chat room', function(done) {
    chai.request(server)
      .put('/api/userChatRoom/1')
      .send({'name': 'Heather'})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('conversation');
        res.body.name.should.equal('Heather');
        res.body.conversation.should.equal('Want to chat?');
        done();
      });
  });

  it('should delete SINGLE chat room', function(done) {
    chai.request(server)
      .delete('/api/userChatRoom/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        chai.request(server)
          .get('/api/userChatRoom/1')
          .end(function(error, response) {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.deep.equal({});
            done();
          });
      });
  });


});