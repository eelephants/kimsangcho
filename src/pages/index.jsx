import { graphql } from 'gatsby';
import React from 'react';
import AppLayout from '../components/AppLayout/AppLayout';

const Index = ({ data }) => {
  console.log(data, 'dd');
  return (
    <AppLayout>
      <div>Index</div>
    </AppLayout>
  );
};

export default Index;
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
