/* global sinon */
import Ember from 'ember';
import RouteMetaMixin from 'ember-cli-meta-tags/mixins/route-meta';

import { module, test } from 'qunit';

module('RouteMetaMixin');

test('set meta when route is in-active', function(assert) {
  var RouteMetaObject = Ember.Object.extend(
    RouteMetaMixin,
    {
      _routeMetaIsActiveRoute: function() {
        return false;
      }
    }
  );
  var subject = RouteMetaObject.create();
  assert.ok(subject);
  var subjectMock = sinon.mock(subject);
  subjectMock.expects('_routeMetaGetHead').never();
  subject.setMeta({
    property: {
      'og:name': 'Ice-T',
      'og:type': 'Original Gangsta'
    }
  });
  subjectMock.verify();
});

test('set meta when route is active empty', function(assert) {
  var RouteMetaObject = Ember.Object.extend(
    RouteMetaMixin,
    {
      _routeMetaIsActiveRoute: function() {
        return true;
      }
    }
  );
  var subject = RouteMetaObject.create();
  assert.ok(subject);
  var subjectMock = sinon.mock(subject);
  var fakeHead = Ember.$('<head></head>');
  subjectMock.expects('_routeMetaGetHead').once().returns(fakeHead);

  subject.setMeta({});
  subjectMock.verify();
  assert.equal(fakeHead.html(), '');
});

test('set meta when route is active content', function(assert) {
  var RouteMetaObject = Ember.Object.extend(
    RouteMetaMixin,
    {
      _routeMetaIsActiveRoute: function() {
        return true;
      }
    }
  );
  var subject = RouteMetaObject.create();
  assert.ok(subject);
  var subjectMock = sinon.mock(subject);
  var fakeHead = Ember.$('<head></head>');
  subjectMock.expects('_routeMetaGetHead').once().returns(fakeHead);
  subject.setMeta({
    property: {
      'og:name': 'Ice-T',
      'og:type': 'Original Gangsta'
    },
    name: {
      'twitter:description': 'Tutuola'
    }
  });
  subjectMock.verify();
  assert.equal(fakeHead.html(), '<meta property="og:name" content="Ice-T"><meta property="og:type" content="Original Gangsta"><meta name="twitter:description" content="Tutuola">');
});

test('clearMeta does nothing when no selectors', function(assert) {
  var RouteMetaObject = Ember.Object.extend(RouteMetaMixin);
  var subject = RouteMetaObject.create();
  assert.ok(subject);
  var subjectMock = sinon.mock(subject);
  subjectMock.expects('_routeMetaGetHead').never();
  subject.clearMeta();
  subjectMock.verify();
});

test('clearMeta removes only relevant meta tags', function(assert) {
  var RouteMetaObject = Ember.Object.extend(RouteMetaMixin);
  var subject = RouteMetaObject.create();
  assert.ok(subject);
  var subjectMock = sinon.mock(subject);
  var fakeHead = Ember.$('<head></head>');
  fakeHead.append(Ember.$('<meta property="og:name" content="Ice-T"><meta property="og:type" content="Original Gangsta"><meta name="twitter:description" content="Tutuola">'));
  subjectMock.expects('_routeMetaGetHead').once().returns(fakeHead);
  subject.set('currentMetaSelectors', ['meta[name="twitter:description"]', 'meta[property="og:type"]']);
  subject.clearMeta();
  subjectMock.verify();
  assert.equal(fakeHead.html(), '<meta property="og:name" content="Ice-T">');
  assert.equal(subject.get('currentMetaSelectors'), null);
});
