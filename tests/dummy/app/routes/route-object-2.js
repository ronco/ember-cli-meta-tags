import Ember from 'ember';
import RouteMetaMixin from 'ember-cli-meta-tags/mixins/route-meta';

export default Ember.Route.extend(RouteMetaMixin, {
  afterModel: function() {
    this.set(
      'meta', {
        'property': {
          'og:name': 'Dre'
        }
      }
    );
  }
});
