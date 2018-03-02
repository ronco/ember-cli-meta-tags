import Route from '@ember/routing/route';
import RouteMetaMixin from 'ember-cli-meta-tags/mixins/route-meta';

export default Route.extend(RouteMetaMixin, {
  meta: function() {
    return {
      'property': {
        'og:name': 'Ice-Cube'
      }
    };
  }
});
