var loaderUtils = require('loader-utils');
var path = require('path');
var gutil = require('gulp-util');

module.exports = function(content) {

  this.cacheable && this.cacheable();
  var callback = this.async();

  var options = loaderUtils.parseQuery(this.query);
  var prefix = options.prefix || '';
  var manifest = require(options.manifest);
  var relativeSplit = options.relativeSplit || prefix || '/';
  var fileName = this.resourcePath.split(relativeSplit)[1] || '';
  var result = manifest[fileName] ? path.join(prefix, manifest[fileName]) : '';

  console.log('webpack manifest loader', fileName, ' > ', result);
  callback(null, 'module.exports = "' + result + '"');

};

module.exports.raw = true;
