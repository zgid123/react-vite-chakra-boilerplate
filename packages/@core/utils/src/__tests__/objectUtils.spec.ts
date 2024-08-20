import { describe, expect, it } from 'vitest';

import { deepCamelizeKeys, deepSnakizeKeys } from '../objectUtils';

const snakizedData = {
  user_info: {
    first_name: 'test',
    bank_account: {
      name: 'My Bank',
      account_number: '123456789',
    },
  },
};

const camelizedData = {
  userInfo: {
    firstName: 'test',
    bankAccount: {
      name: 'My Bank',
      accountNumber: '123456789',
    },
  },
};

describe('deepCamelizeKeys', () => {
  it('camelizes object keys', () => {
    expect(deepCamelizeKeys(snakizedData)).toEqual(camelizedData);
  });
});

describe('deepSnakizeKeys', () => {
  it('snakizes object keys', () => {
    expect(deepSnakizeKeys(camelizedData)).toEqual(snakizedData);
  });
});
