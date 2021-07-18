import { useEffect, useRef, useCallback } from 'react';
import { graphql } from 'gatsby';
import { css } from '@emotion/react';
import AppLayout from '../components/AppLayout';
import Video from '../components/Video';
import MainVideo from '../assets/video/main.mp4';
import Dimmed from '../components/Dimmed';
import BoxGeometry from '../components/BoxGeometry';
import { StaticImage } from 'gatsby-plugin-image';
import Contents from '../components/Contents/Contents';
import WrappedContents from '../components/Contents/wrapper/wrappedContents';
import useWindowSize from '../hooks/useWindowSize';

import {
  SCROLL_LOOP,
  SET_EACH_SECTION_HEIGHT,
  SET_PAGE_YOFFSET,
  SET_TOTAL_SCROLL_HEIGHT,
  SET_USE_REF,
  useSceneDispatch,
  PLAY_ANIMATION,
  SET_CANVAS_IMAGE,
} from '../store/sceneInfo';

import {
  ON_CLICK_GOBACK_ICON,
  ON_CLICK_INIT_ICON,
  ON_MOUSE_ENTER_TO_PORTPOLIO,
  ON_MOUSE_LEAVE_FROM_PORTPOLIO,
  SET_CONTENTS_STYLE,
  SET_FLIP_HIDE_PORTPOLIO,
  SET_FLIP_PORTPOLIO,
  SET_ORIGINAL_HIDE_PORTPOLIO,
  SET_ORIGINAL_PORTPOLIO,
  usePortpolioDispatch,
  usePortpolioState,
} from '../store/portpolioInfo';

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

  const { width } = useWindowSize();
  const sceneDeispatch = useSceneDispatch();
  const portpolioDeispatch = usePortpolioDispatch();
  const { portPolioData } = usePortpolioState();

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
    console.log(window.innerWidth);
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
    portpolioDeispatch({ type: SET_ORIGINAL_PORTPOLIO });
    // portpolioDeispatch({ type: SET_ORIGINAL_HIDE_PORTPOLIO });
  };

  const setFlipPortpolio = () => {
    portpolioDeispatch({ type: SET_FLIP_PORTPOLIO });
    // portpolioDeispatch({ type: SET_FLIP_HIDE_PORTPOLIO });
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

  const onMouseLeaveFromCanvas = useCallback(
    (id) => {
      portpolioDeispatch({ type: ON_MOUSE_LEAVE_FROM_PORTPOLIO, data: id });
    },
    [portPolioData]
  );

  const onMouseEnterFromCanvas = useCallback(
    (id) => {
      portpolioDeispatch({ type: ON_MOUSE_ENTER_TO_PORTPOLIO, data: id });
    },
    [portPolioData]
  );

  const onClickGoBack = useCallback(
    (id) => {
      portpolioDeispatch({ type: ON_CLICK_GOBACK_ICON, data: id });
      portpolioDeispatch({
        type: SET_CONTENTS_STYLE,
        data: {
          id,
          itemOriginalStyle: 'none',
          itemFlipStyle: 'none',
          itemFrontStyle: 'block',
          itemFlipHideStyle: 'block',
          itemWrapperStyle: '0 200px 0 200px',
        },
      });
    },
    [portPolioData]
  );

  const onClickInit = useCallback(
    (id) => {
      portpolioDeispatch({ type: ON_CLICK_INIT_ICON, data: id });
      portpolioDeispatch({
        type: SET_CONTENTS_STYLE,
        data: {
          id,
          itemOriginalStyle: 'block',
          itemFlipStyle: 'block',
          itemFrontStyle: 'none',
          itemFlipHideStyle: 'none',
          itemWrapperStyle: '0 200px 200px 200px',
        },
      });
    },
    [portPolioData]
  );

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
          {portPolioData.map((item, index) => (
            <Contents.Canvas
              key={index}
              id={item.id}
              className={item.className}
              title={item.title}
              duration={item.duration}
              type={item.type}
              desc={item.desc}
              role={item.role}
              images={item.images}
              language={item.language}
              onMouseLeave={onMouseLeaveFromCanvas}
              onMouseEnter={onMouseEnterFromCanvas}
              handleGoBack={onClickGoBack}
              handleInit={onClickInit}
              isShow={item.isShow}
              isSideShow={item.isSideShow}
            />
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
