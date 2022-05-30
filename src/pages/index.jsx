import { useEffect, useRef, useCallback, useState, lazy } from 'react';
import { graphql, navigate } from 'gatsby';
import { css } from '@emotion/react';
import MainVideo from '@/assets/video/main.mp4';
import useWindowSize from '@/hooks/useWindowSize';
import { motion } from 'framer-motion';
import { isBrowser } from '@/lib/utils/helper';

import AppLayout from '@/components/AppLayout';
import Video from '@/components/Video';
import Dimmed from '@/components/Dimmed';
import BoxGeometry from '@/components/BoxGeometry';
import WrappedContents from '@/components/Contents/wrapper/wrappedContents';
import Contents from '@/components/Contents/Contents';

// const Video = lazy(() => import('@/components/Video'));
// const Dimmed = lazy(() => import('@/components/Dimmed'));
// const BoxGeometry = lazy(() => import('@/components/BoxGeometry'));

import {
  SCROLL_LOOP,
  SET_EACH_SECTION_HEIGHT,
  SET_PAGE_YOFFSET,
  SET_TOTAL_SCROLL_HEIGHT,
  SET_USE_REF,
  useSceneDispatch,
  PLAY_ANIMATION,
  SET_CANVAS_IMAGE,
  useSceneState,
  SET_INIT,
} from '@/store/sceneInfo';

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
} from '@/store/portpolioInfo';

