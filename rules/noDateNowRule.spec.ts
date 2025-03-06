import { helper } from "../helpers/utils";
import { Rule } from "./noDateNowRule";

describe("noDateNowRule", () => {
  const rule = Rule.metadata.ruleName;

  it("should fail when using Date.now()", () => {
    const source = `
            const timestamp = Date.now();
        `;

    expect({ rule, source }).toBeFailedWith(Rule.FAILURE_STRING_NOW);
  });

  it("should fail when using new Date() without arguments", () => {
    const source = `
            const date = new Date();
        `;

    expect({ rule, source }).toBeFailedWith(Rule.FAILURE_STRING_NEW);
  });

  it("should pass when using new Date() with arguments", () => {
    const source = `
            const date = new Date('2025-03-05');
        `;

    expect({ rule, source }).toBePassed();
  });

  it("should pass when using Date.parse()", () => {
    const source = `
            const timestamp = Date.parse('2025-03-05');
        `;

    expect({ rule, source }).toBePassed();
  });

  it("should detect multiple violations in the same file", () => {
    const source = `
            const now = Date.now();
            const today = new Date();
        `;

    const failures = helper.lint(rule, source);
    expect(failures.length).toBe(2);
    expect(failures[0].getFailure()).toBe(Rule.FAILURE_STRING_NOW);
    expect(failures[1].getFailure()).toBe(Rule.FAILURE_STRING_NEW);
  });
});
