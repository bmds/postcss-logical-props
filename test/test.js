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

function runTest(fixtureName, options, done) {
    test(fixtureBase(fixtureName), fixtureExpected(fixtureName, options.dir), options, done);
}

function declareTest(property, direction) {
    it('Converts ' + property + ' for ' + direction, function (done) {
        runTest(property, {
            dir: direction
        }, done);
    });
}

function runVariant(property, mode, side, direction) {
    property = property.replace('{variant}', mode + '-' + side);
    declareTest(property, direction);
}

function runTestVariants(property) {

    runVariant(property, 'inline', 'start', 'ltr');
    runVariant(property, 'inline', 'end', 'ltr');
    runVariant(property, 'block', 'start', 'ltr');
    runVariant(property, 'block', 'end', 'ltr');

    runVariant(property, 'inline', 'start', 'rtl');
    runVariant(property, 'inline', 'end', 'rtl');
    runVariant(property, 'block', 'start', 'rtl');
    runVariant(property, 'block', 'end', 'rtl');
}

function runSimple(property) {
    declareTest(property, 'ltr');
    declareTest(property, 'rtl');
}

describe('postcss-logical-props', function () {

    runTestVariants('border-{variant}');
    runTestVariants('margin-{variant}');
    runTestVariants('offset-{variant}');

    runSimple('float');
    runSimple('clear');

    it('Adds declarations rather than replacing them', function (done) {
        runTest('add', {
            dir:     'ltr',
            replace: false
        }, done);
    });

});

