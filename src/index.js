// Leonard Woo
"use strict";

class Pikajs {

  constructor() {
  }

  static getEleHeight(ele) {
    var e = document.querySelector(ele);
    if (e == null) {
      return 0;
    }
    var h = e.clientHeight;
    if (h == null || h < 0) {
      h = 0;
    }
    return h;
  }
  
  static isSelection() {
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
}

function CalcMinMain() {
  let headerHeight = Pikajs.getEleHeight('header');
  let selectionHeight = Pikajs.isSelection();
  let footerHeight = selectionHeight? 0: Pikajs.getEleHeight('footer');
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
