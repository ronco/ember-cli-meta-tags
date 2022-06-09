import Route from '@ember/routing/route';
import { metaToHeadTags } from 'ember-cli-meta-tags';

export default class extends Route {
  name = 'Ice-T';
  headTags() {
    return metaToHeadTags({
      property: {
        'og:name': this.name,
      },
    });
  }
}
