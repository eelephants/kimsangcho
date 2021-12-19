import '@fontsource/open-sans';
import '@fontsource/barlow';
import '@fontsource/lobster';
import 'normalize.css';
import './src/lib/styles/global.css';
import React from 'react';
import { SceneProvider } from './src/store/sceneInfo';
import { PortpolioProvider } from './src/store/portpolioInfo';

const WrapRootElement = ({ element }) => {
  return (
    <PortpolioProvider>
      <SceneProvider>{element}</SceneProvider>
    </PortpolioProvider>
  );
};

export default WrapRootElement;
