# Pika JS
![GitHub](https://img.shields.io/github/license/leonardwoo/pika-js?style=flat-square)
![npm (tag)](https://img.shields.io/npm/v/@leonardwoo/pika-js/latest?style=flat-square)

## Introduction

A function toolkit

## CDN

[jsDelivr](https://www.jsdelivr.com/package/npm/@leonardwoo/pika-js)

## Browser Use

`<script src="https://cdn.jsdelivr.net/npm/@leonardwoo/pika-js@latest/dist/pika.min.js" defer></script>`

## Document

### `CalcMinMain`

Calculate `min-height` and fill it in the style of the `main`, and ensure that main fills the entire page.

```js
window.addEventListener('load', (event) => {
    CalcMinMain();
});
```

### `InvaildInfo(inputId='',inputEId='', regex='', message='')`

Add or remove a `p` tag with `inputEId` below the tag to display validation information.

like this:
```html
<div>
    <input type="text" id="{{inputId}}" />
    <p id="{{inputEId}}">{{message}}</P>
</div>
```

<!-- ## Sponsors -->
