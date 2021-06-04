import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | head tags', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders no self tag', async function (assert) {
    assert.expect(2);

    this.set('headTags', [
      {
        type: 'meta',
      },
      {
        type: 'link',
      },
    ]);

    await render(hbs`{{head-tags headTags=headTags}}`);

    assert.ok(this.element.querySelector('meta'), 'meta tag is present');
    assert.ok(this.element.querySelector('link'), 'link tag is present');
  });
});
