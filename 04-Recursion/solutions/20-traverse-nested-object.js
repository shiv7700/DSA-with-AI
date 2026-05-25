/**
 * Q20 — Recursively Traverse a Nested Object and Collect Leaf Values
 * Difficulty: Medium
 * Expected:   O(n) time · O(depth) space
 * Problem:    ../questions/20-traverse-nested-object.md
 */

function collectLeaves(obj) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(collectLeaves({ name: 'Alice', address: { city: 'NYC', zip: '10001' } }));
// ['Alice', 'NYC', '10001']

module.exports = { collectLeaves };
