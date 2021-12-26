import React, { useEffect, useState, useRef, lazy } from 'react';
import { graphql } from 'gatsby';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import { ArrowLeftS } from '@emotion-icons/remix-fill/ArrowLeftS';
import { ArrowRightS } from '@emotion-icons/remix-fill/ArrowRightS';
import { AccessAlarm } from '@emotion-icons/material/AccessAlarm';

const Button = lazy(() => import('@/components/Button'));
import AppLayout from '@/components/AppLayout/AppLayout';

import {
  BodyClassGif,
  MerracGif,
  BodyClassLogin,
  BodyClassMain2,
  BodyClassMain1,
  BodyClassTitleMain,
  BodyClassClass,
  BodyClassTrainer,
  BodyClassCart,
  BodyClassMy,
  MerracTitleMain1,
  MerracTitleMain2,
  MerracMenu1,
  MerracMenu2,
  MerracAdmin,
  Polrep1,
  Polrep2,
  Polrep3,
  WebGis1,
  WebGis2,
  WebGis3,
  WebGis4,
  HdcSplash,
  HdcView1,
  HdcView2,
  HdcView3,
  HdcView4,
  HdcView5,
} from '@/assets/index.js';
import { isBrowser } from '@/lib/utils/helper';
import FirstSection from '@/components/Contents/details/firstSection';
import SecondSection from '@/components/Contents/details/secondSection';
import ThirdSection from '@/components/Contents/details/thirdSection';
const mainImages = {
  bodyClass: BodyClassGif,
  merrac: MerracGif,
  airForce: '',
  hdc: '',
};

const subImages = {
  bodyClass: [
    BodyClassTitleMain,
    BodyClassLogin,
    BodyClassMain2,
    BodyClassMain1,
    BodyClassClass,
    BodyClassTrainer,
    BodyClassCart,
    BodyClassMy,
  ],
  merrac: [
    MerracTitleMain1,
    MerracTitleMain2,
    MerracMenu1,
    MerracMenu2,
    MerracAdmin,
    Polrep1,
    Polrep2,
    Polrep3,
    WebGis1,
    WebGis2,
    WebGis3,
    WebGis4,
  ],
  airForce: [],
  hdc: [HdcSplash, HdcView5, HdcView4, HdcView3, HdcView2, HdcView1],
};

const noImageComment = `Sorry, Leakage to the outside is prohibited, so it is impossible to share the site`;

SwiperCore.use([Navigation]);

export default function TemplatePost({ data, location }) {
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

  const Task = styled(AccessAlarm)`
    color: #000;
    width: 100%;
    height: auto;
  `;

  const post = data.markdownRemark;
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    // scroll
    isBrowser() && window.addEventListener('scroll', eventScroll);
    return () => {
      isBrowser() && window.removeEventListener('scroll', eventScroll);
    };
  }, []);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const eventScroll = () => setScrollY(isBrowser() && window.scrollY);

  const getImage = name => subImages[name];

  return (
    <AppLayout>
      <AppLayout.Header location={location} scrollY={scrollY} />
      <AppLayout.Main
        styles={{
          color: 'white',
          textDecoration: 'none',
          'padding-top': '10vh',
          diplay: 'grid',
          'grid-template-rows': 'repeat(4, min-content) 1fr',
          'grid-template-columns': '100%',
        }}
      >
        <FirstSection post={post} />
        <SecondSection post={post} />
        <ThirdSection post={post} />
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
                <Swiper
                  navigation={true}
                  autoHeight={true}
                  navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                  }}
                  onSwiper={swiper => {
                    // Delay execution for the refs to be defined
                    setTimeout(() => {
                      // Override prevEl & nextEl now that refs are defined
                      swiper.params.navigation.prevEl =
                        navigationPrevRef.current;
                      swiper.params.navigation.nextEl =
                        navigationNextRef.current;

                      // Re-init navigation
                      swiper.navigation.destroy();
                      swiper.navigation.init();
                      swiper.navigation.update();
                    });
                  }}
                >
                  {getImage(post.frontmatter.images).map((item, index) => (
                    <SwiperSlide className="intro" key={index}>
                      <img
                        src={item}
                        alt={post.frontmatter.images}
                        css={{ width: '100%' }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
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
      </AppLayout.Main>
    </AppLayout>
  );
}

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

const titleWrapper = css`
  margin-bottom: 3rem;
  max-width: 800px;
`;

const roleWrapper = css`
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

const descWrapper = css`
  max-width: 500px;
  margin: auto 0;
`;

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 280)
      html
      frontmatter {
        title
        startDate(formatString: "MM/YY")
        endDate(formatString: "MM/YY")
        category
        skills
        draft
        intro
        images
        roles {
          name
          desc
        }
      }
    }
  }
`;
