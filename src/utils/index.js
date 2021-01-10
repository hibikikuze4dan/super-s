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

export const checkIfDisabled = (drawback, currentChoices) => {
  if (
    (drawback?.exclude?.length === 0 ||
      drawback?.exclude?.length === undefined) &&
    (drawback?.required?.length === 0 ||
      drawback?.required?.length === undefined)
  ) {
    return false;
  }
  const currentChoicesTitles = currentChoices.map((choice) => choice.title);
  const theExcluded = drawback?.exclude || [];
  const theRequired = drawback?.required || [];
  const excludeDisable = theExcluded.some((ex) =>
    currentChoicesTitles.includes(ex)
  );
  const requiredEnable = theRequired.some((req) =>
    currentChoicesTitles.includes(req)
  );
  if (theExcluded.length === 0) {
    return !requiredEnable;
  } else if (theRequired.length === 0) {
    return excludeDisable;
  }
  return excludeDisable || !requiredEnable;
};
