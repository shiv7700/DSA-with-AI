# Q30 — Splitting a String Into Descending Consecutive Values

**Difficulty:** Medium
**Pattern:** Backtracking — try each prefix, check if it extends a strictly decreasing sequence by 1
**Expected:** O(n · 2^n) time · O(n) space

## Problem

You are given a string `s` that consists of only digits.

Check whether it is possible to split `s` into **two or more** non-empty substrings such that the numerical values of the substrings are in **strictly decreasing** order and the difference between adjacent numerical values is exactly `1`.

Leading zeros are allowed in the substrings. The substrings must together form the entire string `s` — you must use all characters.

## Examples

### Example 1
```
Input:  s = "1234"
Output: false
```
Values would need to be decreasing by 1. No valid split exists.

### Example 2
```
Input:  s = "050043"
Output: true
```
Split as `"05"`, `"004"`, `"3"` → 5, 4, 3. Each is exactly 1 less than the previous.

### Example 3
```
Input:  s = "9080701"
Output: false
```

### Example 4
```
Input:  s = "10009998"
Output: true
```
Split as `"100"`, `"099"`, `"98"` → 100, 99, 98.

## Constraints
- `1 <= s.length <= 20`
- `s` only contains digits.

## Hints

<details>
<summary>Hint 1 — try all possible first segments</summary>

For the first segment, try every prefix of `s`. For each prefix with value `v`, recurse from the remainder of the string looking for the next segment with value `v - 1`.
</details>

<details>
<summary>Hint 2 — the recursion only needs the expected next value</summary>

Once you've chosen the first segment's value, every subsequent segment is forced: it must equal `prev - 1`. So the recursive call just checks: "does the string start with a representation of `prev - 1`?"
</details>

<details>
<summary>Hint 3 — watch out for large numbers</summary>

Segment values can be very large (the string can be up to 20 digits). Use BigInt or limit prefix length comparison carefully to avoid integer overflow.
</details>

## Write your solution
→ [`../solutions/30-splitting-descending-consecutive.js`](../solutions/30-splitting-descending-consecutive.js)

## Follow-ups
- Modify the problem to allow a difference of `d` (any fixed integer) instead of exactly 1.
- **Restore IP Addresses** — same "try all prefix lengths" structure.
- Return the actual valid split, not just whether one exists.
