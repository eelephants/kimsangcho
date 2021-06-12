import { useRef, useEffect } from 'react';

export default function useWindowScroll() {
  const dom = useRef({
    currentScene: 0,
    yOffset: window.pageYOffset,
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
    scrollEvent && scrollEvent(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', changeWindowScroll);

    return () => {
      window.removeEventListener('scroll', changeWindowScroll);
    };
  }, []);

  return scrollInfo;
}
