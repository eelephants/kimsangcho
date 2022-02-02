import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useState,
  memo,
  Suspense,
} from 'react';
import { css } from '@emotion/react';
import { Link } from 'gatsby';
import { motion, useSpring } from 'framer-motion';
import HomeIcon from '@/assets/logo.png';
import AboutIcon from '@/assets/c6730f_0ae73585c16049f789c3d462512a84bf_mv2.webp';
import ContactIcon from '@/assets/c6730f_81f62b0326834095a11e062e1638d790_mv2.webp';
import PortfolioIcon from '@/assets/gotoMain.svg';
import GithubIcon from '@/assets/githubIcon.svg';
import GithubWhiteIcon from '@/assets/github_white.png';
import { useSiteMetadata } from '@/hooks/useQuery';
import { ArrowUpCircle } from '@emotion-icons/bootstrap/ArrowUpCircle';
import { ArrowUpCircleFill } from '@emotion-icons/bootstrap/ArrowUpCircleFill';
import { Instagram } from '@emotion-icons/boxicons-logos/Instagram';
import { FacebookCircle } from '@emotion-icons/boxicons-logos/FacebookCircle';
import { EmailOutline } from '@emotion-icons/evaicons-outline/EmailOutline';
import { LinkedinSquare } from '@emotion-icons/boxicons-logos/LinkedinSquare';
import { isBrowser } from '@/lib/utils/helper.js';
import { useSceneState } from '@/store/sceneInfo';
import styled from '@emotion/styled';

const InstagramIcon = styled(Instagram)`
  color: #000;
  width: 40px;
  height: auto;
`;

const FacebookIcon = styled(FacebookCircle)`
  color: #000;
  width: 40px;
  height: auto;
`;

const EmailOutlineIcon = styled(EmailOutline)`
  color: #000;
  width: 40px;
  height: auto;
`;

const LinkedinSquareIcon = styled(LinkedinSquare)`
  color: #000;
  width: 40px;
  height: auto;
`;

const AppLayout = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <div css={globalStyle}>{children}</div>
    // </Suspense>
  );
};

const Header = memo(
  forwardRef(({ location, scrollY }, ref) => {
    const [isHover, setIsHover] = useState(false);

    const onHover = (event, isHovered) => {
      event.nativeEvent.stopImmediatePropagation();
      setIsHover(isHovered);
    };

    const variants = {
      transform: {
        y: [0, 20],
        transition: { duration: 1 },
      },
    };

    return (
      <header css={headerbarStyle(scrollY)} ref={ref}>
        <div className="title-wrapper">
          <NaviTitle
            herf="/"
            name="kim sangcho ™"
            style={{ fontSize: '2rem', fontFamily: 'lobster' }}
          />
        </div>
        <div css={linkWrapperSttyle} onMouseLeave={e => onHover(e, false)}>
          <ul css={linkbarStyle}>
            <li>
              <NaviTitle herf="/" name="home" />
            </li>
            <li>
              <NaviTitle herf="/about" name="about" />
            </li>
            <li>
              <NaviConxtact name="contact" onHover={onHover} />
            </li>
            {isHover && (
              <motion.div
                variants={variants}
                animate={'transform'}
                css={contactWrapper}
              >
                <span css={contact}>
                  <NaviConxtact
                    href="mailto:wjdrms1919@gmail.com"
                    name={<EmailOutlineIcon />}
                    target="_self"
                  />
                </span>
                <span css={contact}>
                  <NaviConxtact
                    href="https://www.linkedin.com/in/rlatkdch14/"
                    name={<LinkedinSquareIcon />}
                    target="_blank"
                  />
                </span>
                <span css={contact}>
                  <NaviConxtact
                    href="https://www.instagram.com/santos_cho/?hl=ko"
                    name={<InstagramIcon />}
                    target="_blank"
                  />
                </span>
                <span css={contact}>
                  <NaviConxtact
                    href="https://www.facebook.com/belle.korea.store/"
                    name={<FacebookIcon />}
                    target="_blank"
                  />
                </span>
              </motion.div>
            )}
          </ul>

          <div>
            <a target="_blank" href="https://github.com/SangchoKim">
              <img
                css={gitHubIcon}
                src={scrollY === 0 ? GithubWhiteIcon : GithubIcon}
                alt="gitHubIcon"
              />
            </a>
          </div>
        </div>
      </header>
    );
  })
);

const Side = ({ location }) => {
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
};

const Main = forwardRef(({ children, styles }, ref) => {
  return (
    <main ref={ref} css={mainWrapper(styles)}>
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
    spring.onChange(latest => {
      if (!isBrowser()) {
        return;
      }
      window.scrollTo(0, latest);
    });
  }, [spring]);

  const onClickMoveToTop = () => {
    if (!isBrowser()) {
      return;
    }
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

const globalStyle = () => css`
  font-family: 'bebas-neue', 'noto-sans-kr';
  height: 100vh;
  background: linear-gradient(
    176deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(51, 51, 51, 1) 47%
  );
  block-size: auto;
`;

const headerbarStyle = scrollY => css`
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
  color: ${scrollY === 0 ? '#fff' : '#000'};
  background: ${scrollY === 0 && 'transparent'};
  background-image: ${scrollY !== 0 &&
  'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(204,192,192,1) 93%)'};
  transition: background-image 0.5s ease;
  .title-wrapper {
    flex: 2;
    padding: 0 40px;
  }
  div:first-of-type {
  }
`;

const footerStyle = () => css`
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

const linkWrapperSttyle = () => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 0 40px;
`;

const linkbarStyle = () => css`
  display: flex;
  list-style: none;
  font-family: 'bebas-neue', 'noto-sans-kr';
  padding: 0;
  margin: 0;
  li {
    margin: 0 40px 0 0;
  }
`;

const contactWrapper = () => css`
  width: 13vw;
  min-width: 13vw;
  height: 3vw;
  background-color: rgba(204, 192, 192, 1);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  top: 50px;
  border-radius: 15px;
  boxshadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
`;

const contact = () => css`
  display: inline-block;
  width: 100px;
  text-align: center;
`;

const gitHubIcon = () => css`
  width: 40px;
  height: 40px;
`;

const sidebarStyle = () => css`
  height: 100%;
  position: fixed;
  margin: 0 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: transparents;
  z-index: 100;
`;

const mainWrapper = styles => css`
  background: linear-gradient(90deg rgba(0, 0, 0, 1) 0% rgba(51, 51, 51, 1) 47);
  ${{ ...styles }}
`;

const navStyle = () => css`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    margin: 15px 0;
  }
`;

const naviContact = () => css`
  text-decoration: none;
  font-size: 1.5rem;
  color: inherit;
  transition: all 0.3s linear;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

const NaviConxtact = memo(({ href, target, onHover, name }) => {
  return (
    <a
      href={href}
      css={naviContact}
      target={target}
      onMouseEnter={e => onHover && onHover(e, true)}
    >
      {name}
    </a>
  );
});

const NaviTitle = props => (
  <Link
    to={props.herf}
    css={css`
      text-decoration: none;
      font-size: 1.5rem;
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

const Icon = props => (
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
