
const walang = require('..');

const path = require('path');

exports['compile simple program'] = function (test) {
    const text = 'public void main() {}';
    
    const code = walang.compile(text);

    test.ok(code);
    test.equal(typeof code, 'string');
    test.equal(code, '(func $main)\r\n(export "main"\r\n  (func $main)\r\n)\r\n');
};

exports['compile add function program'] = function (test) {
    const text = 'public int add(int a, int b) { return a+b; }';
    
    const code = walang.compile(text);
    
    test.ok(code);
    test.equal(typeof code, 'string');    
    test.equal(code, '(func $add\r\n  (param $a i32)\r\n  (param $b i32)\r\n  (result i32)\r\n  (i32.add\r\n    (get_local $a)\r\n    (get_local $b)\r\n  )\r\n)\r\n(export "add"\r\n  (func $add)\r\n)\r\n');
};

exports['compile file add program'] = function (test) {
    const filename = path.join(__dirname, 'files', 'add.wal');
    
    const code = walang.compileFile(filename);
    test.ok(code);
    test.equal(typeof code, 'string');    
    test.equal(code, '(func $add\r\n  (param $a i32)\r\n  (param $b i32)\r\n  (result i32)\r\n  (i32.add\r\n    (get_local $a)\r\n    (get_local $b)\r\n  )\r\n)\r\n(export "add"\r\n  (func $add)\r\n)\r\n');
};

