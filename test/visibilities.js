
var visibilities = require('../lib/visibilities');

exports['visibilities'] = function (test) {
    test.ok(visibilities.public);
    test.ok(visibilities.private);
};

