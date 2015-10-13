var postcss = require('postcss');

module.exports = postcss.plugin('postcss-logical-props', function (opts) {

    var _DIR_LTR = 'ltr';
    var _DIR_RTL = 'rtl';

    var _REGEX_BASE = {
        location: '(?:(inline)|(block))-(?:(end)|(start))',
        box:      '(?:(margin)|(border)|(padding))-',
        property: '(?:(float)|(clear))'
    };
    var _REGEX = {
        location: new RegExp(_REGEX_BASE.location, 'i'),
        boxModel: new RegExp(_REGEX_BASE.box + _REGEX_BASE.location, 'i'),
        position: new RegExp('offset-' + _REGEX_BASE.location, 'i'),
        property: new RegExp(_REGEX_BASE.property, 'i')
    };

    var PROPERTY_MAP = {};

    PROPERTY_MAP[_DIR_LTR] = {
        'block-start':  'left',
        'block-end':    'right',
        'inline-start': 'left',
        'inline-end':   'right'
    };

    PROPERTY_MAP[_DIR_RTL] = {
        'block-start':  'right',
        'block-end':    'left',
        'inline-start': 'right',
        'inline-end':   'left'
    };

    opts = opts || {
        dir: _DIR_LTR
    };

    function getPropertyReplacement(position) {
        return PROPERTY_MAP[opts.dir][position];
    }

    function getPartialReplacement(property) {
        var matches  = _REGEX.location.exec(property);
        var location = matches[0];

        return property.replace(
            _REGEX.location,
            getPropertyReplacement(location)
        );
    }

    function getFullReplacement(property) {
        var matches  = _REGEX.location.exec(property);
        var location = matches[0];

        return getPropertyReplacement(location);
    }

    function replaceDeclaration(decl, name) {
        decl.replaceWith(decl.clone({
            prop:  name,
            value: decl.value
        }));
    }

    function replaceValue(decl, value) {
        decl.replaceWith(decl.clone({
            prop:  decl.prop,
            value: value
        }));
    }

    function handleFullDeclaration(decl) {
        replaceDeclaration(decl, getFullReplacement(decl.prop));
    }

    function handlePartialDeclaration(decl) {
        replaceDeclaration(decl, getPartialReplacement(decl.prop));
    }

    function handleValue(decl) {
        replaceValue(decl, getFullReplacement(decl.value));
    }

    return function (css) {
        css.walkRules(function (rule) {
            rule.walkDecls(_REGEX.boxModel, handlePartialDeclaration);
            rule.walkDecls(_REGEX.position, handleFullDeclaration);
            rule.walkDecls(_REGEX.property, handleValue);
        });
    };
});
