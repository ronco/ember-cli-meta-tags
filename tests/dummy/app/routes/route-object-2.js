import Route from '@ember/routing/route';
import { metaToHeadTags } from 'ember-cli-meta-tags';

export default Route.extend({
  afterModel() {
    this.set(
      'headTags', metaToHeadTags({
        'property': {
          'og:name': 'Dre'
        }
      }
    ));
  }
});
