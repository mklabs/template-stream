
var fs = require('fs'),
  join = require('path').join,
  assert = require('assert');

var TemplateStream = require('../../').TemplateStream;

var data = { name: 'lalilulelo' };

exports.test = function(engine) {
  console.log('Running', engine, 'tests...');
  engine = engine || 'handlebars';

  var to = setTimeout(function() {
    throw new Error('Timeout error: ' + engine);
  }, 2000);

  template = join(__dirname, '../fixtures/template.' + engine);
  expected = join(__dirname, '../expected/' + engine + '.html');
  destfile = join(__dirname, '../expected/writestream.' + engine + '.html');

  var ws = fs.createWriteStream(destfile),
    rs = fs.createReadStream(template);

  rs.pipe(new TemplateStream(engine, data))
    .on('end', function(result) {
      clearTimeout(to);
      result = result.trim();
      fs.readFile(expected, 'utf8', function(err, body) {
        assert.ifError(err);
        assert.equal(result, body.trim());
        fs.readFile(destfile, 'utf8', function(err, body) {
          assert.ifError(err);
          assert.equal(result, body.trim());
          console.log(' ✔ ', engine);
        });
      });
    })
    .pipe(ws);
}
