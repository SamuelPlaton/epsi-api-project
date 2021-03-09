import request from 'supertest';
import {app} from '../../index.js';

describe('POST', function () {
    describe('/users', function () {
        it('should create user', function (done) {
            request(app).post('/users').send({
                data: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@mail.com',
                    password: 'password'
                }
            }).expect(201, done);
        });
        it('should not create user', function (done) {
            request(app).post('/users').send({data: {}}).expect(400, done);
        })
    })
})