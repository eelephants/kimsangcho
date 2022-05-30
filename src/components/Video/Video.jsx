import React, { useCallback } from 'react';
import { css } from '@emotion/react';
import useWindowSize from '@/hooks/useWindowSize';

const Video = ({ videoSrcURL, videoTitle, ...props }) => {
  const { width, height } = useWindowSize();

  return (
    <div css={videoWrapperStyle(width, height)}>
      <video loop autoPlay muted css={videoStyle} controlsList="nodownload">
        <source src={videoSrcURL} title={videoTitle} type="video/mp4" />
      </video>
    </div>
  );
};

const videoWrapperStyle = (width, height) => css`
  height: ${height * 0.7}px;
  // width: ${width}px;
`;

const videoStyle = () => css`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

export default Video;
