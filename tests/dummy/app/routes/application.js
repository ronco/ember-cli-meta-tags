import Route from '@ember/routing/route';

export default class extends Route {
  constructor() {
    super(...arguments);
    this.headTags = [
      {
        type: 'meta',
        tagId: 'og:title-property',
        attrs: {
          property: 'og:title',
          dir: 'ltr',
          content: 'Heyo',
        },
      },
      undefined,
      null,
      false,
      {
        type: 'script',
        attrs: {
          type: 'application/ld+json',
        },
        content: `{"@context":"Old school".}`,
      },
    ];
  }
}
