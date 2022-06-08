import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { metaToHeadTags } from 'ember-cli-meta-tags';

export default Route.extend({
  init() {
    this._super(...arguments);
    set(this, 'headTags', metaToHeadTags({
      'property': {
        'og:name': 'Eazy-E'
      }
    }));
  }
});
