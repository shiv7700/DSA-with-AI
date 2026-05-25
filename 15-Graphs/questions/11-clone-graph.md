# Q11 — Clone Graph

**Difficulty:** Medium
**Pattern:** BFS / DFS · Hash map for node mapping
**Expected:** O(V + E) time · O(V) space

## Problem

Given a reference to a node in a **connected undirected graph**, return a **deep copy (clone)** of the graph.

Each node in the graph contains:
- A value (`val`)
- A list of its neighbors (`neighbors`)

```js
class Node {
  constructor(val, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}
```

The clone must be a completely separate graph — modifying any node in the clone should not affect the original, and vice versa.

## Examples

### Example 1

```
Original graph:
  1 — 2
  |   |
  4 — 3

Node 1's neighbors: [2, 4]
Node 2's neighbors: [1, 3]
Node 3's neighbors: [2, 4]
Node 4's neighbors: [1, 3]

Output: a deep copy of this 4-node cycle.
        The returned node should be a NEW Node(1) with new Node(2), Node(3), Node(4) objects.
```

### Example 2

```
Input: node = null
Output: null
```

### Example 3

```
Single node:
  [1] (no neighbors)

Output: a new Node(1) with empty neighbors.
```

## Constraints

- The number of nodes is in the range `[0, 100]`.
- `1 <= Node.val <= 100`
- Node values are unique.
- No self-loops or multiple edges between the same pair.

## Hints

<details>
<summary>Hint 1 — the core challenge</summary>

You can't just do `new Node(original.val, original.neighbors)` — that would copy the val but still reference the SAME neighbor objects. You need genuinely new nodes.

The key insight: use a `Map` from original node → cloned node. This serves two purposes:
1. Lets you find the clone for any original node (to wire up neighbors).
2. Acts as a visited set to avoid infinite loops.
</details>

<details>
<summary>Hint 2 — BFS approach</summary>

```js
const map = new Map();  // originalNode → clonedNode
map.set(node, new Node(node.val));
const queue = [node];

while (queue.length > 0) {
  const curr = queue.shift();
  for (const neighbor of curr.neighbors) {
    if (!map.has(neighbor)) {
      map.set(neighbor, new Node(neighbor.val));
      queue.push(neighbor);
    }
    // wire up the edge in the clone
    map.get(curr).neighbors.push(map.get(neighbor));
  }
}

return map.get(node);
```
</details>

<details>
<summary>Hint 3 — DFS approach (recursive)</summary>

```js
const map = new Map();

function clone(node) {
  if (!node) return null;
  if (map.has(node)) return map.get(node);
  const copy = new Node(node.val);
  map.set(node, copy);
  for (const neighbor of node.neighbors) {
    copy.neighbors.push(clone(neighbor));
  }
  return copy;
}
```
</details>

## Write your solution
→ [`../solutions/11-clone-graph.js`](../solutions/11-clone-graph.js)

## Follow-ups
- How would you verify that two graph objects are deep-equal (same structure and values)?
- What if the graph were directed? What changes?
- What if there were cycles between nodes of the same value — how would your hash map handle it?
