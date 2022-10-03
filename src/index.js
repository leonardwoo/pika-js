// Leonard Woo
"use strict";

class Pikajs {

  constructor() {
  }

  static getSelectorHeight(selector) {
    var s = document.querySelector(selector);
    if (s == null) {
      return 0;
    }
    var sh = s.clientHeight;
    if (sh == null || sh < 0) {
      sh = 0;
    }
    return sh;
  }
  
  static hasSelection() {
    var e = document.getElementsByTagName('section')[0]
    if (e == null) {
      return false;
    }
    var h = e.clientHeight;
    if (h == null || h < 0) {
      return false;
    }
    return true;
  }

  static isPassword(pass='') {
    // ASCII all character without control and space
    const regex = /^[\x21-\x7E]{8,20}$/g;
    return regex.test(pass);
  }

  static checkRepeat(text='') {
    var count = 0;
    for (var i =  0; i < text.Length - 1; i++) {
      if (text[i] == text[i + 1]) {
        count++;
      }
    }
    return count;
  }

  static checkChar(text='', regex='') {
    if (text.search(regex) >= 0) {
      return text.match(regex).length;
    }
    return 0;
  }

  static isUpperChar(text='') {
    const regex = /\p{Lu}+/gu;
    return regex.match(text).length > 0;
  }

  static isLowwerChar(text='') {
    const regex = /\p{Ll}+/gu;
    return regex.match(text).length > 0;
  }

  static isDigit(text='') {
    const regex = /\p{Nd}+/gu;
    return regex.match(text).length > 0;
  }

  static isPunctuation(text='') {
    const regex = /\p{P}+/gu;
    return regex.match(text).length > 0;
  }

  static isWhiteSpace(text='') {
    const regex = /\s+/gu;
    return regex.match(text).length > 0;
  }

}

function CalcMinMain() {
  let headerHeight = Pikajs.getSelectorHeight('header');
  let selectionHeight = Pikajs.hasSelection();
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
