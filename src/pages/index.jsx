import { useEffect, useRef, useState } from 'react';
import { graphql } from 'gatsby';
import { css } from '@emotion/react';
import AppLayout from '../components/AppLayout';
import Video from '../components/Video';
import MainVideo from '../assets/video/main.mp4';
import Dimmed from '../components/Dimmed';
import BoxGeometry from '../components/BoxGeometry';
import { round } from '../lib/utils/helper';
import useWindowSize from '../hooks/useWindowSize';
import useWindowScroll from '../hooks/useWindowScroll';

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

  const sceneData = [
    {
      type: 'video',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: firstSectionRef,
      },
      values: {},
    },
    {
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: secondSectionRef,
      },
      values: {},
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: thirdSectionRef,
      },
      values: {},
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: forthSectionRef,
      },
      values: {},
    },
  ];

  const [sceneInfo, setSceneInfo] = useState(sceneData);
  const [currentScene, setCurrentScene] = useState(0);
  const { width } = useWindowSize();
  const [yOffset] = useWindowScroll(() => scrollEvent());

  useEffect(() => {
    setLayout();
  }, []);

  useEffect(() => {
    if (width > 900) {
      setLayout();
    }
  }, [width]);

  // 각 스크롤 섹션의 높이
  const setEachSectionHeight = () => {
    sceneInfo.forEach((item) => {
      if (item.type === 'sticky') {
        item.scrollHeight = item.heightNum * window.innerHeight;
      } else if (item.type === 'normal') {
        item.scrollHeight = window.innerHeight;
      } else if (item.type === 'video') {
        item.scrollHeight = window.innerHeight * 0.7;
      }
      item.objs.container.current.style.height = `${item.scrollHeight}px`;
    });
  };

  // 전체 스크롤 높이
  const setTotalScrollHeight = () => {
    let totalScrollHeight = 0;
    sceneInfo.forEach((item, index) => {
      totalScrollHeight += item.scrollHeight;
      if (totalScrollHeight >= yOffset) {
        setCurrentScene(index);
        return;
      }
    });
  };

  // 레이아웃 셋팅
  const setLayout = () => {
    setEachSectionHeight();
    setTotalScrollHeight();
  };

  // 스크롤 이벤트
  const scrollEvent = () => {};

  return (
    <AppLayout>
      <AppLayout.Header location={location} ref={headerRef} />
      <AppLayout.Main ref={mainRef}>
        <div css={firstSection} ref={firstSectionRef} id="show-scene-1">
          <BoxGeometry
            width="60vh"
            height="60vh"
            position="absolute"
            resize={width}
          />
          <Dimmed width="100%" height="70vh" opacity="0.5" />
          <Video videoSrcURL={MainVideo} videoTitle="mainVideo" />
        </div>
        <div css={secondSection} ref={secondSectionRef} id="show-scene-2">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae, impedit ducimus fuga iusto quam esse pariatur fugit
            architecto alias maiores dignissimos aut vero dolore hic eum
            blanditiis odio autem corrupti.
          </p>
        </div>
        <div css={secondSection} ref={thirdSectionRef} id="show-scene-3">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae, impedit ducimus fuga iusto quam esse pariatur fugit
            architecto alias maiores dignissimos aut vero dolore hic eum
            blanditiis odio autem corrupti.
          </div>
        </div>
        <div css={secondSection} ref={forthSectionRef} id="show-scene-4">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae, impedit ducimus fuga iusto quam esse pariatur fugit
            architecto alias maiores dignissimos aut vero dolore hic eum
            blanditiis odio autem corrupti.
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

const secondSection = css`
  background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
  background-size: cover;
  div {
    position: -webkit-sticky;
    font-size: 40px;
    padding: 150px;
    margin: 0;
    position: sticky;
    top: 4px;
  }
  p {
    font-size: 40px;
    padding: 150px;
    margin: 0;
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
