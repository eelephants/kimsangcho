import React, { forwardRef } from 'react';
import { css } from '@emotion/react';
import { mq } from '../../../lib/utils/helper';
import useWindowSize from '../../../hooks/useWindowSize';

const WrappedContents = forwardRef(({ className, id, children }, ref) => {
  const { height } = useWindowSize();

  return (
    <div className={className} css={[secondSection(height)]} ref={ref} id={id}>
      {children}
    </div>
  );
});

export default WrappedContents;

const secondSection = height => css`
  background: linear-gradient(
    176deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(51, 51, 51, 1) 47%
  );
  background-size: cover;
  position: relative;

  .static-section {
    position: static;
    display: block;
  }
`;
