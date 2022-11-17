# Pika JS document

## `PikaJS`

### `getSelectorHeight(selector='')`

Get element selector height

### `hasSelectionHeight()`

Has section tag

### `isPassword(pass="")`

Is password (only ASCII printable characters without space)

### `checkRepeat(text="")`

Check repeat character

### `checkChar(text="", regex="")`

Check character with regex

### `isUpperChar(text="")`

Is uppercase letter character

### `isLowerChar(text="")`

Is lowercase letter character

### `isDigit(text="")`

Is digit character

### `isPunctuation(text="")`

Is punctuation character

### `isWhiteSpace(text="")`

Is white space character

### `base64ToArrayBuffer(base64)`

Decode Base64 to byte buffer

### `arrayBufferToBase64(arraybuffer)`

Encode byte buffer to Base64

### `stringToArrayBuffer(str)`

Convert string to byte buffer

### `arrayBufferToString(arraybuffer)`

Convert byte buffer to string

### `getDarkMode()`

Get browser dark mode

Return undefined is unsupported, true is dark mode, false is light mode

### `splitAnimationElement(animEleText="")`

Split animation element text

Convert like
`<span class="animEles">test</span>`
to
`<span class="animEles"><span><em>t</em><em>e</em><em>s</em><em>t</em></span></span>`

```javascript
const animaEles = document.body.querySelectorAll(".animEles");
animaEles.forEach((e) => {
    Pikajs.splitAnimationElement(e.innerHTML)
        .then(function (event) {
            e.innerHTML = event;
        })
        .catch(function (error) {
            console.log(error);
        });
});
```

## `CalcMinMain`

Calculate `min-height` and fill it in the style of the `main`, and ensure that main fills the entire page.

```js
window.addEventListener('load', (event) => {
    CalcMinMain();
});
```

## `InvalidInfo(inputId='',inputEId='', regex='', message='')`

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

## `PassQCalc(pass='')`

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
