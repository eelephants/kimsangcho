import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { isBrowser, mq } from '@/lib/utils/helper';
import { css } from '@emotion/react';
import MainVideo from '@/assets/video/main.mp4';

import AppLayout from '@/components/AppLayout/AppLayout';
import Video from '@/components/Video';
import Dimmed from '@/components/Dimmed';
import BoxGeometry from '@/components/BoxGeometry';

const About = ({ data, location }) => {
  useEffect(() => {
    // scroll
    isBrowser() && window.addEventListener('scroll', eventScroll);
    return () => {
      isBrowser() && window.removeEventListener('scroll', eventScroll);
    };
  }, []);

  const [scrollY, setScrollY] = useState(0);
  const resumes = data.allMarkdownRemark.edges;

  const resume = resumes.map(({ node }) => node)[0];

  const eventScroll = () => setScrollY(isBrowser() && window.scrollY);

  return (
    <AppLayout>
      <AppLayout.Header location={location} scrollY={scrollY} />
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
