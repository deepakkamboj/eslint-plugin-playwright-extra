import * as TS from "typescript";
import * as Lint from "tslint";

export class Rule extends Lint.Rules.AbstractRule {
  static FAILURE_STRING_NOW =
    "Avoid using Date.now() in test code. Mock the date instead.";
  static FAILURE_STRING_NEW =
    "Avoid using new Date() in test code. Mock the date instead.";

  static metadata: Lint.IRuleMetadata = {
    ruleName: "no-date-now",
    description: "Prevents usage of Date.now() and new Date() in test code",
    optionsDescription: "Not configurable.",
    options: null,
    type: "functionality",
    typescriptOnly: false,
  };

  apply(sourceFile: TS.SourceFile): Lint.RuleFailure[] {
    const walker = new NoDateNowWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class NoDateNowWalker extends Lint.RuleWalker {
  protected visitCallExpression(node: TS.CallExpression): void {
    // Check for Date.now()
    if (node.expression.kind === TS.SyntaxKind.PropertyAccessExpression) {
      const propAccess = node.expression as TS.PropertyAccessExpression;
      if (
        propAccess.expression.getText() === "Date" &&
        propAccess.name.getText() === "now"
      ) {
        this.addFailureAtNode(node, Rule.FAILURE_STRING_NOW);
      }
    }

    // Check for new Date()
    if (
      node.expression.kind === TS.SyntaxKind.Identifier &&
      node.expression.getText() === "Date" &&
      node.arguments.length === 0
    ) {
      const parent = node.parent;
      if (parent.kind === TS.SyntaxKind.NewExpression) {
        this.addFailureAtNode(parent, Rule.FAILURE_STRING_NEW);
      }
    }

    super.visitCallExpression(node);
  }

  protected visitNewExpression(node: TS.NewExpression): void {
    if (
      node.expression.kind === TS.SyntaxKind.Identifier &&
      node.expression.getText() === "Date" &&
      (!node.arguments || node.arguments.length === 0)
    ) {
      this.addFailureAtNode(node, Rule.FAILURE_STRING_NEW);
    }
    super.visitNewExpression(node);
  }
}
