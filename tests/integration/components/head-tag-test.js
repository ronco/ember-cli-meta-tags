import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


module('Integration | Component | head tag', function(hooks) {
  setupRenderingTest(hooks);

  test('it render correct tagName', async function(assert) {
    assert.expect(1);
    this.set(
      'headTag',
      {
        type: 'link'
      });


    await render(hbs`{{head-tag headTag=headTag}}`);

    assert.equal(this.$('>link').length, 1);
  });

  test('it can render content', async function(assert) {
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

    await render(hbs`{{head-tag headTag=headTag}}`);

    assert.equal(this.$('>script').text().trim(), 'foo-bar');
  });

  test('it renders attributes', async function(assert) {
    let attrs = {};
    A([
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
      'property',
      'itemprop'
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
    await render(hbs`{{head-tag headTag=headTag id='test-comp'}}`);
    let elem = this.$('#test-comp');
    Object.keys(attrs).forEach(function(key) {
      assert.equal(elem.attr(key), attrs[key]);
    });

  });
});
