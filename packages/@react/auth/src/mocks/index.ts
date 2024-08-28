import { http, HttpResponse } from 'msw';

import type { IUserVMProps } from '@data/view-models';

import { buildUrl } from './utils';

const user: IUserVMProps = {
  email: 'alphanolucifer@gmail.com',
};

const tokens = {
  authToken: '123123',
  refreshToken: '123123',
};

export const authHandlers = [
  http.post(buildUrl('/'), () => {
    return HttpResponse.json({
      data: {
        profile: user,
        ...tokens,
      },
    });
  }),
];
