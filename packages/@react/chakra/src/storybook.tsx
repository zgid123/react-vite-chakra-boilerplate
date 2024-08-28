import { Global } from '@emotion/react';
import { useColorMode } from '@chakra-ui/react';
import { addons } from '@storybook/preview-api';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import { useEffect, type ReactNode, type JSX } from 'react';

import type { Decorator } from '@storybook/react';

import { ThemeV1Provider } from './core/ThemeProvider';

interface IThemeProviderProps {
  children: ReactNode;
}

function ThemeProvider({ children }: IThemeProviderProps): JSX.Element {
  const channel = addons.getChannel();
  const { setColorMode } = useColorMode();

  useEffect(() => {
    function setMode(isDark: boolean) {
      setColorMode(isDark ? 'dark' : 'light');
    }

    channel.on(DARK_MODE_EVENT_NAME, setMode);

    return () => {
      channel.off(DARK_MODE_EVENT_NAME, setMode);
    };
  }, [channel, setColorMode]);

  return <>{children}</>;
}

function Font(): JSX.Element {
  const { STORYBOOK_PREFIX_URL = '' } = (
    import.meta as unknown as {
      env: {
        STORYBOOK_PREFIX_URL: string;
      };
    }
  ).env;

  const path = `${STORYBOOK_PREFIX_URL.replace(/"/g, '')}`;

  return (
    <Global
      styles={`
        @font-face {
          font-weight: 100;
          font-family: 'Inter';
          src: url('${path}/fonts/Inter-Thin.ttf') format('truetype');
        }
        @font-face {
          font-weight: 200;
          font-family: 'Inter';
          src: url('${path}/fonts/Inter-ExtraLight.ttf') format('truetype');
        }
        @font-face {
          font-weight: 300;
          font-family: 'Inter';
          src: url('${path}/fonts/Inter-Light.ttf') format('truetype');
        }
        @font-face {
          font-weight: 400;
          font-family: 'Inter';
          src: url('${path}/fonts/Inter-Regular.ttf') format('truetype');
        }
        @font-face {
          font-weight: 500;
          font-family: 'Inter';
          src: url('${path}/fonts/Inter-Medium.ttf') format('truetype');
        }
        @font-face {
          font-weight: 600;
          font-family: 'Inter';
          src: url('${path}/fonts/Inter-SemiBold.ttf') format('truetype');
        }
        @font-face {
          font-weight: 700;
          font-family: 'Inter';
          src: url('${path}/fonts/Inter-Bold.ttf') format('truetype');
        }
        @font-face {
          font-weight: 800;
          font-family: 'Inter';
          src: url('${path}/fonts/Inter-ExtraBold.ttf') format('truetype');
        }
        @font-face {
          font-weight: 900;
          font-family: 'Inter';
          src: url('${path}/fonts/Inter-Black.ttf') format('truetype');
        }
      `}
    />
  );
}

export const chakraDecorator: Decorator = (renderStory) => {
  return (
    <ThemeV1Provider font={Font}>
      <ThemeProvider>{renderStory()}</ThemeProvider>
    </ThemeV1Provider>
  );
};
