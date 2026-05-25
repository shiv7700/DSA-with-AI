/**
 * Q1 — Build a Graph (Adjacency List)
 * Difficulty: Easy
 * Expected:   O(1) addVertex/addEdge · O(V + E) space
 * Problem:    ../questions/01-build-graph.md
 */

class Graph {
  constructor(directed = false) {
    // TODO: your solution here
  }

  addVertex(v) {
    // TODO: your solution here
  }

  addEdge(u, v, weight = 1) {
    // TODO: your solution here
  }

  removeEdge(u, v) {
    // TODO: your solution here
  }

  neighbors(v) {
    // TODO: your solution here
  }

  hasEdge(u, v) {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────

const g = new Graph();
g.addEdge('A', 'B');
g.addEdge('B', 'C');
console.log(g.neighbors('A')); // ['B']
console.log(g.neighbors('B')); // ['A', 'C']  (undirected)
console.log(g.hasEdge('A', 'C')); // false

const dg = new Graph(true);
dg.addEdge('A', 'B');
dg.addEdge('A', 'C');
console.log(dg.neighbors('A')); // ['B', 'C']
console.log(dg.neighbors('B')); // []

module.exports = { Graph };
