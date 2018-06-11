import Route from '@ember/routing/route';
import RouteMetaMixin from 'ember-cli-meta-data/mixins/route-meta';
import { set } from '@ember/object';

export default Route.extend(RouteMetaMixin, {
  init() {
    this._super(...arguments);
    set(this, 'meta', {
      'property': {
        'og:name': 'Eazy-E'
      }
    });
  }
});
