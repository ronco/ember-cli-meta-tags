import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('head-tags', 'Integration | Component | head tags', {
  integration: true
});

test('it renders no self tag', function(assert) {
  assert.expect(3);

  this.set('headTags', [
    {
      type: 'meta'
    },
    {
      type: 'link'
    }
  ]);
  this.render(hbs`{{head-tags headTags=headTags}}`);

  assert.equal(this.$('>*').length, 2);
  assert.equal(this.$('>meta').length, 1);
  assert.equal(this.$('>link').length, 1);

});
