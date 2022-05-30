import React, { useCallback } from 'react';
import { css } from '@emotion/react';

const Dimmed = ({ width, height, opacity }) => {
  return <div css={dimmedWrapper(width, opacity, height)}></div>;
};

const dimmedWrapper = (width, opacity, height) => css`
  // width: ${width};
  opacity: ${opacity};
  height: ${height};
  position: absolute;
  background: #000;
`;

export default Dimmed;
