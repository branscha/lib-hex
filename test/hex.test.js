import {encode as encode, decode as decode} from 'hex';

test('Hex encoding', () => {
    
    expect(encode("abc123")).toBe("616263313233");
    expect(encode("Hello World")).toBe("48656c6c6f20576f726c64");
    expect(encode("1")).toBe("31");
    expect(encode("12")).toBe("3132");
    expect(encode("123")).toBe("313233");
    expect(encode("1234")).toBe("31323334");
    expect(encode("any carnal pleasure.")).toBe("616e79206361726e616c20706c6561737572652e");
    
    // !TRICK! Make sure we use UTF-8 encoding and not ISO encoding.
    let utfstring = window.unescape(encodeURIComponent("éèüë"));
    expect(encode(utfstring)).toBe("c3a9c3a8c3bcc3ab");

    expect(encode(
        "Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.")).toBe(
        "4d616e2069732064697374696e677569736865642c206e6f74206f6e6c792062792068697320726561736f6e2c2062757420627920746869732073696e67756c61722070617373696f6e2066726f6d206f7468657220616e696d616c732c2077686963682069732061206c757374206f6620746865206d696e642c20746861742062792061207065727365766572616e6365206f662064656c6967687420696e2074686520636f6e74696e75656420616e6420696e6465666174696761626c652067656e65726174696f6e206f66206b6e6f776c656467652c2065786365656473207468652073686f727420766568656d656e6365206f6620616e79206361726e616c20706c6561737572652e");
});

test('Hex decoding', () => {

    // You must give Jest a function so that it can evaluate the
    // expression itself. Otherwise the expression will be evaluated before
    // the expect is invoked!
    expect(() => decode("zzz")).toThrowError(/^hex\/010/);
    expect(() => decode("f")).toThrowError(/^hex\/020/);
    expect(() => decode("1a1")).toThrowError(/^hex\/020/);

    expect(decode("616263313233")).toBe("abc123");
    expect(decode("48656c6c6f20576f726c64")).toBe("Hello World");
    expect(decode("31")).toBe("1");
    expect(decode("3132")).toBe("12");
    expect(decode("313233")).toBe("123");
    expect(decode("31323334")).toBe("1234");
    expect(decode("616e79206361726e616c20706c6561737572652e")).toBe("any carnal pleasure.");
    
    expect(decode(
        "4d616e2069732064697374696e677569736865642c206e6f74206f6e6c792062792068697320726561736f6e2c2062757420627920746869732073696e67756c61722070617373696f6e2066726f6d206f7468657220616e696d616c732c2077686963682069732061206c757374206f6620746865206d696e642c20746861742062792061207065727365766572616e6365206f662064656c6967687420696e2074686520636f6e74696e75656420616e6420696e6465666174696761626c652067656e65726174696f6e206f66206b6e6f776c656467652c2065786365656473207468652073686f727420766568656d656e6365206f6620616e79206361726e616c20706c6561737572652e"
        )).toBe(
        "Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure."
        );
});

