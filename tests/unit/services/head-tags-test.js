import { moduleFor, test } from 'ember-qunit';

moduleFor('service:head-tags', 'Unit | Service | head tags', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it collects head tags from function', function(assert) {
  assert.expect(1);
  let handler = {
    headTags() {
      return [{
        type: 'link',
        attrs: {
          rel: 'canonical'
        }
      }];
    }
  };
  var service = this.subject({
    renderer: {},
    router: {
      router: {
        currentHandlerInfos: [{ handler }]
      }
    }
  });

  service.collectHeadTags();
  assert.deepEqual(
    service.get('renderer.headTags'),
    [{
      type: 'link',
      attrs: {
        rel: 'canonical'
      }
    }]
  );
});

test('it collects head tags from property array', function(assert) {
  assert.expect(1);
  let handler = {
    headTags: [{
      type: 'link',
      attrs: {
        rel: 'canonical'
      }
    }]
  };
  var service = this.subject({
    renderer: {},
    router: {
      router: {
        currentHandlerInfos: [{ handler }]
      }
    }
  });

  service.collectHeadTags();
  assert.deepEqual(
    service.get('renderer.headTags'),
    [{
      type: 'link',
      attrs: {
        rel: 'canonical'
      }
    }]
  );
});

test('it collects nested tags', function(assert) {
  assert.expect(1);
  let handlers = [
    {
      handler: {
        headTags: [
          {
            type: 'link',
            tagId: 'canonical-link',
            attrs: {
              rel: 'canonical',
              href: 'root-canonical'
            }
          },
          {
            type: 'meta',
            tagId: 'meta-name',
            attrs: {
              name: 'foo',
              content: 'root-meta'
            }
          }
        ]
      }
    },{
      handler: {
        headTags() {
          return [
            {
              type: 'link',
              tagId: 'canonical-link',
              attrs: {
                rel: 'canonical',
                href: 'nested-canonical'
              }
            },
            {
              type: 'meta',
              tagId: 'meta-title',
              attrs: {
                title: 'foo',
                content: 'nested-meta'
              }
            }
          ];
        }
      }
    }
  ];
  var service = this.subject({
    renderer: {},
    router: {
      router: {
        currentHandlerInfos: handlers
      }
    }
  });

  service.collectHeadTags();
  assert.deepEqual(
    service.get('renderer.headTags'),
    [
      {
        type: 'link',
        tagId: 'canonical-link',
        attrs: {
          rel: 'canonical',
          href: 'nested-canonical'
        }
      },
      {
        type: 'meta',
        tagId: 'meta-name',
        attrs: {
          name: 'foo',
          content: 'root-meta'
        }
      },
      {
        type: 'meta',
        tagId: 'meta-title',
        attrs: {
          title: 'foo',
          content: 'nested-meta'
        }
      }
    ]
  );
});
