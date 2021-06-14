import { useState, useEffect } from 'react';
import _ from 'lodash';

export default function useWindowSize() {
  const isSSR = typeof window !== 'undefined';
  const [windowSize, setWindowSize] = useState({
    width: isSSR ? 1200 : window.innerWidth,
    height: isSSR ? 800 : window.innerHeight,
  });

  const changeWindowSize = _.debounce(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, 1000);

  useEffect(() => {
    window.addEventListener('resize', changeWindowSize);

    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);

  return windowSize;
}
