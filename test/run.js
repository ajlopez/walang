
const walang = require('..');

const path = require('path');
const wabt = require('wabt')();

const fs = require('fs');

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

exports['compile program to binary and run factorial function'] = async function (test) {
    test.async();
    
    const filename = path.join(__dirname, 'files', 'factorial.wal');
    const code = walang.compileFile(filename);
    
    const wasmModule = wabt.parseWat('factorial.wal', code);
    
    test.ok(wasmModule);
    
    const { buffer } = wasmModule.toBinary({});
    
    const module = await WebAssembly.compile(new Buffer(buffer));
    const instance = await WebAssembly.instantiate(module);
    
    const result = instance.exports.factorial(4);
    
    test.equal(result, 24);
    
    test.done();
};

exports['compile program to binary and run factorial function with break'] = async function (test) {
    test.async();
    
    const filename = path.join(__dirname, 'files', 'factorial2.wal');
    const code = walang.compileFile(filename);
    
    const wasmModule = wabt.parseWat('factorial2.wal', code);
    
    test.ok(wasmModule);
    
    const { buffer } = wasmModule.toBinary({});
    
    const module = await WebAssembly.compile(new Buffer(buffer));
    const instance = await WebAssembly.instantiate(module);
    
    const result = instance.exports.factorial(4);
    
    test.equal(result, 24);
    
    test.done();
};

