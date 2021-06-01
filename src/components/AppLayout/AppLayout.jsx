import React from 'react';
import { css } from '@emotion/react';
import 'normalize.css';
import { Link } from 'gatsby';
import BackGroundImg from '../../assets/cool-background.png';
import HomeIcon from '../../assets/c6730f_331e4a84182944a9a7a892945436f3de_mv2.webp';
import AboutIcon from '../../assets/c6730f_0ae73585c16049f789c3d462512a84bf_mv2.webp';
import ContactIcon from '../../assets/c6730f_81f62b0326834095a11e062e1638d790_mv2.webp';
import PortfolioIcon from '../../assets/gotoMain.svg';
import { useSiteMetadata } from '../../hooks/useQuery';

export default function AppLayout({ children }) {
  const { title, description } = useSiteMetadata();
  return <div css={globalStyle}>{children}</div>;
}

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

function Main({ children }) {
  return <main css={mainStyle}>{children}</main>;
}
AppLayout.Side = Side;
AppLayout.Main = Main;

const globalStyle = css`
  font-family: 'barlow';
  background: url(${BackGroundImg}) no-repeat;
  background-size: cover;
  height: 100vh;
`;

const sidebarStyle = css`
  height: 100%;
  position: fixed;
  margin: 0 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: transparents;
`;

const navStyle = css`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    margin: 15px 0;
  }
`;

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

const mainStyle = css``;
