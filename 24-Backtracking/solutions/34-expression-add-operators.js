/**
 * Q34 — Expression Add Operators
 * Difficulty: Hard
 * Expected:   O(4^n · n) time · O(n) space
 * Problem:    ../questions/34-expression-add-operators.md
 */

function addOperators(num, target) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(addOperators("123", 6));   // ["1+2+3","1*2*3"]
console.log(addOperators("232", 8));   // ["2+3*2","2*3+2"]
console.log(addOperators("105", 5));   // ["1*0+5","10-5"]
console.log(addOperators("00", 0));    // ["0+0","0-0","0*0"]

module.exports = { addOperators };
