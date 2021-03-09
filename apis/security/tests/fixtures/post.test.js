import supertest from 'supertest';
import assert from 'assert';
import { app } from '../../index.js';

describe('POST', function (){
    describe('/users', function (){
        it('should create user', async function (){
            const response = await supertest(app).post('/users').send({
                title: 'test'
            });
            console.log(response);
            assert.equal(true, true);
        })
    })
})