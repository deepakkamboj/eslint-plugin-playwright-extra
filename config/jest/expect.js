const { helper } = require("../../helpers/utils");

beforeAll(() => {
  expect.extend({
    toBePassed({ source, rule }) {
      const failures = helper.lint(rule, source);

      if (failures.length === 0) {
        return { pass: true };
      }

      return {
        pass: false,
        message: () =>
          `Expected to be passed, but got "${failures[0].getFailure()}"`,
      };
    },
    toBeFailedWith({ source, rule }, message) {
      const failures = helper.lint(rule, source);

      if (failures.length === 0) {
        return {
          pass: false,
          message: () => "Rule has been passed, but failed expected",
        };
      }

      const matchingFailure = failures.find(
        (failure) => failure.getFailure() === message
      );
      if (!matchingFailure) {
        return {
          pass: false,
          message: () =>
            `Expected "${message}" but got "${failures
              .map((f) => f.getFailure())
              .join(", ")}"`,
        };
      }

      return { pass: true };
    },
  });
});
