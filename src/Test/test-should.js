let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Run test should', ()=> {
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

    });
    // describe('/Post test', () => {
    //     let reqParams = {
    //         url: 'http://localhost:3000',
    //         method: 'POST',
    //         data: {
    //             UserEmail: "admin",
    //             password: "admin"
    //         }
    //     };
    //     it('should login admin', (done)=> {
    //         chai.request(server)
    //             .post(reqParams.url + '/Authorization', reqParams.data)
    //             .end((err, res) => {
    //                 res.should.be.a('Object');
    //                 res.UserEmail.should.be.equal("admin");
    //                 done();
    //             });
    //     })
    // });
});
