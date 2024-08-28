import { useEffect, useState } from 'react';
import { apiEvent, AuthService } from '@core/api';
import { useFetch } from '@react/utils/queryHooks';

import { authStore } from './store';
import { authApi, QK_FETCH_PROFILE, QK_REFRESH_TOKEN } from './api';

interface IUseAutoSignInReturnProps {
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAutoSignIn(): IUseAutoSignInReturnProps {
  const [needRefresh, setNeedRefresh] = useState(false);

  const { signIn, isIdle, isAuthenticated, unauthenticate } = authStore(
    ({ signIn, isIdle, isAuthenticated, unauthenticate }) => {
      return {
        signIn,
        isIdle,
        unauthenticate,
        isAuthenticated,
      };
    },
  );

  const {
    isError,
    isLoading,
    isSuccess,
    data: profile,
  } = useFetch(authApi.getProfile, [QK_FETCH_PROFILE, [[]]]);

  const {
    data,
    fetchStatus,
    isLoading: isRefreshing,
    isError: isRefreshingError,
    isSuccess: isRefreshingSuccess,
  } = useFetch(authApi.refresh, [QK_REFRESH_TOKEN, []], {
    enabled: needRefresh,
  });

  useEffect(() => {
    if (isSuccess && profile) {
      signIn(profile);
    }

    if (isError) {
      setNeedRefresh(true);
    }
  }, [isError, isSuccess, profile, signIn]);

  useEffect(() => {
    if (isRefreshingSuccess && data) {
      const { authToken, profile } = data;

      signIn(profile);
      AuthService.setToken(authToken);
    }

    if (isRefreshingError) {
      unauthenticate();
    }
  }, [data, isRefreshingError, isRefreshingSuccess, signIn, unauthenticate]);

  useEffect(() => {
    function handleUnauthenticated() {
      // TODO: handle expired token or use axios interceptor

      window.location.reload();
    }

    apiEvent.on('unauthenticated', handleUnauthenticated);

    return () => {
      apiEvent.off('unauthenticated', handleUnauthenticated);
    };
  }, [unauthenticate]);

  return {
    isAuthenticated,
    isLoading:
      ((isIdle || isLoading) && fetchStatus === 'idle') ||
      (needRefresh && isRefreshing),
  };
}
