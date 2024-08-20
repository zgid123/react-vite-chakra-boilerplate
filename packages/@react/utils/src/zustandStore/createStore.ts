import { immer } from 'zustand/middleware/immer';
import { devtools, type DevtoolsOptions } from 'zustand/middleware';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import {
  create,
  type StoreApi,
  type StateCreator,
  type UseBoundStore,
} from 'zustand';

import type { WithImmer, WithDevtools } from './interface';

type TData<T> = StateCreator<
  T,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [['zustand/devtools', never], ['zustand/immer', never]]
>;

type TCreateStoreReturn<T> = UseBoundStore<
  WithImmer<WithDevtools<WithImmer<WithDevtools<StoreApi<T>>>>>
> & {
  use: {
    [key in keyof Required<T>]: () => T[key];
  };
};

export function createStore<T = unknown>(
  data: TData<T>,
  options?: DevtoolsOptions,
): TCreateStoreReturn<T> {
  const store = create(devtools(immer(data), options));

  return createSelectorFunctions(
    store as UseBoundStore<StoreApi<object>>,
  ) as TCreateStoreReturn<T>;
}
