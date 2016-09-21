export function initialize(instance) {
  const container = instance.lookup ? instance : instance.container;
  let service = container.lookup('service:head-tags');
  service.get('router').on('didTransition', function() {
    service.collectHeadTags();
  });
}

export default {
  name: 'head-tags',
  initialize: initialize
};
