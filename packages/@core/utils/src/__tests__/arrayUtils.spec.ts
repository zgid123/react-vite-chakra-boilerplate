import { describe, expect, it, suite } from 'vitest';

import { wrapArray } from '../arrayUtils';

describe('wrapArray', () => {
  suite('data as array', () => {
    it('returns data', () => {
      expect(wrapArray(['test', 'test', 'test'])).toEqual([
        'test',
        'test',
        'test',
      ]);
    });
  });

  suite('data as single value', () => {
    it('returns data', () => {
      expect(wrapArray('test')).toEqual(['test']);
    });
  });

  suite('data as undefined', () => {
    it('returns empty array', () => {
      expect(wrapArray(undefined)).toEqual([]);
    });
  });

  suite('data as null', () => {
    it('returns empty array', () => {
      expect(wrapArray(null)).toEqual([]);
    });
  });

  suite('data as empty string', () => {
    it('returns array', () => {
      expect(wrapArray('')).toEqual(['']);
    });
  });

  suite('data as false', () => {
    it('returns array', () => {
      expect(wrapArray(false)).toEqual([false]);
    });
  });
});
