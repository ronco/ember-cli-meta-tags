import { instanceInitializer } from '../instance-initializers/head-tags';

export function initialize(registry, application) {
  application.inject('service:head-tags', 'router', 'router:main');

  // Ember >= 1.12
  if (application.instanceInitializer) {
    return;
  }

  // Ember < 1.12
  instanceInitializer(registry, application);
}

export default {
  name: 'head-tags',
  initialize: initialize
};
