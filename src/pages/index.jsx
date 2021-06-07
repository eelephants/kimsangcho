import { graphql, Link } from 'gatsby';
import React from 'react';
import { css } from '@emotion/react';
import AppLayout from '../components/AppLayout';
import Video from '../components/Video';
import MainVideo from '../assets/video/main.mp4';
import Dimmed from '../components/Dimmed';
import BoxGeometry from '../components/BoxGeometry';
import BackGroundImg from '../assets/cool-background.png';

// {data.allMarkdownRemark.edges.map((edge) => {
//   return (
//     <Link to={`/portfolio/${edge.node.fields.slug}`}>
//       {/* <h2>{edge.node.frontmatter.title}</h2>
//       <p>{edge.node.frontmatter.date}</p> */}
//     </Link>
//   );
// })}
const Index = ({ data, location }) => {
  return (
    <AppLayout>
      <AppLayout.Header location={location} />
      {/* <AppLayout.Side location={location} /> */}
      <AppLayout.Main>
        <div css={firstSection}>
          <BoxGeometry width="60vh" height="60vh" position="absolute" />
          <Dimmed width="100%" height="70vh" opacity="0.5" />
          <Video videoSrcURL={MainVideo} videoTitle="mainVideo" />
        </div>
        <div css={secondSection}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae, impedit ducimus fuga iusto quam esse pariatur fugit
            architecto alias maiores dignissimos aut vero dolore hic eum
            blanditiis odio autem corrupti.
          </p>
        </div>
      </AppLayout.Main>
    </AppLayout>
  );
};

const firstSection = css`
  padding-top: 10vh;
`;

const secondSection = css`
  background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
  background-size: cover;
  p {
    font-size: 40px;
    padding: 150px 250px;
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
