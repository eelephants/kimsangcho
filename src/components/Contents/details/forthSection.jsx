import React, { useRef, useState } from 'react';
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
    <section
      css={[
        boxWrapper,
        css`
          position: sticky;
          top: 0px;
          background: #fff;
        `,
      ]}
    >
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
          <div
            css={{
              width: '100%',
              margin: '0 auto',
            }}
          >
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
            ></CustomSwiper>
          </div>
        </>
      ) : (
        <div
          css={{
            width: '100%',
            backgroundColor: '#303030',
            height: '100%',
            color: '#EC87E4',
            fontSize: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            css={{
              padding: '0 100px 0 100px',
            }}
          >
            {noImageComment}
          </span>
        </div>
      )}
    </section>
  );
};

const boxWrapper = css`
  height: 100vh;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(51, 51, 51, 1) 47%
  );
  .slideBtn {
    svg:hover {
      color: rgba(204, 192, 192, 1);
    }
  }
`;

export default ForthSection;
