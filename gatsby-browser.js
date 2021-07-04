import '@fontsource/open-sans';
import '@fontsource/barlow';
import '@fontsource/lobster';
import 'normalize.css';
import './src/lib/styles/global.css';
import React from 'react';
import { SceneProvider } from './src/store/sceneInfo';
import { PortpolioProvider } from './src/store/portpolioInfo';

export const wrapRootElement = ({ element }) => {
  return (
    <SceneProvider>
      <PortpolioProvider>{element}</PortpolioProvider>
    </SceneProvider>
  );
};
