/* jshint node: true */

module.exports = {
  scenarios: [
    {
      name: 'our-current',
      dependencies: {}
    },
    {
      name: 'ember-release',
      dependencies: {
        "ember": "ember#release"
      },
      resolutions: {
        "ember": "release"
      }
    },
    {
      name: 'ember-beta',
      dependencies: {
        "ember": "ember#beta"
      },
      resolutions: {
        "ember": "beta"
      }
    },
    {
      name: 'ember-canary',
      dependencies: {
        "ember": "ember#canary"
      },
      resolutions: {
        "ember": "canary"
      }
    }
  ]
};
