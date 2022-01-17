import React, { forwardRef } from 'react';
import { css } from '@emotion/react';

const WrappedContents = forwardRef(({ id, children }, ref) => {
  return (
    <div css={[secondSection]} ref={ref} id={id}>
      {children}
    </div>
  );
});

export default WrappedContents;

const secondSection = () => css`
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
