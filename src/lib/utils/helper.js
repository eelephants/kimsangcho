import * as Color from '../styles/color.json';

const makeColor = (name) =>
  Color[name] ? Color[name].join(',') : '0, 0, 0, 1';

const round = (number) => Math.round(number);

const importAll = (r) => {
  let images = {};
  r.keys().map((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

const bp = {
  small: 500,
  large: 1300,
};

const mq = (n) => {
  const bpArray = Object.keys(bp).map((key) => [key, bp[key]]);

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (min-width: ${size}px)`];
    return acc;
  }, []);

  return result;
};

export { round, importAll, mq, makeColor };
