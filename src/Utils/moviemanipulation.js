const extractTitleId = (titlePath) => {
  if (titlePath.length === 0) {
    return "";
  }

  const getPath = titlePath;
  // example: /title/tt8266310/
  const titleId = getPath.match(/([t]{2})\w+/);
  // console.log("mock result --->", titleId[0]);

  return titleId[0];
};

module.exports = { extractTitleId };
