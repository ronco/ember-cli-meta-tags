import { next } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';
import { A } from '@ember/array';
// Route mixin for setting head meta tags on transition into/out of route

// @example How to set meta tags on a route
//   ExampleRoute = Ember.Route.extend RouteMetaMixin,
//     meta: ->
//       return
//         meta_property_name1: meta_value1
//         meta_property_name2: meta_value2

export function metaToHeadTags(meta) {
  let metaTypes = Object.keys(meta);
  return metaTypes.reduce(function(headTags, meta_type) {
    return headTags.pushObjects(Object.keys(meta[meta_type]).map(function(key) {
      return {
        tagId: `${meta_type}:${key}`,
        type: 'meta',
        attrs: {
          [meta_type]: key,
          content: meta[meta_type][key]
        }
      };
    }));
  }, A([]));
}

export default Mixin.create({
  headTagsService: service('head-tags'),

  // convert legacy meta tags to headTags
  headTags() {
    let meta = this.get('meta');
    if (typeof meta === 'function') {
      meta = meta.apply(this);
    } else if (typeof meta !== 'object') {
      return undefined;
    }

    return metaToHeadTags(meta);
  },

  _collectHeadTags() {
    let service = this.get('headTagsService');
    next(service, 'collectHeadTags');
  },

  actions: {
    resetMeta() {
      this._collectHeadTags();
    }
  }

});
