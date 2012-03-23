
var fs = require('fs'),
  http = require('http'),
  join = require('path').join,
  TemplateStream = require('..').TemplateStream;

// dummy data, actually being the package information
var data = require(join(__dirname, '../package.json'));
data.deps = Object.keys(data.devDependencies);

http.createServer(function (req, res) {
  fs.createReadStream(join(__dirname, 'template.html'))
    .pipe(new TemplateStream('handlebars', data))
    .pipe(res);
}).listen(3000);

console.log('Fancy webserver listening on 3000');

