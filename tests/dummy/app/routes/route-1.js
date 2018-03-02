import Route from '@ember/routing/route';
import RouteMetaMixin from 'ember-cli-meta-tags/mixins/route-meta';

export default Route.extend(RouteMetaMixin, {
  name: 'Ice-T',
  meta() {
    return {
      'property': {
        'og:name': this.get('name')
      }
    };
  }
});
