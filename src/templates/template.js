import React, { useEffect, useState, useRef } from 'react';

import { graphql } from 'gatsby';
import AppLayout from '../components/AppLayout/AppLayout';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import BodyClassMain1 from '../assets/bodyClass_detail1.png';
import BodyClassMain2 from '../assets/bodyClass_detail2.png';
import BodyClassMain3 from '../assets/bodyClass_detail3.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import Button from '../components/Button';
import { ArrowLeftS } from '@emotion-icons/remix-fill/ArrowLeftS';
import { ArrowRightS } from '@emotion-icons/remix-fill/ArrowRightS';

const mainImages = {
  bodyClass: [BodyClassMain1, BodyClassMain2, BodyClassMain3],
};

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

  const post = data.markdownRemark;
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    // scroll
    window.addEventListener('scroll', eventScroll);
    return () => {
      window.removeEventListener('scroll', eventScroll);
    };
  }, []);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const eventScroll = () => setScrollY(window.scrollY);

  const getImage = (name) => mainImages[name];

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
        <section
          css={[
            boxWrapper,
            css`
              display: grid;
              grid-template-rows: 1fr 1fr 2fr;
            `,
          ]}
        >
          <div
            css={css`
              display: grid;
              grid-template-columns: 4fr 1fr;
              align-items: center;
              justify-items: center;
              font-size: 4rem;
              ext-transform: uppercase;
              letter-spacing: 1rem;
              font-weight: bold;
            `}
          >
            <div>{post.frontmatter.title}</div>
            <div
              css={css`
                justify-self: start;
                font-size: 1rem;
                border-bottom: 1px solid;
                width: 1.7rem;
                transform: rotate(90deg);
              `}
            ></div>
          </div>
          <div
            css={css`
              display: grid;
              grid-template-columns: 4fr 1fr;
            `}
          >
            <div></div>
            <div>
              <span
                css={css`
                  transform: rotate(90deg) translate(-4rem, 0px);
                  display: inline-block;
                  font-size: 1.2rem;
                `}
              >
                {post.frontmatter.category}
              </span>
            </div>
          </div>
          <div
            css={css`
              position: relative;
            `}
          >
            <div
              css={css`
                position: absolute;
                transform: rotate(25deg);
                top: -20%;
                left: 10%;
                width: 40%;
              `}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -139 106 139">
                <path
                  d="M 0 -1 L 0 -139 L 106 -139 L 106 0 L 0 -1 Z"
                  stroke="#FFF"
                  stroke-width="0.3"
                  fill="none"
                />
              </svg>
            </div>
            <p
              css={css`max-width: 30%;
                        position: absolute;
                        line-height: 2;
                        left: 19%;
                        top: 25%;
                        font-size: 1.1rem;
                    }`}
            >
              {post.frontmatter.intro}
            </p>
            <div
              css={css`max-width: 30%;
                        position: absolute;
                        line-height: 1.5;
                        right: 15%;
                        top: 10%;
                        font-size: 1.1rem;
                    }`}
            >
              <p>
                {post.frontmatter.startDate} - {post.frontmatter.endDate}
              </p>
              <hr />
              <p css={[roleTitle]}>Skill:</p>
              {post.frontmatter.skills.map((item) => (
                <p css={[roleTitle]}>{item}</p>
              ))}
            </div>
          </div>
        </section>
        <section
          css={[
            boxWrapper,
            css`
              position: sticky;
              top: 0px;
            `,
          ]}
        >
          <img
            src={getImage(post.frontmatter.images)[0]}
            alt={post.frontmatter.images}
            css={{ width: '100%' }}
          />
        </section>
        <section
          css={[
            boxWrapper,
            css`
              background: black;
              width: 100%;
              position: sticky;
            `,
          ]}
        >
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </section>
        <section
          css={[
            boxWrapper,
            css`
              position: sticky;
              top: 0px;
            `,
          ]}
        >
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
          <div css={{ width: '100%', margin: '0 auto' }}>
            <Swiper
              navigation={true}
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
        </section>
      </AppLayout.Main>
    </AppLayout>
  );
}

const boxWrapper = css`
  height: 100vh;
  .slideBtn {
    svg:hover {
      color: #ff9a44;
    }
  }
`;

const roleTitle = css`
  line-height: 0.8;
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
        intro
        images
      }
    }
  }
`;
