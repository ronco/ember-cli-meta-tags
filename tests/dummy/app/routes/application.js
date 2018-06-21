import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default Route.extend({
  init() {
    this._super(...arguments);
    set(this, 'headTags', [
      {
        type: 'meta',
        tagId: 'og:title-property',
        attrs: {
          property: 'og:title',
          dir: 'ltr',
          content: 'Heyo'
        }
      },
      {
        type: 'script',
        attrs: {
          type: 'application/ld+json'
        },
        content: `{"@context":"Old school".}`
      }
    ]);
  }
});
