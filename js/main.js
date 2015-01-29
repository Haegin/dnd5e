require.config({
  baseUrl: 'js',
  paths: {
    // Require.js plugins
    jsx: 'require-plugins/jsx',
    text: 'require-plugins/text',

    // 3rd party libraries
    loDash: 'vendor/lodash',
    react: 'vendor/react-with-addons',
    JSXTransformer: 'vendor/JSXTransformer',
  },
  shim: {
    loDash: { exports: '_' }
  },
  jsx: {
    fileExtension: '.jsx'
  }
});

require(['ruleset', 'jsx!components/Character'], function(ruleset, Character) {


});
