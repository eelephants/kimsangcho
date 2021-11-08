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
import { makeColor, mq } from '../../lib/utils/helper';

SwiperCore.use([
  EffectFade,
  Navigation,
  Pagination,
  EffectCoverflow,
  A11y,
  Autoplay,
]);

const CloseOutlineIcon = styled(CloseOutline)`
  color: #bfbbbb;
  width: 50%;
  height: auto;
`;

const ArrowBackCircleIcon = styled(ArrowLeftCircle)`
  color: #bfbbbb;
  width: 80%;
  height: auto;
`;

const RightArrowCircleIcon = styled(ArrowRightCircle)`
  color: #bfbbbb;
  width: 80%;
  height: auto;
`;

const ArrowGoBackIcon = styled(ArrowGoBack)`
  color: #bfbbbb;
  width: 80%;
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
  className,
  title,
  duration,
  type,
  desc,
  role,
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
        <Button
          rotate
          circle
          backGroundcolor="black"
          opacity="0.8"
          absolute
          top={window.innerWidth / 2.5 / 2}
          left={(window.innerWidth / 2.5 + 200) / 2}
          transform="translate(80%, -80%)"
          isShow={isShow}
          onMouseEnter={() => {
            !isSideShow ? onMouseEnterFromCanvas() : null;
          }}
          onClick={onClickGoBack}
        >
          <ArrowGoBackIcon />
        </Button>
        <Button
          small
          backGroundcolor="transparent"
          absolute
          top={window.innerWidth / 2.5 / 2}
          left="185"
          transform="translate(0%, -80%)"
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
          top={window.innerWidth / 2.5 / 2}
          left={window.innerWidth / 2.5 + 200 - 65}
          transform="translate(0%, -80%)"
          isShow={isSideShow}
          onMouseEnter={() => {
            !isSideShow ? onMouseEnterFromCanvas() : null;
          }}
          ref={navigationNextRef}
        >
          <RightArrowCircleIcon />
        </Button>
        <TestIcon />
        <Button
          small
          backGroundcolor="transparent"
          absolute
          top={30}
          left={window.innerWidth / 2.5 + 200 - 65}
          transform="translate(0%, -80%)"
          isShow={isSideShow}
          onMouseEnter={() => {
            !isSideShow ? onMouseEnterFromCanvas() : null;
          }}
          onClick={onClickInit}
        >
          <CloseOutlineIcon />
        </Button>
        <div
          css={{
            width: '100%',
          }}
        >
          <canvas
            className="original"
            css={{
              [mq('small')]: {
                position: 'relative',
              },
              [mq('large')]: {
                position: 'relative',
              },
            }}
            onMouseEnter={() => {
              !isSideShow ? onMouseEnterFromCanvas() : null;
            }}
            onMouseLeave={() => {
              !isSideShow ? onMouseLeaveFromCanvas() : null;
            }}
            width={window.innerWidth / 2.5}
            height={window.innerWidth / 2.5}
          ></canvas>
          {/* <canvas
            className="flip"
            css={{
              [mq('small')]: {
                position: 'absolute',
              },
              [mq('large')]: {
                position: 'absolute',
              },
            }}
            alt=""
            width={window.innerWidth / 2.5}
            height={window.innerWidth / 7.5}
          ></canvas> */}
        </div>
        <Swiper
          spaceBetween={50}
          effect={'fade'}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          slidesPerView="auto"
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
            <SwiperSlide
              style={{ width: '100%' }}
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
                  width: window.innerWidth / 2.5,
                  height: window.innerWidth / 2.5,
                }}
              >
                <img
                  src={item.src}
                  css={{ width: '100%', display: 'inline-block' }}
                />
              </div>
              {/* <div
                className="flip-hide"
                css={{
                  width: window.innerWidth / 2.5,
                  height: window.innerWidth / 9.5,
                }}
              >
                <img
                  src={item.src}
                  css={{ width: '100%', opacity: 0.5, display: 'inline-block' }}
                />
              </div> */}
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
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <h1>{title}</h1>
          </div>
          <h3>
            {duration} /&nbsp;{type}
          </h3>
          <div>
            <label>#Desc</label>
            <span>- {desc}</span>
          </div>
          <div>
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
                background-color: rgba(${makeColor(item)});
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                padding: 5px;
                margin: 0.2rem;
                text-transform: uppercase;
                box-shadow: 1px 1px 1px 1px #000000;
              `}
            >
              {item}
            </div>
          ))}
        </div>
        <Button
          isShow
          backGroundcolor="black"
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
    </motion.div>
  );
};

const ForthContents = ({
  sceneInfo,
  className,
  title,
  id,
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
  const width = window.innerWidth / 2.5 + 'px';

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
      <div
        css={css`
          flex: 2;
        `}
      >
        <Swiper
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
                  width: ${window.innerWidth / 2.5}px;
                  height: ${window.innerWidth / 2.5}px;
                `}
              >
                <img
                  src={item.src}
                  css={{ width: '100%', display: 'inline-block' }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div
        css={css`
          flex: 0.5;
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
            top: -190px;
            left: 0;
            right: 0px;
            margin-right: auto;
            margin-left: auto;
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
        </motion.div>
        {desc}
      </div>
      <Button
        isShow
        backGroundcolor="black"
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
  top: 4px;
  left: 0;
  opactiy: 0;
  display: none;
  font-size: 2rem;
  padding: 0 200px 200px 200px;
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
      color: deeppink;
    }
  }
  .description {
    color: #fff;
    width: 100%;
    .first-desc {
      height: 50%;
      letter-spacing: 3px;
      & h1 {
        font-size: 1.7rem;
        font-weight: bold;
        text-transform: upperCase;
      }
      & .url {
        color: #fff;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.3s linear;
        &:hover {
          color: #000;
        }
      }
      & h3 {
        font-size: 1.1rem;
        font-weight: 700;
        color: #ddd;
        padding: 10px 0 10px 0;
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
  background: #ddd;
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
  margin: 0;
  left: 0;
  font-size: 40px;
  color: #fff;
  // border: red 1px solid;
  display: none;
  flex-direction: column;
  padding: 40px 70px;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(51, 51, 51, 1) 47%
  );
`;

export default Contents;
