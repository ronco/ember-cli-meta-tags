import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/head-tag';

export default Component.extend({
  layout: layout,

  init() {
    this._super(...arguments);
    this.set('tagName', this.get('headTag.type'));
  },

  // expected head tag attributes
  attributeBindings: [
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
    'async',
    'defer',
    'src',
    'property',
    'itemprop'
  ],
  href:         reads('headTag.attrs.href'),
  target:       reads('headTag.attrs.target'),
  charset:      reads('headTag.attrs.charset'),
  crossorigin:  reads('headTag.attrs.crossorigin'),
  hreflang:     reads('headTag.attrs.hreflang'),
  media:        reads('headTag.attrs.media'),
  rel:          reads('headTag.attrs.rel'),
  rev:          reads('headTag.attrs.rev'),
  sizes:        reads('headTag.attrs.sizes'),
  type:         reads('headTag.attrs.type'),
  content:      reads('headTag.attrs.content'),
  'http-equiv': reads('headTag.attrs.http-equiv'),
  name:         reads('headTag.attrs.name'),
  scheme:       reads('headTag.attrs.scheme'),
  async:        reads('headTag.attrs.async'),
  defer:        reads('headTag.attrs.defer'),
  src:          reads('headTag.attrs.src'),
  property:     reads('headTag.attrs.property'),
  itemprop:     reads('headTag.attrs.itemprop')

});
