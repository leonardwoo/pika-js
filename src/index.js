// Leonard Woo
"use strict";

function getEleHeight(ele) {
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

function isSelection() {
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

function CalcMinMain() {
  let headerHeight = getEleHeight('header');
  let selectionHeight = isSelection();
  let footerHeight = selectionHeight? 0: getEleHeight('footer');
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
