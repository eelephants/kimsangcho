import React, { forwardRef, useEffect, useLayoutEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Link } from 'gatsby';
import { motion, useSpring } from 'framer-motion';
import HomeIcon from '../../assets/logo.png';
import AboutIcon from '../../assets/c6730f_0ae73585c16049f789c3d462512a84bf_mv2.webp';
import ContactIcon from '../../assets/c6730f_81f62b0326834095a11e062e1638d790_mv2.webp';
import PortfolioIcon from '../../assets/gotoMain.svg';
import GithubIcon from '../../assets/githubIcon.svg';
import GithubWhiteIcon from '../../assets/github_white.png';
import { useSiteMetadata } from '../../hooks/useQuery';
import { ArrowUpCircle } from '@emotion-icons/bootstrap/ArrowUpCircle';
import { ArrowUpCircleFill } from '@emotion-icons/bootstrap/ArrowUpCircleFill';

import { useSceneState } from '../../store/sceneInfo';
import styled from '@emotion/styled';

const AppLayout = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return <div css={globalStyle}>{children}</div>;
};

const Header = forwardRef(({ location, scrollY }, ref) => {
  return (
    <header
      css={[
        headerbarStyle,
        css`
          color: ${scrollY === 0 ? '#fff' : '#000'};
          background: ${scrollY === 0 && 'transparent'};
          background-image: ${scrollY !== 0 &&
          'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(204,192,192,1) 93%)'};
          transition: background-image 0.5s ease;
        `,
      ]}
      ref={ref}
    >
      <div>
        <NaviTitle
          herf="/"
          name="kim sangcho ™"
          style={{ fontSize: '1.9rem', fontFamily: 'lobster' }}
        />
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
            <NaviContact
              href="mailto:wjdrms1919@gmail.com"
              name="contact"
              target="_self"
            />
          </li>
        </ul>
        <div>
          <a target="_blank" href="https://github.com/SangchoKim">
            <img
              css={{
                width: '2.2rem',
                height: '2.2rem',
              }}
              src={scrollY === 0 ? GithubWhiteIcon : GithubIcon}
              alt="portfolio"
            />
          </a>
        </div>
      </div>
    </header>
  );
});

function Side({ location }) {
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

const Main = forwardRef(({ children, styles }, ref) => {
  return (
    <main
      ref={ref}
      css={css`
      linear-gradient(
        90deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(51, 51, 51, 1) 47%
      );
        ${{ ...styles }};
      `}
    >
      {children}
    </main>
  );
});

const Footer = () => {
  const { currentScene } = useSceneState();
  const [isCover, setIsCover] = useState(false);

  const spring = useSpring(0, { damping: 300, stiffness: 1000 });
  const variants = {
    transform: {
      x: [5000, 0, 0],
      transition: { duration: 1 },
    },
    stop: { x: [0, 0, 5000], transition: { duration: 1 } },
  };

  const ArrowUpCircleFillIcon = styled(ArrowUpCircleFill)`
    color: rgba(204, 192, 192, 1);
    width: 100%;
    height: auto;
  `;

  const ArrowUpCircleIcon = styled(ArrowUpCircle)`
    color: rgba(204, 192, 192, 1);
    width: 100%;
    height: auto;
  `;

  useLayoutEffect(() => {
    spring.onChange((latest) => {
      window.scrollTo(0, latest);
    });
  }, [spring]);

  const onClickMoveToTop = () => {
    spring.set(window.pageYOffset, false);
    setTimeout(() => {
      spring.set(0);
    }, 50);
  };

  return (
    <motion.footer
      variants={variants}
      animate={currentScene !== 0 && currentScene !== 1 ? 'transform' : 'stop'}
      css={footerStyle}
      onMouseEnter={() => setIsCover(true)}
      onMouseLeave={() => setIsCover(false)}
      onClick={onClickMoveToTop}
    >
      {isCover ? <ArrowUpCircleFillIcon /> : <ArrowUpCircleIcon />}
    </motion.footer>
  );
};

AppLayout.Side = Side;
AppLayout.Main = Main;
AppLayout.Header = Header;
AppLayout.Footer = Footer;

const globalStyle = css`
  font-family: 'barlow';
  height: 100vh;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(51, 51, 51, 1) 47%
  );
  block-size: auto;
`;

const headerbarStyle = css`
  width: 100%;
  height: 10vh;
  position: fixed;
  top: 0;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0;
  z-index: 900;
  div:first-of-type {
    flex: 2;
    padding: 0 100px;
  }
`;

const footerStyle = css`
  width: 60px;
  height: 60px;
  position: fixed;
  z-index: 9999;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  margin: 0 40px 40px 0;
  cursor: pointer;
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

const naviContact = css`
  text-decoration: none;
  font-size: 1.3rem;
  color: inherit;
  transition: all 0.3s linear;
  &:hover {
    color: #fff;
  }
`;

const NaviContact = (props) => (
  <a href={props.href} css={naviContact} target={props.target}>
    {props.name}
  </a>
);

const NaviTitle = (props) => (
  <Link
    to={props.herf}
    css={css`
      text-decoration: none;
      font-size: 1.3rem;
      color: inherit;
      transition: all 0.3s linear;
      &:hover {
        color: #fff;
      }
      ${props.style};
    `}
  >
    {props.name}
  </Link>
);

const Icon = (props) => (
  <Link to={props.herf} target={props.target}>
    <img
      {...props}
      css={{
        width: props.width,
        height: props.height,
      }}
    />
  </Link>
);

export default AppLayout;
