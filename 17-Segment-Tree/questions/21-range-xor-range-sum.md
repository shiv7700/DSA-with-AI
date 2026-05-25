# Q21 — Range XOR Update, Range Sum (Lazy Propagation)

**Difficulty:** Hard
**Pattern:** Segment Tree with lazy propagation (XOR update, sum query)
**Expected:** O(n) build · O(log n) per operation · O(n) space

## Problem

Given an integer array `nums` of **0s and 1s**, implement a data structure that supports:

- **`rangeFlip(left, right)`** — flip (XOR with 1) every element in `nums[left..right]`. All 0s become 1s and vice versa.
- **`rangeSum(left, right)`** — return the count of 1s in `nums[left..right]`.

## Examples

### Example 1

```
nums = [0, 1, 0, 1, 1, 0, 0, 1]

rangeSum(0, 7)      →  4   (four 1s)
rangeFlip(2, 5)          nums = [0, 1, 1, 0, 0, 1, 0, 1]
rangeSum(0, 7)      →  4   (still four 1s — same count, different positions)
rangeFlip(0, 3)          nums = [1, 0, 0, 1, 0, 1, 0, 1]
rangeSum(0, 3)      →  2
rangeFlip(0, 7)          nums = [0, 1, 1, 0, 1, 0, 1, 0]
rangeSum(4, 7)      →  2
```

### Example 2

```
nums = [0, 0, 0, 0]

rangeFlip(0, 3)
rangeSum(0, 3)      →  4
rangeFlip(1, 2)
rangeSum(0, 3)      →  2
```

## Constraints

- `1 <= nums.length <= 10^5`
- `nums[i]` is 0 or 1.
- `0 <= left <= right < nums.length`

## Hints

<details>
<summary>Hint 1 — flipping a range sum</summary>

If a range of size `k` has sum `s` (that many 1s), after flipping, the sum becomes `k - s` (all the 0s became 1s and vice versa). So for a node covering range of size `k` with `tree[node] = s`:

After flip: `tree[node] = k - tree[node]`.
</details>

<details>
<summary>Hint 2 — lazy tag for flip</summary>

The lazy tag is a boolean: "does this subtree have a pending flip?" XOR is self-inverse: two flips cancel out. So:

`lazy[node] ^= 1` (toggle the pending flip).

When pushing down: if `lazy[node] === 1`, flip children's sums and toggle their lazy flags. Then clear `lazy[node] = 0`.
</details>

<details>
<summary>Hint 3 — pushing down</summary>

```js
function pushDown(node, start, end) {
  if (lazy[node]) {
    const mid = (start + end) >> 1;
    const lc = 2 * node, rc = 2 * node + 1;
    tree[lc] = (mid - start + 1) - tree[lc];  // flip left sum
    tree[rc] = (end - mid)       - tree[rc];  // flip right sum
    lazy[lc] ^= 1;
    lazy[rc] ^= 1;
    lazy[node] = 0;
  }
}
```
</details>

## Write your solution

→ [`../solutions/21-range-xor-range-sum.js`](../solutions/21-range-xor-range-sum.js)

## Follow-ups

- Generalise to an array of integers (not just 0/1). How does flipping all bits (bitwise NOT) affect the sum of a range?
- Add a `rangeQuery` for count of 0s alongside count of 1s.
