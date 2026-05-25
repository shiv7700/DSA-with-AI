/**
 * Q2 — Implement LinkedList Class
 * Difficulty: Easy (foundational)
 * Expected:   O(1) head/tail ops · O(n) middle ops
 * Problem:    ../questions/02-implement-linkedlist.md
 */

class LinkedList {
  constructor() {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────
const ll = new LinkedList();
ll.push(1); ll.push(2); ll.push(3);
console.log(ll.toArray()); // [1, 2, 3]

module.exports = { LinkedList };
