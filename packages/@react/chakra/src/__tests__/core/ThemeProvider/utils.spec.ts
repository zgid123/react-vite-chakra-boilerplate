import { describe, expect, it, suite } from 'vitest';

import type { SystemStyleObject } from '@chakra-ui/react';

import {
  em,
  rem,
  pxToRem,
  hexToRGB,
  mergeStyle,
} from '../../../core/ThemeProvider/utils';

describe('hexToRGB', () => {
  suite('with hex color without hash at start', () => {
    it('returns hex value', () => {
      expect(hexToRGB('test')).toBe('test');
    });
  });

  suite('with valid hex color', () => {
    it('returns rgb value', () => {
      expect(hexToRGB('#000')).toBe('rgba(0, 0, 0, 1)');
    });
  });

  suite('with alpha value', () => {
    it('returns rgba value', () => {
      expect(hexToRGB('#000', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
    });
  });
});

describe('rem', () => {
  it('returns rem value', () => {
    expect(rem(16)).toBe('16rem');
  });
});

describe('em', () => {
  it('returns em value', () => {
    expect(em(16)).toBe('16em');
  });
});

describe('pxToRem', () => {
  it('returns rem value from px value', () => {
    expect(pxToRem(16)).toBe('1rem');
  });
});

describe('mergeStyle', () => {
  it('returns merged style', () => {
    const style: SystemStyleObject = {
      m: 1,
      color: 'red',
    };

    const style2 = {
      p: 2,
      color: 'blue',
    };

    expect(mergeStyle(style, style2)).toEqual({
      m: 1,
      p: 2,
      color: 'blue',
    });
  });
});
