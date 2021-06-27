import React, { forwardRef } from 'react';
import { css } from '@emotion/react';
const Contents = () => {
  return <div></div>;
};

const Static = ({ className }) => {
  return (
    <p css={[stickyElement]} className={className}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae,
      impedit ducimus fuga iusto quam esse pariatur fugit architecto alias
      maiores dignissimos aut vero dolore hic eum blanditiis odio autem
      corrupti.
    </p>
  );
};

const Canvas = ({ className, title, duration, type, desc, role, language }) => {
  return (
    <div css={[stickyElement]} className={className}>
      <canvas
        width={window.innerWidth / 2.5}
        height={window.innerWidth / 2.5}
        className="original"
      ></canvas>
      <canvas
        className="flip"
        alt=""
        width={window.innerWidth / 2.5}
        height={window.innerWidth / 7.5}
      ></canvas>
      <div className="description">
        <div className="first-desc">
          <h1>{title}</h1>
          <h3>
            {duration} / {type}
          </h3>
          <div>
            <label>#Desc</label>
            <span>- {desc}</span>
          </div>
          <div>
            <label>#Role</label>
            <span>- {role}</span>
          </div>
        </div>
        <hr css={divideLine} />
        <div className="second-desc">
          {language.map((item, index) => (
            <div key={index} css={circle}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Contents.Static = Static;
Contents.Canvas = Canvas;

const stickyCanvas = css`
  position: sticky;
  top: 0;
  height: 100vh;
  canvas {
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;

const stickyElement = css`
  margin: 0;
  position: relative;
  top: 4px;
  left: 0;
  opactiy: 0;
  display: none;
  font-size: 40px;
  padding: 0 200px 200px 200px;
  margin-bottom: 500px;
  color: #fff;
  .original {
    position: absolute;
    z-index: 100;
  }
  .flip {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0 200px 200px 200px;
  }
  .description {
    color: #fff;
    overflow: overlay;
    .first-desc {
      height: 50%;
      letter-spacing: 3px;
      & h1 {
        font-size: 1.7rem;
        font-weight: bold;
        text-transform: upperCase;
      }
      & h3 {
        font-size: 1.1rem;
        font-weight: 700;
        color: #ddd;
        padding: 10px 0 10px 0;
      }
      & div {
        margin: 20px 0;
        padding: 0;
        font-size: 1rem;
        font-weight: 500;

        span {
          display: block;
          text-transform: lowercase;
        }
      }
    }

    .second-desc {
      height: 50%;
      display: flex;
      flex-wrap: wrap;
      min-heigth: 10px;
      over-flow: hidden;
    }

    position: absolute;
    right: 0;
    top: 0;
  }
`;

const divideLine = css`
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(93, 38, 38, 1) 42%
  );
  height: 5px;
  border: none;
  border-radius: 50px;
  opacity: 0.7;
`;

const circle = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: brown;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  padding: 5px;
  margin: 0.2rem;
  text-transform: uppercase;
`;

export default Contents;
