var postcss = require('postcss');

module.exports = postcss.plugin('postcss-logical-props', function (opts) {

    var _DIR_LTR = 'ltr';
    var _DIR_RTL = 'rtl';

    var _REGEX_BASE = {
        location: '(?:(inline)|(block))-(?:(end)|(start))',
        box:      '(?:(margin)|(border)|(padding))-'
    };
    var _REGEX = {
        location: new RegExp(_REGEX_BASE.location, 'i'),
        boxModel: new RegExp(_REGEX_BASE.box + _REGEX_BASE.location, 'i'),
        position: new RegExp('offset-' + _REGEX_BASE.location, 'i')
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

    function getUpdatedPartialPropertyName(property) {
        var matches  = _REGEX.location.exec(property);
        var location = matches[0];

        return property.replace(
            _REGEX.location,
            getPropertyReplacement(location)
        );
    }

    function getUpdatedFullPropertyName(property) {
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

    function handleFullDeclaration(decl) {
        replaceDeclaration(decl, getUpdatedFullPropertyName(decl.prop));
    }

    function handlePartialDeclaration(decl) {
        replaceDeclaration(decl, getUpdatedPartialPropertyName(decl.prop));
    }

    return function (css) {
        css.walkRules(function (rule) {
            rule.walkDecls(_REGEX.boxModel, handlePartialDeclaration);
            rule.walkDecls(_REGEX.position, handleFullDeclaration);
        });
    };
});
