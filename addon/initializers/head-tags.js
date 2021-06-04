export function initialize() {
  // ember 1.13 backwards compatibility
  const application = arguments[1] || arguments[0];
  application.inject('service:head-tags', 'router', 'router:main');
}

export default {
  name: 'head-tags',
  initialize: initialize,
};
