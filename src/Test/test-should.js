let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('1) Test.', ()=> {
    // -- Get Test --
    describe('/Get test', ()=> {
        it('response 200 status code', (done)=> {
            chai.request(server)
                .get('/test')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('response should be a object', (done)=> {
            chai.request(server)
                .get('/test')
                .end((err, res) => {
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('response body should be equal true', (done)=> {
            chai.request(server)
                .get('/test')
                .end((err, res) => {
                    res.body.should.have.property('success');
                    res.body.success.should.be.equal(true);
                    done();
                });
        });
    });
});
