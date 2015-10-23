import Ember from 'ember';
import layout from '../templates/components/head-tags';

export default Ember.Component.extend({
  tagName: '',
  headTags: Ember.A([]),
  layout: layout
});
