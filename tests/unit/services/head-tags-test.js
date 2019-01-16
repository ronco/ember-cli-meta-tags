import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { defineProperty } from '@ember/object';

module('Unit | Service | head tags', function(hooks) {
  setupTest(hooks);

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
    let service = this.owner.factoryFor('service:head-tags').create({
      router: {
        targetState: {
          routerJsState: {
            routeInfos: [{ handler }]
          }
        }
      }
    });

    run(() => {
      service.collectHeadTags();
    });
    assert.deepEqual(
      service.get('headData.headTags'),
      [{
        type: 'link',
        attrs: {
          rel: 'canonical'
        }
      }]
    );
  });

  test('it collects head tags from CP', function(assert) {
    assert.expect(1);

    let handler = {};
    defineProperty(handler, 'headTags', computed(function() {
        return [{
          type: 'link',
          attrs: {
            rel: 'canonical'
          }
        }];
    }));
    let service = this.owner.factoryFor('service:head-tags').create({
      router: {
        targetState: {
          routerJsState: {
            routeInfos: [{ handler }]
          }
        }
      }
    });

    run(() => {
      service.collectHeadTags();
    });
    assert.deepEqual(
      service.get('headData.headTags'),
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
    let service = this.owner.factoryFor('service:head-tags').create({
      router: {
        targetState: {
          routerJsState: {
            routeInfos: [{ handler }]
          }
        }
      }
    });

    run(() => {
      service.collectHeadTags();
    });
    assert.deepEqual(
      service.get('headData.headTags'),
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
    let service = this.owner.factoryFor('service:head-tags').create({
      router: {
        targetState: {
          routerJsState: {
            routeInfos: handlers
          }
        }
      }
    });

    run(() => {
      service.collectHeadTags();
    });
    assert.deepEqual(
      service.get('headData.headTags'),
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
});
