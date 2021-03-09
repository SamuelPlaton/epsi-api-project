import sails from 'sails';
import {sqlInstance} from "../index.js";
import cryptoJS from "crypto-js";

// Before running any tests...
before(function (done) {

    // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
    this.timeout(5000);

    sails.lift({
        // Your Sails app's configuration files will be loaded automatically,
        // but you can also specify any other special overrides here for testing purposes.

        // For example, we might want to skip the Grunt hook,
        // and disable all logs except errors and warnings:
        hooks: {grunt: false},
        log: {level: 'warn'},

    }, function (err) {
        if (err) {
            return done(err);
        }

        // Load our fixtures
        sqlInstance.request('INSERT INTO USERS(ID, FIRSTNAME, LASTNAME, EMAIL, TOKEN) VALUES(?, ?, ?, ?, ?)',
            ['1', 'John', 'Doe', 'john.doe2@supertest.com', '1']);
        const token = cryptoJS.AES.encrypt('12345', '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString(); // U2FsdGVkX1+ODxnFHJw5uwmkxt7V/5cTnCFvbVjCqQM=
        sqlInstance.request('INSERT INTO USERS(ID, FIRSTNAME, LASTNAME, EMAIL, TOKEN) VALUES(?, ?, ?, ?, ?)',
            ['2', 'John', 'Doe', 'john.doe3@supertest.com', token]);
        sqlInstance.request('INSERT INTO USERS(ID, FIRSTNAME, LASTNAME, EMAIL, TOKEN) VALUES(?, ?, ?, ?, ?)',
            ['3', 'John', 'Doe', 'john.doe4@supertest.com', '3']);

        return done();
    });
});

// After all tests have finished...
after(function (done) {
    // Clean our fixtures
    sqlInstance.request('DELETE FROM USERS WHERE EMAIL = "john.doe@supertest.com"').then(done);
    sqlInstance.request('DELETE FROM USERS WHERE EMAIL = "john.doe2@supertest.com"').then(done);
    sqlInstance.request('DELETE FROM USERS WHERE EMAIL = "john.doe3@supertest.com"').then(done);
    sails.lower(done);

});
