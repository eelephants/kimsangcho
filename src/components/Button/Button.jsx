import React from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

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

  if (circle) {
    if (small) {
      width = '50px';
      height = '50px';
    } else {
      width = '70px';
      height = '70px';
    }
  }

  return (
    <div
      css={css`
        display: ${isShow ? 'block' : 'none'};
        width: ${width};
        height: ${height};
        font-size: 1rem;
        position: ${absolute ? 'absolute' : 'static'};
        z-index: ${absolute ? 500 : 0};
        top: ${top ? top : 0}px;
        left: ${left ? left : 0}px;
        transform: ${transform};
      `}
    >
      <motion.button
        {...rest}
        whileHover={{
          transition: { duration: 1 },
          rotate: 360,
          translateX: 70,
        }}
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
      </motion.button>
    </div>
  );
};

export default Button;
