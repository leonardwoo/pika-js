// Leonard Woo
"use strict";

class Pikajs {
  constructor() {}

  static _height(element) {
    if (element == null) {
      return -1;
    }
    var elementHeight = element.clientHeight;
    if (elementHeight == null || elementHeight < 0) {
      elementHeight = -1;
    }
    return elementHeight;
  }

  static getSelectorHeight(selector) {
    var s = document.querySelector(selector);
    var sh = this._height(s);
    return (sh < 0? 0: sh);
  }

  static hasSelectionHeight() {
    var e = document.getElementsByTagName("section")[0];
    var eh = this._height(e);
    return !(eh < 0);
  }

  static isPassword(pass = "") {
    // ASCII printable characters, letters, digits, punctuation marks, and a few miscellaneous symbols.
    // But without space.
    const regex = /^[\x21-\x7E]{8,20}$/g;
    return regex.test(pass);
  }

  static checkRepeat(text = "") {
    var count = 0;
    for (var i = 0; i < text.Length - 1; i++) {
      if (text[i] == text[i + 1]) {
        count++;
      }
    }
    return count;
  }

  static checkChar(text = "", regex = "") {
    if (text.search(regex) >= 0) {
      return text.match(regex).length;
    }
    return 0;
  }

  static isUpperChar(text = "") {
    const regex = /\p{Lu}+/gu;
    return regex.match(text).length > 0;
  }

  static isLowwerChar(text = "") {
    const regex = /\p{Ll}+/gu;
    return regex.match(text).length > 0;
  }

  static isDigit(text = "") {
    const regex = /\p{Nd}+/gu;
    return regex.match(text).length > 0;
  }

  static isPunctuation(text = "") {
    const regex = /\p{P}+/gu;
    return regex.match(text).length > 0;
  }

  static isWhiteSpace(text = "") {
    const regex = /\s+/gu;
    return regex.match(text).length > 0;
  }

  // window.btoa(""); // encode a string
  // window.atob(""); // decode the string

  static base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    return this.stringToArrayBuffer(binaryString);
  }

  static arrayBufferToBase64(arraybuffer) {
    var binary = this.arrayBufferToString(arraybuffer);
    return window.btoa(binary);
  }

  static stringToArrayBuffer(str) {
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      bytes[i] = str.charCodeAt(i);
    }
    return bytes.buffer;
  }

  static arrayBufferToString(arraybuffer) {
    return String.fromCharCode.apply(null, new Uint8Array(arraybuffer));
  }

  static isDarkMode() {
    var darkMode = undefined;
    if (window.matchMedia('(prefers-color-scheme)').matches) {
      darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return darkMode;
  }

}

function CalcMinMain() {
  let headerHeight = Pikajs.getSelectorHeight('header');
  let selectionHeight = Pikajs.hasSelectionHeight();
  let footerHeight = selectionHeight? 0: Pikajs.getSelectorHeight('footer');
  let main = document.querySelector('main');
  main.style.setProperty('min-height', 'calc(100vh - ' + (headerHeight + footerHeight) + 'px)');
}

function InvaildInfo(inputId='',inputEId='', regex='', message='') {
  var vaildInput = document.getElementById(inputId);
  var inputEi = document.getElementById(inputEId);
  if (!regex.test(vaildInput.value)) {
    if (inputEi == null) {
      var inputEi = document.createElement('p');
      inputEi.setAttribute('id', inputEId);
      inputEi.innerText = message;
      vaildInput.parentNode.appendChild(inputEi);
    } else {
      inputEi.innerText = message;
    }
  } else {
    if (inputEi != null) {
      vaildInput.parentNode.removeChild(inputEi);
    }
  }
}

function PassQCalc(pass='') {
  var rankScore = 0;

  rankScore += (pass.length > 8)? 4: 0;
  rankScore += (pass.length - Pikajs.checkChar(pass, /[a-z]/g)) * 2;
  rankScore += (pass.length - Pikajs.checkChar(pass, /[A-Z]/g)) * 3;
  rankScore += (pass.length - Pikajs.checkChar(pass, /[0-9]/g)) * 2;
  rankScore += Pikajs.checkChar(pass, /((?=["!\\\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])[^A-Za-z0-9])/g) * 6;

  rankScore -= Pikajs.checkChar(pass, /[A-Z]{3,}/g) * 2;
  rankScore -= Pikajs.checkChar(pass, /[a-z]{3,}/g) * 2;
  rankScore -= Pikajs.checkChar(pass, /[0-9]{3,}/g) * 2;
  rankScore -= Pikajs.checkChar(pass, /["!\\\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]{3,}/g) * 2;

  var rn = Pikajs.checkRepeat(pass);
  rankScore -= rn * (rn - 1);

  if (rankScore <= 0) {
    return 0;
  // } else if (rankScore > 100) {
  //   return 100;
  } else {
    return rankScore;
  }
}
