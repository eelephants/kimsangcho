import React from 'react';
import { graphql } from 'gatsby';
import AppLayout from '../components/AppLayout/AppLayout';
import { mq } from '../lib/utils/helper';
import MainVideo from '../assets/video/main.mp4';
import BoxGeometry from '../components/BoxGeometry';
import Dimmed from '../components/Dimmed';
import Video from '../components/Video';
import { css } from '@emotion/react';
const About = ({ data, location }) => {
  const resumes = data.allMarkdownRemark.edges;

  const resume = resumes.map(({ node }) => node)[0];
  console.log(resumes);

  return (
    <AppLayout>
      <AppLayout.Header location={location} />
      <AppLayout.Main styles={{ color: 'white', textDecoration: 'none' }}>
        <div css={firstSection}>
          <Dimmed width="100%" height="70vh" opacity="0.5" />
          <Video videoSrcURL={MainVideo} videoTitle="mainVideo" />
        </div>
        <div
          css={resumeWrapper}
          dangerouslySetInnerHTML={{ __html: resume.html }}
        />
      </AppLayout.Main>
      <AppLayout.Footer />
    </AppLayout>
  );
};

const resumeWrapper = css`
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(51, 51, 51, 1) 47%
  );
`;

const firstSection = css`
  padding-top: 10vh;
  height: 70vh;
`;

export default About;

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
            category
          }
        }
      }
    }
  }
`;
