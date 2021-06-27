import React, { useEffect, useRef, useState } from 'react';
import { graphql } from 'gatsby';
import { css } from '@emotion/react';
import AppLayout from '../components/AppLayout';
import Video from '../components/Video';
import MainVideo from '../assets/video/main.mp4';
import Dimmed from '../components/Dimmed';
import BoxGeometry from '../components/BoxGeometry';
import { StaticImage } from 'gatsby-plugin-image';
import Portpolio1 from '../assets/portpolio1.jpg';
import Portpolio2 from '../assets/portpolio2.png';
import Portpolio3 from '../assets/portpolio3.png';
import Portpolio4 from '../assets/portpolio4.png';
import useWindowSize from '../hooks/useWindowSize';

import {
  SCROLL_LOOP,
  SET_EACH_SECTION_HEIGHT,
  SET_PAGE_YOFFSET,
  SET_TOTAL_SCROLL_HEIGHT,
  SET_USE_REF,
  useSceneDispatch,
  useSceneState,
  PLAY_ANIMATION,
  SET_CANVAS_IMAGE,
} from '../store/sceneInfo';
import Contents from '../components/Contents/Contents';
import WrappedContents from '../components/Contents/wrapper/wrappedContents';

// {data.allMarkdownRemark.edges.map((edge) => {
//   return (
//     <Link to={`/portfolio/${edge.node.fields.slug}`}>
//       {/* <h2>{edge.node.frontmatter.title}</h2>
//       <p>{edge.node.frontmatter.date}</p> */}
//     </Link>
//   );
// })}

