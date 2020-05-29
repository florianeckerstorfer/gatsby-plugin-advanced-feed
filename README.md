# @fec/gatsby-plugin-advanced-feed

> Gatsby plugin that generates RSS 2, Atom and JSON feeds for your site.

![](https://github.com/florianeckerstorfer/gatsby-plugin-advanced-feed/workflows/Tests/badge.svg)

Made by 👨‍💻 [Florian Eckerstorfer](https://florianeckerstorfer.com) in 🎡 Vienna, Europe.

## Table of Contents

1. [Features](#features)
1. [Differences to gatsby-plugin-feed](#differences-to-gatsby-plugin-feed)
1. [Installation & Setup](#installation-setup)
1. [Configuration](#configuration)
1. [Code of Conduct](#code-of-conduct)
1. [Changelog](#changelog)
1. [License](#license)

## Features

- Generates RSS 2.0
- Generates Atom 1.0
- Generates JSON Feed 1.0
- Supports multiple feeds

## Differences to [gatsby-plugin-feed](https://www.npmjs.com/package/gatsby-plugin-feed)

- ✅ Supports Atom 1.0 and JSON Feed 1.0 in addition to RSS 2.0
- ✅ More options to customize feed description, copyright, author, etc
- ❌ Does not support `serialize` and `query` options (yet)

## Installation & Setup

First you need to install the plugin with NPM or Yarn:

```shell
npm install @fec/gatsby-plugin-advanced-feed --save
yarn add @fec/gatsby-plugin-advanced-feed
```

Next you need add the plugin to the `plugins` list in `gatsby-config.js`:

```javascript
// ./gatsby-config.js
module.exports = {
  // ...
  plugins: [
    // ...
    '@fec/gatsby-plugin-advanced-feed',
  ],
};
```

> ⚠️ Feeds are only generated on `gatsby build`, when running the local development server (`gatsby develop`) no feeds will be generated.

## Configuration

You can configure `@fec/gatsby-plugin-advanced-feed`. The following example contains all configuration options and their default value:

```javascript
// ./gatsby-config.js
module.exports = {
  // ...
  plugins: [
    // ...
    {
    resolve: '@fec/gatsby-plugin-advanced-feed',
    options: {
      feeds: [
        {
          // Configure the feed; smart defaults are choosen if not set
          author: undefined,      // default: site.siteMetadata.author
          copyright: undefined,   // default: "All rights reserved {year}, {site.siteMetadata.author}"
          description: undefined, // default: site.siteMetadata.description
          email: false,           // default: false ➞ no email in feed; undefined ➞ site.siteMetadata.email
          id: undefined,          // default: site.siteMetadata.siteUrl
          link: undefined,        // default: site.siteMetadata.siteUrl
          title: undefined,       // default: site.siteMetadata.title

          // Add <link> tags in <head> to feeds
          createLinkInHead: true, // `true` for all pages or regular expression to match pathnames

          // Number of articles to include in feed
          limit: 10,

          // Include all pages which `fileAbsolutePath` matches this regular expression
          match: '^/blog/',

          // File names of generated feeds
          output: {
            rss2: 'rss.xml',
            atom: 'atom.xml',
            json: 'feed.json',
          },
        }
      ],
    },
  ],
};
```

### Include <link> only in certain pages

`@fec/gatsby-plugin-advanced-feed` allows you to link the feeds in the `<head>` or your page. This can be configured on a per-feed basis. If the option `createLinkInHead` for a feed is `true` the `<link>` will be included on all pages. You can include the `<link>` only for certain pages by specifying a regular expression.

In the following example the `<link>` tags will only be inserted on all pages which `pathname` matches the regular expression `/^\/blog/`:

```javascript
// ./gatsby-config.js
module.exports = {
  // ...
  plugins: [
    // ...
    {
      resolve: '@fec/gatsby-plugin-advanced-feed',
      options: {
        feeds: [
          createLinkInHead: /^\/blog/,
        ]
      }
    }
  ],
};
```

## Code of Conduct

See [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md)

## Changelog

See [CHANGELOG](CHANGELOG.md)

## License

See [LICENSE](LICENSE.md)
