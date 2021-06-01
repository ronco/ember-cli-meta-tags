import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('route-1');
  this.route('route-2');
  this.route('route-object-1');
  this.route('route-object-2');
  this.route('resource', function() {
    this.route('sub', { resetNamespace: true }, function() {
      this.route('deep');
    });
  });
});
export default Router;