const Index = ({ data, location }) => {
  const firstSectionRef = useRef();
  const secondSectionRef = useRef();
  const thirdSectionRef = useRef();
  const forthSectionRef = useRef();

  const headerRef = useRef();
  const mainRef = useRef();
  const [imageList, setImageList] = useState([
    Portpolio1,
    Portpolio2,
    Portpolio3,
    Portpolio4,
  ]);
  const { width } = useWindowSize();

  const { sceneInfo, currentScene, yOffset, prevScrollHeight } =
    useSceneState();
  const sceneDeispatch = useSceneDispatch();

  useEffect(() => {
    // load
    setLayout();
    // scroll
    window.addEventListener('scroll', eventScroll);
    return () => {
      window.removeEventListener('scroll', eventScroll);
    };
  }, []);

  useEffect(() => {
    // resize
    if (width > 900) {
      setLayout();
    }
  }, [width]);

  // 각 스크롤 섹션의 높이
  const setEachSectionHeight = () => {
    sceneDeispatch({
      type: SET_USE_REF,
      data: [
        firstSectionRef,
        secondSectionRef,
        thirdSectionRef,
        forthSectionRef,
      ],
    });
    sceneDeispatch({ type: SET_EACH_SECTION_HEIGHT });
  };

  // 전체 스크롤 높이
  const setTotalScrollHeight = () => {
    sceneDeispatch({ type: SET_PAGE_YOFFSET });
    sceneDeispatch({ type: SET_TOTAL_SCROLL_HEIGHT });
  };

  const setCanvasImage = () => {
    sceneDeispatch({ type: SET_CANVAS_IMAGE });
  };

  // 레이아웃 셋팅
  const setLayout = () => {
    setCanvasImage();
    setEachSectionHeight();
    setTotalScrollHeight();
    setOriginalPortpolio();
    setFlipPortpolio();
  };

  const covertRadian = (angle) => {
    return (angle * Math.PI) / 180;
  };

  const setOriginalPortpolio = () => {
    const original = document.querySelectorAll('.original');
    const description = document.querySelector('.description');
    Array.from(original).forEach((item, index) => {
      const ctx = item.getContext('2d');
      var cw = item.width;
      var ch = item.height;
      description.style.right = `${cw * 0.4}px`;
      description.style.top = `${65}px`;
      description.style.maxWidth = `${cw * 0.55}px`;
      description.style.maxHeight = `${ch * 0.75}px`;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(cw, 85);
      ctx.lineTo(cw, cw - 85);
      ctx.lineTo(0, cw);
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'rgba(51, 51, 51, 1) 47%';
      ctx.stroke();
      ctx.clip();

      const imgElem = new Image();
      imgElem.src = imageList[index];
      imgElem.addEventListener('load', () => {
        ctx.moveTo(0, 0);
        ctx.drawImage(imgElem, 0, 0, cw, ch);
      });

      ctx.closePath();
    });
  };

  const setFlipPortpolio = () => {
    const flip = document.querySelectorAll('.flip');
    const original = document.querySelector('.original');
    Array.from(flip).forEach((item, index) => {
      const ctx = item.getContext('2d');
      var cw = item.width;
      var ch = item.height;

      item.style.top = `${original.height * 0.8}px`;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(cw, 0);
      ctx.lineTo(cw, ch - 85);
      ctx.lineTo(0, ch);

      ctx.clip();

      const imgElem = new Image();
      imgElem.src = imageList[index];
      imgElem.addEventListener('load', () => {
        ctx.setTransform(1, 0, 0, -1, 0, ch);
        ctx.globalAlpha = 0.2;
        ctx.drawImage(
          imgElem,
          0,
          ch * 0.4,
          imgElem.width,
          imgElem.height,
          0,
          0,
          cw,
          ch
        );
      });

      ctx.closePath();
    });
  };

  // // 스크롤 이벤트
  const scrollLoop = async () => {
    await sceneDeispatch({ type: SCROLL_LOOP });
    await sceneDeispatch({ type: PLAY_ANIMATION });
  };

  // // 스크롤 이벤트
  const eventScroll = async () => {
    await scrollLoop();
  };

  return (
    <AppLayout>
      <AppLayout.Header location={location} ref={headerRef} />
      <AppLayout.Main ref={mainRef}>
        <div css={firstSection} ref={firstSectionRef} id="scroll-section-0">
          <BoxGeometry
            width="60vh"
            height="60vh"
            position="absolute"
            resize={width}
          />
          <Dimmed width="100%" height="70vh" opacity="0.5" />
          <Video videoSrcURL={MainVideo} videoTitle="mainVideo" />
        </div>
        <WrappedContents ref={secondSectionRef} id="scroll-section-1">
          <Contents.Static className="static-section" />
        </WrappedContents>
        <WrappedContents ref={thirdSectionRef} id="scroll-section-2">
          <div css={[stickyCanvas]} className="sticky-elem-canvas">
            <canvas id="video-canvas-0" width="1920" height="1080"></canvas>
          </div>
          {[
            'sticky-elem main-message a',
            'sticky-elem main-message b',
            'sticky-elem main-message c',
            'sticky-elem main-message d',
          ].map((item, index) => (
            <Contents.Canvas key={index} className={item} />
          ))}
        </WrappedContents>
        <div css={[secondSection]} ref={forthSectionRef} id="scroll-section-3">
          <div css={[stickyElement]} className="sticky-elem main-message a">
            <p>test5</p>
          </div>
          <div css={[stickyElement]} className="sticky-elem main-message b">
            <p>test6</p>
          </div>
          <div css={[stickyElement]} className="sticky-elem main-message c">
            <p>test7</p>
          </div>
          <div css={[stickyElement]} className="sticky-elem main-message d">
            <p>test8</p>
          </div>
        </div>
      </AppLayout.Main>
    </AppLayout>
  );
};

const firstSection = css`
  padding-top: 10vh;
  height: 70vh;
`;

const stickyCanvas = css`
  position: sticky;
  top: 0;
  height: 100vh;
  canvas {
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;

const stickyElement = css`
  margin: 0;
  position: relative;
  top: 4px;
  left: 0;
  opactiy: 0;
  display: none;
  font-size: 40px;
  padding: 0 200px 200px 200px;
  margin-bottom: 500px;
  color: #fff;
  .original {
    position: absolute;
    z-index: 100;
  }
  .flip {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0 200px 200px 200px;
  }
  .description {
    color: #fff;
    overflow: overlay;
    .first-desc {
      height: 50%;
      letter-spacing: 3px;
      & h1 {
        font-size: 1.7rem;
        font-weight: bold;
        text-transform: upperCase;
      }
      & h3 {
        font-size: 1.1rem;
        font-weight: 700;
        color: #ddd;
        padding: 10px 0 10px 0;
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
      min-heigth: 10px;
      over-flow: hidden;
    }

    position: absolute;
    right: 0;
    top: 0;
  }
`;

const secondSection = css`
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(51, 51, 51, 1) 47%
  );
  background-size: cover;
  position: relative;
  .static-section {
    position: static;
    display: block;
  }
`;

export default Index;

export const PageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
            draft
          }
        }
      }
    }
  }
`;
