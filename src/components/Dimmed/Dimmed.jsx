import React, { useCallback } from 'react';

export const Dimmed = ({ width, height, opacity }) => {
  return (
    <div
      css={{
        width,
        opacity,
        height,
        position: 'absolute',
        background: '#000',
      }}
    ></div>
  );
};
