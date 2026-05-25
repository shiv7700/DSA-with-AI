# Q20 — Remove K Digits

**Difficulty:** Medium
**Pattern:** Monotonic stack (greedy)
**Expected:** O(n) time · O(n) space

## Problem

Given a string `num` representing a non-negative integer, and an integer `k`, remove `k` digits from the number so that the remaining number is **as small as possible**.

Return the result as a string with no leading zeros. If the entire number is removed, return `"0"`.

## Examples

### Example 1
```
Input:  num = "1432219", k = 3
Output: "1219"
```
Remove `4`, `3`, `2` (in that order from left to right where they're larger than the next digit). Result: 1219.

### Example 2
```
Input:  num = "10200", k = 1
Output: "200"
```
Remove `1`. Result: "0200" → strip leading zeros → "200".

### Example 3
```
Input:  num = "10", k = 2
Output: "0"
```
Remove both digits. Return "0".

## Constraints
- `1 <= k <= num.length <= 10^5`
- `num` consists of only digits.
- `num` does not have leading zeros except for the case `"0"` itself.

## Hints

<details>
<summary>Hint 1 — greedy insight</summary>

To minimize the number, scan left to right. Whenever you find a digit that is **greater than the next digit**, removing it makes the number smaller. Removing the leftmost such "peak" digit is the greedy choice.

Repeat this logic `k` times. A monotonic stack does all k removals in one O(n) pass.
</details>

<details>
<summary>Hint 2 — monotonic stack approach</summary>

Maintain an **increasing** stack (from bottom to top). For each digit:
- While `k > 0` and the stack is not empty and the top of the stack is **greater** than the current digit:
  - Pop the top (this is a removal — decrement `k`).
- Push the current digit.

After the loop, if `k > 0`, remove the last `k` digits from the stack (they'll be at the top — the rightmost digits).
</details>

<details>
<summary>Hint 3 — handling leading zeros</summary>

After building the result from the stack, strip any leading zeros. But if stripping gives an empty string, return `"0"`.

```js
const result = stack.join('').replace(/^0+/, '') || '0';
```
</details>

## Write your solution
→ [`../solutions/20-remove-k-digits.js`](../solutions/20-remove-k-digits.js)

## Follow-ups
- **Remove K Digits to Make Largest Number** — the symmetric problem. What changes?
- **Monotone Increasing Digits** — make the fewest digit changes so the number has only non-decreasing digits.
- How would you solve this if you could remove digits from **anywhere**, not just maintaining order?
