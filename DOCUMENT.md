# Pika JS document

## Build

```shell
npm install
npm run compress
```

## `Pikajs` class

### `calcMinMain`

Calculate `min-height` and fill it in the style of the `main`, and ensure that main fills the entire page.

```js
window.addEventListener('load', (event) => {
    Pikajs.calcMinMain();
});
```

Result:

```html
<main style="min-height: calc(100vh - 26px)">
</main>
```

`26px` is `headerHeight + footerHeight`, if include `selection` tag, `footerHeight` is 0.

### `calcMinMainWithParent(parentNode)`

Calculate `min-height` and fill it in the style of the `main`, and ensure that main fills the entire page.

```js
window.addEventListener('load', (event) => {
    let app = document.getElementById('app');
    Pikajs.calcMinMainWithParent(app);
});
```

Result:

```html
<main style="min-height: calc(100vh - 26px)">
</main>
```

`26px` is `headerHeight + footerHeight`, if include `selection` tag, `footerHeight` is 0.

### `passQCalc(pass='')`

Password Quality Calculator, if the value is greater than 80, it is a strong password.

Async like this:

```js
async function pqcalc(pass='') {
  return await Pikajs.passQCalc(pass);
}

pqcalc('P422w0Rd').then((result) => {
    document.getElementById("rank").innerText = result;
});
```

### `getFirstSelectorHeight(selector)`

Get first selector height

### `getFirstSelectorHeightWithParent(parentNode,selector)`

Get first selector height under parent node

### `hasSelectorHeight(selector)`

Has first selector

### `hasSelectorHeightWithParent(parentNode, selector)`

Has first selector under parent node

### `injectStyleInHead(styleText="")`

Inject a css text in head tag

### `isPassword(pass="")`

Is password (only ASCII printable characters without space)

### `checkConsRepeats(text="")`

Check for consecutive repeated characters

### `checkConsRepeatsWithIgnoreCase(text="")`

Check for consecutive repeated characters with ignore case

### `checkChar(text="", regex="")`

Check character with regex

### `isUppercase(text="")`

Is uppercase letter character

### `isLowercase(text="")`

Is lowercase letter character

### `isDecimal(text="")`

Is integer or decimal character

### `isPunctuation(text="")`

Is punctuation character

### `isWhiteSpace(text="")`

Is white space character

### `base64ToArrayBuffer(base64)`

Decode Base64 to byte buffer

### `arrayBufferToBase64(arraybuffer)`

Encode byte buffer to Base64

### `base64Encode(data="")`

Base64 Encoder

### `base64Decode(data="")`

Base64 Decoder

### `stringToArrayBuffer(str)`

Convert string to byte buffer

### `arrayBufferToString(arraybuffer)`

Convert byte buffer to string

### `getDarkMode()`

Get browser dark mode status

Return undefined is unsupported, true is dark mode, false is light mode

### `splitContent(content = "", separator = "", splitTag = "")`

Split content

Convert like
`<span class="animEles">test</span>`
to
`<span class="animEles"><em>t</em><em>e</em><em>s</em><em>t</em></span>`

```javascript
const animaEles = document.body.querySelectorAll(".animEles");
animaEles.forEach((e) => {
    Pikajs.splitContent(e.innerHTML, "", "em")
        .then((event) => {
            e.innerHTML = event;
        })
        .catch((error) => {
            console.log(error);
        });
});
```

### `splitContentWithParity(content = "", separator = "", splitTag = "", oddClass = "", evenClass = "")`

Split content with parity

Convert like
`<span class="animEles">test</span>`
to
`<span class="anim-eles"><em class="even">t</em><em class="odd">e</em><em class="even">s</em><em class="odd">t</em></span>`

```javascript
const animaEles = document.body.querySelectorAll(".animEles");
animaEles.forEach((e) => {
    Pikajs.splitContentWithParity(e.innerHTML, "", "em", "odd", "even")
        .then((event) => {
            e.innerHTML = event;
        })
        .catch((error) => {
            console.log(error);
        });
});
```
