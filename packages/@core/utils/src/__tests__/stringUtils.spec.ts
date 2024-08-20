import { describe, expect, it, suite } from 'vitest';

import { camelize, combine, snakize } from '../stringUtils';

describe('combine', () => {
  suite('with default options', () => {
    it('combines strings', () => {
      expect(combine('test', 'test', 'test')).toBe('test test test');
    });
  });

  suite('with custom joinWith', () => {
    it('combines with joinWith value', () => {
      expect(
        combine(
          {
            joinWith: '...',
          },
          'test',
          'test',
        ),
      ).toBe('test...test');
    });
  });

  suite('with undefined value', () => {
    it('combines without undefined value', () => {
      expect(combine('test', undefined, 'test')).toBe('test test');
    });
  });

  suite('with empty string value', () => {
    it('combines without empty string value', () => {
      expect(combine('test', '', 'test')).toBe('test test');
    });
  });
});

describe('camelize', () => {
  it('camelizes string', () => {
    expect(camelize('test_test')).toBe('testTest');
  });
});

describe('snakize', () => {
  it('snakizes string', () => {
    expect(snakize('testTest')).toBe('test_test');
  });
});
