import React from 'react';
import { useEffect, useState, useCallback, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  EffectCoverflow,
  A11y,
  Autoplay,
} from 'swiper/core';
import 'swiper/swiper.min.css';
import 'swiper/components/effect-fade/effect-fade.min.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import Button from '../Button';
import TestIcon from '../../assets/svg/test.svg';
import { StaticImage } from 'gatsby-plugin-image';
import { ArrowGoBack } from '@emotion-icons/remix-line/ArrowGoBack';
import { ArrowLeftCircle } from '@emotion-icons/remix-fill/ArrowLeftCircle';
import { ArrowRightCircle } from '@emotion-icons/remix-fill/ArrowRightCircle';
import { CloseOutline } from '@emotion-icons/evaicons-outline/CloseOutline';
import { isBrowser, makeColor, mq } from '../../lib/utils/helper';
import { useSceneState } from '../../store/sceneInfo';
import GithubWhiteIcon from '../../assets/github_white.png';
import { Link } from '@emotion-icons/boxicons-regular/Link';
import { Android } from '@emotion-icons/boxicons-logos/Android';
import { Apple } from '@emotion-icons/boxicons-logos/Apple';
import { Github } from '@emotion-icons/boxicons-logos/Github';
SwiperCore.use([
  EffectFade,
  Navigation,
  Pagination,
  EffectCoverflow,
  A11y,
  Autoplay,
]);

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

const Contents = () => {
  return <div></div>;
};

