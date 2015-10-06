import Ember from 'ember';

export default Ember.Route.extend({
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
