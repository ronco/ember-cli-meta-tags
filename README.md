# ember-cli-meta-tags

An [Ember CLI](http://www.ember-cli.com/) add-on to easily set `<meta>`
tags in the document head.

Many social networks, sharing platforms, and search engines extract
data from `<meta>` tags within a page's head tag.  With this add-on,
you can have those meta tags populated when entering individual Ember
routes.  This allows you to keep all logic within your client side
application without needing a sophisticated web server to populate tags
correctly.

This add-on is perfect for combining with a prerendering
server side solution such as [prerender.io](http://www.prerender.io)
or eventually with
[Ember Fastboot](https://github.com/tildeio/ember-cli-fastboot).

## Usage

### Installation

In your Ember CLI project directory run:
```
ember install:addon ember-cli-meta-tags
```

### Adding Tags Automatically On Transition

In order to dynamically add meta tags from your routes you will need
to mixin the `RouteMetaMixin` into your route and then provide the
appropriate meta tag object.

##### Meta function

You can provide the meta by implementing a `meta` method on the route
that returns the appropriate meta tags.

###### Example:

```javascript
// app/routes/some-page.js
import Ember from 'ember';
import RouteMetaMixin from 'ember-cli-meta-tags/mixins/route-meta';

export default Ember.Route.extend(RouteMetaMixin, {
  meta: function() {
    return {
      'property': {
        'og:name': 'Ice-T',
        'og:image': 'http://upload.wikimedia.org/wikipedia/en/b/b6/Ice-T-O.G._Original_Gangster_(album_cover_with_matt).jpg'
      },
      'name': {
        'twitter:image': 'http://upload.wikimedia.org/wikipedia/en/b/b6/Ice-T-O.G._Original_Gangster_(album_cover_with_matt).jpg'
      }
    };
  }
});
```

When you visit '/some-page' the document head tag will look be
updated:

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
route.meta.  This can either be in-lined in your route definition, or
set as a property on the route prior to did-transition.

###### Example
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

### Resetting Tags Outside of Transition

If you want to update the meta tags for a route outside of a full
transition (perhaps due to a controller query parameter change)
you can fire the `resetMeta` action from the controller or route and
the meta tags will be rebuilt with the new contents returned from
`meta()`.

##### Example

```javascript
// app/controller/some-page.js
import Ember from 'ember';

export default Ember.Controller.extend({
  queryParameters: {
    era: 'e'
  },
  eraObserver: Ember.observer('era', function() {
    this.send('resetMeta');
  }),
});
```

## Public API Documentation

### RouteMetaMixin

Suitable for mixing into Routes.

#### meta()

This method should return an object representing the desired meta
tag structure.

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

Called during `didTransition` phase of the route lifecycle.  The model
for the route will be resolved and available for use at this time.

#### resetMeta

RouteMetaMixin routes respond to the `resetMeta` action.  This will
re-run the meta construction method for the route catching the
action.  The action does not bubble.


## Development

Instructions for developing on this add-on.

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
