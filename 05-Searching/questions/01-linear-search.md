# Q1 — Linear Search

**Difficulty:** Easy
**Pattern:** Linear scan
**Expected:** O(n) time · O(1) space

## Problem

You are given an array `arr` of values and a `target` value. Return the **index** of the first occurrence of `target` in the array. If the target does not exist, return `-1`.

You may not use any built-in search methods (`indexOf`, `includes`, `find`, `findIndex`). Implement the search yourself with a loop.

> **Why this problem exists:** Linear search is the most fundamental searching technique. Before you can appreciate binary search, you need to feel what it's like to scan every element one by one. You'll also use linear search in situations where binary search doesn't apply — unsorted data, small arrays, linked lists.

## Examples

### Example 1
```
Input:  arr = [14, 3, 27, 8, 42], target = 27
Output: 2
```

### Example 2
```
Input:  arr = [5, 10, 15, 20], target = 7
Output: -1
```

### Example 3 (first occurrence)
```
Input:  arr = [4, 9, 4, 3, 4], target = 4
Output: 0
```
Return the index of the **first** occurrence.

### Example 4 (edge cases)
```
Input:  arr = [], target = 1   →  -1
Input:  arr = [7],  target = 7  →  0
Input:  arr = [7],  target = 3  →  -1
```

## Constraints
- `0 <= arr.length <= 10^5`
- Elements can be any comparable JavaScript value.
- Return the index of the **first** match, not the last.
- Do not use `indexOf`, `includes`, `find`, or `findIndex`.

## Hints

<details>
<summary>Hint 1 — the strategy</summary>

Walk through the array from left to right. At each position `i`, check: is `arr[i] === target`? If yes, return `i`. If you finish the loop without finding it, return `-1`.
</details>

<details>
<summary>Hint 2 — the loop skeleton</summary>

```js
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) {
    return i;
  }
}
return -1;
```

That's all there is to it. The real point of this problem is locking in the pattern — and making sure you return `-1` (not `null`, not `false`, not `undefined`) when not found.
</details>

## Write your solution
→ [`../solutions/01-linear-search.js`](../solutions/01-linear-search.js)

## Follow-ups
- Return the index of the **last** occurrence instead of the first.
- Return **all** indexes where the target appears.
- Modify your function to accept a custom comparator: `linearSearch(arr, target, compareFn)`.
