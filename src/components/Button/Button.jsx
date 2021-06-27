import React from 'react';
import { css } from '@emotion/react';

const Button = ({
  circle,
  backGroundcolor,
  opacity,
  absolute,
  center,
  isShow,
  children,
  ...rest
}) => {
  return (
    <div
      css={css`
        display: ${isShow ? 'block' : 'none'};
        width: ${circle ? '4.5rem' : '5rem'};
        height: ${circle ? '4.5rem' : '2rem'};
        font-size: 1rem;
        position: ${absolute ? 'absolute' : 'static'};
        z-index: ${absolute ? 500 : 0};
        top: ${center ? window.innerWidth / 2.5 / 2 : 0}px;
        left: ${center ? (window.innerWidth / 2.5 + 200) / 2 : 0}px;
        transform: ${center && 'translate(80%, -80%)'};
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
