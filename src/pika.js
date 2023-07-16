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
    this.calcMinMainWithParent(document);
  }

  /**
   * Automatic calculator main tag min-height on screen under parent node
   *
   * @param parentNode parent node
   */
  static calcMinMainWithParent(parentNode) {
    let headerHeight = this.getFirstSelectorHeightWithParent(parentNode, 'header');
    let selectionHeight = this.hasSelectorHeightWithParent(parentNode, 'selection');
    let footerHeight = selectionHeight ? 0 : this.getFirstSelectorHeightWithParent(parentNode, 'footer');
    let mainTag = parentNode.getElementsByTagName('main')[0];
    mainTag.style.setProperty('min-height', 'calc(100vh - ' + (headerHeight + footerHeight) + 'px)');
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
   * @param {string} [pass=""] password text
   * @returns {number} quality score
   */
  static passQCalc(pass = "") {
    let rankScore = 0;

    rankScore += (pass.length > 8) ? 4 : 0;
    rankScore += (pass.length - this.checkChar(pass, /\p{Lu}/gu)) * 3;
    rankScore += (pass.length - this.checkChar(pass, /\p{Ll}/gu)) * 2;
    rankScore += (pass.length - this.checkChar(pass, /\d/gu)) * 2;
    rankScore += this.checkChar(pass, /((?=\p{P})[^\p{Lu}\p{Ll}\d])/gu) * 6;

    rankScore -= this.checkChar(pass, /\p{Lu}{3,}/gu) * 2;
    rankScore -= this.checkChar(pass, /\p{Ll}{3,}/gu) * 2;
    rankScore -= this.checkChar(pass, /\d{3,}/gu) * 2;
    rankScore -= this.checkChar(pass, /\p{P}{3,}/gu) * 2;

    const rn = this.checkConsRepeats(pass);
    rankScore -= rn * (rn - 1);

    return (rankScore <= 0)? 0: rankScore;
  }

  /**
   * Get first selector height
   *
   * @param selector element selector
   * @returns {number} height
   */
  static getFirstSelectorHeight(selector) {
    return this.getFirstSelectorHeightWithParent(document, selector);
  }

  /**
   * Get first selector height under parent node
   *
   * @param parentNode parent node
   * @param selector element selector
   * @returns {number} height, if selector height less than 0 return 0
   */
  static getFirstSelectorHeightWithParent(parentNode, selector) {
    const s = parentNode.querySelectorAll(selector)[0];
    const sh = this._height(s);
    return (sh < 0 ? 0 : sh);
  }

  /**
   * Has first selector
   *
   * @param selector element selector
   * @returns {boolean} true, if found selector
   */
  static hasSelectorHeight(selector) {
    return this.getFirstSelectorHeight(selector) > 0;
  }

  /**
   * Has first selector under parent node
   *
   * @param parentNode parent node
   * @param selector element selector
   * @returns {boolean} true if found selector
   */
  static hasSelectorHeightWithParent(parentNode, selector) {
    return this.getFirstSelectorHeightWithParent(parentNode, selector) > 0;
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
   * Check for consecutive repeated characters
   *
   * @param {string} [text=""] text
   * @returns {number} repeat character number
   */
  static checkConsRepeats(text = "") {
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
   * @param {RegExp} [regex] regex
   * @returns {number} If it is greater than 0, it is the number of regular strings
   */
  static checkChar(text = "", regex) {
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

  /**
   * Decode Base64 to byte buffer
   *
   * @param {string} base64 base64 text
   * @returns {ArrayBufferLike} byte buffer
   */
  static base64ToArrayBuffer(base64) {
    return this.stringToArrayBuffer(this.base64Decode(base64));
  }

  /**
   * Encode byte buffer to Base64
   *
   * @param {ArrayBufferLike} arraybuffer byte buffer
   * @returns {string} base64 text
   */
  static arrayBufferToBase64(arraybuffer) {
    return this.base64Encode(this.arrayBufferToString(arraybuffer));
  }

  /**
   * Base64 Encoder
   *
   * @param {string} data text
   * @returns {string} base64 text
   */
  static base64Encode(data = "") {
    return window.btoa(data);
  }

  /**
   * Base64 Decoder
   *
   * @param {string} data base64 text
   * @returns {string} text
   */
  static base64Decode(data) {
    return window.atob(data);
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
   * @param {ArrayBufferLike} arraybuffer byte buffer
   * @returns {string} string
   */
  static arrayBufferToString(arraybuffer) {
    return String.fromCharCode.apply(null, new Uint8Array(arraybuffer));
  }

  /**
   * Get browser dark mode status
   *
   * @returns {boolean} undefined is unsupported, true is dark mode, false is light mode
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
    if (splitTag === "") {
      return content;
    }

    let targetTag = document.createElement("span");
    const cse = content.split(separator);
    for(let i = 0; i < cse.length; i++) {
      let subtag = document.createElement(splitTag);
      subtag.innerText = cse[i];
      targetTag.appendChild(subtag);
    }
    return targetTag.innerHTML;
  }

  /**
   * Split content with parity
   *
   * like
   * @code <span class="anim-eles">test</span>
   * to
   * @code <span class="anim-eles"><em class="even">t</em><em class="odd">e</em><em class="even">s</em><em class="odd">t</em></span>
   * 
   * @param {string} [content = ""] element content
   * @param {string} [separator=""] content separator char
   * @param {string} [splitTag=""] split tag name
   * @param {string} [oddClass=""] odd tag class name
   * @param {string} [evenClass=""] even tag class name
   * @returns {string} target html with splitTag tags
   */
  static async splitContentWithParity(content = "", separator = "", splitTag = "", oddClass = "", evenClass = "") {
    if (splitTag === "") {
      return content;
    }

    if (oddClass === "" && evenClass === "") {
      return this.splitContent(content, separator, splitTag);
    }

    let targetTag = document.createElement("span");
    const cse = content.split(separator);
    for(let i = 0; i < cse.length; i++) {
      let subtag = document.createElement(splitTag);
      if (i%2 === 0) {
        subtag.classList.add(evenClass);
      } else {
        subtag.classList.add(oddClass);
      }
      subtag.innerText = cse[i];
      targetTag.appendChild(subtag);
    }
    return targetTag.innerHTML;
  }
}
