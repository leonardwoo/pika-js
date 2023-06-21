/*! Pika-js | MIT License | https://github.com/leonardwoo/pika-js */
"use strict";

/**
 * Pikajs class
 *
 * @author Leonard Woo
 */
class Pikajs {
  constructor() {}

  // get element height, if element is null return -1
  static _height(element) {
    if (element == null) {
      return -1;
    }
    let elementHeight = element.clientHeight;
    if (elementHeight == null || elementHeight < 0) {
      elementHeight = -1;
    }
    return elementHeight;
  }

  /**
   * Automatic calculator main tag min-height on screen
   */
  static calcMinMain() {
    calcMinMain(document);
  }

  /**
   * Automatic calculator main tag min-height on screen under parent node
   *
   * @param parentNode parent node
   */
  static calcMinMain(parentNode) {
    let headerHeight = getSelectorHeight(parentNode, 'header');
    let selectionHeight = hasSelectionHeight(parentNode);
    let footerHeight = selectionHeight ? 0 : getSelectorHeight(parentNode, 'footer');
    let main = parentNode.querySelector('main');
    main.style.setProperty('min-height', 'calc(100vh - ' + (headerHeight + footerHeight) + 'px)');
  }

  /**
   * Add message under the input tag with regex
   *
   * @param {string} [inputId=''] input tag id
   * @param {string} [inputEId=''] input error message id with p tag
   * @param {string} [regex=''] regex
   * @param {string} [message=''] message
   */
  static invalidInfo(inputId = '', inputEId = '', regex = '', message = '') {
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
   * @param {string} [pass=''] password text
   * @returns {number} quality score
   */
  static passQCalc(pass = '') {
    let rankScore = 0;

    rankScore += (pass.length > 8) ? 4 : 0;
    rankScore += (pass.length - checkChar(pass, /[a-z]/g)) * 2;
    rankScore += (pass.length - checkChar(pass, /[A-Z]/g)) * 3;
    rankScore += (pass.length - checkChar(pass, /[0-9]/g)) * 2;
    rankScore += checkChar(pass, /((?=["!\\\"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~"])[^A-Za-z0-9])/g) * 6;

    rankScore -= checkChar(pass, /[A-Z]{3,}/g) * 2;
    rankScore -= checkChar(pass, /[a-z]{3,}/g) * 2;
    rankScore -= checkChar(pass, /[0-9]{3,}/g) * 2;
    rankScore -= checkChar(pass, /["!\\\"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~"]{3,}/g) * 2;

    const rn = checkRepeat(pass);
    rankScore -= rn * (rn - 1);

    return rankScore <= 0? 0: rankScore;
  }

  /**
   * Get element selector height
   *
   * @param selector element selector
   * @returns {number} height
   */
  static getSelectorHeight(selector) {
    return getSelectorHeight(document, selector);
  }

  /**
   * Get element selector height under parent node
   *
   * @param parentNode parent node
   * @param selector element selector
   * @returns {number} height, if selector height less then 0 return 0
   */
  static getSelectorHeight(parentNode, selector) {
    const s = parentNode.querySelector(selector);
    const sh = this._height(s);
    return (sh < 0 ? 0 : sh);
  }

  /**
   * Has section tag
   *
   * @returns {boolean} true if find last section tag
   */
  static hasSelectionHeight() {
    return this.hasSelectionHeight(document)
  }

  /**
   * Has section tag under parent node
   *
   * @param parentNode parent node
   * @returns {boolean} true if find last section tag
   */
  static hasSelectionHeight(parentNode) {
    const e = parentNode.getElementsByTagName("section")[0];
    const eh = this._height(e);
    return !(eh < 0);
  }

  /**
   * Has article tag
   *
   * @returns {boolean} true if find last article tag
   */
  static hasArticleHeight() {
    return this.hasArticleHeight(document)
  }

  /**
   * Has article tag under parent node
   *
   * @param parentNode parent node
   * @returns {boolean} true if find last article tag
   */
  static hasArticleHeight(parentNode) {
    const e = parentNode.getElementsByTagName("article")[0];
    const eh = this._height(e);
    return !(eh < 0);
  }

  /**
   * Is password (only ASCII printable characters without space)
   *
   * @param {string} [pass=""] password text, length is bewteen 8 to 20
   * @returns {boolean} true if text is password
   */
  static isPassword(pass = "") {
    // ASCII printable characters, letters, digits, punctuation marks, and a few miscellaneous symbols.
    // But without space.
    const regex = /^[\x21-\x7E]{8,20}$/g;
    return regex.test(pass);
  }

  /**
   * Check repeat character
   *
   * @param {string} [text=""] text
   * @returns {number} repeat character number
   */
  static checkRepeat(text = "") {
    let count = 0;
    for (let i = 0; i < text.length - 1; i++) {
      if (text[i] === text[i + 1]) {
        count++;
      }
    }
    return count;
  }

  /**
   * Check character with regex
   *
   * @param {string} [text=""] text
   * @param {string} [regex=""] regex
   * @returns {number} If it is greater than 0, it is the number of regular strings
   */
  static checkChar(text = "", regex = "") {
    if (text.search(regex) >= 0) {
      return text.match(regex).length;
    }
    return 0;
  }

  /**
   * Is uppercase letter character
   *
   * @param {string} [text=""] text
   * @returns {boolean} true is has uppercase character
   */
  static isUpperChar(text = "") {
    // A-Z
    const regex = /\p{Lu}+/gu;
    return regex.match(text).length > 0;
  }

  /**
   * Is lowercase letter character
   *
   * @param {string} [text=""] text
   * @returns {boolean} true is has lowercase character
   */
  static isLowerChar(text = "") {
    // a-z
    const regex = /\p{Ll}+/gu;
    return regex.match(text).length > 0;
  }

  /**
   * Is digit character
   *
   * @param {string} [text=""] text
   * @returns {boolean} true is has digit character
   */
  static isDigit(text = "") {
    // 0-9
    const regex = /\p{Nd}+/gu;
    return regex.match(text).length > 0;
  }

  /**
   * Is punctuation character
   *
   * @param {string} [text=""] text
   * @returns {boolean} true is has punctuation character
   */
  static isPunctuation(text = "") {
    // [\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]
    const regex = /\p{P}+/gu;
    return regex.match(text).length > 0;
  }

  /**
   * Is white space character
   *
   * @param {string} [text=""] text
   * @returns {boolean} true is has white space character
   */
  static isWhiteSpace(text = "") {
    // space tab
    const regex = /\s+/gu;
    return regex.match(text).length > 0;
  }

  // window.btoa(""); // encode a string
  // window.atob(""); // decode the string

  /**
   * Decode Base64 to byte buffer
   *
   * @param {string} base64 base64 text
   * @returns {ArrayBufferLike} byte buffer
   */
  static base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    return this.stringToArrayBuffer(binaryString);
  }

