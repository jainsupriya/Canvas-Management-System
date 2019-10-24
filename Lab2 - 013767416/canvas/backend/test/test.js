var assert = require('chai').assert;
var app = require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
//var pool = require('../ConnectionPooling.js');

var agent = require('chai').request.agent(app);

describe('CANVAS', function () {

    it('POST /Login', function () {
        this.timeout(50000);
        agent.post('/users/login')
        .send({
            email: 'supriyajain5230@gmail.com',
            password: 'Supriya@123'
        })
        .then(function (res) {
            expect(res).to.have.status(201);
        });
    });
    it('GET /Assignments', function () {
        this.timeout(50000);
        agent.get('/assignments/').query({id: "5cb23f989804d344eb04c008"})
        .then(function (res) {
            expect(res).to.have.status(200);
        });
    });

    it('GET /Announcements', function () {
        this.timeout(50000);
        agent.get('/announcement/').query({id: "5cb23f989804d344eb04c008"})
        .then(function (res) {
            expect(res).to.have.status(200);
        });
    });

    it('GET /People', function () {
        this.timeout(50000);
        agent.get('/users/people').query({id: "5cb23f989804d344eb04c008"})
        .then(function (res) {
            expect(res).to.have.status(200);
        });
    });
    it('GET /Files', function () {
        this.timeout(50000);
        agent.get('/file/').query({id: "5cb23f989804d344eb04c008"})
        .then(function (res) {
            expect(res).to.have.status(200);
        });
    });

});
