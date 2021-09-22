import React from 'react';

import { graphql } from 'gatsby';
import AppLayout from '../components/AppLayout/AppLayout';
import { css } from '@emotion/react';
import MainVideo from '../assets/video/main.mp4';
import Dimmed from '../components/Dimmed';
import Video from '../components/Video';

export default function TemplatePost({ data, location }) {
  const post = data.markdownRemark;
  return (
    <AppLayout>
      <AppLayout.Header location={location} />
      <AppLayout.Main styles={{ color: 'white', textDecoration: 'none' }}>
        <div css={firstSection}>
          <Dimmed width="100%" height="70vh" opacity="0.5" />
          <Video videoSrcURL={MainVideo} videoTitle="mainVideo" />
        </div>
        <div>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </AppLayout.Main>
    </AppLayout>
  );
}

const firstSection = css`
  padding-top: 10vh;
  height: 70vh;
`;

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 280)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