  /**
   * Encode byte buffer to Base64
   *
   * @param arraybuffer byte buffer
   * @returns {string} base64 text
   */
  static arrayBufferToBase64(arraybuffer) {
    const binary = this.arrayBufferToString(arraybuffer);
    return window.btoa(binary);
  }

  /**
   * Convert string to byte buffer
   *
   * @param {string} str string
   * @returns {ArrayBufferLike} byte buffer
   */
  static stringToArrayBuffer(str) {
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      bytes[i] = str.charCodeAt(i);
    }
    return bytes.buffer;
  }

  /**
   * Convert byte buffer to string
   *
   * @param arraybuffer byte buffer
   * @returns {string} string
   */
  static arrayBufferToString(arraybuffer) {
    return String.fromCharCode.apply(null, new Uint8Array(arraybuffer));
  }

  /**
   * Get browser dark mode
   *
   * @returns {undefined} undefined is unsupported, true is dark mode, false is light mode
   */
  static getDarkMode() {
    let darkMode = undefined;
    if (window.matchMedia('(prefers-color-scheme)').matches) {
      darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return darkMode;
  }

  /**
   * Split content
   *
   * like
   * @code <span class="anim-eles">test</span>
   * to
   * @code <span class="anim-eles"><em>t</em><em>e</em><em>s</em><em>t</em></span>
   * 
   * @param {string} [content=""] element content
   * @param {string} [separator=""] content separator char
   * @param {string} [splitTag=""] split tag name
   * @returns {string} target html with splitTag tags
   */
  static async splitContent(content = "", separator = "", splitTag = "") {
    let target = "";
    if (splitTag.length < 1) {
      return content;
    }
    content.split(separator).forEach((s) => {
      target += "<"+ splitTag + ">" + s + "</" + splitTag + ">";
    });
    return target;
  }

  /**
   * Split content with parity
   *
   * like
   * @code <span class="anim-eles">test</span>
   * to
   * @code <span class="anim-eles"><em class="even">t</em><em class="odd">e</em><em class="even">s</em><em class="odd">t</em></span>
   * 
   * @param {string} [content=""] element content
   * @param {string} [separator=""] content separator char
   * @param {string} [splitTag=""] split tag name
   * @param {string} [evenClass=""] even tag class name
   * @param {string} [oddClass=""] odd tag class name
   * @returns {string} target html with splitTag tags
   */
  static async splitContentWithParity(content = "", separator = "", splitTag = "", evenClass = "", oddClass = "") {
    let target = "";
    if (splitTag == "") {
      return content;
    }
    const evenAttr = (evenClass == "")? "": " class=\"" + evenClass + "\"";
    const oddAttr = (oddClass == "")? "": " class=\"" + oddClass + "\"";
    var i = 0;
    content.split(separator).forEach((e) => {
      target += "<"+ splitTag + ((i%2 == 0)? evenAttr: oddAttr) + ">" + e + "</" + splitTag + ">";
      i++;
    });
    return target;
  }
}
