/* eslint-disable no-restricted-syntax */
import { MissingUrlParamError } from './errors';
import { isObject, removeDuplicateSlashes, replaceUrlPlaceholders } from './helpers';

describe('isObject', () => {
  it('should return true for objects', () => {
    expect(isObject({})).toBe(true);
  });

  it('should return false for classes', () => {
    class Test {}
    expect(isObject(Test)).toBe(false);
  });

  it('should return false for array', () => {
    expect(isObject([1])).toBe(false);
  });

  it('should return false for primitive values', () => {
    for (const v of ['foo', 22, true]) {
      expect(isObject(v)).toBe(false);
    }
  });

  it('should return false for functions', () => {
    expect(isObject(() => null)).toBe(false);
  });
});

describe('replaceUrlPlaceholders', () => {
  it(`should replace placeholders - {param}
   with the respective value of that param from an object`,
  () => {
    const url = 'https://www.domain.com/{culture}/user-addresses/countries/{countryCode}/states';
    const expectedValue = 'https://www.domain.com/en-us/user-addresses/countries/us/states';
    const data = {
      culture: 'en-us',
      countryCode: 'us',
    };

    expect(replaceUrlPlaceholders(url, data)).toBe(expectedValue);
  });

  it('should throw an error if the key does not exist in the provided object', () => {
    const url = 'https://www.domain.com/{culture}/user-addresses/countries/{countryCode}/states';
    const data = {
      countryCode: 'us',
    };

    expect(() => replaceUrlPlaceholders(url, data)).toThrowError(new MissingUrlParamError('{culture}'));
  });

  it('should return the original url if no placeholders were found', () => {
    const url = '/user-addresses/countries/states';

    expect(replaceUrlPlaceholders(url, {})).toBe(url);
  });
});

describe('removeDuplicateSlashes - Helper', () => {
  it('should remove duplicate forward slashes from a given string', () => {
    const url = 'https://www.domain.com///user-addresses';
    const expected = 'https://www.domain.com/user-addresses';

    expect(removeDuplicateSlashes(url)).toBe(expected);
  });
});
