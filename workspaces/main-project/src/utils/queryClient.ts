import { toast } from '@react/chakra/core';
import { MutationCache, QueryClient } from '@react/utils/queryHooks';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (!mutation.options?.meta?.manual) {
        toast({
          position: 'top',
          status: 'error',
          description: error.message,
        });
      }
    },
  }),
});
