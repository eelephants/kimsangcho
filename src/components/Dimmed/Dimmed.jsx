import React, { useCallback } from 'react';

const Dimmed = ({ width, height, opacity }) => {
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

export default Dimmed;
