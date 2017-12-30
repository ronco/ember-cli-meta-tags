export interface HeadTag<K = string, T = any> {
  type: K;
  tagId: string;
  attrs: T;
}

declare module 'ember-cli-meta-tags/services/head-tags' {
  import Service from '@ember/service';
  class HeadTagsService extends Service {
    collectHeadTags(): void;
  }
}

declare module 'ember-cli-head/services/head-data' {
  interface HeadDataService {
    headTags?: HeadTag[];
  }
}

declare module 'ember' {
  namespace Ember {
    interface Route {
      headTags?: HeadTag[] | (() => HeadTag[]);
    }
  }
}
