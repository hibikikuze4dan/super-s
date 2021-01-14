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

const specialDrawbacks = ["Premature Ejaculation", "Limp Dick"];

const specialDrawbackDisabledHandler = (drawback, currentChoices) => {
  const exceptionMet = currentChoices.some(
    (choice) => choice.title === drawback.exception.title
  );
  const drawbackExcludes = exceptionMet
    ? drawback.exclude.filter((ex) => ex !== drawback.exception.excludes)
    : drawback.exclude;
  if (drawbackExcludes.length === 0 && drawback.required.length === 0) {
    return true;
  }
  const currentChoicesTitles = currentChoices.map((choice) => choice.title);
  console.log(drawbackExcludes);
  const noExcludionsPresent = drawbackExcludes.every(
    (ex) => !currentChoicesTitles.includes(ex)
  );
  const requirementsMet =
    drawback.required.length === 0
      ? true
      : drawback.required.some((req) => currentChoicesTitles.includes(req));
  console.log([drawback, noExcludionsPresent, requirementsMet]);
  return noExcludionsPresent === true && requirementsMet === true;
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
  if (specialDrawbacks.includes(drawback.title)) {
    return !specialDrawbackDisabledHandler(drawback, currentChoices);
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
