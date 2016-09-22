export function initialize(application) {
  application.inject('service:head-tags', 'router', 'router:main');
}

export default {
  name: 'head-tags',
  initialize: initialize
};
