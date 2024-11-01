/* eslint-disable no-restricted-globals */

import { MissingUrlParamError } from './errors';

export const delay = (retryCount: number) => new Promise(
  (resolve) => setTimeout(resolve, 10 ** (retryCount + 1)),
);

export const isObject = (value: any) => Object
  .prototype
  .toString
  .call(value) === '[object Object]' && value !== null;

export const keysToCamelCase = (value: any): any => {
  if (Array.isArray(value)) {
    return value.map(keysToCamelCase);
  }
  if (isObject(value)) {
    const newObj: { [key: string]: any } = {};

    Object.entries(value).forEach(([key, val]) => {
      const newKey = key.charAt(0).toLowerCase() + key.slice(1);
      newObj[newKey] = keysToCamelCase(val);
    });
    return newObj;
  }
  return value;
};

export const replaceUrlPlaceholders = (url: string, data: Record<string, any>) => {
  const matches = url.match(/{[^{}]+}/gi);
  const getKey = (str: string) => str.slice(1, -1);

  if (!matches) return url;

  const missingProp = matches.find((str) => {
    const key = getKey(str);
    return data[key] === undefined;
  });

  if (missingProp) {
    throw new MissingUrlParamError(missingProp);
  }

  return matches?.reduce((newUrl, substr) => {
    const key = getKey(substr);
    return newUrl.replace(substr, `${data[key]}`);
  }, url);
};

/**
 *  avoid duplicate forward slash
 *  - except for https://
 */
export const removeDuplicateSlashes = (url: string) => {
  const regex = /[^:]\/{2,}/g;
  return url.replace(regex, (match) => `${match.charAt(0)}/`);
};
