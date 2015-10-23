import Ember from 'ember';
import instanceInitializer from 'ember-cli-meta-tags/instance-initializers/head-tags';

if (Ember.Application.instanceInitializer) {
  Ember.Application.instanceInitializer(instanceInitializer);
}

export function initialize() {
  const application = arguments[1] || arguments[0];
  const container = application.__container__;
  application.inject('service:head-tags', 'router', 'router:main');

  // Ember >= 1.12
  if (application.instanceInitializer) {
    return;
  }

  // Ember < 1.12
  instanceInitializer.initialize(container);
}

export default {
  name: 'head-tags',
  initialize: initialize
};
