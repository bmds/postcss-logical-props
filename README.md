# PostCSS Logical Props [![Build Status][ci-img]][ci]

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/bmds/postcss-logical-props.svg
[ci]:      https://travis-ci.org/bmds/postcss-logical-props
[spec]:    https://drafts.csswg.org/css-logical-props

[PostCSS] plugin Converts CSS Logical Property declarations to vanilla CSS in either ltr or rtl versions.
It is currently very simplistic in it's determination of how to apply the properties and only supports 1d transforms (left or right).

Should be expected to change as the related [spec] is still in Editors Draft status.

## Example transform

```css
.block1 {
    clear: inline-end;
    border-block-start: 2px solid blue;
    float: inline-start;
    padding-block-end: 20px;
}

.block2 {
    inline-start: 20px;
    position: absolute;
}
```

### LTR version
```css
.block1 {
    clear: right;
    border-left: 2px solid blue;
    float: left;
    padding-right: 20px;
}

.block2 {
    left: 20px;
    position: absolute;
}
```

### RTL version
```css
.block1 {
    clear: left;
    border-right: 2px solid blue;
    float: right;
    padding-left: 20px;
}

.block2 {
    right: 20px;
    position: absolute;
}
```

## Usage

```js
var logicalProps = require('postcss-logical-props');
postcss([ logicalProps({
    dir: 'rtl'
}) ])
```

### Options

* **dir**<br />
    *Type:* `String`<br />
    *Default:* `ltr`<br />
    *Available Values:* `ltr` || `rtl`<br />
    *Version:* 0.0.1 and above

    Determines if the stylesheet will be modified to sit in an ltr or rtl environment

* **replace**<br />
    *Type:* `Boolean`<br />
    *Default:* `true`<br />
    *Available Values:* `true` || `false`<br />
    *Version:* 0.0.2 and above

    If true declarations will be replaced by the converted version. If false a new declaration will be added above them

See [PostCSS] docs for examples for your environment.
