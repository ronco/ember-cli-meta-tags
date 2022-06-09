import Route from '@ember/routing/route';
import { metaToHeadTags } from 'ember-cli-meta-tags';

export default class extends Route {
  afterModel() {
    this.headTags = metaToHeadTags({
      property: {
        'og:name': 'Dre',
      },
    });
  }
}
