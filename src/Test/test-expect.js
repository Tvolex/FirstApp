const chai = require('chai');
const request = require('request');
const expect = chai.expect;
it('1) GET test', (done) => {
    const reqParams = {
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