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
  const isDarkMode = true;
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
  }, [channel, isDarkMode, setColorMode]);

  return <>{children}</>;
}

export const chakraDecorator: Decorator = (renderStory) => {
  return (
    <ThemeV1Provider>
      <ThemeProvider>{renderStory()}</ThemeProvider>
    </ThemeV1Provider>
  );
};
