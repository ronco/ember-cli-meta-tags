# ember-cli-meta-tags [![Build Status](https://travis-ci.org/ronco/ember-cli-meta-tags.svg?branch=master)](https://travis-ci.org/ronco/ember-cli-meta-tags)[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-meta-tags.svg)](https://emberobserver.com/addons/ember-cli-meta-tags)

An [Ember CLI](http://www.ember-cli.com/) add-on to easily set tags
(`link`, `meta`, `script`, `noscript`, etc.) in the document head.

Many social networks, sharing platforms, and search engines extract
data from `<meta>` tags within a page's head tag. With this add-on,
you can have those meta tags populated when entering individual Ember
routes. This allows you to keep all logic within your client side
application without needing a sophisticated web server to populate tags
correctly.

This add-on is perfect for combining with a prerendering
server side solution such as [prerender.io](http://www.prerender.io)
or with
[Ember FastBoot](https://github.com/tildeio/ember-cli-fastboot) (FastBoot compatibility requires ember-cli-meta-tags v2+ and Ember 2.7+).

## Compatibility

- Ember.js v3.24 or above
- Ember CLI v3.24 or above
- Node.js v14 or above

## Installation

```
ember install ember-cli-meta-tags
```

## Usage

### Upgrading to 7.x

Version 7+ requires Node.js 14+, Ember 3.24+ and [ember-cli-head](https://github.com/ronco/ember-cli-head) 2+

`RouteMetaMixin` was removed and `metaToHeadTags` function was introduced to partially keep original behaviour.

**BEFORE**

```javascript
import Route from '@ember/routing/route';
import RouteMetaMixin from 'ember-cli-meta-tags/mixins/route-meta';

export default Route.extend(RouteMetaMixin, {
  meta() {
    return {
      property: {
        'og:type': 'Root',
      },
    };
  },
});
```

**AFTER**

```javascript
import Route from '@ember/routing/route';
import { metaToHeadTags } from 'ember-cli-meta-tags';

export default class extends Route {
  headTags() {
    return metaToHeadTags({
      property: {
        'og:type': 'Root',
      },
    });
  }
}
```

### Upgrading to 5.x

Version 5.0 of this addon depends on [ember-cli-head](https://github.com/ronco/ember-cli-head) 0.4.0, which adds the requirement that the `<HeadLayout />` is added once in an application-wide template (usually `app/templates/application.hbs`). For more info, see the [ember-cli-head 0.4 upgrade note](https://github.com/ronco/ember-cli-head#upgrade-to-04x).

### Using with Ember FastBoot

Version 4.0+ of this addon is designed to work with FastBoot >= 1.0.0-rc1. If you use
an order version of fastboot stick with 3.X.

Version 2.0+ of this addon is built upon
[ember-cli-head](https://github.com/ronco/ember-cli-head) and as a
result it will work automatically out of the box with Ember FastBoot
if you are running a version of Ember >= 2.7.

#### Using with other ember-cli-head addons

If you are using another addon that makes use of `ember-cli-head`
(such as
[ember-page-title](https://github.com/tim-evans/ember-page-title)), or
are directly using `ember-cli-head` in your app you will need to
create a custom `app/templates/head.hbs` file and include
`ember-cli-meta-tag`'s component:

```hbs
<HeadTags @headTags={{this.model.headTags}} />
```

### Adding Tags Automatically On Transition

In order to dynamically add head tags from your routes all you need to
do is provide a `headTags` property on the route. This property can
either be an array of tags, or a function which when invoked with the
route's context returns an array of tags. The head tags service will
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
without creating duplicate tags. Deeper nested routes will override
parent route tags. In order to support this you need to provide a
unique `tagId` property on your tag definition. Only one tag with a
given `tagId` will ever be rendered in the head.

##### Head Tags object

You can also define the tags by providing an object as the value for
the meta property on the route. This can either be in-lined in your
route definition, or set as a property on the route prior to
the didTransition event.

###### Example: static headTags property on the route

```javascript
// app/routes/some-page.js
import Route from '@ember/routing/route';

export default class extends Route {
  headTags = [
    {
      type: 'meta',
      tagId: 'meta-og-name',
      attrs: {
        property: 'og:name',
        content: 'Ice-T',
      },
    },
    {
      type: 'link',
      tagId: 'canonical-link',
      attrs: {
        rel: 'canonical',
        content: 'http://mydomain.org/',
      },
    },
  ];
}
```

###### Example: Setting the headTags property in afterModel

```javascript
import Route from '@ember/routing/route';

export default class extends Route {
  afterModel(model) {
    this.setHeadTags(model);
  }

  setHeadTags(model) {
    let headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag',
        attrs: {
          name: 'description',
          content: model.get('description'),
        },
      },
    ];

    this.headTags = headTags;
  }
}
```

##### headTags function

You can provide the headTags by implementing a `headTags` method on the route
that returns the appropriate head tags.

###### <a name='method-example'></a>Example:

```javascript
// app/routes/some-page.js
import Route from '@ember/routing/route';

export default class extends Route {
  headTags() {
    // here we are pulling meta data from the model for this route
    let model = this.modelFor(this.routeName);
    return [
      {
        type: 'meta',
        tagId: 'meta-description-tag',
        attrs: {
          name: 'description',
          content: model.description,
        },
      },
    ];
  }
}
```

When you visit '/some-page' the document head tag will be updated as
follows:

```html
<head>
  <!-- ... -->
  <meta name="description" content="Ice-T" />
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
import Route from '@ember/routing/route';

export default class extends Route {
  headTags() {
    let controller = this.controllerFor(this.routeName);
    // value of head tags updates with value of `era` on this
    // route's controller
    return [{
      type: 'meta',
      tagId: 'meta-title',
      attrs: {
        property: 'title',
        content: controller.era
      }
    }]
  }
}


// app/controller/some-page.js
import Controller from '@ember/controller';

export default class extends Controller {
  @service headTagsService;
  queryParameters = {
    era: 'e'
  };
  // this observer runs whenever the era query parameter updates
  // which by default does not trigger a full route transition
  // so we need to notify the service to rebuild tags
  @observer('era') eraObserver() {
    this.headTagsService.collectHeadTags();
  }
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
