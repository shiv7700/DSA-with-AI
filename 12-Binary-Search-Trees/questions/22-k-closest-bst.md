# Q22 — K Closest Values in BST

**Difficulty:** Medium
**Pattern:** Inorder traversal + sliding window (or max-heap of size k)
**Expected:** O(n) time · O(n) space  (or O(n + k log k) with heap)

## Problem

Given the root of a BST, a `target` value (float), and an integer `k`, return the `k` values in the BST that are closest to `target`.

Return the answer in any order.

## Examples

### Example 1

```
Tree:
        4
       / \
      2   5
     / \
    1   3

target = 3.714286,  k = 2

Distances:  |1 - 3.714| = 2.714
            |2 - 3.714| = 1.714
            |3 - 3.714| = 0.714
            |4 - 3.714| = 0.286   ← 1st closest
            |5 - 3.714| = 1.286

Two closest: 4 (dist 0.286), 3 (dist 0.714)

Output: [4, 3]   (any order)
```

### Example 2

```
Same tree.
target = 2.0,  k = 3

Closest 3: 2 (dist 0), 1 (dist 1), 3 (dist 1)
Output: [1, 2, 3]
```

## Constraints

- `1 <= k <= n` (number of nodes)
- All node values are unique.

## Hints

<details>
<summary>Hint 1 — simplest approach: collect all, sort by distance</summary>

Traverse all nodes. Sort by `|val - target|`. Return the first k.
O(n log n) time, O(n) space. Correct but not optimal.
</details>

<details>
<summary>Hint 2 — better: inorder + sliding window</summary>

Inorder traversal gives values in sorted order. The k closest values form a **contiguous window** in the sorted sequence (they're the values nearest to target). Use a deque (or array) of size k:

- Walk inorder.
- Keep adding to the window.
- Once the window has k elements, if the new element is closer to target than the oldest element in the window, evict the oldest and add the new one.
- Otherwise, you've passed the optimal window (since values keep getting farther from target).

O(n) time, O(k) space (plus O(h) for the traversal stack).
</details>

<details>
<summary>Hint 3 — maximum heap of size k</summary>

Another O(n log k) approach: use a max-heap keyed by distance. Push every node. When heap size > k, pop the farthest. At the end, the heap contains the k closest.
</details>

## Write your solution
→ [`../solutions/22-k-closest-bst.js`](../solutions/22-k-closest-bst.js)

## Follow-ups

- The sliding window approach returns the k closest in O(n). Can you do better? (O(log n + k) using two iterators — one ascending, one descending — is possible.)
- If `k = 1`, does your solution reduce to Q21?
