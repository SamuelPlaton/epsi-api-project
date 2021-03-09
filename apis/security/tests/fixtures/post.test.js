import request from 'supertest';
import {app} from '../../index.js';

describe('POST', function () {
    describe('/users', function () {
        it('create user', function (done) {
            request(app).post('/users').send({
                data: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@supertest.com',
                    password: 'password'
                }
            }).expect(201, done);
        });
        it('bad parameters', function (done) {
            request(app).post('/users').send({data: {}}).expect(400, done);
        });
        it('email already exist', function (done) {
            request(app).post('/users').send({
                data: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe2@supertest.com',
                    password: 'password'
                }
            }).expect(403, done);
        });
    });
    describe('/users/login', function (){
        it('login user', function (done) {
            request(app).post('/users/login').send({
                data: {
                    email: 'john.doe3@supertest.com',
                    password: '12345'
                }
            }).expect(200, done);
        });
        it('bad parameters', function (done) {
            request(app).post('/users/login').send({
                data: {
                    email: 'john.doe3@supertest.com',
                }
            }).expect(400, done);
        });
        it('wrong email', function (done, response) {
            request(app).post('/users/login').send({
                data: {
                    email: 'wrong.email@supertest.com',
                    password: '12345'
                }
            }).expect('-2', done);
        });
        it('wrong password', function (done, response) {
            request(app).post('/users/login').send({
                data: {
                    email: 'john.doe3@supertest.com',
                    password: '123'
                }
            }).expect('-3', done);
        });
    })
    describe('/users', function () {
        it('should not create user', function (done) {
            request(app).post('/users').send({
                data: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@supertest.com',
                    password: 'password'
                }
            }).expect(403, done);
        });
    })
})
