/**
 * Q22 — Design Hit Counter
 * Difficulty: Medium
 * Expected:   O(1) amortized per hit/getHits · O(300) space
 * Problem:    ../questions/22-design-hit-counter.md
 */

class HitCounter {
  constructor() {
    // TODO: your solution here
  }

  hit(timestamp) {
    // TODO: your solution here
  }

  getHits(timestamp) {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────
const counter = new HitCounter();
counter.hit(1); counter.hit(2); counter.hit(3);
console.log(counter.getHits(4));   // 3
console.log(counter.getHits(301)); // 2 (hit at 1 expired)

module.exports = { HitCounter };
