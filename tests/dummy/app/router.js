import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('route-1');
  this.route('route-2');
  this.route('route-object-1');
  this.route('route-object-2');
  this.resource('resource', function() {
    this.resource('sub', function() {
      this.route('deep');
    });
  });
});

export default Router;
