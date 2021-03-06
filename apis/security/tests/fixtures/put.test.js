import request from 'supertest';
import {app} from '../../index.js';
import * as assert from "assert";

describe('PUT', function () {
    describe('/users/{id}', function () {
        it('modify user', function (done) {
            request(app)
                .put('/users/1')
                .send({
                    data: {
                        firstName: 'Jon',
                        lastName: 'Doe',
                        email: 'john.doe2@supertest.com',
                        token: '1'

                    }
            })
                .expect(200, {id: '1',
                firstname: 'Jon',
                lastname: 'Doe',
                email: 'john.doe2@supertest.com',
                token: '1'},done)


        });
        it('modify user', function (done) {
            request(app)
                .put('/users/1')
                .send({
                    data: {
                        firstName: 'Jon',
                        lastName: 'Doe',
                        email: 'john.doe2@supertest.com',
                        token: '8'

                    }
                })
                .expect(403,done)
        });
    });
    describe('/users/password/:id', function () {
        it('wrong token', function (done) {
            request(app)
                .put('/users/password/2')
                .send({
                    data: {
                        previousPassword: "12345",
                        newPassword: "1234586",
                        token: "U2FsdGVkX1TnCFvbVjCqQM="
                    }
                })
                .expect(403,done)
        });
    })
})
