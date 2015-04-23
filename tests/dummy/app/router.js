import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('route-1');
  this.route('route-2');
  this.resource('resource', function() {
    this.resource('sub', function() {
      this.route('deep');
    });
  });
});
