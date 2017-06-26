/** @type {String} */
const CODETABLE = '0123456789abcdef';

/** @type {RegExp} */
const INVALID_INPUT = /[^a-fA-F0-9]/g;

/** @type {string} */
const ERR010 = "hex/010: Invalid characters in the input. Valid characters are a-f and 0-9.";
const ERR020 = "hex/020: Invalid input string length. A hex input string should always have an even number of hex characters.";

/*
 * Convert a raw string (where each character represents a single byte) to a hex string.
 * Each character in the string is interpreted as a single byte, and will be represented by 2 hex characters.
 */
function encode(input) {
    let output = '';
    let x;
    for (let i = 0; i < input.length; i += 1) {
        x = input.charCodeAt(i);
        output += CODETABLE.charAt((x >>> 4) & 0b1111) + CODETABLE.charAt(x & 0b1111)
    }
    return output;
}

/**
 * Decode a hex encoded string into the original bytes (raw string).
 * An Error is thrown when the input contains tokens that are not in the hex character set.
 * @param input {String} - containing hex characters.
 * @returns {String} - raw bytes.
 */
function decode(input) {
    if (INVALID_INPUT.exec(input)) {
        throw new Error(ERR010);
    }
    if (input.length % 2) {
        throw new Error(ERR020);
    }
    let output = '';
    input = input.toLowerCase();
    for (let i = 0; i < input.length;) {
        let enc1 = CODETABLE.indexOf(input.charAt(i++));
        let enc2 = CODETABLE.indexOf(input.charAt(i++));
        let src = (enc1 & 0b1111) << 4 | (enc2 & 0b1111);
        output = output + String.fromCharCode(src);
    }
    return output;
}

export {
    encode as encode,
    decode as decode,
}
