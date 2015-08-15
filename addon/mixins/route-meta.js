import Ember from 'ember';
// Route mixin for setting head meta tags on transition into/out of route

// @example How to set meta tags on a route
//   ExampleRoute = Ember.Route.extend RouteMetaMixin,
//     meta: ->
//       return
//         meta_property_name1: meta_value1
//         meta_property_name2: meta_value2

const keys = Object.keys || Ember.keys;

export default Ember.Mixin.create({
  setMeta: function(meta) {
    var $head, $metaProto, $newMetaValues, selectors, metaTypes;
    // don't set meta if route is no longer active
    if (!this._routeMetaIsActiveRoute()) {
      return;
    }
    $head = this._routeMetaGetHead();
    $metaProto = Ember.$('<meta></meta>');
    $newMetaValues = [];
    selectors = [];
    metaTypes = keys(meta);
    metaTypes.forEach(function(meta_type) {
      keys(meta[meta_type]).map(function(key) {
        selectors.push('meta[' + meta_type + '="' + key + '"]');
        $newMetaValues.push($metaProto.clone().attr(meta_type, key)
                            .attr('content', meta[meta_type][key]));
      });
    });
    $head.append($newMetaValues);
    this.set('currentMetaSelectors', selectors);
  },

  clearMeta: function() {
    var $head, selectors;
    selectors = this.get('currentMetaSelectors');
    if (!selectors) {
      return;
    }
    $head = this._routeMetaGetHead();
    $head.find(selectors.join(',')).remove();
    return this.set('currentMetaSelectors', null);
  },

  _runSetMeta: function() {
    var meta = this.get('meta');
    if (typeof meta === 'function') {
      return this.setMeta(meta.apply(this));
    }else if (typeof meta === 'object') {
      return this.setMeta(meta);
    }
  },

  actions: {
    didTransition: function() {
      this._super.apply(this, arguments);
      Ember.run.next(this, this._runSetMeta);
      return true; // bubble
    },
    willTransition: function(/* transition */) {
      this._super.apply(this, arguments);
      this.clearMeta();
      return true; // bubble
    },
    resetMeta: function() {
      this.clearMeta();
      Ember.run.next(this, this._runSetMeta);
      return false; // don't bubble, handled here
    }

  },

  _routeMetaGetHead: function() {
    return Ember.$('head');
  },

  _routeMetaIsActiveRoute: function() {
    return this.router.isActive(this.routeName);
  }
});
