import React, {
  useCallback,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  EffectCoverflow,
  A11y,
  Autoplay,
  Virtual,
} from 'swiper/core';
import 'swiper/swiper.min.css';
import 'swiper/components/effect-fade/effect-fade.min.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import { mq } from '@/lib/utils/helper';
import { css } from '@emotion/react';

SwiperCore.use([
  EffectFade,
  Navigation,
  Pagination,
  EffectCoverflow,
  A11y,
  Autoplay,
]);

const CustomSwiper = (
  { onSwiper, images, isBoxShadow, options, render },
  { prevRef, nextRef }
) => {
  const navigationPrevRef = useRef();
  const navigationNextRef = useRef();

  useImperativeHandle(prevRef, () => navigationPrevRef.current);
  useImperativeHandle(nextRef, () => navigationNextRef.current);

  return (
    <Swiper
      css={swiperWrapper(isBoxShadow)}
      navigation={{
        prevEl: navigationPrevRef,
        nextEl: navigationNextRef,
      }}
      modules={[Virtual]}
      onSwiper={onSwiper}
      spaceBetween={options.spaceBetween}
      slidesPerView={options.slidesPerView}
    >
      {render(images)}
    </Swiper>
  );
};

const swiperWrapper = isBoxShadow => css`
  boxshadow: ${isBoxShadow ? '5px 5px 15px 5px #000000' : 'none'};
  backgroundcolor: '#000';
`;

export default forwardRef(CustomSwiper);
