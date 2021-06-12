import { useState, useEffect } from 'react';

export default function useWindowScroll(scrollEvent) {
  const isSSR = typeof window !== 'undefined';
  const [yOffset, setPageYoffset] = useState(isSSR ? 0 : window.pageYOffset);

  const changeWindowScroll = () => {
    setPageYoffset(window.pageYOffset);
    scrollEvent && scrollEvent();
  };

  useEffect(() => {
    window.addEventListener('scroll', changeWindowScroll);

    return () => {
      window.removeEventListener('scroll', changeWindowScroll);
    };
  }, []);

  return [yOffset];
}
