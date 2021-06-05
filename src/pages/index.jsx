import { graphql, Link } from 'gatsby';
import React from 'react';
import AppLayout from '../components/AppLayout/AppLayout';
import { Video } from '../components/Video/Video';
import MainVideo from '../assets/video/main.mp4';
import { Dimmed } from '../components/Dimmed/Dimmed';
import { Canvas } from '../components/Canvas/Canvas';
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
      <AppLayout.Side location={location} />
      <AppLayout.Main>
        <Canvas width="35vh" height="35vh" position="absolute" />
        <Dimmed width="100%" height="70vh" opacity="0.5" />
        <Video videoSrcURL={MainVideo} videoTitle="mainVideo" />
      </AppLayout.Main>
    </AppLayout>
  );
};

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
