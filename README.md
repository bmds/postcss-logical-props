# PostCSS Logical Props [![Build Status][ci-img]][ci]

[PostCSS] plugin Converts CSS Logical Property declarations to vanilla CSS in either ltr or rtl.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/bmds/postcss-logical-props.svg
[ci]:      https://travis-ci.org/bmds/postcss-logical-props

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-logical-props') ])
```

See [PostCSS] docs for examples for your environment.
