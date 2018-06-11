import Route from '@ember/routing/route';
import RouteMetaMixin from 'ember-cli-meta-data/mixins/route-meta';

export default Route.extend(RouteMetaMixin, {
  afterModel() {
    this.set(
      'meta', {
        'property': {
          'og:name': 'Dre'
        }
      }
    );
  }
});
