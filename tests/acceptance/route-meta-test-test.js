import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, currentURL } from '@ember/test-helpers';

module('Acceptance: RouteMetaMixin', function (hooks) {
  setupApplicationTest(hooks);

  hooks.afterEach(function () {
    document.querySelector('head meta[property^="og:"]').remove();
  });

  test('Can set dir on application route', async function (assert) {
    await visit('/');
    assert.equal(
      await document.querySelectorAll('meta[property="og:title"]').length,
      1
    );
    assert.equal(
      await document
        .querySelector('meta[property="og:title"]')
        .getAttribute('dir'),
      'ltr'
    );
  });

  test('Sets and clears meta', async function (assert) {
    await visit('/route-1');
    assert.equal(
      await document.querySelectorAll('meta[property="og:name"]').length,
      1
    );
    assert.equal(
      await document
        .querySelector('meta[property="og:name"]')
        .getAttribute('content'),
      'Ice-T'
    );
    await visit('/route-2');
    assert.equal(
      await document.querySelectorAll('meta[property="og:name"]').length,
      1
    );
    assert.equal(
      await document
        .querySelector('meta[property="og:name"]')
        .getAttribute('content'),
      'Ice-Cube'
    );
  });

  test('Sets and clears meta from object property', async function (assert) {
    await visit('/route-object-1');
    assert.equal(
      await document.querySelectorAll('meta[property="og:name"]').length,
      1
    );
    assert.equal(
      await document
        .querySelector('meta[property="og:name"]')
        .getAttribute('content'),
      'Eazy-E'
    );
    await visit('/route-object-2');
    assert.equal(
      await document.querySelectorAll('meta[property="og:name"]').length,
      1
    );
    assert.equal(
      await document
        .querySelector('meta[property="og:name"]')
        .getAttribute('content'),
      'Dre'
    );
  });

  test('has meta for all route-meta routes in hierarchy', async function (assert) {
    await visit('/resource/sub');
    assert.equal(currentURL(), '/resource/sub');
    assert.equal(
      await document.querySelectorAll('meta[property="og:name"]').length,
      1
    );
    assert.equal(
      await document
        .querySelector('meta[property="og:name"]')
        .getAttribute('content'),
      'Sub Zero'
    );
    assert.equal(
      await document.querySelectorAll('meta[property="og:type"]').length,
      1
    );
    assert.equal(
      await document
        .querySelector('meta[property="og:type"]')
        .getAttribute('content'),
      'Root'
    );
  });

  test('has meta for all route-meta routes in hierarchy deeper wins', async function (assert) {
    await visit('/resource/sub/deep');
    assert.equal(currentURL(), '/resource/sub/deep');
    assert.equal(
      await document.querySelectorAll('meta[property="og:name"]').length,
      1
    );
    assert.equal(
      await document
        .querySelector('meta[property="og:name"]')
        .getAttribute('content'),
      'Deep Freeze'
    );
    assert.equal(
      await document.querySelectorAll('meta[property="og:type"]').length,
      1
    );
    assert.equal(
      await document
        .querySelector('meta[property="og:type"]')
        .getAttribute('content'),
      'Root'
    );
  });
});
