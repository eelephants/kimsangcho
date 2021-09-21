import React from 'react';
import { graphql } from 'gatsby';
import AppLayout from '../components/AppLayout/AppLayout';
import { mq } from '../lib/utils/helper';
import MainVideo from '../assets/video/main.mp4';
import BoxGeometry from '../components/BoxGeometry';
import Dimmed from '../components/Dimmed';
import Video from '../components/Video';
import { css } from '@emotion/react';
const Contact = ({ data, location }) => {
  const resumes = data.allMarkdownRemark.edges;

  const resume = resumes.map(({ node }) => node)[1];

  console.log(resumes);

  return (
    <AppLayout>
      <AppLayout.Header location={location} />
      <AppLayout.Main
        styles={{ color: 'white', textDecoration: 'none', height: '100vh' }}
      ></AppLayout.Main>
      <AppLayout.Footer />
    </AppLayout>
  );
};

export default Contact;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { category: { eq: null } } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
