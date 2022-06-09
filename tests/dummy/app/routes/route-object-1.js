import Route from '@ember/routing/route';
import { metaToHeadTags } from 'ember-cli-meta-tags';

export default class extends Route {
  constructor() {
    super(...arguments);
    this.headTags = metaToHeadTags({
      property: {
        'og:name': 'Eazy-E',
      },
    });
  }
}
