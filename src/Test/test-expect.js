const chai = require('chai');
const request = require('request');
const expect = chai.expect;

describe('Run test expect', ()=> {
    it('1) GET test', (done) => {
        let reqParams = {
            url: 'http://localhost:3000/test',
            method: 'GET'
        };

        request(reqParams, (error, response, body) => {
            if (error) {
                done(error);
            }
            expect(response.statusCode).to.be.equal(200);
            done();
        });

    });
    it('2) POST test', (done)=>{
        let reqParams = {
            url: 'http://localhost:3000/Authorization',
            method: 'POST',
            form: {
                UserEmail: "admin",
                password: "admin"
            }
        };

        request(reqParams, (error, response, body) => {
            if (error) {
                done(error);
            }
            expect(response.statusCode).to.be.equal(200);
            done();
        });
        done();
    });
});
