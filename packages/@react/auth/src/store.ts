import { AuthService } from '@core/api';
import { createStore } from '@react/utils/zustand';

import type { IUserVMProps } from '@data/view-models';

export interface IAuthDataProps {
  isIdle: boolean;
  profile: IUserVMProps;
  isAuthenticated: boolean;
}

export interface IAuthStateProps extends IAuthDataProps {
  signOut: () => void;
  unauthenticate: () => void;
  signIn: (data: IUserVMProps) => void;
}

const defaultProfile = {} satisfies IUserVMProps;

export const authStore: ReturnType<typeof createStore<IAuthStateProps>> =
  createStore<IAuthStateProps>(
    (set, get) => {
      return {
        isIdle: true,
        isAuthenticated: false,
        profile: defaultProfile,
        signIn(data) {
          return set((state) => {
            Object.assign<IAuthDataProps, Partial<IAuthDataProps>>(state, {
              profile: data,
              isIdle: false,
              isAuthenticated: true,
            });
          });
        },
        signOut() {
          AuthService.clearToken();
          AuthService.clearRefreshToken();

          return set((state) => {
            Object.assign<IAuthDataProps, Partial<IAuthDataProps>>(state, {
              isIdle: false,
              isAuthenticated: false,
              profile: defaultProfile,
            });
          });
        },
        unauthenticate() {
          return get().signOut();
        },
      };
    },
    {
      name: import.meta.env.VITE_ZUSTAND_DEVTOOL_NAME || 'auth-store',
    },
  );
