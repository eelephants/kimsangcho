import React from 'react';
import { graphql } from 'gatsby';

const About = ({ data }) => {
  return (
    <>
      <div>{data.site.siteMetadata.title}</div>
      <div>{data.site.siteMetadata.description}</div>
    </>
  );
};

export default About;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
