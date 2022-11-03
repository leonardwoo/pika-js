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

### `InvalidInfo(inputId='',inputEId='', regex='', message='')`

Add or remove a `p` tag with `inputEId` below the tag to display validation information.

like this:
```html
<div>
    <input type="text" id="{{inputId}}" />
</div>
<script>
  document.getElementById('inputId').onchange = (event) => {
    InvalidInfo('{{inputId}}','{{inputEId}}', '{{regex}}', '{{message}}');
    // when inputId is invalid with regex, add <p id="{{inputEId}}">{{message}}</p> under input.
  }
</script>
```

### `PassQCalc(pass='')`

Password Quality Calculator, if the value is greater than 80, it is a strong password.

Async like this:

```js
async function pqcalc(pass='') {
  return await PassQCalc(pass);
}

pqcalc('P422w0Rd').then((result) => {
    document.getElementById("rank").innerText = result;
});
```

## Sponsors

<a href="https://www.jetbrains.com/" target="_blank"><img src="https://seppiko.org/images/jetbrains.png" alt="JetBrians" width="100px"></a>
