var postcss = require('postcss');
var merge   = require('merge');

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

    opts = merge({
        dir:     _DIR_LTR,
        replace: true
    }, opts);

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
            prop: name
        }));
    }

    function replaceValue(decl, val) {
        decl.replaceWith(decl.clone({
            value: val
        }));
    }

    function addDeclaration(decl, name) {
        decl.cloneBefore({
            prop: name
        });
    }

    function addValue(decl, val) {
        decl.cloneBefore({
            value: val
        });
    }

    function handleDeclarationChange(decl, name) {
        if(opts.replace) {
            replaceDeclaration(decl, name);
        } else {
            addDeclaration(decl, name);
        }
    }

    function handleFullDeclaration(decl) {
        handleDeclarationChange(decl, getFullReplacement(decl.prop));
    }

    function handlePartialDeclaration(decl) {
        handleDeclarationChange(decl, getPartialReplacement(decl.prop));
    }

    function handleValue(decl) {
        var value = getFullReplacement(decl.value);
        if(opts.replace) {
            replaceValue(decl, value);
        } else {
            addValue(decl, value);
        }
    }

    return function (css) {
        css.walkRules(function (rule) {
            rule.walkDecls(_REGEX.boxModel, handlePartialDeclaration);
            rule.walkDecls(_REGEX.position, handleFullDeclaration);
            rule.walkDecls(_REGEX.property, handleValue);
        });
    };
});
