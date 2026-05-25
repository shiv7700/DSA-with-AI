# Q14 — Range Module

**Difficulty:** Medium
**Pattern:** Segment Tree — range assign, range query (interval tracking)
**Expected:** O(log n) per operation · O(n log n) space

## Problem

A Range Module tracks ranges of numbers. Implement the `RangeModule` class:

- **`addRange(left, right)`** — add the half-open interval `[left, right)` to the module. Numbers already tracked within this range stay tracked.
- **`queryRange(left, right)`** — return `true` if every number in `[left, right)` is currently being tracked.
- **`removeRange(left, right)`** — stop tracking every number currently in `[left, right)`.

## Examples

### Example 1

```
rm = new RangeModule()
rm.addRange(10, 20)
rm.removeRange(14, 16)
rm.queryRange(10, 14)  →  true   (every number in [10,14) is tracked)
rm.queryRange(13, 15)  →  false  (14 is not tracked)
rm.queryRange(16, 17)  →  true   ([16,17) is tracked)
```

### Example 2

```
rm = new RangeModule()
rm.addRange(1, 5)
rm.addRange(8, 10)
rm.queryRange(1, 10)   →  false  (6, 7 not tracked)
rm.addRange(5, 8)
rm.queryRange(1, 10)   →  true
rm.removeRange(3, 7)
rm.queryRange(1, 3)    →  true
rm.queryRange(3, 5)    →  false
```

## Constraints

- `1 <= left < right <= 10^9`
- At most `10^4` calls across all methods.

## Hints

<details>
<summary>Hint 1 — this is an interval problem</summary>

One clean approach: maintain a sorted list of non-overlapping tracked intervals using a balanced BST or a sorted array. For `addRange`, merge overlapping intervals. For `queryRange`, check coverage. For `removeRange`, trim intervals.

This is O(n) per operation in the worst case but fast in practice.
</details>

<details>
<summary>Hint 2 — segment tree with coordinate compression</summary>

All x-values appear in operations, so you can process queries offline (collect all coordinates first, compress, build tree). But since operations arrive online in this problem, use a **dynamic segment tree** (nodes are allocated on demand — only when a range is modified or queried). Each node stores `true/false` for "fully covered".

Lazy tag: `null` = no pending change, `true` = mark entire range as covered, `false` = mark as uncovered.
</details>

<details>
<summary>Hint 3 — merge for the tree</summary>

A node is fully covered if both its children are fully covered:
`tree[node] = tree[lc] && tree[rc]`.

For the lazy assign: if `lazy[node] === true`, all descendants are covered; if `false`, none are.
</details>

## Write your solution

→ [`../solutions/14-range-module.js`](../solutions/14-range-module.js)

## Follow-ups

- What if you need to count the total length of tracked intervals at any point?
- How does this compare to just keeping a sorted array of intervals?
