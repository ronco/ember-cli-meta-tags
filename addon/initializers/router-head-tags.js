import Router from '@ember/routing/router';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export function initialize() {
  Router.reopen({
    headTags: service(),

    init() {
      this._super(...arguments);

      this.on('routeDidChange', () => {
        get(this, 'headTags').collectHeadTags();
        this._super(...arguments);
      });
    }
  });
}

export default {
  name: 'router-head-tags',
  after: 'head-tags',
  initialize
};
