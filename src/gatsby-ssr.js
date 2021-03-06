import React from 'react';
import { withPrefix as fallbackWithPrefix, withAssetPrefix } from 'gatsby';
import { defaultOptions } from './internals';
import { addLeadingSlash } from './util';

// TODO: remove for Gatsby v3
const withPrefix =
  withAssetPrefix || /* istanbul ignore next */ fallbackWithPrefix;

function shouldCreateLinkInHead(option, pathname) {
  if (option === false) {
    return false;
  } else if (option === true) {
    return true;
  }
  return new RegExp(option).test(pathname);
}

function renderLinksInHead({ pathname, setHeadComponents }, feedOptions) {
  const { createLinkInHead } = { ...defaultOptions, ...feedOptions };
  const output = { ...defaultOptions.output, ...feedOptions.output };

  if (!shouldCreateLinkInHead(createLinkInHead, pathname)) {
    return;
  }

  output.rss2 = addLeadingSlash(output.rss2);
  output.atom = addLeadingSlash(output.atom);
  output.json = addLeadingSlash(output.json);

  setHeadComponents([
    <link
      key={`@fec/gatsby-plugin-feed-rss2`}
      rel="alternate"
      type="application/rss+xml"
      href={withPrefix(output.rss2)}
    />,
    <link
      key={`@fec/gatsby-plugin-feed-atom`}
      rel="alternate"
      type="application/atom+xml"
      href={withPrefix(output.atom)}
    />,
    <link
      key={`@fec/gatsby-plugin-feed-json`}
      rel="alternate"
      type="application/json"
      href={withPrefix(output.json)}
    />,
  ]);
}

exports.onRenderBody = ({ pathname, setHeadComponents }, pluginOptions) => {
  if (pluginOptions.feeds && !Array.isArray(pluginOptions.feeds)) {
    throw new Error('@fec/gatsby-plugin-feed `feeds` option must be an array.');
  } else if (!pluginOptions.feeds) {
    renderLinksInHead({ pathname, setHeadComponents }, {});
    return;
  }
  pluginOptions.feeds.forEach((feedOptions) =>
    renderLinksInHead({ pathname, setHeadComponents }, feedOptions)
  );
};
