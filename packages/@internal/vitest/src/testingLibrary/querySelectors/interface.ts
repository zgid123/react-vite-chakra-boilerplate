import { queries } from '@testing-library/react';

import type { Screen, BoundFunctions } from '@testing-library/react';

export type TScreen = Screen | BoundFunctions<typeof queries>;
