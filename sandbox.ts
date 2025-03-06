// This file is used for testing TSLint rules during development

// Test cases for no-date-now rule
const timestamp = Date.now(); // Should trigger warning
const currentDate = new Date(); // Should trigger warning

// Valid date usage
const specificDate = new Date("2025-03-05"); // Should be valid
const parsedDate = Date.parse("2025-03-05"); // Should be valid

// Multiple violations in one block
function dateTests() {
  const now = Date.now();
  const today = new Date();
  return { now, today };
}

// Test with different contexts
class DateWrapper {
  getCurrentTime() {
    return Date.now(); // Should trigger warning
  }

  getCurrentDate() {
    return new Date(); // Should trigger warning
  }
}
