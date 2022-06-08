import Route from '@ember/routing/route';
import { metaToHeadTags } from 'ember-cli-meta-tags';

export default Route.extend({
  name: 'Ice-T',
  headTags() {
    return metaToHeadTags({
      'property': {
        'og:name': this.get('name')
      }
    });
  }
});
