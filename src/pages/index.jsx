import { graphql, Link } from 'gatsby';
import React from 'react';
import AppLayout from '../components/AppLayout/AppLayout';

const Index = ({ data, location }) => {
  console.log(data.allMarkdownRemark.edges[0].node.fields.slug, 'dd');
  return (
    <AppLayout>
      {data.allMarkdownRemark.edges.map((edge) => {
        return (
          <Link to={`/portfolio/${edge.node.fields.slug}`}>
            <h2>{edge.node.frontmatter.title}</h2>
            <p>{edge.node.frontmatter.date}</p>
          </Link>
        );
      })}
    </AppLayout>
  );
};

export default Index;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
            draft
          }
        }
      }
    }
  }
`;
