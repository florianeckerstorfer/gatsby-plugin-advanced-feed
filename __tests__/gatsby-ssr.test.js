import { onRenderBody } from '../src/gatsby-ssr';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

beforeAll(() => {
  global.__PATH_PREFIX__ = '';
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('onRenderBody', () => {
  const setHeadComponents = jest.fn();

  it('should throw error if pluginOptions.feeds is defined and not an array', () => {
    expect(() =>
      onRenderBody({ pathname: '', setHeadComponents }, { feeds: 'invalid' })
    ).toThrow();
  });

  it('should render links in head with default options if pluginOptions.feeds is undefined', () => {
    onRenderBody({ pathname: '', setHeadComponents }, {});

    expect(setHeadComponents).toHaveBeenCalledTimes(1);

    const links = setHeadComponents.mock.calls[0][0];
    expect(links.length).toBe(3);

    const rssLink = render(links[0]).container.querySelector('link');
    const atomLink = render(links[1]).container.querySelector('link');
    const jsonLink = render(links[2]).container.querySelector('link');

    expect(rssLink).toHaveAttribute('href', '/rss.xml');
    expect(rssLink).toHaveAttribute('type', 'application/rss+xml');
    expect(atomLink).toHaveAttribute('href', '/atom.xml');
    expect(atomLink).toHaveAttribute('type', 'application/atom+xml');
    expect(jsonLink).toHaveAttribute('href', '/feed.json');
    expect(jsonLink).toHaveAttribute('type', 'application/json');
  });

  it('should render links in head if pluginOptions.feeds is array', () => {
    onRenderBody({ pathname: '', setHeadComponents }, { feeds: [{}] });

    expect(setHeadComponents).toHaveBeenCalledTimes(1);
    const links = setHeadComponents.mock.calls[0][0];
    expect(links.length).toBe(3);
  });

  it('should render links in head with values from pluginOptions.feeds[].output', () => {
    const output = {
      rss2: 'my-rss.xml',
      atom: 'my-atom.xml',
      json: 'my-feed.json',
    };
    onRenderBody({ pathname: '', setHeadComponents }, { feeds: [{ output }] });

    const links = setHeadComponents.mock.calls[0][0];
    expect(render(links[0]).container.querySelector('link'))
      .toHaveAttribute('href', '/my-rss.xml');
    expect(render(links[1]).container.querySelector('link'))
      .toHaveAttribute('href', '/my-atom.xml');
    expect(render(links[2]).container.querySelector('link'))
      .toHaveAttribute('href', '/my-feed.json');
  });

  it('should not prepend slash if pluginOptions.feeds[].output already contains slash', () => {
    const output = { rss2: '/rss.xml', atom: '/atom.xml', json: '/feed.json' };
    onRenderBody({ pathname: '', setHeadComponents }, { feeds: [{ output }] });

    const links = setHeadComponents.mock.calls[0][0];
    expect(render(links[0]).container.querySelector('link'))
      .toHaveAttribute('href', '/rss.xml');
    expect(render(links[1]).container.querySelector('link'))
      .toHaveAttribute('href', '/atom.xml');
    expect(render(links[2]).container.querySelector('link'))
      .toHaveAttribute('href', '/feed.json');
  });

  it('should not render links in head if `createLinkInHead` is `false`', () => {
    onRenderBody(
      { pathname: '', setHeadComponents },
      { feeds: [{ createLinkInHead: false }] }
    );

    expect(setHeadComponents).not.toHaveBeenCalled();
  });

  it('should not render links in head if `createLinkInHead` is regular expression and pathname does not match', () => {
    onRenderBody(
      { pathname: '/foo/bar', setHeadComponents },
      { feeds: [{ createLinkInHead: /^\/bar/ }] }
    );

    expect(setHeadComponents).not.toHaveBeenCalled();
  });

  it('should render links in head if `createLinkInHead` is regular expression and pathname does match', () => {
    onRenderBody(
      { pathname: '/foo/bar', setHeadComponents },
      { feeds: [{ createLinkInHead: /^\/foo/ }] }
    );

    expect(setHeadComponents).toHaveBeenCalledTimes(1);
  });
});
