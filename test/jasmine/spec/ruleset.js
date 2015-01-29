/*global describe, it */
'use strict';

(function () {
  require.config({
    baseUrl: '/js',
    urlArgs: 'cb=' + Math.random(), // Bust any cache for tests
    paths: {
      // Require.js plugins
      // jsx: 'require-plugins/jsx',
      // text: 'require-plugins/text',

      // 3rd party libraries
      loDash: 'vendor/lodash',
      // react: 'vendor/react-with-addons',
      // JSXTransformer: 'vendor/JSXTransformer',

      // Jasmine
      jasmine: '../test/lib/jasmine',
      'jasmine-html': '../test/lib/jasmine-html',
      spec: '../test/jasmine/spec',
    },
    shim: {
      loDash: { exports: '_' },
      jasmine: { exports: 'jasmine' },
      'jasmine-html': { deps: ['jasmine'], exports: 'jasmine' },
    },
    // jsx: {
    //   fileExtension: '.jsx'
    // }
  });

  require(['Race'], function(Race) {
    describe('Race', function () {
      // var dwarf = {name: "Dwarf"};
      var hill = new Race("Hill", {modifiers: {wisdom: 1}});
      var dwarf = new Race("Dwarf", {
        modifiers: {constitution: 2},
        subraces: [
          hill,
          new Race("Mountain", {modifiers: {strength: 2}}),
        ]
      });

      it('knows the name of the race', function () {
        expect(dwarf.name).toBe("Dwarf");
      });

      it('can get a subrace', function() {
        expect(dwarf.getSubrace("Hill")).toBe(hill);
      });

      it('can combine modifiers with a subrace', function() {
        var combinedMods = dwarf.getModifiers("Hill");
        expect(combinedMods.constitution).toBe(2);
        expect(combinedMods.wisdom).toBe(1);
      });

      it("ignores unknown subraces", function() {
        var combinedMods = dwarf.getModifiers("Wood");
        expect(combinedMods.constitution).toBe(2);
      });

      it("doesn't have to have a subrace", function() {
        // var dragonborn = new Race("Dragonborn", {modifiers: 
      });
    });
  });
})();