const Index = ({ data, location }) => {
  const tags = '[index]';

  const [scrollY, setScrollY] = useState(0);

  const firstSectionRef = useRef();
  const secondSectionRef = useRef();
  const thirdSectionRef = useRef();
  const forthSectionRef = useRef();

  const headerRef = useRef();
  const mainRef = useRef();

  const { width, height } = useWindowSize();
  const sceneDeispatch = useSceneDispatch();
  const portpolioDeispatch = usePortpolioDispatch();
  const { portPolioData, subPortPolioData } = usePortpolioState();
  const { sceneInfo } = useSceneState();

  useEffect(() => {
    // load
    setLayout();
    // scroll
    portPolioData.map(item => item.id !== 'portpolioC' && onClickInit(item.id));

    isBrowser() && window.addEventListener('scroll', eventScroll);
    return () => {
      isBrowser() && window.removeEventListener('scroll', eventScroll);
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
    console.log(tags, 'setEachSectionHeight');
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
    console.log(tags, 'setTotalScrollHeight');
    sceneDeispatch({ type: SET_PAGE_YOFFSET });
    sceneDeispatch({ type: SET_TOTAL_SCROLL_HEIGHT });
  };

  const setCanvasImage = () => {
    console.log(tags, 'setCanvasImage');
    sceneDeispatch({ type: SET_CANVAS_IMAGE });
  };

  // 레이아웃 셋팅
  const setLayout = () => {
    console.log(tags, 'setLayout');
    setEachSectionHeight();
    setTotalScrollHeight();
    setOriginalPortpolio();
    setCanvasImage();
    // setFlipPortpolio();
  };

  const covertRadian = angle => {
    console.log(tags, 'covertRadian');
    return (angle * Math.PI) / 180;
  };

  const setOriginalPortpolio = () => {
    console.log(tags, 'setOriginalPortpolio');
    portpolioDeispatch({ type: SET_ORIGINAL_PORTPOLIO });
    // portpolioDeispatch({ type: SET_ORIGINAL_HIDE_PORTPOLIO });
  };

  const setFlipPortpolio = () => {
    console.log(tags, 'setFlipPortpolio');
    portpolioDeispatch({ type: SET_FLIP_PORTPOLIO });
    // portpolioDeispatch({ type: SET_FLIP_HIDE_PORTPOLIO });
  };

  // // 스크롤 이벤트
  const scrollLoop = async () => {
    console.log(tags, 'scrollLoop');
    setScrollY(isBrowser() && window.scrollY);
    await sceneDeispatch({ type: SCROLL_LOOP });
    await sceneDeispatch({ type: PLAY_ANIMATION });
  };

  // // 스크롤 이벤트
  const eventScroll = async () => {
    console.log(tags, 'eventScroll');
    await scrollLoop();
  };

  const onMouseLeaveFromCanvas = useCallback(
    id => {
      console.log(tags, 'onMouseLeaveFromCanvas');
      portpolioDeispatch({ type: ON_MOUSE_LEAVE_FROM_PORTPOLIO, data: id });
    },
    [portPolioData]
  );

  const onMouseEnterFromCanvas = useCallback(
    id => {
      console.log(tags, 'onMouseEnterFromCanvas');
      portpolioDeispatch({ type: ON_MOUSE_ENTER_TO_PORTPOLIO, data: id });
    },
    [portPolioData]
  );

  const onClickGoBack = useCallback(
    id => {
      console.log(tags, 'onClickGoBack');
      portpolioDeispatch({ type: ON_CLICK_GOBACK_ICON, data: id });
      portpolioDeispatch({
        type: SET_CONTENTS_STYLE,
        data: {
          id,
          itemOriginalStyle: 'none',
          itemFlipStyle: 'none',
          itemFrontStyle: 'flex',
          itemFlipHideStyle: 'block',
          itemWrapperStyle: '0 200px 0 200px',
        },
      });
    },
    [portPolioData]
  );

  const onClickInit = useCallback(
    id => {
      console.log(tags, 'onClickInit');
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

  const handleDetailProject = useCallback(path => {
    console.log(tags, 'handleDetailProject');
    navigate(path);
  }, []);

  return (
    <AppLayout>
      <AppLayout.Header ref={headerRef} location={location} scrollY={scrollY} />
      <AppLayout.Main ref={mainRef}>
        <div css={firstSection} ref={firstSectionRef} id="scroll-section-0">
          <BoxGeometry
            width="60vh"
            height="60vh"
            position="absolute"
            // resize={width}
          />
          <Dimmed
            // width={width + 'px'}
            height={height * 0.7 + 'px'}
            opacity="0.5"
          />
          <Video
            // width={width + 'px'}
            videoSrcURL={MainVideo}
            videoTitle="mainVideo"
          />
        </div>
        <WrappedContents ref={secondSectionRef} id="scroll-section-1">
          <Contents.SecondContents className="static-section" />
        </WrappedContents>
        <WrappedContents ref={thirdSectionRef} id="scroll-section-2">
          <div css={[stickyCanvas]} className="sticky-elem-canvas">
            <canvas id="video-canvas-0" width={width} height="1080"></canvas>
          </div>
          {portPolioData &&
            portPolioData.map((item, index) => (
              <Contents.ThirdContents
                key={index}
                id={item.id}
                detailUrl={item.detailUrl}
                className={item.className}
                title={item.title}
                duration={item.duration}
                type={item.type}
                android={item.android}
                ios={item.ios}
                gitUrl={item.gitUrl}
                desc={item.desc}
                url={item.url}
                role={item.role}
                reason={item.reason}
                images={item.images}
                language={item.language}
                onMouseLeave={onMouseLeaveFromCanvas}
                onMouseEnter={onMouseEnterFromCanvas}
                handleGoBack={onClickGoBack}
                handleInit={onClickInit}
                isShow={item.isShow}
                isSideShow={item.isSideShow}
                handleDetailProject={handleDetailProject}
              />
            ))}
        </WrappedContents>
        <WrappedContents
          css={[secondSection]}
          ref={forthSectionRef}
          id="scroll-section-3"
        >
          {subPortPolioData &&
            subPortPolioData.map((item, index) => (
              <Contents.ForthContents
                key={index}
                id={item.id}
                title={item.title}
                images={item.images}
                android={item.android}
                ios={item.ios}
                type={item.type}
                gitUrl={item.gitUrl}
                sceneInfo={sceneInfo}
                url={item.url}
                className={item.className}
                animate={item.animate}
                desc={item.desc}
                handleDetailProject={handleDetailProject}
              />
            ))}
        </WrappedContents>
      </AppLayout.Main>
      <AppLayout.Footer />
    </AppLayout>
  );
};

const firstSection = css`
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

const secondSection = css`
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(51, 51, 51, 1) 47%
  );
  background-size: cover;
  position: relative;
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
