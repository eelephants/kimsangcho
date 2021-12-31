import React from 'react';
import { useCallback } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { SwiperSlide } from 'swiper/react';
import { Virtual } from 'swiper/core';
import { isBrowser } from '@/lib/utils/helper';
import { Link } from '@emotion-icons/boxicons-regular/Link';
import { Android } from '@emotion-icons/boxicons-logos/Android';
import { Apple } from '@emotion-icons/boxicons-logos/Apple';
import { Github } from '@emotion-icons/boxicons-logos/Github';

import Button from '@/components/Button';
import CusomSwiper from '@/components/CusomSwiper';

const LinkIcon = styled(Link)`
  color: #fff;
  width: 1.5vw;
  height: auto;
`;
const AndroidIcon = styled(Android)`
  color: #fff;
  width: 1.5vw;
  height: auto;
`;

const AppleIcon = styled(Apple)`
  color: #fff;
  width: 1.5vw;
  height: auto;
`;

const GithubIcon = styled(Github)`
  color: #fff;
  width: 1.5vw;
  height: auto;
`;

const ForthContents = ({
  sceneInfo,
  className,
  title,
  id,
  type,
  url,
  ios,
  android,
  gitUrl,
  animate,
  images,
  desc,
  handleDetailProject,
}) => {
  const variants = {
    transform: {
      x: [-5000, 0, 0],
      transition: { duration: 1 },
    },
    stop: { x: [0, 0, -5000], transition: { duration: 1 } },
  };

  const jumpVariants = {
    stop: { y: [0, -20, 0], transition: { repeat: Infinity, repeatDelay: 3 } },
  };

  const width = isBrowser()
    ? window.innerWidth / 2.5 + 'px'
    : 1920 / 2.5 + 'px';

  const innerWidth = isBrowser() ? window.innerWidth : 1920;

  const onClickDetail = useCallback(() => {
    handleDetailProject(id);
  }, [id]);

  return (
    <motion.div
      css={thirdContentsWrapper(sceneInfo[3].scrollHeight / 4)}
      className={className}
      variants={variants}
      animate={sceneInfo[3].values[animate] ? 'transform' : 'stop'}
    >
      <div>
        {images.length ? (
          <CusomSwiper
            options={{
              effect: 'coverflow',
              virtual: Virtual,
              grabCursor: true,
              centeredSlides: true,
              autoplay: true,
              spaceBetween: 50,
              slidesPerView: 2,
              coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              },
            }}
            images={images}
            render={images =>
              images.map((item, index) => (
                <SwiperSlide
                  virtualIndex={index}
                  style={{ width }}
                  key={index + new Date().getMilliseconds}
                >
                  <div css={imagesWrapper(innerWidth)}>
                    <img
                      src={item.src}
                      css={{
                        width: '100%',
                        display: 'inline-block',
                        backgroundSize: 'contain',
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))
            }
          ></CusomSwiper>
        ) : null}
      </div>
      <div css={contentsWrapper}>
        <motion.div css={titleWrapper} variants={jumpVariants} animate={'stop'}>
          {title}
          <div className="url-wrapper">
            {url && (
              <a target="_blank" href={url}>
                <LinkIcon />
              </a>
            )}
            {type === 'Mobile' && (
              <>
                {android && (
                  <a target="_blank" href={android}>
                    <AndroidIcon />
                  </a>
                )}
                {ios && (
                  <a target="_blank" href={ios}>
                    <AppleIcon />
                  </a>
                )}
              </>
            )}
            {gitUrl && (
              <a
                target="_blank"
                href={`https://github.com/SangchoKim/${gitUrl}`}
              >
                <GithubIcon />
              </a>
            )}
          </div>
        </motion.div>
        <div css={descWrapper}>{desc}</div>
      </div>
      <Button
        isShow
        backGroundcolor="#000"
        boxWidth="300px"
        boxHeight="50px"
        boxCenter
        boxShadow
        onClick={onClickDetail}
        css={descButton}
      >
        VIEW PROJECT
      </Button>
    </motion.div>
  );
};

const thirdContentsWrapper = height => css`
  max-width: 80%;
  margin: 0 auto;
  left: 0;
  font-size: 40px;
  color: #fff;
  display: none;
  flex-direction: column;
  justify-content: center;
  height: ${height}px;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(51, 51, 51, 1) 47%
  );
  .url-wrapper {
  }
`;

const imagesWrapper = innerWidth => css`
  min-width: ${innerWidth / 3}px;
  min-height: ${innerWidth / 4}px;
  max-width: ${innerWidth / 3}px;
  max-height: ${innerWidth / 4}px;
  background: #303030;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const contentsWrapper = () => css`
  font-size: 1.5rem;
  text-align: center;
  position: relative;
`;

const titleWrapper = () => css`
  color: white;
  letter-spacing: 0.2rem;
  position: absolute;
  top: -30px;
  left: 0;
  right: 0px;
  font-weight: bold;
  font-size: 4rem;
  z-index: 500;
  text-transform: uppercase;
  text-shadow: 3px 3px 3px grey;
`;

const descWrapper = () => css`
  margin: 150px auto 100px auto;
  lineheight: 2;
  maxwidth: 70%;
`;

const descButton = () => css`
  color: white;
  letter-spacing: 0.3rem;
  text-style: border;
`;

export default ForthContents;
