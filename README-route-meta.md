## Legacy Route Meta Mixin Support

The original edition of this library only supported setting meta tags
on the document and did so by way of a route mixin
(`RouteMetaMixin`).

Using this mixin will continue to be supported for the foreseeable
future, and may provide a simpler way to populate head tags on in your
Ember app if you only need meta tags.  It is now simply a wrapper
around the headTags service functionality.

Herein lies the original documentation for this mixin.

### Adding Tags Automatically On Transition

In order to dynamically add meta tags from your routes you will need
to mixin the `RouteMetaMixin` into your route and then provide the
appropriate meta tag object.

##### Meta function

You can provide the meta by implementing a `meta` method on the route
that returns the appropriate meta tags.

###### <a name='method-example'></a>Example:

```javascript
// app/routes/some-page.js
import Ember from 'ember';
import RouteMetaMixin from 'ember-cli-meta-tags/mixins/route-meta';

export default Ember.Route.extend(RouteMetaMixin, {
  meta: function() {
    // here we are pulling meta data from the model for this route
    let model = this.modelFor(this.routeName);
    return {
      'property': {
        'og:name': model.get('name'),
        'og:image': model.get('imageUrl')
      },
      'name': {
        'twitter:image': model.get('imageUrl')
      }
    };
  }
});
```

When you visit '/some-page' the document head tag will be updated as
follows:

```html
<head>
  <!-- ... -->
  <meta property='og:name' content='Ice-T'>
  <meta property='og:image' content='http://upload.wikimedia.org/wikipedia/en/b/b6/Ice-T-O.G._Original_Gangster_(album_cover_with_matt).jpg'>
  <meta name='twitter:image' content='http://upload.wikimedia.org/wikipedia/en/b/b6/Ice-T-O.G._Original_Gangster_(album_cover_with_matt).jpg'>
  <!-- ... -->
</head>
```

These tags will automatically be cleared when transitioning away from
this route.

##### Meta object

You can also define the tags by providing an object as the value for
the meta property on the route.  This can either be in-lined in your
route definition, or set as a property on the route prior to
the didTransition event.

###### Example: static meta property on the route
```javascript
// app/routes/some-page.js
import Ember from 'ember';
import RouteMetaMixin from 'ember-cli-meta-tags/mixins/route-meta';

export default Ember.Route.extend(RouteMetaMixin, {
  meta: {
    'property': {
      'og:name': 'Ice-T',
      'og:image': 'http://upload.wikimedia.org/wikipedia/en/b/b6/Ice-T-O.G._Original_Gangster_(album_cover_with_matt).jpg'
    },
    'name': {
      'twitter:image': 'http://upload.wikimedia.org/wikipedia/en/b/b6/Ice-T-O.G._Original_Gangster_(album_cover_with_matt).jpg'
    }
  }
});
```

###### Example: Setting the meta property in afterModel
```javascript
export default Ember.Route.extend(RouteMetaMixin,{

 afterModel: function(model) {
   this.setMetaTags(model);
 },

 setMetaTags: function (model) {
   var metaTags = {
     'name': {
       'description' : model.get('description'),
       'keywords'    : model.get('name')
      }
   };

   this.set('meta', metaTags);
 }

}
```

### Resetting Tags Outside of Transition

If you want to update the meta tags for a route outside of a full
transition (perhaps due to a controller query parameter change)
you can fire the `resetMeta` action from the controller or route and
the meta tags will be rebuilt with the new contents returned from
the `meta` property function or object.

##### Example

```javascript
// app/routes/some-page.js
import Ember from 'ember';
import RouteMetaMixin from 'ember-cli-meta-tags/mixins/route-meta';

export default Ember.Route.extend(RouteMetaMixin, {
  meta: function() {
    let controller = this.controllerFor(this.routeName);
    // value of meta tags updates with value of `era` on this
    // route's controller
    return {
      'property': {
        'title': controller.get('era')
      }
    }
  }
}


// app/controller/some-page.js
import Ember from 'ember';

export default Ember.Controller.extend({
  queryParameters: {
    era: 'e'
  },
  // this observer runs whenever the era query parameter updates
  // which by default does not trigger a full route transition
  // so we need to notify the mixin to reset the meta tags
  eraObserver: Ember.observer('era', function() {
    // This action will cause the mixin to recompute the 
    //  meta tags for the current route
    this.send('resetMeta');
  }),
});
```

## Public API Documentation

### RouteMetaMixin

Suitable for mixing into Routes.

#### meta property

This is a property on the route that the mixin looks for to determine
the appropriate meta tags to set on the page.  The value of this
property can either be a function or a plain POJO.

##### As a method

`meta: function()`

When the `meta` property resolves to a function that function will be
executed by the mixin with the route as the current context.

This method should return an object representing the desired meta tag
structure.  This POJO should match the structure detailed
[below](#meta-definition-object).

Called during `didTransition` phase of the route lifecycle.  The model
for the route will be resolved and available for use at this time.
You can see this in action [above](#method-example).

##### As a POJO

You can also set the value of the `meta` property to an object and
that will be used directly to populate the meta tags.  This should
also be of the structure detailed [below](#meta-definition-object).

#### <a name='meta-definition-object'></a>Meta Definition Object

The keys of this object represent which attribute will be used to
identify the attribute descriptor for the meta tag (ie `property` or
`name`).  The values for those descriptors are then objects
themselves, including the key/value pairs to be set as the descriptor
attribute value and content value.

##### Example structure
```javascript
'property': {
  'og:name': '<content-value>'
},
'name': {
  'twitter:name': '<content-value>'
}

```
This will result in the following meta tags, assuming your
content-value is equal to 'Ice-T'.

```
  <meta property='og:name' content='Ice-T'>
  <meta property='twitter:name' content='Ice-T'>
```
  
#### resetMeta

RouteMetaMixin routes respond to the `resetMeta` action.  This will
re-run the meta construction method for the route catching the
action.  The action does not bubble.
