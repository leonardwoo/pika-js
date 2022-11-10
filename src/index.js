/*
 * Copyright 2022 Leonard Woo.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

"use strict";

/**
 * Automatic calculator main tag min-height on screen
 *
 * @constructor
 */
function CalcMinMain() {
  let headerHeight = Pikajs.getSelectorHeight('header');
  let selectionHeight = Pikajs.hasSelectionHeight();
  let footerHeight = selectionHeight? 0: Pikajs.getSelectorHeight('footer');
  let main = document.querySelector('main');
  main.style.setProperty('min-height', 'calc(100vh - ' + (headerHeight + footerHeight) + 'px)');
}

/**
 * Add message under the input tag with regex
 *
 * @param inputId input tag id
 * @param inputEId input error message id with p tag
 * @param regex regex
 * @param message message
 * @constructor
 */
function InvalidInfo(inputId='',inputEId='', regex='', message='') {
  const validInput = document.getElementById(inputId);
  let inputEi = document.getElementById(inputEId);
  if (!regex.test(validInput.value)) {
    if (inputEi == null) {
      inputEi = document.createElement('p');
      inputEi.setAttribute('id', inputEId);
      inputEi.innerText = message;
      validInput.parentNode.appendChild(inputEi);
    } else {
      inputEi.innerText = message;
    }
  } else {
    if (inputEi != null) {
      validInput.parentNode.removeChild(inputEi);
    }
  }
}

/**
 * Calculator password quality
 *
 * @param pass password text
 * @returns {number} quality score
 * @constructor
 */
function PassQCalc(pass='') {
  let rankScore = 0;

  rankScore += (pass.length > 8)? 4: 0;
  rankScore += (pass.length - Pikajs.checkChar(pass, /[a-z]/g)) * 2;
  rankScore += (pass.length - Pikajs.checkChar(pass, /[A-Z]/g)) * 3;
  rankScore += (pass.length - Pikajs.checkChar(pass, /[0-9]/g)) * 2;
  rankScore += Pikajs.checkChar(pass, /((?=["!\\\"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~"])[^A-Za-z0-9])/g) * 6;

  rankScore -= Pikajs.checkChar(pass, /[A-Z]{3,}/g) * 2;
  rankScore -= Pikajs.checkChar(pass, /[a-z]{3,}/g) * 2;
  rankScore -= Pikajs.checkChar(pass, /[0-9]{3,}/g) * 2;
  rankScore -= Pikajs.checkChar(pass, /["!\\\"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~"]{3,}/g) * 2;

  const rn = Pikajs.checkRepeat(pass);
  rankScore -= rn * (rn - 1);

  if (rankScore <= 0) {
    return 0;
  // } else if (rankScore > 100) {
  //   return 100;
  } else {
    return rankScore;
  }
}
