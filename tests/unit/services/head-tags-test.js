/* eslint-disable ember/no-private-routing-service */
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | head tags', function (hooks) {
  setupTest(hooks);

  test('it collects head tags from function', function (assert) {
    assert.expect(1);
    let route = {
      headTags() {
        return [
          {
            type: 'link',
            attrs: {
              rel: 'canonical',
            },
          },
        ];
      },
    };
    let service = this.owner.factoryFor('service:head-tags').create({
      router: {
        _routerMicrolib: {
          currentHandlerInfos: [{ handler: route, route }],
        },
        targetState: {
          routerJsState: {
            routeInfos: [{ route }],
          },
        },
      },
    });

    service.collectHeadTags();
    assert.deepEqual(service.headData.headTags, [
      {
        type: 'link',
        attrs: {
          rel: 'canonical',
        },
      },
    ]);
  });

  test('it collects head tags from CP', function (assert) {
    assert.expect(1);

    let route = {};
    Object.defineProperty(route, 'headTags', {
      get() {
        return [
          {
            type: 'link',
            attrs: {
              rel: 'canonical',
            },
          },
        ];
      },
    });

    let service = this.owner.factoryFor('service:head-tags').create({
      router: {
        _routerMicrolib: {
          currentHandlerInfos: [{ handler: route, route }],
        },
        targetState: {
          routerJsState: {
            routeInfos: [{ route }],
          },
        },
      },
    });

    service.collectHeadTags();
    assert.deepEqual(service.headData.headTags, [
      {
        type: 'link',
        attrs: {
          rel: 'canonical',
        },
      },
    ]);
  });

  test('it collects head tags from property array', function (assert) {
    assert.expect(1);
    let route = {
      headTags: [
        {
          type: 'link',
          attrs: {
            rel: 'canonical',
          },
        },
      ],
    };
    let service = this.owner.factoryFor('service:head-tags').create({
      router: {
        _routerMicrolib: {
          currentHandlerInfos: [{ handler: route, route }],
        },
        targetState: {
          routerJsState: {
            routeInfos: [{ route }],
          },
        },
      },
    });

    service.collectHeadTags();
    assert.deepEqual(service.headData.headTags, [
      {
        type: 'link',
        attrs: {
          rel: 'canonical',
        },
      },
    ]);
  });

  test('it collects nested tags', function (assert) {
    assert.expect(1);
    let routes = [
      {
        handler: {
          headTags: [
            {
              type: 'link',
              tagId: 'canonical-link',
              attrs: {
                rel: 'canonical',
                href: 'root-canonical',
              },
            },
            {
              type: 'meta',
              tagId: 'meta-name',
              attrs: {
                name: 'foo',
                content: 'root-meta',
              },
            },
          ],
        },
        route: {
          headTags: [
            {
              type: 'link',
              tagId: 'canonical-link',
              attrs: {
                rel: 'canonical',
                href: 'root-canonical',
              },
            },
            {
              type: 'meta',
              tagId: 'meta-name',
              attrs: {
                name: 'foo',
                content: 'root-meta',
              },
            },
          ],
        },
      },
      {
        handler: {
          headTags() {
            return [
              {
                type: 'link',
                tagId: 'canonical-link',
                attrs: {
                  rel: 'canonical',
                  href: 'nested-canonical',
                },
              },
              {
                type: 'meta',
                tagId: 'meta-title',
                attrs: {
                  title: 'foo',
                  content: 'nested-meta',
                },
              },
            ];
          },
        },
        route: {
          headTags() {
            return [
              {
                type: 'link',
                tagId: 'canonical-link',
                attrs: {
                  rel: 'canonical',
                  href: 'nested-canonical',
                },
              },
              {
                type: 'meta',
                tagId: 'meta-title',
                attrs: {
                  title: 'foo',
                  content: 'nested-meta',
                },
              },
            ];
          },
        },
      },
    ];
    let service = this.owner.factoryFor('service:head-tags').create({
      router: {
        _routerMicrolib: {
          currentHandlerInfos: routes,
        },
        targetState: {
          routerJsState: {
            routeInfos: routes,
          },
        },
      },
    });

    service.collectHeadTags();
    assert.deepEqual(service.headData.headTags, [
      {
        type: 'link',
        tagId: 'canonical-link',
        attrs: {
          rel: 'canonical',
          href: 'nested-canonical',
        },
      },
      {
        type: 'meta',
        tagId: 'meta-name',
        attrs: {
          name: 'foo',
          content: 'root-meta',
        },
      },
      {
        type: 'meta',
        tagId: 'meta-title',
        attrs: {
          title: 'foo',
          content: 'nested-meta',
        },
      },
    ]);
  });
});
