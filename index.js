var postcss = require('postcss');

module.exports = postcss.plugin('postcss-logical-props', function (opts) {

    var DIR_LTR = 'ltr';
    // var DIR_RTL = 'rtl';
    var PROP_INLINE_END = /inline-end/g;

    opts = opts || {
        dir: DIR_LTR
    };

    function getEndSideForDir(dir) {
        return dir === DIR_LTR ? 'right' : 'left';
    }

    return function (css) {
        css.walkRules(function (rule) {
            rule.walkDecls(PROP_INLINE_END, function (decl) {
                rule.insertAfter(decl, {
                    prop: decl.prop.replace(
                        PROP_INLINE_END,
                        getEndSideForDir(opts.dir)),
                    value: decl.value
                });
            });
        });
    };
});
