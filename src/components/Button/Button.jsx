import React from 'react';
import { css } from '@emotion/react';

const Button = ({
  circle,
  small,
  backGroundcolor,
  opacity,
  absolute,
  top,
  left,
  isShow,
  transform,
  children,
  ...rest
}) => {
  let width = '80px';
  let height = '34px';

  return (
    <div
      css={css`
        display: ${isShow ? 'block' : 'none'};
        width: ${circle ? '70px' : '80px'};
        height: ${circle ? '70px' : '34px'};
        font-size: 1rem;
        position: ${absolute ? 'absolute' : 'static'};
        z-index: ${absolute ? 500 : 0};
        top: ${top ? top : 0}px;
        left: ${left ? left : 0}px;
        transform: ${transform};
        width: ${small && '50px'}
        height: ${small && '50px'}
      `}
    >
      <button
        {...rest}
        css={css`
          border-radius: ${circle ? '50%' : 0};
          width: 100%;
          height: 100%;
          cursor: pointer;
          border: none;
          opacity: ${opacity};
          backgroundcolor: ${backGroundcolor};
        `}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
