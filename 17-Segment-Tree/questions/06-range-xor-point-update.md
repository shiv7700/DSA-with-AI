# Q6 — Range XOR Query, Point Update

**Difficulty:** Easy
**Pattern:** Segment Tree — point update, range query (XOR)
**Expected:** O(n) build · O(log n) per update/query · O(n) space

## Problem

Given an integer array `nums`, implement a data structure that supports:

- **`update(index, val)`** — set `nums[index] = val`.
- **`xorRange(left, right)`** — return the **XOR** of all values in `nums[left..right]` (inclusive).

Recall: `a XOR b` is written `a ^ b` in JavaScript. XOR is its own inverse: `a ^ a === 0` and `a ^ 0 === a`.

## Examples

### Example 1

```
nums = [1, 3, 5, 7, 9]

xorRange(0, 4)   →  1 ^ 3 ^ 5 ^ 7 ^ 9 = 1
xorRange(0, 2)   →  1 ^ 3 ^ 5 = 7
xorRange(1, 3)   →  3 ^ 5 ^ 7 = 1
update(2, 0)               nums becomes [1, 3, 0, 7, 9]
xorRange(0, 2)   →  1 ^ 3 ^ 0 = 2
```

### Example 2

```
nums = [4, 6, 2, 4]

xorRange(0, 3)   →  4 ^ 6 ^ 2 ^ 4 = 6
xorRange(1, 2)   →  6 ^ 2 = 4
update(0, 0)
xorRange(0, 3)   →  0 ^ 6 ^ 2 ^ 4 = 2
```

## Constraints

- `1 <= nums.length <= 10^5`
- `0 <= nums[i], val <= 10^9`
- `0 <= left <= right < nums.length`

## Hints

<details>
<summary>Hint 1 — merge function and identity</summary>

XOR is associative and commutative. Merge: `left ^ right`. Identity (empty range): `0`, because `x ^ 0 === x`.
</details>

<details>
<summary>Hint 2 — XOR is its own inverse</summary>

Unlike sum where you need the size to recompute on lazy propagation, XOR on a range works cleanly with a simple merge. No lazy propagation needed for point updates.
</details>

<details>
<summary>Hint 3 — checking your answer manually</summary>

XOR the whole array by hand for small tests: `1^3=2, 2^5=7, 7^7=0, 0^9=9` — that gives `9`. But wait, 1^3^5^7^9: `1^3=2, 2^5=7, 7^7=0, 0^9=9`. Hmm, that's 9, not 1. Always double-check by writing out the bits.
</details>

## Write your solution

→ [`../solutions/06-range-xor-point-update.js`](../solutions/06-range-xor-point-update.js)

## Follow-ups

- Can you solve range XOR queries **without** a segment tree, using prefix XOR? What is the time complexity then?
- Would lazy propagation help if you needed range XOR updates too?
