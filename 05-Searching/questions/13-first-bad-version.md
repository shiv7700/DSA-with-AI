# Q13 — First Bad Version

**Difficulty:** Medium
**Pattern:** Binary search on answer — classic lower bound on a boolean predicate
**Expected:** O(log n) time · O(1) space

## Problem

You are a product manager and you need to find the first bad version introduced into a code repository. There are `n` versions `[1, 2, ..., n]`. A version is bad if and only if it failed QA.

You have access to a function `isBadVersion(version)` which returns `true` or `false`. Once a version is bad, all subsequent versions are also bad.

Given `n`, find the **first** bad version, minimizing the number of calls to `isBadVersion`.

> **Why this matters:** This is the archetypal "binary search on a predicate" problem. The "isBadVersion" function gives you a binary true/false signal: false, false, false, ..., true, true, true. You're looking for the transition point. This exact structure appears in Koko Eating Bananas, Capacity to Ship, and many production code scenarios (e.g., finding which commit introduced a bug — that's literally `git bisect`).

## Examples

### Example 1
```
Input:  n = 5, bad = 4
Sequence: [1:good, 2:good, 3:good, 4:BAD, 5:bad]
Output: 4
```

### Example 2
```
Input:  n = 1, bad = 1
Output: 1
```

### Example 3
```
Input:  n = 10, bad = 7
Sequence: [1..6: good, 7..10: bad]
Output: 7
```

## Constraints
- `1 <= bad <= n <= 2^31 - 1`
- Minimize calls to `isBadVersion`.
- The first bad version always exists.

## API

```js
// Already provided — do not implement. Just call it.
function isBadVersion(version) { /* returns boolean */ }
```

## Hints

<details>
<summary>Hint 1 — this is lower bound in disguise</summary>

Think of the versions as a boolean array: `[false, false, ..., false, true, true, ..., true]`. You want the first `true`. That's exactly the lower bound of `true`.

Standard lower bound: first index where `arr[i] >= target`. Here: first version where `isBadVersion(version) === true`.
</details>

<details>
<summary>Hint 2 — the branch logic</summary>

```js
if (isBadVersion(mid)) {
  // mid might be the first bad version — don't exclude it
  right = mid;
} else {
  // mid is good, so the first bad version is strictly to the right
  left = mid + 1;
}
```

Loop until `left === right`. That's the first bad version.
</details>

<details>
<summary>Hint 3 — overflow</summary>

With `n` up to 2^31 - 1, `left + right` can overflow a 32-bit integer in other languages. In JavaScript it doesn't overflow, but use `left + Math.floor((right - left) / 2)` as good practice.
</details>

## Write your solution
→ [`../solutions/13-first-bad-version.js`](../solutions/13-first-bad-version.js)

## Follow-ups
- What if there could be multiple "bad" regions (not just one contiguous run at the end)? Linear search is the only option.
- **`git bisect`** works on exactly this principle: it binary searches through commits to find the first one that introduced a bug.
- How many calls does your solution make to `isBadVersion` for `n = 2^31 - 1`? (~31 calls.)
