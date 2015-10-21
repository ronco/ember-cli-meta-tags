import Ember from 'ember';
// Route mixin for setting head meta tags on transition into/out of route

// @example How to set meta tags on a route
//   ExampleRoute = Ember.Route.extend RouteMetaMixin,
//     meta: ->
//       return
//         meta_property_name1: meta_value1
//         meta_property_name2: meta_value2

const keys = Object.keys || Ember.keys;

export function metaToHeadTags(meta) {
  let metaTypes = keys(meta);
  return metaTypes.reduce(function(headTags, meta_type) {
    return headTags.pushObjects(keys(meta[meta_type]).map(function(key) {
      return {
        tagId: `${meta_type}:${key}`,
        type: 'meta',
        attrs: {
          [meta_type]: key,
          content: meta[meta_type][key]
        }
      };
    }));
  }, Ember.A([]));
}

export default Ember.Mixin.create({
  headTagsService: Ember.inject.service('head-tags'),

  // convert legacy meta tags to headTags
  headTags() {
    var meta = this.get('meta');
    if (typeof meta === 'function') {
      meta = meta.apply(this);
    } else if (typeof meta !== 'object') {
      return undefined;
    }

    return metaToHeadTags(meta);
  },

  actions: {
    resetMeta() {
      let service = this.get('headTagsService');
      Ember.run.next(service, 'collectHeadTags');
    }
  }

});
