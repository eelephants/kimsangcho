import { useEffect, useState, useCallback, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Navigation, Pagination } from 'swiper/core';
import 'swiper/swiper.min.css';
import 'swiper/components/effect-fade/effect-fade.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import Button from '../Button';
import { StaticImage } from 'gatsby-plugin-image';
import { ArrowGoBack } from '@emotion-icons/remix-line/ArrowGoBack';
import { ArrowLeftCircle } from '@emotion-icons/remix-fill/ArrowLeftCircle';
import { ArrowRightCircle } from '@emotion-icons/remix-fill/ArrowRightCircle';
import { CloseOutline } from '@emotion-icons/evaicons-outline/CloseOutline';

SwiperCore.use([EffectFade, Navigation, Pagination]);

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

const Static = ({ className }) => {
  return (
    <p css={[stickyElement]} className={className}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae,
      impedit ducimus fuga iusto quam esse pariatur fugit architecto alias
      maiores dignissimos aut vero dolore hic eum blanditiis odio autem
      corrupti.
    </p>
  );
};

const Canvas = ({
  id,
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

  const variants = {
    rotate: {
      skew: [0, 50, 0],
      transition: { duration: 0.5 },
    },
    stop: { y: [0, -20, 0], transition: { repeat: Infinity, repeatDelay: 3 } },
  };

  // TODO 미디어 쿼리 적용하기
  return (
    <motion.div
      css={[stickyElement]}
      className={className}
      id={id}
      variants={variants}
      animate={isSideShow ? 'rotate' : 'stop'}
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
      <canvas
        onMouseEnter={() => {
          !isSideShow ? onMouseEnterFromCanvas() : null;
        }}
        onMouseLeave={() => {
          !isSideShow ? onMouseLeaveFromCanvas() : null;
        }}
        width={window.innerWidth / 2.5}
        height={window.innerWidth / 2.5}
        className="original"
      ></canvas>
      <canvas
        className="flip"
        alt=""
        width={window.innerWidth / 2.5}
        height={window.innerWidth / 7.5}
      ></canvas>
      <Swiper
        spaceBetween={1}
        effect={'fade'}
        nav
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
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
        {images.map((item) => (
          <SwiperSlide>
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
              <img src={item.src} css={{ width: '100%' }} />
            </div>
            <div
              className="flip-hide"
              css={{
                width: window.innerWidth / 2.5,
                height: window.innerWidth / 9.5,
              }}
            >
              <img src={item.src} css={{ width: '100%', opacity: 0.5 }} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="description">
        <div className="first-desc">
          <h1>{title}</h1>
          <h3>
            {duration} / {type}
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
            <div key={index} css={circle}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

Contents.Static = Static;
Contents.Canvas = Canvas;

const stickyElement = css`
  margin: 0;
  position: relative;
  top: 4px;
  left: 0;
  opactiy: 0;
  display: none;
  font-size: 40px;
  padding: 0 200px 200px 200px;
  margin-bottom: 500px;
  color: #fff;
  .original {
    position: absolute;
    z-index: 100;
  }
  .flip {
    position: absolute;
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
    overflow: overlay;
    .first-desc {
      height: 50%;
      letter-spacing: 3px;
      & h1 {
        font-size: 1.7rem;
        font-weight: bold;
        text-transform: upperCase;
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
      min-heigth: 10px;
      over-flow: hidden;
    }

    position: absolute;
    right: 0;
    top: 0;
  }
`;

const divideLine = css`
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(93, 38, 38, 1) 42%
  );
  height: 5px;
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

export default Contents;
