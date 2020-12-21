export const lossOrGain = (num = 0) => {
  if (num > 0) {
    return `+${num}`;
  } else if (num < 0) {
    return `-${num}`;
  }
  return num.toString();
};

export const getTitles = (objOrArr) => {
  return Array.isArray(objOrArr)
    ? objOrArr.map((data) => data.title)
    : objOrArr.title;
};
