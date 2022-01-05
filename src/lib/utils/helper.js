import * as Color from '@/lib/styles/color.json';
import { css } from '@emotion/react';

const makeColor = name => (Color[name] ? Color[name].join(',') : '0, 0, 0, 1');

const round = number => Math.round(number);

const importAll = r => {
  let images = {};
  r.keys().map(item => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

const bp = {
  small: 767,
  large: 1023,
  xLarge: 1023,
};

const mq = n => {
  const bpArray = Object.keys(bp).map(key => [key, bp[key]]);

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (max-width: ${size}px)`];
    return acc;
  }, []);

  return result;
};

const ellipsis = (lineCnt, lineHeight) => css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${lineCnt}; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: ${lineHeight};
  height: ${lineHeight} * ${lineCnt}; /* line-height 가 1.2em 이고 3라인을 자르기 때문에 height는 1.2em * 3 = 3.6em */
`;

const isBrowser = () => typeof window !== 'undefined';

export { round, importAll, mq, makeColor, isBrowser, ellipsis };
