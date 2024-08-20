import { Global } from '@emotion/react';

import type { JSX } from 'react';

export function Font(): JSX.Element {
  return (
    <Global
      styles={`
        @font-face {
          font-weight: 100;
          font-family: 'Inter';
          src: url('/fonts/Inter-Thin.ttf') format('truetype');
        }
        @font-face {
          font-weight: 200;
          font-family: 'Inter';
          src: url('/fonts/Inter-ExtraLight.ttf') format('truetype');
        }
        @font-face {
          font-weight: 300;
          font-family: 'Inter';
          src: url('/fonts/Inter-Light.ttf') format('truetype');
        }
        @font-face {
          font-weight: 400;
          font-family: 'Inter';
          src: url('/fonts/Inter-Regular.ttf') format('truetype');
        }
        @font-face {
          font-weight: 500;
          font-family: 'Inter';
          src: url('/fonts/Inter-Medium.ttf') format('truetype');
        }
        @font-face {
          font-weight: 600;
          font-family: 'Inter';
          src: url('/fonts/Inter-SemiBold.ttf') format('truetype');
        }
        @font-face {
          font-weight: 700;
          font-family: 'Inter';
          src: url('/fonts/Inter-Bold.ttf') format('truetype');
        }
        @font-face {
          font-weight: 800;
          font-family: 'Inter';
          src: url('/fonts/Inter-ExtraBold.ttf') format('truetype');
        }
        @font-face {
          font-weight: 900;
          font-family: 'Inter';
          src: url('/fonts/Inter-Black.ttf') format('truetype');
        }
      `}
    />
  );
}
