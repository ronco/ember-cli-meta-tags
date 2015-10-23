import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const keys = Object.keys || Ember.keys;

moduleForComponent('head-tag', 'Integration | Component | head tag', {
  integration: true
});

test('it render correct tagName', function(assert) {
  assert.expect(1);
  this.set(
    'headTag',
    {
      type: 'link'
    });


  this.render(hbs`{{head-tag headTag=headTag}}`);

  assert.equal(this.$('>link').length, 1);
});

test('it can render content', function(assert) {
  assert.expect(1);
  this.set(
    'headTag',
    {
      type: 'script',
      attrs: {
        type: 'application/ld+json'
      },
      content: 'foo-bar'
    });

  this.render(hbs`{{head-tag headTag=headTag}}`);

  assert.equal(this.$('>script').text().trim(), 'foo-bar');
});

test('it renders attributes', function(assert) {
  let attrs = {};
  Ember.A([
    'href',
    'target',
    'charset',
    'crossorigin',
    'hreflang',
    'media',
    'rel',
    'rev',
    'sizes',
    'type',
    'content',
    'http-equiv',
    'name',
    'scheme',
    'src',
    'property'
  ]).forEach(function(attr) {
    attrs[attr] = `the-${attr}`;
  });
  this.set(
    'headTag',
    {
      type: 'meta',
      attrs
    }
  );
  this.render(hbs`{{head-tag headTag=headTag id='test-comp'}}`);
  let elem = this.$('#test-comp');
  keys(attrs).forEach(function(key) {
    assert.equal(elem.attr(key), attrs[key]);
  });

});
