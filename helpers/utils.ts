import { Configuration, Linter } from "tslint";

export const helper = {
  lint: (ruleName: string, source: string) => {
    const linter = new Linter({ fix: false });
    const configuration = Configuration.parseConfigFile({
      rulesDirectory: ["./rules"],
      rules: {
        [ruleName]: true,
      },
    });

    linter.lint("file.ts", source, configuration);
    return linter.getResult().failures;
  },
};

declare global {
  namespace jest {
    interface Matchers<R> {
      toBePassed(): R;
      toBeFailedWith(message: string): R;
    }
  }
}
