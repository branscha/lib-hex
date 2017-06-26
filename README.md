# Hex 64 Codec 
## Goal

Standard 'hex' encoding of raw strings.
* A raw string is a string where each character represents a single byte, only the lower 8 bits are considered (technically a JavaScript character could contain 16 bits).

Example using CommonJS semantics.

    var hex = require('@branscha/hex');
    var encoded = hex.encode("Hello World");
    var decoded = hex.decode(encoded);

The package contains an UMD module.
