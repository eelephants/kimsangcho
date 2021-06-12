import '@fontsource/open-sans';
import '@fontsource/barlow';
import '@fontsource/lobster';
import React from 'react';
import { SceneProvider } from './src/store/sceneInfo';

export const wrapRootElement = ({ element }) => {
  return <SceneProvider>{element}</SceneProvider>;
};
