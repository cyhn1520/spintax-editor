import { generateRandom } from "./spintax";

it("two spintax", () => {
  expect(generateRandom("{xx|yy}")).toEqual(expect.stringMatching(/xx|yy/));
});
it("three spintax", () => {
  expect(generateRandom("{xx|yy|zz}")).toEqual(
    expect.stringMatching(/xx|yy|zz/)
  );
});
it("nested spintax", () => {
  expect(generateRandom("{xx|yy|{1|2}}")).toEqual(
    expect.stringMatching(/xx|yy|1|2/)
  );
});

it("spintax with text", () => {
  expect(generateRandom("{xx|yy|zz}")).toEqual(
    expect.stringMatching(/xx|yy|zz/)
  );
});

it("two spintax", () => {
  expect(generateRandom("{xx|yy|zz} - {1|2}")).toEqual(
    expect.stringMatching(/xx - 1|xx - 2|yy - 1|yy - 2|zz - 1|zz - 2/)
  );
});

it("two spintax with nested", () => {
  expect(generateRandom("{xx|yy|zz} - {1|{?|!}}")).toEqual(
    expect.stringMatching(
      /xx - 1|xx - ?|xx - !|yy - 1|yy - ?|yy - !|zz - 1|zz - ?|zz - !/
    )
  );
});

it("only one option spintax", () => {
  expect(generateRandom("{xx}")).toEqual(expect.stringMatching(/xx/));
});

it("empty spintax", () => {
  expect(generateRandom("{}")).toEqual(expect.stringMatching(""));
});

it("empty text", () => {
  expect(generateRandom("")).toEqual(expect.stringMatching(""));
});
