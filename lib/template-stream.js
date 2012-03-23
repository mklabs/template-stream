
var util = require('util'),
  stream = require('stream'),
  handlebars = require('handlebars'),
  engines = require('./engines');

module.exports = template;

var TemplateStream = template.TemplateStream = function TemplateStream(engine, options, data) {
  if(!data) data = options, options = {};

  this.writable = true;
  stream.Stream.call(this);

  if(!engine) return this.emit('error', new Error('A template engine must be supplied'));

  this.chunks = [];
  this.data = data || {};
  this.engines = options.engines || engines;
  this.engine = this.engines[engine];

  if(!this.engine) return this.emit('error', new Error(
    'Invalid ' + engine + ' engine. Valid ones are ' + Object.keys(this.engines).join(', ')
  ));
};

util.inherits(TemplateStream, stream.Stream);

TemplateStream.prototype.pipe = function pipe(dest, options) {
  var self = this;
  this.on('end', function(body) {
    self.emit('data', body);
  });
  return stream.Stream.prototype.pipe.apply(self, arguments);
};

TemplateStream.prototype.write = function write(data) {
  this.chunks = this.chunks.concat(data);
};

TemplateStream.prototype.end = function end() {
  this.emit('end', this.render(this.chunks));
};

TemplateStream.prototype.render = function render(chunks) {
  var body = chunks.map(function(buffer) {
    return buffer.toString();
  }).join('');
  return this.engine(body, this.data);
};

// **template** main wrapper function. Creates a new WriteStream, pass it through
// a new TemplateStream and returns the result.
function template() {}

