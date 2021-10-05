import React, { useEffect, useState } from 'react';

import { graphql } from 'gatsby';
import AppLayout from '../components/AppLayout/AppLayout';
import { css } from '@emotion/react';
import MainVideo from '../assets/video/main.mp4';
import Dimmed from '../components/Dimmed';
import Video from '../components/Video';

export default function TemplatePost({ data, location }) {
  const post = data.markdownRemark;
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    // scroll
    window.addEventListener('scroll', eventScroll);
    return () => {
      window.removeEventListener('scroll', eventScroll);
    };
  }, []);

  const eventScroll = () => setScrollY(window.scrollY);
  return (
    <AppLayout>
      <AppLayout.Header location={location} scrollY={scrollY} />
      <AppLayout.Main
        styles={{
          color: 'white',
          textDecoration: 'none',
          'padding-top': '10vh',
          diplay: 'grid',
          'grid-template-rows': 'repeat(4, min-content) 1fr',
          'grid-template-columns': '100%',
        }}
      >
        <section
          css={[
            boxWrapper,
            css`
              display: grid;
              grid-template-rows: 1fr 1fr 2fr;
            `,
          ]}
        >
          <div
            css={css`
              display: grid;
              grid-template-columns: 4fr 1fr;
              align-items: center;
              justify-items: center;
              font-size: 4rem;
              ext-transform: uppercase;
              letter-spacing: 1rem;
            `}
          >
            <div>{post.frontmatter.title}</div>
            <div
              css={css`
                justify-self: start;
                font-size: 1rem;
                border-bottom: 1px solid;
                width: 1.7rem;
                transform: rotate(90deg);
              `}
            ></div>
          </div>
          <div
            css={css`
              display: grid;
              grid-template-columns: 4fr 1fr;
            `}
          >
            <div></div>
            <div>App</div>
          </div>
          <div>
            <p>
              TransBeat is a music creator that helps people stay active. By
              transforming movements into music rhythms, the app aims to
              motivate you through more delightful workouts. No more fatigue,
              simply stay enjoyed, engaged, and energized on the road to
              reaching your next goal.
            </p>
            <p>test</p>
            <hr />
            <span>test</span>
          </div>
        </section>
        <section
          css={[
            boxWrapper,
            css`
              position: sticky;
              top: 0px;
            `,
          ]}
        >
          <img
            src="https://source.unsplash.com/random"
            css={{ width: '100%' }}
          />
        </section>
        <section
          css={[
            boxWrapper,
            css`
              background: black;
              width: 100%;
              position: sticky;
            `,
          ]}
        >
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </section>
        <section
          css={[
            boxWrapper,
            css`
              position: sticky;
              top: 0px;
            `,
          ]}
        >
          <img
            src="https://source.unsplash.com/random/1"
            css={{ width: '100%' }}
          />
          {/* <div dangerouslySetInnerHTML={{ __html: post.html }} /> */}
        </section>
      </AppLayout.Main>
    </AppLayout>
  );
}

const boxWrapper = css`
  height: 100vh;
  border: 1px solid red;
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
