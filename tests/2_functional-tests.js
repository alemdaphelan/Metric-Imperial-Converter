const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('GET /api/convert with no input',(done) =>{
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert')
            .end((err,res) =>{
                assert.equal(res.status,200);
                assert.equal(res.text,'invalid unit');
                done();
            });
    });

    test('GET /api/convert with full valid input',(done) =>{
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=2l')
            .end((err,res) =>{
                assert.equal(res.status,200);
                assert.strictEqual(res.body.initNum,2);
                assert.strictEqual(res.body.initUnit,'L')
                assert.strictEqual(res.body.returnUnit, 'gal');
                done();
            });
    });

    test('GET /api/convert with invalid number and unit',(done) =>{
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=2/2/2$')
            .end((err,res) => {
                assert.equal(res.status,200);
                assert.equal(res.text,'invalid number and unit');
                done();
            });
    })
    test('GET /api/convert with invalid number',(done) =>{
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=2/3/2L')
            .end((err,res) =>{
                assert.equal(res.status,200);
                assert.equal(res.text,'invalid number');
                done();
            })
    });
    test('GET /api/convert with invalid unit',(done) =>{
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=2$')
            .end((err,res) =>{
                assert.equal(res.status,200);
                assert.equal(res.text,'invalid unit');
                done();
            })
    });
});
