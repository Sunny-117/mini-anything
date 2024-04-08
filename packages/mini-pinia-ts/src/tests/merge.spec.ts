import { it, describe, expect } from "vitest";
import { merge } from "lodash-es";

describe("merge", () => {
  it("merge function", () => {
    const a = { a: { a: 1, b: 1 } };
    const b = { a: { a: 2 } };
    const res = { a: { a: 2, b: 1 } };
    expect(merge(a, b)).toEqual(res);
  });
});
