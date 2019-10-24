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
        agent.post('/login')
        .send({
            email: 'supriyajain5230@gmail.com',
            password: 'sup123'
        })
        .then(function (res) {
            expect(res).to.have.status(201);
        });
    });
    it('GET /Assignments', function () {
        this.timeout(50000);
        agent.get('/assignments').query({courseid: 6})
        .then(function (res) {
            expect(res).to.have.status(200);
        });
    });
    it('POST /Assignments Grade', function () {
        this.timeout(50000);
        agent.post('/submitMarks')
        .send({
            courseid: 6,
            studentid: 17,
            assignmentid:28,
            points:9
        })
        .then(function (res) {
            expect(res).to.have.status(200);
        });
    });
    it('DELETE /Delete Announcement', function () {
        this.timeout(50000);
        agent.post('/deleteAnnouncement')
        .send({
            announcementid:2
        })
        .then(function (res) {
            assert.equal(res.status, 200);

        });
    });
    it('GET /Files', (done) => {
        agent.get('/files').query({courseid: 6})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
  });
});
