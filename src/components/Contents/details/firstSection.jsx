import React from 'react';
import { css } from '@emotion/react';

const FirstSection = ({ post }) => {
  return (
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
          font-weight: bold;
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
        <div>
          <span
            css={css`
              transform: rotate(90deg) translate(-4rem, 0px);
              display: inline-block;
              font-size: 1.2rem;
            `}
          >
            {post.frontmatter.category}
          </span>
        </div>
      </div>
      <div
        css={css`
          position: relative;
        `}
      >
        <div
          css={css`
            position: absolute;
            transform: rotate(25deg);
            top: -20%;
            left: 10%;
            width: 40%;
          `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -139 106 139">
            <path
              d="M 0 -1 L 0 -139 L 106 -139 L 106 0 L 0 -1 Z"
              stroke="#FFF"
              stroke-width="0.3"
              fill="none"
            />
          </svg>
        </div>
        <p
          css={css`max-width: 30%;
                        position: absolute;
                        line-height: 2;
                        left: 19%;
                        top: 25%;
                        font-size: 1.1rem;
                    }`}
        >
          {post.frontmatter.intro}
        </p>
        <div
          css={css`max-width: 30%;
                        position: absolute;
                        line-height: 1.5;
                        right: 15%;
                        top: 10%;
                        font-size: 1.1rem;
                    }`}
        >
          <p>
            {post.frontmatter.startDate} - {post.frontmatter.endDate}
          </p>
          <hr />
          <p css={[roleTitle]}>Skill:</p>
          {post.frontmatter.skills.map(item => (
            <p css={[roleTitle]}>{item}</p>
          ))}
        </div>
      </div>
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

const roleTitle = css`
  line-height: 0.8;
`;

export default FirstSection;
