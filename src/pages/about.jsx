import React from 'react';
import { graphql } from 'gatsby';
import AppLayout from '../components/AppLayout/AppLayout';

const About = ({ data, location }) => {
  console.log(data);
  return (
    <AppLayout>
      <AppLayout.Side location={location}></AppLayout.Side>
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
