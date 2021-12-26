import React, { forwardRef, useImperativeHandle } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  EffectCoverflow,
  A11y,
  Autoplay,
  Virtual,
  Lazy,
} from 'swiper/core';

import 'swiper/swiper.min.css';
import 'swiper/components/effect-fade/effect-fade.min.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import { css } from '@emotion/react';

SwiperCore.use([
  EffectFade,
  Navigation,
  EffectCoverflow,
  A11y,
  Autoplay,
  Virtual,
  Pagination,
  Lazy,
]);

const CustomSwiper = (
  { onSwiper, images, isBoxShadow, options, render },
  ref
) => {
  console.log(ref, 'ref');
  return (
    <Swiper
      css={swiperWrapper(isBoxShadow)}
      navigation={{
        prevEl: ref?.prevRef.current,
        nextEl: ref?.nextRef.current,
      }}
      onSwiper={onSwiper}
      observeParents={true}
      observer={true}
      lazy={true}
      spaceBetween={options.spaceBetween ? options.spaceBetween : 50}
      slidesPerView={options.slidesPerView ? options.slidesPerView : 1}
      effect={options.effect}
      grabCursor={options.grabCursor}
      centeredSlides={options.centeredSlides}
      autoplay={options.autoplay}
      coverflowEffect={options.coverflowEffect}
      autoHeight={options.autoHeight}
    >
      {render && render(images && images)}
    </Swiper>
  );
};

const swiperWrapper = isBoxShadow => css`
  boxshadow: ${isBoxShadow ? '5px 5px 15px 5px #000000' : 'none'};
  backgroundcolor: '#000';
`;

export default forwardRef(CustomSwiper);
