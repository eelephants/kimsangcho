import React from 'react';

import { graphql } from 'gatsby';
import AppLayout from '../components/AppLayout/AppLayout';

export default function TemplatePost({ data }) {
  const post = data.markdownRemark;
  console.log(post, 'post');
  return (
    <AppLayout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </AppLayout>
  );
}

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
