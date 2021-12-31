import React from 'react';
import { css } from '@emotion/react';
import { SwiperSlide } from 'swiper/react';
import CusomSwiper from '@/components/CusomSwiper';

const SecondContents = ({ className }) => {
  return (
    <div css={stickyElement} className={className}>
      <CusomSwiper
        options={{
          spaceBetween: 30,
          autoplay: {
            delay: 5000,
          },
          slidesPerView: 1,
        }}
        render={() => (
          <>
            <SwiperSlide className="intro">
              As a 2nd year developer, I have experience developing/distributing
              web and app services. I was mainly in charge of the front stage in
              web service development, and the BACK stage was also developed as
              needed.
              <br />
              <br /> I started my first career with a small team, and gained a
              lot of experience in a short period of time.
            </SwiperSlide>
            <SwiperSlide className="intro">
              I am a developer who values ​​"collaboration" with team members in
              various roles. Because if you are not alone, you can lead to
              better creative results and unexpected possibilities.
              <br />
              <br /> We believe that business growth can be achieved through
              trust between team members.
            </SwiperSlide>
            <SwiperSlide className="intro">
              We believe in the infinite possibilities of "effort". We believe
              that changing yourself is "effort". <br />
              <br /> When I finished 10 years of playing career due to a
              20-year-old injury, when I said that I was going to New Zealand
              without knowing how to read English, or when I said that I was
              going to work as a developer after graduating from college,
              everyone expressed concerns that it was an absurd path, but day by
              day "Effort" of "I" made me who I am today.
            </SwiperSlide>
          </>
        )}
      />
    </div>
  );
};

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

export default SecondContents;
