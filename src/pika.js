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

/*! Pika-js v0.1.2 (https://github.com/leonardwoo/pika-js) | Licensed under MIT (https://github.com/leonardwoo/pika-js/blob/main/LICENSE) */

"use strict";

/**
 * Pika js class
 */
class Pikajs {
    constructor() {}

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
     * Get element selector height
     *
     * @param selector element selector
     * @returns {number} height
     */
    static getSelectorHeight(selector) {
        const s = document.querySelector(selector);
        const sh = this._height(s);
        return (sh < 0? 0: sh);
    }

    /**
     * Has section tag
     *
     * @returns {boolean} true is yes
     */
    static hasSelectionHeight() {
        const e = document.getElementsByTagName("section")[0];
        const eh = this._height(e);
        return !(eh < 0);
    }

    /**
     * Is password (only ASCII printable characters without space)
     *
     * @param pass password text
     * @returns {boolean} true is yes
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
     * @param text text
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
     * @param text text
     * @param regex regex
     * @returns {number} If it is greater than 0, it is the number of regular strings
     */
    static checkChar(text = "", regex = "") {
        if (text.search(regex) >= 0) {
            return text.match(regex).length;
        }
        return 0;
    }

    /**
     * Is uppercase character
     *
     * @param text text
     * @returns {boolean} true is has uppercase character
     */
    static isUpperChar(text = "") {
        const regex = /\p{Lu}+/gu;
        return regex.match(text).length > 0;
    }

    /**
     * Is lowercase character
     *
     * @param text text
     * @returns {boolean} true is has lowercase character
     */
    static isLowerChar(text = "") {
        const regex = /\p{Ll}+/gu;
        return regex.match(text).length > 0;
    }

    /**
     * Is digit character
     *
     * @param text text
     * @returns {boolean} true is has digit character
     */
    static isDigit(text = "") {
        const regex = /\p{Nd}+/gu;
        return regex.match(text).length > 0;
    }

    /**
     * Is punctuation character
     *
     * @param text text
     * @returns {boolean} true is has punctuation character
     */
    static isPunctuation(text = "") {
        const regex = /\p{P}+/gu;
        return regex.match(text).length > 0;
    }

    /**
     * Is white space character
     *
     * @param text text
     * @returns {boolean} true is has white space character
     */
    static isWhiteSpace(text = "") {
        const regex = /\s+/gu;
        return regex.match(text).length > 0;
    }

    // window.btoa(""); // encode a string
    // window.atob(""); // decode the string

    /**
     * Decode Base64 to byte buffer
     *
     * @param base64 base64 text
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
     * @param str string
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

}