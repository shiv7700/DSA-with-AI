# Q16 — Find Latest Group of Size M

**Difficulty:** Medium
**Pattern:** DSU — track component sizes, find last step with a component of size m
**Expected:** O(n · α(n)) time · O(n) space

## Problem

You are given an array `arr` of length `n` where `arr[i]` is a 1-indexed position. Starting from a binary string of all `0`s of length `n`, at step `i` you set `arr[i]` to `1`.

After each step, return the **latest step** at which there exists a group of `1`s of length exactly `m`. If no such step exists, return `-1`.

> **"Group of 1s of length m"** means `m` consecutive 1s (a run of exactly `m` adjacent 1-bits).

## Examples

### Example 1

```
Input:  arr = [3,5,1,2,4],  m = 1
Output: 4
```

Step 1: "00100" — groups of 1s: {3} (size 1). Has a group of size 1. ✅
Step 2: "00101" — groups: {3}, {5} (both size 1). ✅
Step 3: "10101" — groups: {1}, {3}, {5} (all size 1). ✅
Step 4: "11101" — groups: {1,2} (size 2), {3} (size 1). ✅ (last step with a group of size 1)
Wait: step 4 sets position 2 → "11101". Group {1,2} has size 2, group {3} has size 1 still ✅.
Step 5: "11111" — one group of size 5. No group of size 1.

Latest step with size-1 group: step 4.

### Example 2

```
Input:  arr = [3,3,5,2,1],  m = 2
```

Wait — arr should be a permutation of [1..n]. Disregard: arr = [3,5,1,2,4] m=2. Let's use:

```
Input:  arr = [3,5,1,2,4],  m = 2
Output: -1
```

After each step, no group ever has size exactly 2. (Step 4 has size 2 only at {1,2} momentarily, check: step 4 = "11101". Groups: {1,2}→size 2. So answer should be 4 actually — let me check step 5: "11111"→size 5. Answer: 4. Let me use the official example.)

Official examples from LeetCode:
- `arr = [3,5,1,2,4], m = 1` → 4
- `arr = [3,1,5,4,2], m = 2` → -1

## Constraints

- `n == arr.length`
- `1 <= m <= n <= 10^5`
- All integers in `arr` are distinct.
- `arr` is a permutation of `[1, n]`.

## Hints

<details>
<summary>Hint 1 — track run sizes with DSU</summary>

Each position you set to 1 might merge with adjacent runs. DSU handles this naturally: when you set position `p` to 1, union it with `p-1` and `p+1` if they're already 1.

The `size[find(p)]` tells you the length of the run containing `p` after each union.
</details>

<details>
<summary>Hint 2 — tracking "how many groups have size exactly m"</summary>

Maintain a counter `countM` = number of components currently with size exactly `m`.

When you add a new 1 at position `p`:
1. A new component of size 1 is created. If `m === 1`, increment `countM`.
2. For each neighbor (left, right) that's already 1:
   - Before union: the neighbor's component has size `s`. If `s === m`, decrement `countM`.
   - After union: the new merged component has size `newSize`. If `newSize === m`, increment `countM`.

After each step: if `countM > 0`, update the answer to the current step.
</details>

<details>
<summary>Hint 3 — marking active cells</summary>

DSU doesn't track which cells are set to 1. Keep a separate `active` boolean array.
Before trying to union with a neighbor, check `if (active[neighbor])`.
</details>

## Write your solution

→ [`../solutions/16-latest-group-of-size-m.js`](../solutions/16-latest-group-of-size-m.js)

## Follow-ups

- Why do we return the **latest** step and not the first?
- Could you reverse the process (start from "all 1s", flip to 0 one by one) and find the **first** step where a size-m group appears?
