import Route from '@ember/routing/route';
import RouteMetaMixin from 'ember-cli-meta-tags/mixins/route-meta';
import { reject } from 'rsvp';

export default Route.extend(RouteMetaMixin, {
  name: 'Ice-T',
  meta() {
    return {
      'property': {
        'og:name': this.get('name')
      }
    };
  },

  model(){
    return reject(new Error('Fake error to simulate failure in model hooks'));
  },

  actions: {
    error(){
      // handles error thrown from the model() hook
    },
  }
});
