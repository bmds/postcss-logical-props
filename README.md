# PostCSS Logical Props [![Build Status][ci-img]][ci]

[PostCSS] plugin Converts CSS Logical Property declarations to vanilla CSS in either ltr or rtl versions.
It is currently very simplistic in it's determination of how to apply the properties and only supports 1d transforms (left or right).

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/bmds/postcss-logical-props.svg
[ci]:      https://travis-ci.org/bmds/postcss-logical-props

```css
.block1 {
    border-block-start: medium dashed blue;
}

.block2 {
	border-block-start-color: #fff;
}

.block3 {
	border-block-start-style: dashed;
}

.block4 {
	border-block-start-width: 2px;
}
```

```css
.block1 {
	border-right: medium dashed blue;
}

.block2 {
	border-right-color: #fff;
}

.block3 {
	border-right-style: dashed;
}

.block4 {
	border-right-width: 2px;
}
```

## Usage

```js
postcss([ require('postcss-logical-props') ])
```

### Options

* **dir**<br />
  *Type:* `String`<br />
  *Default:* `ltr`<br />
  *Available Values:* `ltr` || `rtl`<br />
  *Version:* 0.0.1 and above

  Determines if the stylesheet will be modified to sit in an ltr or rtl environment

### To add

* padding-*
* margin-*
* offset-* -> left | right

See [PostCSS] docs for examples for your environment.
