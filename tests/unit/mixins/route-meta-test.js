import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import sinon from 'sinon';
import RouteMetaMixin from 'ember-cli-meta-tags/mixins/route-meta';

import { module, test } from 'qunit';

module('RouteMetaMixin', function() {
  test('headTags pulls from function', function(assert) {
    let RouteMetaObject = EmberObject.extend(RouteMetaMixin);
    let subject = RouteMetaObject.create({
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
    let RouteMetaObject = EmberObject.extend(RouteMetaMixin);
    let subject = RouteMetaObject.create({
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
    let RouteMetaObject = Route.extend(RouteMetaMixin);
    let subject = RouteMetaObject.create({
      headTagsService: 'service'
    });
    let nextStub = sinon.stub(subject, '_collectHeadTags');
    subject.send('resetMeta');
    assert.ok(nextStub.calledWith());
  });
});
