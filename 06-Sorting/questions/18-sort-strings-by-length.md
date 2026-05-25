# Q18 — Sort Strings by Length

**Difficulty:** Easy
**Pattern:** Custom comparator, multi-key sort
**Expected:** O(n log n) time · O(1) extra space

## Problem

Given an array of strings, sort them by **length** in ascending order. If two strings have the same length, sort them **lexicographically** (alphabetically) as a tiebreaker.

## Examples

### Example 1
```
Input:  ['banana', 'fig', 'kiwi', 'apple', 'cherry']
Output: ['fig', 'kiwi', 'apple', 'banana', 'cherry']
```
Lengths: fig=3, kiwi=4, apple=5, banana=6, cherry=6.
"banana" and "cherry" are both length 6 → alphabetical: "banana" < "cherry".

### Example 2
```
Input:  ['zoo', 'ant', 'bee', 'cat']
Output: ['ant', 'bee', 'cat', 'zoo']
```
All have length 3 → sort alphabetically.

### Example 3
```
Input:  ['hello']
Output: ['hello']
```

### Example 4
```
Input:  ['b', 'aa', 'c', 'bb', 'a']
Output: ['a', 'b', 'c', 'aa', 'bb']
```
Single-character strings first (alphabetically), then two-character strings (alphabetically).

## Constraints
- `1 <= arr.length <= 10^4`
- `1 <= arr[i].length <= 100`
- Strings contain only lowercase English letters.

## Hints

<details>
<summary>Hint 1 — multi-key comparator</summary>

Your comparator needs two levels:
1. Compare by length first.
2. If lengths are equal, compare alphabetically.

```js
(a, b) => {
  if (a.length !== b.length) return a.length - b.length;
  return a.localeCompare(b);
}
```
</details>

<details>
<summary>Hint 2 — localeCompare vs. subtraction</summary>

For strings, you cannot use `a - b` (that gives `NaN`). Use `a.localeCompare(b)` which returns a negative number if `a` comes before `b` alphabetically, positive if after, and 0 if equal.

For ASCII-only lowercase strings, `a < b ? -1 : a > b ? 1 : 0` also works.
</details>

<details>
<summary>Hint 3 — is this sort stable?</summary>

JavaScript's `.sort()` is stable (guaranteed in ES2019+). Since you're explicitly handling ties with the lexicographic tiebreaker, stability of the sort itself does not affect the result here. But in general, being aware of stability matters for multi-key sorts.
</details>

## Write your solution
→ [`../solutions/18-sort-strings-by-length.js`](../solutions/18-sort-strings-by-length.js)

## Follow-ups
- Sort in descending length order, and for equal lengths, reverse alphabetical order.
- Add a third tiebreaker: if two strings are equal length and alphabetically identical (which can't happen with distinct strings, but could in theory), sort by original index (i.e., preserve insertion order).
