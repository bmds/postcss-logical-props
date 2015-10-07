var postcss = require('postcss');

module.exports = postcss.plugin('postcss-logical-props', function (opts) {

    var DIR_LTR = 'ltr';
    var DIR_RTL = 'rtl';
    var PROP_REGEX = /(?:(inline)|(block))-(?:(end)|(start))/i;

    var PROPERTY_MAP = {};

    PROPERTY_MAP[DIR_LTR] = {
        'block-start':  'left',
        'block-end':    'right',
        'inline-start': 'left',
        'inline-end':   'right'
    };

    PROPERTY_MAP[DIR_RTL] = {
        'block-start':  'right',
        'block-end':    'left',
        'inline-start': 'right',
        'inline-end':   'left'
    };

    opts = opts || {
        dir: DIR_LTR
    };

    function getPropertyReplacement(position) {
        return PROPERTY_MAP[opts.dir][position];
    }

    function getUpdatedPropertyName(property) {
        var matches  = PROP_REGEX.exec(property);
        var location = matches[0];

        return property.replace(
            PROP_REGEX,
            getPropertyReplacement(location)
        );
    }

    function handleDeclaration(decl) {
        decl.replaceWith(decl.clone({
            prop:  getUpdatedPropertyName(decl.prop),
            value: decl.value
        }));
    }

    return function (css) {
        css.walkRules(function (rule) {
            rule.walkDecls(PROP_REGEX, handleDeclaration);
        });
    };
});
