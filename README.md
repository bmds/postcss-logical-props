# PostCSS Logical Props [![Build Status][ci-img]][ci]

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/bmds/postcss-logical-props.svg
[ci]:      https://travis-ci.org/bmds/postcss-logical-props
[spec]:    https://drafts.csswg.org/css-logical-props

[PostCSS] plugin Converts CSS Logical Property declarations to vanilla CSS in either ltr or rtl versions.
It is currently very simplistic in it's determination of how to apply the properties and only supports 1d transforms (left or right).

Should be expected to change as the related [spec] is still in Editors Draft status.

Currently treats `inline-*` and `block-*` identically.

## Example transform

```css
.block1 {
    clear: inline-end;
    border-block-start: 2px solid blue;
    float: inline-start;
    padding-block-end: 20px;
}

.block2 {
    offset-block-start: 20px;
    position: absolute;
}
```

#### LTR version
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

#### RTL version
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

### Supported declarations

* **Border**<br />
    *modes* `block-start` || `block-end` || `inline-start` || `inline-end`<br />
    *example* `border-block-start: 1px solid #ddd;`<br />
    *ltr:* `border-left: 1px solid #ddd;`<br />
    *rtl:* `border-right: 1px solid #ddd;`<br />
    *specification:* [3.3. Logical Padding and Border](https://drafts.csswg.org/css-logical-props/#border-padding)

* **Clear**<br />
    *modes* `block-start` || `block-end` || `inline-start` || `inline-end`<br />
    *example* `clear: inline-start;`<br />
    *ltr:* `clear: left`<br />
    *rtl:* `clear: right`<br />
    *specification:* [1.2. Logical Values for the float and clear Properties](https://drafts.csswg.org/css-logical-props/#float-clear)

* **Float**<br />
    *modes* `block-start` || `block-end` || `inline-start` || `inline-end`<br />
    *example* `float: inline-start;`<br />
    *ltr:* `float: left`<br />
    *rtl:* `float: right`<br />
    *specification:* [1.2. Logical Values for the float and clear Properties](https://drafts.csswg.org/css-logical-props/#float-clear)

* **Margin**<br />
    *modes* `block-start` || `block-end` || `inline-start` || `inline-end`<br />
    *example* `margin-block-end: 2rem;`<br />
    *ltr:* `margin-right: 2rem;`<br />
    *rtl:* `margin-left: 2rem;`<br />
    *specification:* [3.2. Logical Margins and Offsets](https://drafts.csswg.org/css-logical-props/#text-align)

* **Offset**<br />
    *modes* `block-start` || `block-end` || `inline-start` || `inline-end`<br />
    *example* `offset-block-start: 100%;`<br />
    *ltr:* `left: 100%;`<br />
    *rtl:* `right: 100%;`<br />
    *specification:* [3.2. Logical Margins and Offsets](https://drafts.csswg.org/css-logical-props/#text-align)

* **Padding**<br />
    *modes* `block-start` || `block-end` || `inline-start` || `inline-end`<br />
    *example* `padding-block-end: 0;`<br />
    *ltr:* `padding-right: 0;`<br />
    *rtl:* `padding-left: 0;`<br />
    *specification:* [3.3. Logical Padding and Border](https://drafts.csswg.org/css-logical-props/#border-padding)

* **Text align**<br />
    *modes* `start` || `end`<br />
    *example* `text-align: start;`<br />
    *ltr:* `text-align: left;`<br />
    *rtl:* `text-align: right;`<br />
    *specification:* [1.3. Logical Values for the text-align Property](https://drafts.csswg.org/css-logical-props/#text-align)

See [PostCSS] docs for examples for your environment.
