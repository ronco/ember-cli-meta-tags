import Ember from 'ember';
import RouteMetaMixin from 'ember-cli-meta-tags/mixins/route-meta';

export default Ember.Route.extend(RouteMetaMixin, {
  name: 'Ice-T',
  meta: function() {
    return {
      'property': {
        'og:name': this.get('name')
      }
    };
  }
});
