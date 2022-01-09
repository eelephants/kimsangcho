import React from 'react';
import { useCallback, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { SwiperSlide } from 'swiper/react';
import { Virtual } from 'swiper/core';

import Button from '@/components/Button';
import { ArrowGoBack } from '@emotion-icons/remix-line/ArrowGoBack';
import { ArrowLeftCircle } from '@emotion-icons/remix-fill/ArrowLeftCircle';
import { ArrowRightCircle } from '@emotion-icons/remix-fill/ArrowRightCircle';
import { CloseOutline } from '@emotion-icons/evaicons-outline/CloseOutline';
import { isBrowser, mq, ellipsis } from '@/lib/utils/helper';
import { useSceneState } from '@/store/sceneInfo';
import { Link } from '@emotion-icons/boxicons-regular/Link';
import { Android } from '@emotion-icons/boxicons-logos/Android';
import { Apple } from '@emotion-icons/boxicons-logos/Apple';
import { Github } from '@emotion-icons/boxicons-logos/Github';
import CusomSwiper from '@/components/CusomSwiper';

const CloseOutlineIcon = styled(CloseOutline)`
  color: rgba(204, 192, 192, 1);
  width: 50%;
  height: auto;
`;

const ArrowBackCircleIcon = styled(ArrowLeftCircle)`
  color: rgba(204, 192, 192, 1);
  width: 80%;
  height: auto;
`;

const RightArrowCircleIcon = styled(ArrowRightCircle)`
  color: rgba(204, 192, 192, 1);
  width: 80%;
  height: auto;
`;

const ArrowGoBackIcon = styled(ArrowGoBack)`
  color: rgba(204, 192, 192, 1);
  width: 80%;
  height: auto;
`;

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

const ThirdContents = ({
  id,
  detailUrl,
  url,
  gitUrl,
  className,
  title,
  duration,
  type,
  android,
  ios,
  desc,
  role,
  reason,
  images,
  language,
  onMouseLeave,
  onMouseEnter,
  handleGoBack,
  handleInit,
  isShow,
  isSideShow,
  handleDetailProject,
}) => {
  const tags = '[ThirdContents]';

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const { sceneInfo } = useSceneState();

  const onMouseLeaveFromCanvas = useCallback(() => {
    console.log(tags, 'onMouseLeaveFromCanvas');
    onMouseLeave(id);
  }, [isShow]);

  const onMouseEnterFromCanvas = useCallback(() => {
    console.log(tags, 'onMouseEnterFromCanvas');
    onMouseEnter(id);
  }, [isShow]);

  const onClickGoBack = useCallback(() => {
    console.log(tags, 'onClickGoBack');
    handleGoBack(id);
  }, [isSideShow, isShow]);

  const onClickInit = useCallback(() => {
    console.log(tags, 'onClickInit');
    handleInit(id);
  }, [isSideShow, isShow]);

  const onClickDetail = useCallback(
    event => {
      console.log(tags, 'onClickDetail');
      event.preventDefault();
      handleDetailProject(detailUrl);
    },
    [detailUrl]
  );

  const onSwiper = swiper => {
    console.log(tags, 'onSwiper');
    setTimeout(() => {
      swiper.params.navigation.prevEl = navigationPrevRef.current;
      swiper.params.navigation.nextEl = navigationNextRef.current;

      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    });
  };

  const variants = {
    rotate: {
      skew: [0, 50, 0],
      transition: { duration: 0.5 },
    },
    stop: { y: [0, -20, 0], transition: { repeat: Infinity, repeatDelay: 3 } },
  };

  const innerWidth = isBrowser() ? window.innerWidth : 1920;

  return (
    <motion.div
      css={[
        stickyElement,
        {
          [mq('small')]: { flexDirection: 'column' },
          [mq('large')]: {
            flexDirection: 'row',
          },
        },
        { height: sceneInfo[2].scrollHeight / (sceneInfo.length * 1.2) + 'px' },
      ]}
      className={className}
      id={id}
      variants={variants}
      animate={isSideShow ? 'rotate' : 'stop'}
    >
      <div css={boxWrapper}>
        <div
          className="original-box"
          css={css`
            width: ${innerWidth / 2.5 + 'px'};
            height: ${innerWidth / 2.5 + 'px'};
            max-width: 500px;
            max-height: 500px;
            position: relative;
            ${mq('xLarge')} {
              left: 10%;
            }
          `}
        >
          <canvas
            className="original"
            css={{
              position: 'relative',
              boxShadow: '5px 5px 15px 5px #000000',
              maxWidth: '500px',
              maxHeight: '500px',
              [mq('small')]: {},
              [mq('large')]: {},
              [mq('xLarge')]: {
                left: '10%',
              },
            }}
            onMouseEnter={() => {
              images.length && !isSideShow ? onMouseEnterFromCanvas() : null;
            }}
            onMouseLeave={() => {
              images.length && !isSideShow ? onMouseLeaveFromCanvas() : null;
            }}
            width={innerWidth / 2.5}
            height={innerWidth / 2.5}
          ></canvas>
          {!images.length && (
            <span
              css={{
                fontSize: '1rem;',
                fontWeight: 'bold',
                position: 'absolute',
                zIndex: 999,
                top: '101%',
                [mq('small')]: {},
                [mq('large')]: {},
                [mq('xLarge')]: {
                  right: '-10%',
                },
              }}
            >
              {reason && '* ' + reason}
            </span>
          )}
          <Button
            rotate
            circle
            backGroundcolor="black"
            opacity="0.8"
            absolute
            top="50%"
            left={innerWidth > 1700 ? '50%' : '50%'}
            transform="translate(-50%, -50%)"
            isShow={isShow}
            onMouseEnter={() => {
              !isSideShow ? onMouseEnterFromCanvas() : null;
            }}
            onClick={onClickGoBack}
          >
            <ArrowGoBackIcon />
          </Button>
        </div>
        <div
          className="original-hide-box"
          css={css`
            width: ${innerWidth / 2.5 + 'px'};
            height: ${innerWidth / 2.5 + 'px'};
            max-width: 500px;
            max-height: 500px;
            position: relative;
            ${mq('xLarge')} {
              left: 10%;
            }
          `}
        >
          <Button
            small
            ref={navigationPrevRef}
            backGroundcolor="transparent"
            absolute
            top="50%"
            transform="translate(-10%)"
            isShow={isSideShow}
            onMouseEnter={() => {
              !isSideShow ? onMouseEnterFromCanvas() : null;
            }}
          >
            <ArrowBackCircleIcon />
          </Button>
          <Button
            ref={navigationNextRef}
            small
            backGroundcolor="transparent"
            absolute
            top="50%"
            left="100%"
            transform="translate(-90%)"
            isShow={isSideShow}
            onMouseEnter={() => {
              !isSideShow ? onMouseEnterFromCanvas() : null;
            }}
          >
            <RightArrowCircleIcon />
          </Button>
          <Button
            small
            backGroundcolor="transparent"
            absolute
            top="0%"
            left="100%"
            transform="translate(-90%, 20%)"
            isShow={isSideShow}
            onMouseEnter={() => {
              !isSideShow ? onMouseEnterFromCanvas() : null;
            }}
            onClick={onClickInit}
          >
            <CloseOutlineIcon />
          </Button>
          {images.length ? (
            <CusomSwiper
              images={images}
              isBoxShadow
              options={{
                spaceBetween: 50,
                slidesPerView: 1,
                grabCursor: true,
                centeredSlides: true,
                virtual: Virtual,
              }}
              onSwiper={onSwiper}
              ref={{
                prevRef: navigationPrevRef,
                nextRef: navigationNextRef,
              }}
              render={images =>
                images.length
                  ? images.map((item, index) => (
                      <SwiperSlide
                        virtualIndex={index}
                        key={index + new Date().getMilliseconds}
                      >
                        <div
                          className="original-hide"
                          onMouseEnter={() => {
                            !isSideShow ? onMouseEnterFromCanvas() : null;
                          }}
                          onMouseLeave={() => {
                            !isSideShow ? onMouseLeaveFromCanvas() : null;
                          }}
                          css={{
                            maxWidth: '500px',
                            maxHeight: '500px',
                            minWidth: '500px',
                            minHeight: '500px',
                            background: '#303030',
                            justifyContent: 'center',
                            alignItems: 'center',

                            [mq('small')]: {},
                            [mq('large')]: {},
                            [mq('xLarge')]: {
                              left: '10%',
                            },
                          }}
                        >
                          <img
                            src={item.src}
                            css={{
                              width: !item?.mobile ? '100%' : null,
                            }}
                          />
                        </div>
                      </SwiperSlide>
                    ))
                  : null
              }
            />
          ) : null}
        </div>
        <div className="description" css={descWrapper}>
          <div css={firstDescWrapper}>
            <div css={titleWrapper}>
              <h1 css={titleName}>{title}</h1>
              <div>
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
            </div>
            <h3 css={dateWithTypeBox}>
              {duration} /&nbsp;{type}
            </h3>
            <div css={explainWrapper}>
              <label>#Desc</label>
              <span>- {desc}</span>
            </div>
            <div css={explainWrapper} className="role-wrapper">
              <label>#Role</label>
              <span>- {role}</span>
            </div>
          </div>
          <hr css={divideLine} />
          <div css={secondDescWrapper}>
            <div css={languageWrapper}>
              {language.map((item, index) => (
                <div
                  key={index + new Date().getMilliseconds}
                  css={css`
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background-color: #303030;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    padding: 5px;
                    margin: 0.2rem;
                    text-transform: uppercase;
                    box-shadow: 1px 1px 3px 1px #000;
                  `}
                >
                  {item}
                </div>
              ))}
            </div>
            <Button
              isShow
              backGroundcolor="#000"
              boxWidth="100%"
              boxHeight="35px"
              boxCenter
              boxShadow
              onClick={onClickDetail}
              css={buttonWrapper}
            >
              DETAILS
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const stickyElement = () => css`
  margin: 0;
  position: relative;
  left: 0;
  opactiy: 0;
  display: none;
  font-size: 2rem;
  padding: 0 200px 0 200px;
  line-height: 1.3;

  .original {
    z-index: 100;
  }
  .flip {
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0 200px 200px 200px;
  }
  .original-hide {
    display: none;
  }
  .flip-hide {
    display: none;
  }
  button {
    svg:hover {
      color: #4b4453;
    }
  }
`;

const descWrapper = () => css`
  color: #fff;
  width: 100%;
  ${mq('small')}: {
    position: static;
    width: 100%;
    right: 0;
    top: 0;
  }
  ${mq('large')}: {
    position: absolute;
  } ;
`;

const boxWrapper = () => css`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const firstDescWrapper = () => css`
  height: 49.5%;
`;

const titleWrapper = () => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  height: 20%;
`;

const titleName = () => css`
  font-size: 1.7rem;
  font-weight: bold;
  text-transform: upperCase;
  margin: 0;
`;

const dateWithTypeBox = () => css`
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  height: 20%;
`;

const explainWrapper = () => css`
  height: 40%;
  line-height: 1.7;
  padding: 0;
  ${ellipsis(5, 1.7)}
  font-size: 1rem;
  font-weight: 500;
  &.role-wrapper {
    height: 20%;
    ${ellipsis(2, 1.7)}
  }
  span {
    display: block;
    text-transform: lowercase;
  }
`;

const divideLine = css`
  background: #b0a8b9;
  height: 1%;
  border: none;
  border-radius: 50px;
  opacity: 0.7;
  font-size: 0;
  margin: 10px 0;
`;

const secondDescWrapper = () => css`
  height: 49.5%;
  .second-desc {
    height: 50%;
  }
`;

const languageWrapper = () => css`
  height: 70%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  margin-bottom: 15px;
`;

const buttonWrapper = () => css`
  height: 20%;
  color: white;
  letter-spacing: 0.3rem;
  text-style: border;
`;

export default ThirdContents;
