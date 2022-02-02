import React from 'react';
import { css } from '@emotion/react';
import { SwiperSlide } from 'swiper/react';
import CusomSwiper from '@/components/CusomSwiper';
import { mq } from '@/lib/utils/helper';

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

const stickyElement = () => css`
  margin: 0;
  position: relative;
  left: 0;
  opactiy: 0;
  font-size: 2rem;
  padding: 0 200px 0 200px;
  line-height: 1.3;
  height: 100%;
  display: flex !important;
  align-items: center;
  ${mq('small')} {
    padding: 0 50px 0 50px;
    font-size: 1.5rem;
  }
  .swiper-container {
    height: 100%;
  }
  .intro {
    height: 100%;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
`;

export default SecondContents;
