
const walang = require('..');

const path = require('path');
const wabt = require('wabt')();

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

exports['compile program to binary and run add function'] = async function (test) {
    test.async();
    
    const text = 'public int add(int a, int b) { return a+b; }';
    
    const code = walang.compile(text);

    const wasmModule = wabt.parseWat('add.wal', code);
    
    test.ok(wasmModule);
    
    const { buffer } = wasmModule.toBinary({});
    
    const module = await WebAssembly.compile(new Buffer(buffer));
    const instance = await WebAssembly.instantiate(module);
    
    const result = instance.exports.add(40, 2);
    
    test.equal(result, 42);
    
    test.done();
};

