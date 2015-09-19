export function initialize(appInstance) {
  let service = appInstance.container.lookup('service:head-tags');
  service.get('router').on('didTransition', function() {
    service.collectHeadTags();
  });
}

export default {
  name: 'head-tags',
  initialize: initialize
};
