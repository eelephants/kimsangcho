import { useRef, useEffect } from 'react';
import { isBrowser } from '../lib/utils/helper';

export default function useWindowScroll() {
  const dom = useRef({
    currentScene: 0,
    yOffset: isBrowser() && window.pageYOffset,
    prevScrollHeight: 0,
  });

  let scrollEvent = null;

  const scrollInfo = {
    setScrollInfo(key, value) {
      dom.current[key] = value;
    },
    getScrollInfo(key) {
      if (dom) {
        return dom.current[key];
      }
    },
    setEventScroll(event) {
      scrollEvent = event;
    },
  };

  const changeWindowScroll = () => {
    scrollEvent && scrollEvent(isBrowser() && window.pageYOffset);
  };

  useEffect(() => {
    isBrowser() && window.addEventListener('scroll', changeWindowScroll);

    return () => {
      isBrowser() && window.removeEventListener('scroll', changeWindowScroll);
    };
  }, []);

  return scrollInfo;
}
