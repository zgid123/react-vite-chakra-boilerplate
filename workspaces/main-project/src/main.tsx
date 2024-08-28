import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@react/utils/queryHooks';
import { ThemeV1Provider, ToastContainer } from '@react/chakra/core';

import type { SetupWorker } from 'msw/browser';

import { App } from '~/App';
import { queryClient } from '~/utils/queryClient';

const container = document.getElementById('root');

if (!container) {
  throw 'Cannot find the root element';
}

const root = createRoot(container);

async function enableMocking(): Promise<ReturnType<SetupWorker['start']>> {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import('./requests/mocks/browser');

  return worker.start();
}

enableMocking().then(() => {
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeV1Provider>
          <ToastContainer />
          <App />
        </ThemeV1Provider>
      </QueryClientProvider>
    </StrictMode>,
  );
});
