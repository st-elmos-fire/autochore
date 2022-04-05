import React from 'react';
import { addParameters } from '@storybook/react';

import addons from '@storybook/addons';

import '../theme/index.scss';

// get an instance to the communication channel for the manager and preview
const channel = addons.getChannel();

// switch body class for story along with interface theme
channel.on('DARK_MODE', (isDark) => {
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.setAttribute(
    'data-theme',
    isDark ? 'dark' : 'light'
  );
});

const customViewports = {
  iPhoneXR: {
    name: 'iPhone XR',
    styles: {
      width: '414px',
      height: '896px'
    }
  },
  iPhoneXS: {
    name: 'iPhone XS',
    styles: {
      width: '375px',
      height: '812px'
    }
  },
  iPhone5: {
    name: 'iPhone 5',
    styles: {
      width: '320px',
      height: '568px'
    }
  },
  iPadPro: {
    name: 'iPad Pro',
    styles: {
      width: '1024px',
      height: '1366px'
    }
  },
  iPad: {
    name: 'iPad (Other)',
    styles: {
      width: '768px',
      height: '1024px'
    }
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1280px',
      height: '1024px'
    }
  },
  ultrawide: {
    name: 'Ultrawide Desktop',
    styles: {
      width: '1600px',
      height: '1200px'
    }
  }
};

export const parameters = {
  viewMode: 'docs',
  options: {
    showSearchBox: true,
    storySort: {
      order: [
        'Docs',
        [
          'Introduction',
          'Coding Guidelines',
          ['General'],
          '*',
          'Architectural Decisions',
          ['Introduction']
        ],
        'Atoms',
        'Molecules',
        'Organisms',
        'Pages'
      ]
    }
  },
  layout: 'centered',
  readme: {
    info: { inline: true },
    codeTheme: 'atom-dark'
  },
  viewport: {
    viewports: customViewports
  },
  darkMode: {
    classTarget: 'html'
  }
};
