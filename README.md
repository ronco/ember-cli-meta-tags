# Ember-cli-meta-tags [![Build Status](https://travis-ci.org/ronco/ember-cli-meta-tags.svg?branch=master)](https://travis-ci.org/ronco/ember-cli-meta-tags)[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-meta-tags.svg)](https://emberobserver.com/addons/ember-cli-meta-tags)

An [Ember CLI](http://www.ember-cli.com/) add-on to easily set tags
(`link`, `meta`, `script`, `noscript`, etc.) in the document head.

Many social networks, sharing platforms, and search engines extract
data from `<meta>` tags within a page's head tag.  With this add-on,
you can have those meta tags populated when entering individual Ember
routes.  This allows you to keep all logic within your client side
application without needing a sophisticated web server to populate tags
correctly.

This add-on is perfect for combining with a prerendering
server side solution such as [prerender.io](http://www.prerender.io)
or with
[Ember Fastboot](https://github.com/tildeio/ember-cli-fastboot) (Fastboot compatibility requires ember-cli-meta-tags v2+ and Ember 2.7+ (currently beta)).

## Usage

### Installation

In your Ember CLI project directory run:
```
ember install ember-cli-meta-tags
```

### Using with Ember Fastboot

Version 2.0+ of this addon is built upon
[ember-cli-head](https://github.com/ronco/ember-cli-head) and as a
result is will work automatically out of the box with Ember Fastboot
if you are running a version of ember >= 2.7.

#### Using with other ember-cli-head addons

If you are using another addon that makes use of `ember-cli-head`
(such as
[ember-page-title](https://github.com/tim-evans/ember-page-title)), or
are directly using `ember-cli-head` in your app you will need to
create a custom `app/templates/head.hbs` file and include
`ember-cli-meta-tag`'s component:

```hbs
{{head-tags headTags=model.headTags}}
```

### Adding Tags Automatically On Transition

In order to dynamically add head tags from your routes all you need to
do is provide a `headTags` property on the route.  This property can
either be an array of tags, or a function which when invoked with the
route's context returns an array of tags.  The head tags service will
automatically collect all head tags from the currently active routes
after transition.

#### Data structure

To define a head tag you will use the following structure:

```javascript
  {
    // html element type (meta, link, etc.)
    type: 'meta',
    // unique id for nesting (see below)
    tagId: 'meta-description-tag',
    // key value attributes for the element
    attrs: {
      name: 'description',
      content: model.get('description')
    },
    // optional element content
    content: 'Element content here'
  }
```

#### Nesting

This library supports pulling tag definitions from nested routes
without creating duplicate tags.  Deeper nested routes will override
parent route tags.  In order to support this you need to provide a
unique `tagId` property on your tag definition.  Only one tag with a
given `tagId` will ever be rendered in the head.

##### Head Tags object

You can also define the tags by providing an object as the value for
the meta property on the route.  This can either be in-lined in your
route definition, or set as a property on the route prior to
the didTransition event.

###### Example: static headTags property on the route
```javascript
// app/routes/some-page.js
import Ember from 'ember';

export default Ember.Route.extend({
  headTags: [{
      type: 'meta',
      tagId: 'meta-og-name',
      attrs: {
        property: 'og:name',
        content: 'Ice-T'
      }
    },
    {
      type: 'link',
      tagId: 'canonical-link',
      attrs: {
        rel: 'canonical',
        content: 'http://mydomain.org/'
      }
    }]
});
```

###### Example: Setting the headTags property in afterModel
```javascript
export default Ember.Route.extend({

 afterModel: function(model) {
   this.setHeadTags(model);
 },

 setHeadTags: function (model) {
   var headTags = [{
     type: 'meta',
     tagId: 'meta-description-tag',
     attrs: {
       name: 'description',
       content: model.get('description')
     }
   }];

   this.set('headTags', headTags);
 }

}
```

##### headTags function

You can provide the headTags by implementing a `headTags` method on the route
that returns the appropriate head tags.

###### <a name='method-example'></a>Example:

```javascript
// app/routes/some-page.js
import Ember from 'ember';

export default Ember.Route.extend({
  headTags: function() {
    // here we are pulling meta data from the model for this route
    let model = this.modelFor(this.routeName);
    return [{
      type: 'meta',
      tagId: 'meta-description-tag',
      attrs: {
        name: 'description',
        content: model.get('description')
      }
    }];
  }
});
```

When you visit '/some-page' the document head tag will be updated as
follows:

```html
<head>
  <!-- ... -->
  <meta name='description' content='Ice-T'>
  <!-- ... -->
</head>
```

These tags will automatically be cleared when transitioning away from
this route.

### Resetting Tags Outside of Transition

If you want to update the head tags for a route outside of a full
transition (perhaps due to a controller query parameter change)
you can directly call `collectHeadTags` on the `head-tags` service and
all of the headTags in the current route hierarchy will be re-built.

##### Example

```javascript
// app/routes/some-page.js
import Ember from 'ember';

export default Ember.Route.extend(RouteMetaMixin, {
  headTags: function() {
    let controller = this.controllerFor(this.routeName);
    // value of head tags updates with value of `era` on this
    // route's controller
    return [{
      type: 'meta',
      tagId: 'meta-title',
      attrs: {
        property: 'title',
        content: controller.get('era')
      }
    }]
  }
}


// app/controller/some-page.js
import Ember from 'ember';

export default Ember.Controller.extend({
  headTagsService: Ember.inject.service('head-tags'),
  queryParameters: {
    era: 'e'
  },
  // this observer runs whenever the era query parameter updates
  // which by default does not trigger a full route transition
  // so we need to notify the service to rebuild tags
  eraObserver: Ember.observer('era', function() {
    this.get('headTagsService').collectHeadTags();
  }),
});
```

### Route Meta Mixin

Including the RouteMetaMixin in your routes is no longer necessary if
you provide the headTags property.  However it's use is still
supported and documented [here](README-route-meta.md).

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
