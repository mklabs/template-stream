
var engines = module.exports;

// require cache
var cache = {},
  requires = {};

// hogan support
engines.hogan = function hogan(body, data){
  var engine = requires.hogan || (requires.hogan = require('hogan.js'));
  return engine.compile(body, data).render(data);
};

// handlebars support
engines.handlebars = function handlebars(body, data) {
  var engine = requires.handlebars || (requires.handlebars = require('handlebars'));
  return engine.compile(body, data)(data);
};
