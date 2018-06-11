import Route from '@ember/routing/route';
import RouteMetaMixin from 'ember-cli-meta-data/mixins/route-meta';

export default Route.extend(RouteMetaMixin, {
  meta() {
    return {
      'property': {
        'og:name': 'Ice-Cube'
      }
    };
  }
});
