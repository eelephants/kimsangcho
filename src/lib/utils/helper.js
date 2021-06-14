const round = (number) => {
  return Math.round(number);
};

const importAll = (r) => {
  let images = {};
  r.keys().map((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

export { round, importAll };
