import Route from '@ember/routing/route';
import { metaToHeadTags } from 'ember-cli-meta-tags';

export default Route.extend({
  headTags() {
    return metaToHeadTags({
      'property': {
        'og:name': 'Deep Freeze'
      }
    });
  }
});
