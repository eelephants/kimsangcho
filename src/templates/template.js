import React, { useEffect, useState, useRef } from 'react';
import { graphql } from 'gatsby';
import AppLayout from '../components/AppLayout/AppLayout';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import Button from '../components/Button';
import { ArrowLeftS } from '@emotion-icons/remix-fill/ArrowLeftS';
import { ArrowRightS } from '@emotion-icons/remix-fill/ArrowRightS';
import { AccessAlarm } from '@emotion-icons/material/AccessAlarm';
import { FileX } from '@emotion-icons/bootstrap';
import { flushSync } from 'react-dom';

import {
  BodyClassGif,
  MerracGif,
  BodyClassLogin,
  BodyClassMain2,
  BodyClassMain1,
} from '../assets/index.js';
const mainImages = {
  bodyClass: BodyClassGif,
  merrac: MerracGif,
  airForce: '',
  hdc: '',
};

const subImages = {
  bodyClass: [BodyClassMain1, BodyClassMain2, BodyClassLogin],
  merrac: [BodyClassMain1, BodyClassMain2, BodyClassLogin],
  airForce: [],
  hdc: [BodyClassMain1, BodyClassMain2, BodyClassLogin],
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

  const Task = styled(AccessAlarm)`
    color: #000;
    width: 100%;
    height: auto;
  `;

  const post = data.markdownRemark;
  const [scrollY, setScrollY] = useState(0);
  const [isShow, setIsShow] = useState(0);
  useEffect(() => {
    // scroll
    window.addEventListener('scroll', eventScroll);
    return () => {
      window.removeEventListener('scroll', eventScroll);
    };
  }, []);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const navigationRoleNextRef = useRef(null);
  const navigationRolePrevRef = useRef(null);

  const eventScroll = () => setScrollY(window.scrollY);

  const getImage = (name) => subImages[name];

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
          {mainImages[post.frontmatter.images] ? (
            <img
              src={mainImages[post.frontmatter.images]}
              alt={post.frontmatter.images}
              css={{ width: '100%' }}
            />
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
          <div
            css={css`
              font-size: 1.2rem;
              color: white;
              position: relative;
              top: 10%;
              left: 10%;
              width: 380px;
              max-width: 380px;
            `}
          >
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
                  ref={navigationRolePrevRef}
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
                    right: '-12%',
                  }}
                  ref={navigationRoleNextRef}
                >
                  <RightArrowWhiteCircleIcon />
                </Button>
              </>
            )}

            <Swiper
              navigation={true}
              slidesPerView={5}
              navigation={{
                prevEl: navigationRolePrevRef.current,
                nextEl: navigationRoleNextRef.current,
              }}
              onSwiper={(swiper) => {
                // Delay execution for the refs to be defined
                setTimeout(() => {
                  // Override prevEl & nextEl now that refs are defined
                  swiper.params.navigation.prevEl =
                    navigationRolePrevRef.current;
                  swiper.params.navigation.nextEl =
                    navigationRoleNextRef.current;

                  // Re-init navigation
                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                });
              }}
            >
              {post.frontmatter.roles.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    onClick={() => setIsShow(index)}
                    css={css`
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
                      box-shadow: 0px 10px 13px -7px #000000,
                        5px 5px 15px 5px #0000;
                      :hover {
                        background-color: #ddd;
                      }
                    `}
                  >
                    {index + 1}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div
            css={css`
              transform: rotate(90deg);
              display: inline-block;
              font-size: 1.2rem;
              color: white;
              position: absolute;
              top: 20%;
              right: 17%;
            `}
          >
            <div
              css={css`
                border: 1px solid white;
              `}
            ></div>
            <span>Role</span>
          </div>
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
              overflow: hidden;
              font-size: 1.3rem;
              // border: 1px solid;
            `}
          >
            {post.frontmatter.roles.map((item, index) => (
              <div
                key={index}
                css={css`
                  display: ${isShow === index ? 'flex' : 'none'};
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                `}
              >
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
        <section
          css={[
            boxWrapper,
            css`
              position: sticky;
              top: 0px;
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
  .slideBtn {
    svg:hover {
      color: rgba(204, 192, 192, 1);
    }
  }
`;

const roleTitle = css`
  line-height: 0.8;
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
