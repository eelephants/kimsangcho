import React from 'react';
import { css } from '@emotion/react';
import { BodyClassGif, MerracGif } from '@/assets/index.js';
const SecondSection = ({ post }) => {
  const noImageComment = `Sorry, Leakage to the outside is prohibited, so it is impossible to share the site`;

  const mainImages = {
    bodyClass: BodyClassGif,
    merrac: MerracGif,
    airForce: '',
    hdc: '',
  };

  return (
    <section
      css={[
        boxWrapper,
        css`
          position: sticky;
          top: 0px;
        `,
      ]}
    >
      {mainImages[post.frontmatter.images] ? (
        <img
          src={mainImages[post.frontmatter.images]}
          alt={post.frontmatter.images}
          css={{ width: '100%' }}
        />
      ) : (
        <div
          css={{
            width: '100%',
            backgroundColor: '#303030',
            height: '100%',
            color: '#EC87E4',
            fontSize: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            css={{
              padding: '0 100px 0 100px',
            }}
          >
            {noImageComment}
          </span>
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
  .slideBtn {
    svg:hover {
      color: rgba(204, 192, 192, 1);
    }
  }
`;

export default SecondSection;
