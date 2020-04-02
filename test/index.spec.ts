import { equal } from "assert";
import { Add } from "../src";

describe("Typescript + Babel usage suite", () => {
  it("should add numbers correctly", () => {
    equal(Add(1, 2, 3), 6);
  });
});