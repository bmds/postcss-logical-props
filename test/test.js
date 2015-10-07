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

function runVariant(property, mode, side, direction) {
    property = property.replace('{variant}', mode + '-' + side);

    it('Converts ' + property + ' for ' + direction, function (done) {
        runTest(property, direction, done);
    });
}

function runTestVariants(property) {

    runVariant(property, 'inline', 'start', 'ltr');
    runVariant(property, 'inline', 'end', 'ltr');

    runVariant(property, 'inline', 'start', 'rtl');
    runVariant(property, 'inline', 'end', 'rtl');
}

describe('postcss-logical-props', function () {

    runTestVariants('border-{variant}');
    runTestVariants('border-{variant}-color');
    runTestVariants('border-{variant}-style');
    runTestVariants('border-{variant}-width');

});

