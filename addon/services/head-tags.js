import { guidFor } from '@ember/object/internals';
import Service, { inject as service } from '@ember/service';

const VALID_HEAD_TAGS = new Set([
  'base',
  'link',
  'meta',
  'script',
  'noscript',
  'title',
]);

export default class HeadTags extends Service {
  @service headData;

  // crawl up the active route stack and collect head tags
  collectHeadTags() {
    let tags = {};
    let currentHandlerInfos = this.router.targetState.routerJsState.routeInfos;
    currentHandlerInfos.forEach((handlerInfo) => {
      Object.assign(tags, this._extractHeadTagsFromRoute(handlerInfo.route));
    });
    let tagArray = Object.keys(tags).map((id) => tags[id]);
    this.headData.set('headTags', tagArray);
  }

  _extractHeadTagsFromRoute(route) {
    if (!route) {
      return {};
    }

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
  }

  // ensure all tags have a tagId and build object keyed by id
  _buildTags(headTagsArray) {
    let tagMap = {};
    headTagsArray.forEach(function (tagDefinition) {
      if (!tagDefinition || !VALID_HEAD_TAGS.has(tagDefinition.type)) {
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
}