const SecondContents = ({ className }) => {
  return (
    <div css={[stickyElement]} className={className}>
      <Swiper
        spaceBetween={30}
        // effect={'fade'}
        navigation
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 5000 }}
        slidesPerView={1}
      >
        <SwiperSlide className="intro">
          As a 2nd year developer, I have experience developing/distributing web
          and app services. I was mainly in charge of the front stage in web
          service development, and the BACK stage was also developed as needed.
          <br />
          <br /> I started my first career with a small team, and gained a lot
          of experience in a short period of time.
        </SwiperSlide>
        <SwiperSlide className="intro">
          I am a developer who values ​​"collaboration" with team members in
          various roles. Because if you are not alone, you can lead to better
          creative results and unexpected possibilities.
          <br />
          <br /> We believe that business growth can be achieved through trust
          between team members.
        </SwiperSlide>
        <SwiperSlide className="intro">
          We believe in the infinite possibilities of "effort". We believe that
          changing yourself is "effort". <br />
          <br /> When I finished 10 years of playing career due to a 20-year-old
          injury, when I said that I was going to New Zealand without knowing
          how to read English, or when I said that I was going to work as a
          developer after graduating from college, everyone expressed concerns
          that it was an absurd path, but day by day "Effort" of "I" made me who
          I am today.
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

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
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const { sceneInfo } = useSceneState();
  const onMouseLeaveFromCanvas = useCallback(() => {
    onMouseLeave(id);
  }, [isShow]);

  const onMouseEnterFromCanvas = useCallback(() => {
    onMouseEnter(id);
  }, [isShow]);

  const onClickGoBack = useCallback(() => {
    handleGoBack(id);
  }, [isSideShow, isShow]);

  const onClickInit = useCallback(() => {
    handleInit(id);
  }, [isSideShow, isShow]);

  const onClickDetail = useCallback(
    (event) => {
      event.preventDefault();
      handleDetailProject(detailUrl);
    },
    [detailUrl]
  );

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
      <div
        css={{
          width: '100%',
        }}
      >
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
            left={innerWidth > 1700 ? '60%' : '50%'}
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
            backGroundcolor="transparent"
            absolute
            top="50%"
            transform="translate(-10%)"
            isShow={isSideShow}
            onMouseEnter={() => {
              !isSideShow ? onMouseEnterFromCanvas() : null;
            }}
            ref={navigationPrevRef}
          >
            <ArrowBackCircleIcon />
          </Button>
          <Button
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
            ref={navigationNextRef}
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
          <Swiper
            style={{
              boxShadow: '5px 5px 15px 5px #000000',
              backGroundcolor: '#000',
            }}
            spaceBetween={50}
            effect={'fade'}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            slidesPerView={true}
            onSwiper={(swiper) => {
              // Delay execution for the refs to be defined
              setTimeout(() => {
                // Override prevEl & nextEl now that refs are defined
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;

                // Re-init navigation
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
          >
            {images.map((item, index) => (
              <SwiperSlide key={index + new Date().getMilliseconds}>
                <div
                  className="original-hide"
                  onMouseEnter={() => {
                    !isSideShow ? onMouseEnterFromCanvas() : null;
                  }}
                  onMouseLeave={() => {
                    !isSideShow ? onMouseLeaveFromCanvas() : null;
                  }}
                  css={{
                    // width: window.innerWidth / 2.5,
                    // height: window.innerWidth / 2.5,
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
            ))}
          </Swiper>
        </div>
        <div
          className="description"
          css={{
            [mq('small')]: {
              position: 'static',
              width: '100%',
              right: 0,
              top: 0,
            },
            [mq('large')]: {
              position: 'absolute',
            },
          }}
        >
          <div className="first-desc">
            <div
              className="title-wrapper"
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <h1>{title}</h1>
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
            <h3>
              {duration} /&nbsp;{type}
            </h3>
            <div className="explain-wrapper">
              <label>#Desc</label>
              <span>- {desc}</span>
            </div>
            <div className="explain-wrapper">
              <label>#Role</label>
              <span>- {role}</span>
            </div>
          </div>
          <hr css={divideLine} />
          <div className="second-desc">
            {language.map((item, index) => (
              <div
                key={index + new Date().getMilliseconds}
                css={css`
                  width: 45px;
                  height: 45px;
                  border-radius: 50%;
                  // background-color: rgba(${makeColor(item)});
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
            css={css`
              color: white;
              letter-spacing: 0.3rem;
              text-style: border;
            `}
          >
            DETAILS
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

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
      css={[
        thirdContentsWrapper,
        {
          height: sceneInfo[3].scrollHeight / 4,
        },
      ]}
      className={className}
      variants={variants}
      animate={sceneInfo[3].values[animate] ? 'transform' : 'stop'}
    >
      <div css={css``}>
        <Swiper
          // autoplay
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
        >
          {images.map((item, index) => (
            <SwiperSlide
              style={{ width }}
              key={index + new Date().getMilliseconds}
            >
              <div
                css={css`
                  min-width: ${innerWidth / 3}px;
                  min-height: ${innerWidth / 4}px;
                  max-width: ${innerWidth / 3}px;
                  max-height: ${innerWidth / 4}px;
                  background: #303030;
                  margin: auto;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
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
          ))}
        </Swiper>
      </div>
      <div
        css={css`
          font-size: 1.5rem;
          text-align: center;
          position: relative;
        `}
      >
        <motion.div
          css={css`
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
          `}
          variants={jumpVariants}
          animate={'stop'}
        >
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
        <div
          css={{
            margin: '150px auto 100px auto',
            lineHeight: 2,
            maxWidth: '70%',
          }}
        >
          {desc}
        </div>
      </div>
      <Button
        isShow
        backGroundcolor="#000"
        boxWidth="300px"
        boxHeight="50px"
        boxCenter
        boxShadow
        onClick={onClickDetail}
        css={css`
          color: white;
          letter-spacing: 0.3rem;
          text-style: border;
        `}
      >
        VIEW PROJECT
      </Button>
    </motion.div>
  );
};

Contents.SecondContents = SecondContents;
Contents.ThirdContents = ThirdContents;
Contents.ForthContents = ForthContents;

const stickyElement = css`
  margin: 0;
  position: relative;
  left: 0;
  opactiy: 0;
  display: none;
  font-size: 2rem;
  padding: 0 200px 0 200px;
  line-height: 1.3;

  .intro {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(51, 51, 51, 1) 47%
    );
    height: 500px;
    max-height: 500px;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  }
  color: #fff;
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
  .description {
    color: #fff;
    width: 100%;
    .first-desc {
      height: 50%;
      letter-spacing: 3px;
      & .title-wrapper {
        margin: 0;
      }
      & h1 {
        font-size: 1.7rem;
        font-weight: bold;
        text-transform: upperCase;
        margin: 0;
      }
      & .url {
        color: #fff;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.3s linear;
        &:hover {
          color: #4b4453;
        }
      }
      & h3 {
        font-size: 1.1rem;
        font-weight: 700;
        color: #fff;
        padding: 10px 0 10px 0;
      }
      & .explain-wrapper {
        line-height: 1.7;
      }
      & div {
        margin: 20px 0;
        padding: 0;
        font-size: 1rem;
        font-weight: 500;

        span {
          display: block;
          text-transform: lowercase;
        }
      }
    }

    .second-desc {
      height: 50%;
      display: flex;
      flex-wrap: wrap;
      min-height: 10px;
      max-height: 200px;
      overflow: hidden;
      margin-bottom: 15px;
    }
  }
`;

const divideLine = css`
  background: #b0a8b9;
  height: 2px;
  border: none;
  border-radius: 50px;
  opacity: 0.7;
`;

const circle = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: brown;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  padding: 5px;
  margin: 0.2rem;
  text-transform: uppercase;
  box-shadow: 1px 1px 1px 1px #000000;
`;

const thirdContentsWrapper = css`
  max-width: 80%;
  margin: 0 auto;
  left: 0;
  font-size: 40px;
  color: #fff;
  display: none;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(51, 51, 51, 1) 47%
  );
  .url-wrapper {
  }
`;

export default Contents;
