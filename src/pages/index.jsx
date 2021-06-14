import React, { useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import { css } from '@emotion/react';
import AppLayout from '../components/AppLayout';
import Video from '../components/Video';
import MainVideo from '../assets/video/main.mp4';
import Dimmed from '../components/Dimmed';
import BoxGeometry from '../components/BoxGeometry';

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
} from '../store/sceneInfo';

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

  // 레이아웃 셋팅
  const setLayout = () => {
    setEachSectionHeight();
    setTotalScrollHeight();
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
        <div css={[secondSection]} ref={secondSectionRef} id="scroll-section-1">
          <p css={[stickyElement]} className="static-section">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae, impedit ducimus fuga iusto quam esse pariatur fugit
            architecto alias maiores dignissimos aut vero dolore hic eum
            blanditiis odio autem corrupti.
          </p>
        </div>
        <div css={[secondSection]} ref={thirdSectionRef} id="scroll-section-2">
          <div css={[stickyElement]} className="sticky-elem main-message a">
            <p>test1</p>
          </div>
          <div css={[stickyElement]} className="sticky-elem main-message b">
            <p>test2</p>
          </div>
          <div css={[stickyElement]} className="sticky-elem main-message c">
            <p>test3</p>
          </div>
          <div css={[stickyElement]} className="sticky-elem main-message d">
            <p>test4</p>
          </div>
        </div>
        <div css={[secondSection]} ref={forthSectionRef} id="scroll-section-3">
          <div css={[stickyElement]} className="sticky-elem main-message e">
            <p>test5</p>
          </div>
          <div css={[stickyElement]} className="sticky-elem main-message f">
            <p>test6</p>
          </div>
          <div css={[stickyElement]} className="sticky-elem main-message g">
            <p>test7</p>
          </div>
          <div css={[stickyElement]} className="sticky-elem main-message h">
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

const stickyElement = css`
  position: -webkit-sticky;
  font-size: 40px;
  padding: 150px;
  margin: 0;
  position: sticky;
  top: 4px;
  opactiy: 0;
  display: none;
`;

const secondSection = css`
  background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
  background-size: cover;

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
