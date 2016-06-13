// ember-cli-build.js
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {

 'ember-bootstrap': {
                'importBootstrapTheme': true
        },

    minifyJS: {
      enabled: false
    },
    minifyCSS: {
      enabled: false
    }
  });

  //...
  return app.toTree();
};
