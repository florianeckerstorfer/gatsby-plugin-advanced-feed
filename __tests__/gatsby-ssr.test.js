import { onRenderBody } from '../src/gatsby-ssr';
import { shallow } from 'enzyme';

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

    const rssLink = shallow(links[0]);
    const atomLink = shallow(links[1]);
    const jsonLink = shallow(links[2]);

    expect(rssLink.prop('href')).toBe('/rss.xml');
    expect(rssLink.prop('type')).toBe('application/rss+xml');
    expect(atomLink.prop('href')).toBe('/atom.xml');
    expect(atomLink.prop('type')).toBe('application/atom+xml');
    expect(jsonLink.prop('href')).toBe('/feed.json');
    expect(jsonLink.prop('type')).toBe('application/json');
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
    expect(shallow(links[0]).prop('href')).toBe('/my-rss.xml');
    expect(shallow(links[1]).prop('href')).toBe('/my-atom.xml');
    expect(shallow(links[2]).prop('href')).toBe('/my-feed.json');
  });

  it('should not prepend slash if pluginOptions.feeds[].output already contains slash', () => {
    const output = { rss2: '/rss.xml', atom: '/atom.xml', json: '/feed.json' };
    onRenderBody({ pathname: '', setHeadComponents }, { feeds: [{ output }] });

    const links = setHeadComponents.mock.calls[0][0];
    expect(shallow(links[0]).prop('href')).toBe('/rss.xml');
    expect(shallow(links[1]).prop('href')).toBe('/atom.xml');
    expect(shallow(links[2]).prop('href')).toBe('/feed.json');
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
