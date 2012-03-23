
var runner = require('./helpers'),
  assert = require('assert');

var TemplateStream = require('../').TemplateStream;

try {
  new TemplateStream;
  assert.fail('should raise an error');
} catch(e) {
  assert.equal(e.message, 'A template engine must be supplied');
}

runner.test('hogan');
runner.test('handlebars');
