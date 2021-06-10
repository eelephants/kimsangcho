import React, { useEffect, useRef, forwardRef } from 'react';
import { css } from '@emotion/react';
import 'normalize.css';
import { Link } from 'gatsby';

import HomeIcon from '../../assets/c6730f_331e4a84182944a9a7a892945436f3de_mv2.webp';
import AboutIcon from '../../assets/c6730f_0ae73585c16049f789c3d462512a84bf_mv2.webp';
import ContactIcon from '../../assets/c6730f_81f62b0326834095a11e062e1638d790_mv2.webp';
import PortfolioIcon from '../../assets/gotoMain.svg';
import GithubIcon from '../../assets/githubIcon.svg';
import { useSiteMetadata } from '../../hooks/useQuery';

const AppLayout = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return <div css={globalStyle}>{children}</div>;
};

const Header = forwardRef(({ location }, ref) => {
  return (
    <header css={headerbarStyle} ref={ref}>
      <div>
        <Icon herf="/" src={HomeIcon} alt="home" />
      </div>
      <div css={linkWrapperSttyle}>
        <ul css={linkbarStyle}>
          <li>
            <NaviTitle herf="/" name="home" />
          </li>
          <li>
            <NaviTitle herf="/about" name="about" />
          </li>
          <li>
            <NaviTitle herf="/contact" name="contact" />
          </li>
        </ul>
        <div>
          <Icon herf="/" src={GithubIcon} alt="portfolio" />
        </div>
      </div>
    </header>
  );
});

function Side({ location }) {
  console.log(location);
  return (
    <aside css={sidebarStyle}>
      <div>
        <Icon herf="/" src={HomeIcon} alt="home" />
      </div>
      <ul css={navStyle}>
        <li>
          <Icon herf="/" src={HomeIcon} alt="home" />
        </li>
        <li>
          <Icon herf="/about" src={AboutIcon} alt="about" />
        </li>
        <li>
          <Icon herf="/contact" src={ContactIcon} alt="contact" />
        </li>
      </ul>
      <div>
        <Icon herf="/" src={PortfolioIcon} alt="portfolio" />
      </div>
    </aside>
  );
}

const Main = forwardRef(({ children }, ref) => {
  return <main ref={ref}>{children}</main>;
});

AppLayout.Side = Side;
AppLayout.Main = Main;
AppLayout.Header = Header;

const globalStyle = css`
  font-family: 'barlow';
  height: 100vh;
`;

const headerbarStyle = css`
  width: 100%;
  height: 10vh;
  position: fixed;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  padding: 0;
  z-index: 900;
  background-image: linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%);
  div:first-of-type {
    flex: 2;
    padding: 0 100px;
  }
`;

const linkWrapperSttyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 0 40px;
`;
const sidebarStyle = css`
  height: 100%;
  position: fixed;
  margin: 0 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: transparents;
  z-index: 100;
`;

const linkbarStyle = css`
  display: flex;
  list-style: none;
  font-family: 'lobster';
  padding: 0;
  margin: 0;
  li {
    margin: 0 40px 0 0;
  }
`;

const navStyle = css`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    margin: 15px 0;
  }
`;

const naviTitleStyle = css`
  text-decoration: none;
  font-size: 1.1rem;
  color: #000;
  transition: all 0.3s linear;

  &:hover {
    color: #fff;
  }
`;

const NaviTitle = (props) => (
  <Link to={props.herf} css={naviTitleStyle}>
    {props.name}
  </Link>
);

const Icon = (props) => (
  <Link to={props.herf}>
    <img
      {...props}
      css={{
        width: '2.2rem',
        height: '2.2rem',
      }}
    />
  </Link>
);

export default AppLayout;
