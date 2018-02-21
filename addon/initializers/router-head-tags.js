import Router from '@ember/routing/router';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export function initialize() {
  Router.reopen({
    headTags: service(),

    didTransition() {
      this._super(...arguments);
      get(this, 'headTags').collectHeadTags();
    }
  });
}

export default {
  name: 'router-head-tags',
  after: 'head-tags',
  initialize
};
