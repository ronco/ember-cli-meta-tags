/* global sinon */
import Ember from 'ember';
import startApp from '../../helpers/start-app';
import { module, test } from 'qunit';

var App;

module('Acceptance: RouteMetaMixin',{
  beforeEach: function() {
    App = startApp();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
    Ember.$('head meta[property^="og:"]').remove();
  }

});


test('Sets and clears meta', function(assert) {
  visit('/route-1');
  andThen(function() {
    assert.equal(
      find('meta[property="og:name"]', 'head').length,
      1
    );
    assert.equal(
      find('meta[property="og:name"]', 'head').first().attr('content'),
      'Ice-T'
    );
  });
  visit('/route-2');
  andThen(function() {
    assert.equal(
      find('meta[property="og:name"]', 'head').length,
      1
    );
    assert.equal(
      find('meta[property="og:name"]', 'head').first().attr('content'),
      'Ice-Cube'
    );
  });
});

test('Sets and clears meta from object property', function(assert) {
  visit('/route-object-1');
  andThen(function() {
    assert.equal(
      find('meta[property="og:name"]', 'head').length,
      1
    );
    assert.equal(
      find('meta[property="og:name"]', 'head').first().attr('content'),
      'Eazy-E'
    );
  });
  visit('/route-object-2');
  andThen(function() {
    assert.equal(
      find('meta[property="og:name"]', 'head').length,
      1
    );
    assert.equal(
      find('meta[property="og:name"]', 'head').first().attr('content'),
      'Dre'
    );
  });
});

test('has meta for all route-meta routes in hierarchy', function(assert) {
  visit('/resource/sub');
  andThen(function() {
    assert.equal(
      currentPath(),
      'resource.sub.index'
    );
    assert.equal(
      find('meta[property="og:name"]', 'head').length,
      1
    );
    assert.equal(
      find('meta[property="og:name"]', 'head').first().attr('content'),
      'Sub Zero'
    );
    assert.equal(
      find('meta[property="og:type"]', 'head').length,
      1
    );
    assert.equal(
      find('meta[property="og:type"]', 'head').first().attr('content'),
      'Root'
    );
  });
});

test('has meta for all route-meta routes in hierarchy deeper wins', function(assert) {
  visit('/resource/sub/deep');
  andThen(function() {
    assert.equal(
      currentPath(),
      'resource.sub.deep'
    );
    assert.equal(
      find('meta[property="og:name"]', 'head').length,
      1
    );
    assert.equal(
      find('meta[property="og:name"]', 'head').first().attr('content'),
      'Deep Freeze'
    );
    assert.equal(
      find('meta[property="og:type"]', 'head').length,
      1
    );
    assert.equal(
      find('meta[property="og:type"]', 'head').first().attr('content'),
      'Root'
    );
  });
});
