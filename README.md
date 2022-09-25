# Pika JS
![GitHub](https://img.shields.io/github/license/seppiko/pika-js?style=flat-square)

A function toolkit

## Document

### `CalcMinMain`

Calculate `min-height` and fill it in the style of the `main`, and ensure that main fills the entire page.

```js
window.addEventListener('load', (event) => {
    CalcMinMain();
});
```

### `InvaildInfo(inputId='',inputEId='', regex='', message='')`

Add or remove a `p` tag below the tag to display validation information.
