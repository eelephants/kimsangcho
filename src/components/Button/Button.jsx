import React, { forwardRef } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

const Button = forwardRef(
  (
    {
      circle,
      small,
      backGroundcolor,
      opacity,
      absolute,
      top,
      left,
      right,
      isShow,
      transform,
      children,
      rotate,
      boxWidth,
      boxHeight,
      boxCenter,
      boxShadow,
      className,
      ...rest
    },
    ref
  ) => {
    let width = boxWidth || '80px';
    let height = boxHeight || '34px';

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
          min-width: ${width};
          min-height: ${height};
          font-size: 1rem;
          position: ${absolute ? 'absolute' : 'static'};
          z-index: ${absolute ? 500 : 0};
          top: ${top && typeof top === Number ? top + 'px' : top};
          left: ${left && typeof left === Number ? left + 'px' : left};
          right: ${right && typeof right === Number ? right + 'px' : right};
          transform: ${transform};
          margin: ${boxCenter ? '0 auto' : '0'};
          box-shadow: ${boxShadow
            ? '0px 10px 13px -7px #000000,  5px 5px 15px 5px rgba(0, 0, 0, 0)'
            : ''};
        `}
        style={{ ...rest.style }}
        className={className}
      >
        <motion.button
          {...rest}
          whileHover={{
            transition: { duration: 1 },
            rotate: rotate ? 360 : 0,
          }}
          css={css`
            border-radius: ${circle ? '50%' : 0};
            color: inherit;
            width: 100%;
            height: 100%;
            cursor: pointer;
            border: none;
            opacity: ${opacity};
            background-color: ${backGroundcolor};
          `}
          ref={ref}
        >
          {children}
        </motion.button>
      </div>
    );
  }
);

export default Button;
