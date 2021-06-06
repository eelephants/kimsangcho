import React, { useCallback } from 'react';
import { css } from '@emotion/react';

const Video = ({ videoSrcURL, videoTitle, ...props }) => {
  return (
    <div css={videoWrapperStyle}>
      <video loop autoPlay css={videoStyle} controlsList="nodownload">
        <source src={videoSrcURL} title={videoTitle} type="video/mp4" />
      </video>
    </div>
  );
};

const videoWrapperStyle = css`
  height: 70vh;
  width: 100%;
`;

const videoStyle = css`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

export default Video;
