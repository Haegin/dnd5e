/*global describe, it */
'use strict';

(function () {
  require.config({
    baseUrl: '/js',
    urlArgs: 'cb=' + Math.random(), // Bust any cache for tests
    paths: {
      // 3rd party libraries
      'loDash': 'vendor/lodash',
      'domReady': '../test/domReady',

      // Jasmine
      'jasmine': '../test/bower_components/jasmine/lib/jasmine-core/jasmine',
      'jasmine-html': '../test/bower_components/jasmine/lib/jasmine-core/jasmine-html',
      'spec': '../test/jasmine/spec',
    },
    shim: {
      'loDash': { exports: '_' },
      'jasmine': { exports: 'jasmine' },
      'jasmine-html': { deps: ['jasmine'], exports: 'jasmine' },
    },
  });

  require(['domReady!', 'jasmine-html'], function(domReady, jasmine) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };

    var specs = [];
    specs.push('spec/ruleset');

    require(specs, function() {
      console.log("running specs");
      jasmineEnv.execute();
    });
  });
})();
