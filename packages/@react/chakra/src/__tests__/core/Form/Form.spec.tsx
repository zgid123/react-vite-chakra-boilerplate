import { describe, expect, it } from 'vitest';
import { getByTag } from '@config/vitest/testing-library';

import { Form } from '../../../core/Form';
import { renderWithTheme } from '../../utils';

describe('Form', () => {
  it('renders Form', () => {
    renderWithTheme(<Form />);

    const form = getByTag('form');

    expect(form).toBeInTheDocument();
  });
});
