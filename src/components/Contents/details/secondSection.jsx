import React from 'react';
import { css } from '@emotion/react';
import { mainImages } from '@static/details';

const SecondSection = ({ post }) => {
  const noImageComment = `Sorry, Leakage to the outside is prohibited, so it is impossible to share the site`;

  return (
    <section css={boxWrapper}>
      {mainImages[post.frontmatter.images] ? (
        <img
          src={mainImages[post.frontmatter.images]}
          alt={post.frontmatter.images}
          css={{ width: '100%' }}
        />
      ) : (
        <div css={emptyBoxWrapper}>
          <span css={emptyBox}>{noImageComment}</span>
        </div>
      )}
    </section>
  );
};

const boxWrapper = css`
  height: 100vh;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(51, 51, 51, 1) 47%
  );
  position: sticky;
  top: 0px;
  .slideBtn {
    svg:hover {
      color: rgba(204, 192, 192, 1);
    }
  }
`;

const emptyBoxWrapper = () => css`
  width: 100%;
  backgroundcolor: #303030;
  height: 100%;
  color: #ec87e4;
  fontsize: 2rem;
  display: flex;
  alignitems: center;
  justifycontent: center;
`;

const emptyBox = () => css`
  padding: 0 100px 0 100px;
`;

export default SecondSection;
