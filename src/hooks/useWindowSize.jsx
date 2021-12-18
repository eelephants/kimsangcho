import { useState, useEffect } from 'react';
import _ from 'lodash';
import { isBrowser } from '../lib/utils/helper';

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: !isBrowser() ? 1200 : window.innerWidth,
    height: !isBrowser() ? 800 : window.innerHeight,
  });

  const changeWindowSize = _.debounce(() => {
    setWindowSize({
      width: isBrowser() && window.innerWidth,
      height: isBrowser() && window.innerHeight,
    });
  }, 1000);

  useEffect(() => {
    window.addEventListener('resize', changeWindowSize);

    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);

  return windowSize;
}
