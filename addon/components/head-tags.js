import { A } from '@ember/array';
import Component from '@ember/component';
import layout from '../templates/components/head-tags';

export default Component.extend({
  tagName: '',
  headTags: A([]),
  layout: layout,
});
