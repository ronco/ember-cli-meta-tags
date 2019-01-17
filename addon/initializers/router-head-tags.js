import Router from '@ember/routing/router';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { gte } from 'ember-compatibility-helpers';

export function initialize() {
  if (gte('3.6.0-beta.1')) {
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
  } else {
    Router.reopen({
      headTags: service(),

      didTransition() {
        get(this, 'headTags').collectHeadTags();
        this._super(...arguments);
      }
    });
  }
}

export default {
  name: 'router-head-tags',
  after: 'head-tags',
  initialize
};
