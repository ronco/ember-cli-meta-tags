/*global sinon */
import Ember from 'ember';
import RouteMetaMixin from 'ember-cli-meta-tags/mixins/route-meta';

import { module, test } from 'qunit';

module('RouteMetaMixin');

test('headTags pulls from function', function(assert) {
  var RouteMetaObject = Ember.Object.extend(RouteMetaMixin);
  var subject = RouteMetaObject.create({
    meta: function() {
      return {
        'name': {
          'twitter:description': this.get('data')
        }
      };
    },
    data: 'foo'
  });
  assert.ok(subject);
  assert.deepEqual(
    subject.headTags(),
    [
      {
        type: 'meta',
        tagId: "name:twitter:description",
        attrs: {
          name: 'twitter:description',
          content: 'foo'
        }
      }
    ]
  );
});

test('headTags pulls from object', function(assert) {
  var RouteMetaObject = Ember.Object.extend(RouteMetaMixin);
  var subject = RouteMetaObject.create({
    meta:  {
      'name': {
        'twitter:description': 'foo'
      }
    }
  });
  assert.ok(subject);
  assert.deepEqual(
    subject.headTags(),
    [
      {
        type: 'meta',
        tagId: "name:twitter:description",
        attrs: {
          name: 'twitter:description',
          content: 'foo'
        }
      }
    ]
  );
});

test('resetMeta schedules collectHeadTags', function(assert) {
  var RouteMetaObject = Ember.Route.extend(RouteMetaMixin);
  var subject = RouteMetaObject.create({
    headTagsService: 'service'
  });
  let nextStub = sinon.stub(Ember.run, 'next');
  subject.send('resetMeta');
  assert.ok(nextStub.calledWith('service', 'collectHeadTags'));
});
