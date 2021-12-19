import '@fontsource/open-sans';
import '@fontsource/barlow';
import '@fontsource/lobster';
import 'normalize.css';
import './src/lib/styles/global.css';
import react from 'react';
import { SceneProvider } from './src/store/sceneInfo';
import { PortpolioProvider } from './src/store/portpolioInfo';

export const wrapPageElement = ({ element, props }) => {
  return (
    <PortpolioProvider>
      <SceneProvider>{element}</SceneProvider>
    </PortpolioProvider>
  );
};
