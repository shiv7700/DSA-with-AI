/**
 * Q4 — Implement a Priority Queue (array-backed min-heap)
 * Difficulty: Medium
 * Expected:   O(log n) insert · O(log n) extractMin · O(1) peek
 * Problem:    ../questions/04-implement-priority-queue.md
 */

class MinPriorityQueue {
  constructor() {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────
const pq = new MinPriorityQueue();
pq.insert('urgent', 1); pq.insert('normal', 5); pq.insert('low', 10);
console.log(pq.extractMin()); // { value: 'urgent', priority: 1 }

module.exports = { MinPriorityQueue };
