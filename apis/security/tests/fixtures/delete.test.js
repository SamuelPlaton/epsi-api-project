import request from 'supertest';
import {app} from '../../index.js';

describe('DELETE', function () {
    describe('/users', function () {
        it('bad credentials', function (done) {
            request(app).delete('/users/3').send({token: 'X'}).expect(403, done);
        });
        it('delete user', function (done) {
            request(app).delete('/users/3').send({token: '3'}).expect(204, done);
        });
        it('bad parameters', function (done) {
            request(app).delete('/users/3').send({}).expect(400, done);
        });
    });
})