import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { isBrowser } from '@/lib/utils/helper';

import AppLayout from '@/components/AppLayout/AppLayout';
import FirstSection from '@/components/Contents/details/firstSection';
import SecondSection from '@/components/Contents/details/secondSection';
import ThirdSection from '@/components/Contents/details/thirdSection';
import ForthSection from '@/components/Contents/details/forthSection';

const TemplatePost = ({ data, location }) => {
  const post = data.markdownRemark;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // scroll
    isBrowser() && window.addEventListener('scroll', eventScroll);
    return () => {
      isBrowser() && window.removeEventListener('scroll', eventScroll);
    };
  }, []);

  const eventScroll = () => setScrollY(isBrowser() && window.scrollY);

  return (
    <AppLayout>
      <AppLayout.Header location={location} scrollY={scrollY} />
      <AppLayout.Main
        styles={{
          color: 'white',
          textDecoration: 'none',
          paddingTop: '10vh',
          diplay: 'grid',
          gridTemplateRows: 'repeat(4, min-content) 1fr',
          gridTemplateColumns: '100%',
        }}
      >
        <FirstSection post={post} />
        <SecondSection post={post} />
        <ThirdSection post={post} />
        <ForthSection post={post} />
      </AppLayout.Main>
    </AppLayout>
  );
};

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
        startDate(formatString: "MM/YY")
        endDate(formatString: "MM/YY")
        category
        skills
        draft
        intro
        images
        roles {
          name
          desc
        }
      }
    }
  }
`;

export default TemplatePost;
