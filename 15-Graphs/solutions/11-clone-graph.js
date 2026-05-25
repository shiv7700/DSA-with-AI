/**
 * Q11 — Clone Graph
 * Difficulty: Medium
 * Expected:   O(V + E) time · O(V) space
 * Problem:    ../questions/11-clone-graph.md
 */

class Node {
  constructor(val, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

/**
 * @param {Node|null} node
 * @returns {Node|null}
 */
function cloneGraph(node) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

// Build: 1 - 2
//        |   |
//        4 - 3
const n1 = new Node(1);
const n2 = new Node(2);
const n3 = new Node(3);
const n4 = new Node(4);
n1.neighbors = [n2, n4];
n2.neighbors = [n1, n3];
n3.neighbors = [n2, n4];
n4.neighbors = [n1, n3];

const cloned = cloneGraph(n1);
console.log(cloned !== n1);           // true (different object)
console.log(cloned.val);              // 1
console.log(cloned.neighbors.length); // 2

module.exports = { cloneGraph, Node };
