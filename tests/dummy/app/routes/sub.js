import Ember from 'ember';
import RouteMetaMixin from 'ember-cli-meta-tags/mixins/route-meta';

export default Ember.Route.extend(RouteMetaMixin, {
  meta: {
    'property': {
      'og:name': 'Sub Zero'
    }
  }
});
