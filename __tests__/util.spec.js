import { addLeadingSlash } from '../src/util.js';

describe('addLeadingSlash()', () => {
  it('should add leading slash if given path does not have it', () => {
    expect(addLeadingSlash('foo/bar.json')).toBe('/foo/bar.json');
  });

  it('should not add leading slash to path with leading slash', () => {
    expect(addLeadingSlash('/foo/bar.json')).toBe('/foo/bar.json');
  });
});
