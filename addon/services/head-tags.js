import Ember from 'ember';

//TODO: consider polyfilled Set
const VALID_HEAD_TAGS = Ember.A([
  'base',
  'link',
  'meta',
  'script'
]);

const assign = Ember.assign ? Ember.assign : Ember.merge;

export default Ember.Service.extend({

  // crawl up the active route stack and collect head tags
  collectHeadTags() {
    let tags = {};
    let handlerInfos = Ember.A(this.get('router.router.currentHandlerInfos'));
    handlerInfos.forEach((handlerInfo) => {
      assign(tags, this._extractHeadTagsFromRoute(handlerInfo.handler));
    });
    let tagArray = Ember.$.map(tags, function(tag) { return tag; });
    this.set('renderer.headTags', Ember.A(tagArray));
  },

  _extractHeadTagsFromRoute(route) {
    let headTags = route.headTags;
    if (!headTags) {
      return {};
    }
    if (typeof headTags === 'function') {
      headTags = headTags.apply(route);
    } else if (typeof headTags !== 'object') {
      // not recognized construct
      return {};
    }
    // convert headTags to object
    return this._buildTags(headTags);
  },

  // ensure all tags have a tagId and build object keyed by id
  _buildTags(headTagsArray) {
    let tagMap = {};
    Ember.A(headTagsArray).forEach(function(tagDefinition) {
      if(!VALID_HEAD_TAGS.contains(tagDefinition.type)) {
        return;
      }
      let tagId = tagDefinition.tagId;
      if (!tagId) {
        tagId = Ember.guidFor(tagDefinition);
      }
      tagMap[tagId] = tagDefinition;
    });
    return tagMap;
  }
});
