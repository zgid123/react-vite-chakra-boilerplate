import { combine } from '@core/utils/stringUtils';

import type { SystemStyleObject } from '@chakra-ui/styled-system';

export function hexToRGB(hex: string, alpha = 1): string {
  if (hex[0] !== '#') {
    return hex;
  }

  const rgb = (
    hex
      .substring(1)
      .match(new RegExp(hex.length === 7 ? '\\w\\w' : '\\w', 'g')) || []
  )
    .map((char) => {
      return parseInt(char.padStart(2, char), 16);
    })
    .join(', ');

  if (alpha > 1) {
    alpha = alpha / 100;
  }

  return `rgba(${rgb}, ${alpha})`;
}

function combineUnit(value: number, unit: string): string {
  return combine({ joinWith: '' }, value.toString(), unit);
}

export function rem(value: number): string {
  return combineUnit(value, 'rem');
}

export function em(value: number): string {
  return combineUnit(value, 'em');
}

export function pxToRem(value: number): string {
  const remValue = value / 16;

  return combineUnit(remValue, 'rem');
}

export function mergeStyle(
  target: SystemStyleObject,
  source: SystemStyleObject,
): SystemStyleObject {
  return Object.assign<SystemStyleObject, SystemStyleObject>(target, source);
}
