'use strict';

var fs      = require('fs');
var postcss = require('postcss');
var expect  = require('chai').expect;
var plugin  = require('../');

function fixturePath(name) {
    return 'test/fixtures/' + name + '.css';
}

function getFixtureFile(filePath) {
    return fs.readFileSync(filePath, 'utf8').trim();
}

function fixtureBase(name) {
    return getFixtureFile(fixturePath(name));
}

function fixtureExpected(name, dir) {
    name += '.' + dir + '.expected';
    return getFixtureFile(fixturePath(name));
}

function test(input, output, opts, done) {
    postcss([ plugin(opts) ]).process(input).then(function (result) {
        expect(result.css).to.eql(output);
        expect(result.warnings()).to.be.empty;
        done();
    }).catch(function (error) {
        done(error);
    });
}

function runTest(fixtureName, mode, done) {
    test(fixtureBase(fixtureName), fixtureExpected(fixtureName, mode), {
        dir: mode
    }, done);
}

describe('postcss-logical-props', function () {

    it('Converts border-inline-end for ltr', function (done) {
        runTest('border-inline-end', 'ltr', done);
    });

    it('Converts border-inline-end for rtl', function (done) {
        runTest('border-inline-end', 'rtl', done);
    });

    it('Converts border-inline-end-color for ltr', function (done) {
        runTest('border-inline-end-color', 'ltr', done);
    });

    it('Converts border-inline-end-color for rtl', function (done) {
        runTest('border-inline-end-color', 'rtl', done);
    });

    it('Converts border-inline-end-style for ltr', function (done) {
        runTest('border-inline-end-style', 'ltr', done);
    });

    it('Converts border-inline-end-style for rtl', function (done) {
        runTest('border-inline-end-style', 'rtl', done);
    });

    it('Converts border-inline-end-width for ltr', function (done) {
        runTest('border-inline-end-width', 'ltr', done);
    });

    it('Converts border-inline-end-width for rtl', function (done) {
        runTest('border-inline-end-width', 'rtl', done);
    });

});

