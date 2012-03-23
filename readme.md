
# template-stream [![Build Status](https://secure.travis-ci.org/mklabs/template-stream.png?branch=master)](http://travis-ci.org/mklabs/template-stream)

A thin interface over node's stream and a simple "templated" stream
implementation that should work with a bunch of template engines (only
handlebars / hogan.js supported for now, but others coming).

heavily based on
[@mikeal](https://github.com/mikeal)'s
[`morestreams`](https://github.com/mikeal/morestreams),
[@mmalecki](https://github.com/mmalecki)'s
[`hashing-stream`](https://github.com/mmalecki/hashing-stream) and
[`buffered`](https://github.com/mmalecki/buffered),
[@visionmedia](https://github.com/visionmedia)'s
[`consolidate.js`](https://github.com/visionmedia/consolidate.js),

## Usage

So that one can write something like this:

```javascript
var TemplateStream = require('template-stream').TemplateStream;

// Hello {{ name }} >> template.html
fs.createReadStream('template.html')
  .pipe(new TemplateStream('handlebars', { name: 'lalilulelo' }))
  .on('end', function (body) {
    console.log(body); // => Hello lalilulelo
  });
```

`template-stream` is pipable, so the following is valid and should work in the
way you'd expect.

```javascript
var TemplateStream = require('template-stream').TemplateStream;

// Hello {{ name }} >> template.html
fs.createReadStream('template.html')
  .pipe(new TemplateStream('handlebars', { name: 'lalilulelo' }))
  .pipe(fs.wreateWriteStream('ouput.html'));
```

**Note**: On pipes to destinations, be warn that templates engine needs to
compile a single raw string, thus only one relevant `data` event is emitted to
destination stream. It differs a little bit from usual streams and the ideal use
case where chunks may be emitted multiple times.

This is mainly sweet sugar api syntax rather than an attempt to be super optimized
/ performant / whatever. It won't be a problem in most of cases though.

### Basic http server example

```javascript
var fs = require('fs'),
  http = require('http'),
  join = require('path').join,
  TemplateStream = require('..').TemplateStream;

http.createServer(function (req, res) {
  fs.createReadStream(join(__dirname, 'template.html'))
    .pipe(new TemplateStream('handlebars', { name: 'lalilulelo' }))
    .pipe(res);
}).listen(3000);

console.log('Fancy webserver listening on 3000');
```

## Install

    npm install https://github.com/mklabs/template-stream/tarball/master

