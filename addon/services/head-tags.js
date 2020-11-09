import { guidFor } from '@ember/object/internals';
import Service, { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';
import { A } from '@ember/array';
import { get } from '@ember/object';
import { gte } from 'ember-compatibility-helpers';

//TODO: consider polyfilled Set
const VALID_HEAD_TAGS = A([
  'base',
  'link',
  'meta',
  'script',
  'noscript',
  'title'
]);

export default Service.extend({
  headData: service(),

  // crawl up the active route stack and collect head tags
  collectHeadTags() {
    let tags = {};
    let currentHandlerInfos;

    if (gte('3.6.0-beta.1')) {
      currentHandlerInfos = this.get('router.targetState.routerJsState.routeInfos');
    } else {
      currentHandlerInfos = this.get('router._routerMicrolib.currentHandlerInfos');
      if (!currentHandlerInfos) {
        currentHandlerInfos = this.get('router.router.currentHandlerInfos');
      }
    }

    let handlerInfos = A(currentHandlerInfos);
    handlerInfos.forEach((handlerInfo) => {
      if (gte('3.6.0-beta.1')) {
        assign(tags, this._extractHeadTagsFromRoute(handlerInfo.route));
      } else {
        assign(tags, this._extractHeadTagsFromRoute(handlerInfo.handler));
      }
    });
    let tagArray = A(Object.keys(tags)).map((id) => tags[id]);
    this.set('headData.headTags', A(tagArray));
  },

  _extractHeadTagsFromRoute(route) {
    if (!route) {
      return {};
    }
    
    let headTags = get(route, 'headTags');
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
    A(headTagsArray).forEach(function(tagDefinition) {
      if(!VALID_HEAD_TAGS.includes(tagDefinition.type)) {
        return;
      }
      let tagId = tagDefinition.tagId;
      if (!tagId) {
        tagId = guidFor(tagDefinition);
      }
      tagMap[tagId] = tagDefinition;
    });
    return tagMap;
  }
});
