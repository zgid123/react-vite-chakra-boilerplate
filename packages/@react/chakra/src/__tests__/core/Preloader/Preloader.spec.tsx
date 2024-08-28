import { describe, expect, it, suite } from 'vitest';
import { getByClassName } from '@config/vitest/testing-library';

import { Preloader } from '../../../core';
import { renderWithTheme } from '../../utils';

describe('Preloader', () => {
  suite('default', () => {
    it('renders default Preloader', () => {
      renderWithTheme(<Preloader />);

      const preloader = getByClassName('preloader');
      const preloaderLoader = getByClassName('preloader-loader');

      expect(preloader).toBeInTheDocument();
      expect(preloaderLoader).toBeInTheDocument();
    });
  });

  suite('global variant', () => {
    it('renders global Preloader', () => {
      renderWithTheme(<Preloader variant='global' />);

      const preloader = getByClassName('preloader');
      const preloaderLoader = getByClassName('preloader-loader');

      expect(preloader).toBeInTheDocument();
      expect(preloaderLoader).toBeInTheDocument();
    });
  });

  suite('center variant', () => {
    it('renders global Preloader', () => {
      renderWithTheme(<Preloader variant='center' />);

      const preloader = getByClassName('preloader');
      const preloaderLoader = getByClassName('preloader-loader');

      expect(preloader).toBeInTheDocument();
      expect(preloaderLoader).toBeInTheDocument();
    });
  });

  suite('with children', () => {
    it('renders Preloader with children', () => {
      const { getByText } = renderWithTheme(<Preloader>Loading...</Preloader>);

      const preloader = getByClassName('preloader');
      const preloaderLoader = getByClassName('preloader-loader');
      const preloaderChildren = getByText('Loading...');

      expect(preloader).toBeInTheDocument();
      expect(preloaderLoader).toBeInTheDocument();
      expect(preloaderChildren.textContent).toBe('Loading...');
    });
  });
});
