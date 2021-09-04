import React from 'react';
import { graphql } from 'gatsby';
import AppLayout from '../components/AppLayout/AppLayout';
import { mq } from '../lib/utils/helper';

const About = ({ data, location }) => {
  return (
    <AppLayout>
      <div
        css={{
          [mq('small')]: {
            background: 'gray',
          },
          [mq('large')]: {
            background: 'hotpink',
          },
        }}
      >
        about
      </div>
    </AppLayout>
  );
};

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
          }
        }
      }
    }
  }
`;
