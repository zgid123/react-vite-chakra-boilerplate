import { Api } from '@core/api';

import type { IUserVMProps } from '@data/view-models';
import type { TQueryKey } from '@react/utils/queryHooks';

export const QK_FETCH_PROFILE: TQueryKey = 'qk_fetchProfile';
export const QK_REFRESH_TOKEN: TQueryKey = 'qk_refreshToken';

const auth = Api.create({
  skipVersion: true,
  storage: localStorage,
  withCredentials: true,
  baseUrl: import.meta.env.VITE_AUTH_API_ENDPOINT,
});

interface IAuthVMProps {
  authToken: string;
  refreshToken: string;
  profile: IUserVMProps;
}

interface ISignInParams {
  email: string;
  password: string;
}

interface IGetProfileParams {
  signal: AbortSignal;
}

function signIn(data: ISignInParams): Promise<IAuthVMProps> {
  return auth.post<IAuthVMProps>({
    data,
    endpoint: '/',
  });
}

function getProfile({ signal }: IGetProfileParams): Promise<IUserVMProps> {
  return auth.get<IUserVMProps>({
    signal,
    endpoint: '/profile',
  });
}

function refresh(): Promise<IAuthVMProps> {
  return auth.get<IAuthVMProps>({
    endpoint: '/refresh',
  });
}

export const authApi = {
  signIn,
  refresh,
  getProfile,
} as const;
