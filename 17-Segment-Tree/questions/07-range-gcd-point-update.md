# Q7 — Range GCD Query, Point Update

**Difficulty:** Easy
**Pattern:** Segment Tree — point update, range query (GCD)
**Expected:** O(n log MAX) build · O(log n · log MAX) per query/update · O(n) space

## Problem

Given an integer array `nums`, implement a data structure that supports:

- **`update(index, val)`** — set `nums[index] = val`.
- **`gcdRange(left, right)`** — return the **GCD** (Greatest Common Divisor) of all values in `nums[left..right]` (inclusive).

Recall: `gcd(a, b)` is the largest integer that divides both `a` and `b`. `gcd(12, 8) = 4`.

## Examples

### Example 1

```
nums = [12, 6, 4, 8, 3]

gcdRange(0, 4)   →  gcd(12,6,4,8,3)  = 1
gcdRange(0, 3)   →  gcd(12,6,4,8)    = 2
gcdRange(0, 1)   →  gcd(12,6)        = 6
update(2, 6)               nums becomes [12, 6, 6, 8, 3]
gcdRange(0, 2)   →  gcd(12,6,6)      = 6
gcdRange(0, 3)   →  gcd(12,6,6,8)    = 2
```

### Example 2

```
nums = [7, 7, 7, 7]

gcdRange(0, 3)   →  7
update(1, 14)
gcdRange(0, 3)   →  7
update(0, 3)
gcdRange(0, 3)   →  1
```

## Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i], val <= 10^9`
- `0 <= left <= right < nums.length`

## Hints

<details>
<summary>Hint 1 — is GCD associative?</summary>

Yes! `gcd(gcd(a, b), c) === gcd(a, gcd(b, c))`. So a segment tree can use GCD as the merge operation.

Merge: `gcd(leftResult, rightResult)`.
Identity: `0` — because `gcd(0, x) === x` for any positive `x`.
</details>

<details>
<summary>Hint 2 — implementing GCD</summary>

Use the Euclidean algorithm:

```js
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}
```

This runs in O(log(min(a, b))) time.
</details>

<details>
<summary>Hint 3 — overall complexity</summary>

Build: O(n log MAX) because each of the n nodes calls gcd which takes O(log MAX).
Each query/update: O(log n) nodes visited, each running gcd in O(log MAX). Total: O(log n · log MAX).
</details>

## Write your solution

→ [`../solutions/07-range-gcd-point-update.js`](../solutions/07-range-gcd-point-update.js)

## Follow-ups

- What if you also need range LCM? Is LCM associative? Are there any numerical overflow concerns in JavaScript?
- Could you solve this problem without a segment tree using a sparse table? What trade-offs would that involve?
