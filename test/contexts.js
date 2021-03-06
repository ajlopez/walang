
const contexts = require('../lib/contexts');

exports['create context as object'] = function (test) {
    const context = contexts.context();
    
    test.ok(context);
    test.equal(typeof context, 'object');
};

exports['add variable to contract context'] = function (test) {
    const context = contexts.context();

    test.ok(context);
    
    context.set('answer', { name: 'answer', type: 'uint' });
    
    test.deepEqual(context.get('answer'), { name: 'answer', type: 'uint' });
    
    context.set('counter', { name: 'counter', type: 'uint' });
    
    test.deepEqual(context.get('counter'), { name: 'counter', type: 'uint' });
};

exports['get unknown value'] = function (test) {
    const context = contexts.context();
    
    test.equal(context.get('foo'), null);
};

exports['set and get value'] = function (test) {
    const context = contexts.context();
    
    context.set('answer', 42);
    
    test.equal(context.get('answer'), 42);
};

exports['set and get value in parent context'] = function (test) {
    const parent = contexts.context();
    const context = contexts.context(parent);
    
    parent.set('answer', 42);
    
    test.equal(context.get('answer'), 42);
};

