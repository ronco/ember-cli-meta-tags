export function initialize(appInstance) {
  let service = appInstance.container.lookup('service:head-tags');
  service.get('router').on('didTransition', function() {
    service.collectHeadTags();
  });

  // inject renderer service
  //TODO: build fastboot compatible renderer
  let component = appInstance.container.lookup(
    'component:head-tags'
  );
  service.set('renderer', component);
  component.appendTo('head');
}

export default {
  name: 'head-tags',
  initialize: initialize
};
