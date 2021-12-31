import React, { useRef, useState } from 'react';
import { css } from '@emotion/react';
import { ArrowLeftS } from '@emotion-icons/remix-fill/ArrowLeftS';
import { ArrowRightS } from '@emotion-icons/remix-fill/ArrowRightS';
import styled from '@emotion/styled';
import { SwiperSlide } from 'swiper/react';
import { Virtual } from 'swiper';

import CustomSwiper from '@/components/CusomSwiper';
import Button from '@/components/Button';

const ArrowBackWhiteCircleIcon = styled(ArrowLeftS)`
  color: #fff;
  width: 50%;
  height: auto;
`;

const RightArrowWhiteCircleIcon = styled(ArrowRightS)`
  color: #fff;
  width: 50%;
  height: auto;
`;

const ThirdSection = ({ post }) => {
  const tags = '[details/thirdSection]';

  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);

  const [isShow, setIsShow] = useState(0);

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
    <section css={boxWrapper}>
      <div css={slideButtonWrapper}>
        {post.frontmatter.roles.length > 5 && (
          <>
            <Button
              className="slideBtn"
              small
              isShow
              backGroundcolor="transparent"
              absolute
              left="0"
              style={{
                left: '-14%',
              }}
              ref={navigationPrevRef}
            >
              <ArrowBackWhiteCircleIcon />
            </Button>
            <Button
              className="slideBtn"
              small
              isShow
              backGroundcolor="transparent"
              absolute
              right="0"
              style={{
                right: '-15%',
              }}
              ref={navigationNextRef}
            >
              <RightArrowWhiteCircleIcon />
            </Button>
          </>
        )}

        <CustomSwiper
          ref={{
            prevRef: navigationPrevRef,
            nextRef: navigationNextRef,
          }}
          images={post.frontmatter.roles}
          onSwiper={onSwiper}
          options={{
            spaceBetween: 10,
            slidesPerView: 5,
            virtual: Virtual,
          }}
          render={roles =>
            roles.map((item, index) => (
              <SwiperSlide key={index}>
                <div onClick={() => setIsShow(index)} css={slideContents}>
                  {index + 1}
                </div>
              </SwiperSlide>
            ))
          }
        />
      </div>
      <div css={typeWrapper}>
        <div css={typeBox}></div>
        <span>Role</span>
      </div>
      <div css={contentsWrapper}>
        {post.frontmatter.roles.map((item, index) => (
          <div key={index} css={contentsBox(isShow, index)}>
            <div css={[roleWrapper, titleWrapper]}>
              <div className="number-wrapper">{index + 1}.</div>
              <div className="title-wrapper">{item.name}</div>
            </div>
            <div css={[roleWrapper, descWrapper]}>
              {item.desc.map((el, index) => (
                <div key={index} className="desc-wrapper">
                  # {el}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const boxWrapper = () => css`
  height: 100vh;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(51, 51, 51, 1) 47%
  );
  width: 100%;
  position: sticky;
  .slideBtn {
    svg:hover {
      color: rgba(204, 192, 192, 1);
    }
  }
`;

const slideButtonWrapper = () => css`
  font-size: 1.2rem;
  color: white;
  position: relative;
  top: 10%;
  left: 10%;
  width: 380px;
  max-width: 380px;
`;

const slideContents = () => css`
  cursor: pointer;
  padding: 7px 30px;
  background-color: #fff;
  border-radius: 150px;
  width: 10%;
  color: #000;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  text-shadow: 2px 2px 2px gray;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px #0000;
  :hover {
    background-color: #ddd;
  }
`;

const typeWrapper = () => css`
  transform: rotate(90deg);
  display: inline-block;
  font-size: 1.2rem;
  color: white;
  position: absolute;
  top: 20%;
  right: 17%;
`;

const typeBox = () => css`
  border: 1px solid white;
`;

const contentsWrapper = () => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  font-size: 1.3rem;
`;

const contentsBox = (isShow, index) => css`
  display: ${isShow === index ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const titleWrapper = () => css`
  margin-bottom: 3rem;
  max-width: 800px;
`;

const roleWrapper = () => css`
  font-size: 1rem;
  text-align: center;
  font-weight: 100;
  .number-wrapper {
    font-size: 3.5rem;
    text-align: center;
    margin-bottom: 1rem;
    font-weight: bold;
  }
  .title-wrapper {
    font-size: 1.8rem;
    font-weight: bold;
    text-transform: capitalize;
  }
  .desc-wrapper {
    text-indent: 2rem;
    margin-top: 1rem;
    text-align: left;
`;

const descWrapper = () => css`
  max-width: 500px;
  margin: auto 0;
`;

export default ThirdSection;
