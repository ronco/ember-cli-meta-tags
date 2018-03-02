import Route from '@ember/routing/route';

export default Route.extend({
  headTags: [
    {
      type: 'script',
      attrs: {
        type: 'application/ld+json'
      },
      content: `{"@context":"Old school".}`
    }
  ]
});
