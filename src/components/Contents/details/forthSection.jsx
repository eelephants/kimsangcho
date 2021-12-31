import React, { useRef } from 'react';
import { css } from '@emotion/react';
import { ArrowLeftS } from '@emotion-icons/remix-fill/ArrowLeftS';
import { ArrowRightS } from '@emotion-icons/remix-fill/ArrowRightS';
import styled from '@emotion/styled';
import { SwiperSlide } from 'swiper/react';
import { Virtual } from 'swiper';
import { subImages } from '@static/details';

import CustomSwiper from '@/components/CusomSwiper';
import Button from '@/components/Button';

const ArrowBackCircleIcon = styled(ArrowLeftS)`
  color: #000;
  width: 80%;
  height: auto;
`;

const RightArrowCircleIcon = styled(ArrowRightS)`
  color: #000;
  width: 80%;
  height: auto;
`;

const ForthSection = ({ post }) => {
  const tags = '[details/forthSection]';

  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);

  const getImage = name => subImages[name];

  const noImageComment = `Sorry, Leakage to the outside is prohibited, so it is impossible to share the site`;

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

  return (
    <section css={forthBoxWrapper}>
      {getImage(post.frontmatter.images).length ? (
        <>
          <Button
            className="slideBtn"
            small
            isShow
            backGroundcolor="transparent"
            absolute
            left="0"
            style={{
              top: '50%',
            }}
            ref={navigationPrevRef}
          >
            <ArrowBackCircleIcon />
          </Button>
          <Button
            className="slideBtn"
            small
            isShow
            backGroundcolor="transparent"
            absolute
            right="0"
            style={{
              top: '50%',
            }}
            ref={navigationNextRef}
          >
            <RightArrowCircleIcon />
          </Button>
          <div css={swiperWrapper}>
            <CustomSwiper
              ref={{
                prevRef: navigationPrevRef,
                nextRef: navigationNextRef,
              }}
              images={post.frontmatter.images}
              options={{
                autoHeight: true,
                virtual: Virtual,
              }}
              onSwiper={onSwiper}
              render={images =>
                getImage(images).map((item, index) => (
                  <SwiperSlide
                    virtualIndex={index}
                    className="intro"
                    key={index}
                  >
                    <img src={item} alt={images} css={{ width: '100%' }} />
                  </SwiperSlide>
                ))
              }
            />
          </div>
        </>
      ) : (
        <div css={emptyBoxWrapper}>
          <span css={emptyBox}>{noImageComment}</span>
        </div>
      )}
    </section>
  );
};

const forthBoxWrapper = () => css`
  height: 100vh;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(51, 51, 51, 1) 47%
  );
  position: sticky;
  top: 0px;
  background: #fff;
  .slideBtn {
    svg:hover {
      color: rgba(204, 192, 192, 1);
    }
  }
`;

const swiperWrapper = () => css`
  width: 100%;
  margin: 0 auto;
`;

const emptyBoxWrapper = () => css`
  width: 100%;
  backgroundcolor: #303030;
  height: 100%;
  color: #ec87e4;
  fontsize: 2rem;
  display: flex;
  alignitems: center;
  justifycontent: center;
`;

const emptyBox = () => css`
  padding: 0 100px 0 100px;
`;

export default ForthSection;
