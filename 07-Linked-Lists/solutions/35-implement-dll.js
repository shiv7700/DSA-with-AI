/**
 * Q35 — Implement a Doubly Linked List Class
 * Difficulty: Hard
 * Expected:   O(1) front/back ops · O(n) traversal
 * Problem:    ../questions/35-implement-dll.md
 */

class DoublyLinkedList {
  constructor() {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────
const dll = new DoublyLinkedList();
dll.addBack(1); dll.addBack(2); dll.addBack(3);
console.log(dll.toArray()); // [1, 2, 3]

module.exports = { DoublyLinkedList };
