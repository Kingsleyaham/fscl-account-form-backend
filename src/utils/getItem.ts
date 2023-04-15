export const getItemWithIndex = (arr: Array<string>, index: number): string => {
  let imgName = "";
  arr.forEach((elem) => {
    let firstElem = elem.split("-")[0];
    if (firstElem.includes(index.toString())) {
      imgName = elem;
    }
  });

  return imgName;
};
