import { isDate, isObjectType } from 'remeda';

import { camelize, snakize } from './stringUtils';

function deepLookup(data: TAny, formatFunc: (str: string) => string): TAny {
  if (Array.isArray(data)) {
    return data.map((datumn) => {
      return deepLookup(datumn, formatFunc);
    });
  }

  if (isDate(data) || !isObjectType(data)) {
    return data;
  }

  return Object.entries(data).reduce((result, [k, v]) => {
    let value;

    if (isDate(v) || !isObjectType(v)) {
      value = v;
    } else {
      value = deepLookup(v, formatFunc);
    }

    Object.assign(result, {
      [formatFunc(k)]: value,
    });

    return result;
  }, {});
}

export function deepCamelizeKeys(data: TAny): TAny {
  return deepLookup(data, camelize);
}

export function deepSnakeizeKeys(data: TAny): TAny {
  return deepLookup(data, snakize);
}
