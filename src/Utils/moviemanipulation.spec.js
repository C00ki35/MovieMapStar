const { expect } = require("chai");

const { extractTitleId } = require("./moviemanipulation");

describe("extractTitleId()", () => {
  it("Given an empty string, returns an empty string.", () => {
    expect(extractTitleId("")).to.equal("");
  });
  it("Extracts title id from title path.", () => {
    expect(extractTitleId("/title/tt8266310/")).to.equal("tt8266310");
    expect(extractTitleId("/title/tt6644200/")).to.equal("tt6644200");
  });
});
