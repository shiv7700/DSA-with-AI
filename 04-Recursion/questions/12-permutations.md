# Q12 — Print All Permutations of a String

**Difficulty:** Medium
**Pattern:** Backtracking — swap characters, recurse, swap back
**Expected:** O(n! × n) time · O(n) space (call stack)

## Problem

Write a recursive function `printPermutations(s)` that prints all permutations of the string `s`.

A **permutation** is an arrangement of all the characters of the string in every possible order.

For `"abc"`, there are `3! = 6` permutations: `"abc"`, `"acb"`, `"bac"`, `"bca"`, `"cab"`, `"cba"`.

> **Why this problem?** Permutations are everywhere in combinatorics and interviews (e.g., "list all possible orderings"). The algorithm introduces the classic backtracking swap-recurse-swap-back pattern. You'll use this same structure in N-Queens and Sudoku Solver.

## Examples

### Example 1
```
Input:  "ab"
Output (any order):
"ab"
"ba"
```

### Example 2
```
Input:  "abc"
Output (any order):
"abc"
"acb"
"bac"
"bca"
"cab"
"cba"
```

### Example 3 (edge case)
```
Input:  "a"    → just "a"
Input:  ""     → just ""
```

## Constraints
- `1 <= s.length <= 8` (8! = 40,320 — fine for printing)
- All characters in `s` are unique (no duplicates for the basic version).
- Print all permutations; order doesn't matter.

## Hints

<details>
<summary>Hint 1 — the idea: fix one position at a time</summary>

Think of building the permutation position by position.

For position 0: try putting each character of the string there, one at a time. Once you've placed a character at position 0, recursively arrange the rest of the characters in positions 1, 2, …

When position 0 has `'a'`, recursively arrange `"bc"` → gives `"abc"` and `"acb"`.
When position 0 has `'b'`, recursively arrange `"ac"` → gives `"bac"` and `"bca"`.
And so on.
</details>

<details>
<summary>Hint 2 — swap-recurse-swap (backtracking)</summary>

The common approach: convert the string to an array and use swapping.

```
At each level, we have a "start" index.
We try placing every character from index [start..end] at position [start].
We do this by swapping arr[start] with arr[i], recursing, then swapping back.
```

```js
function permute(arr, start) {
  if (start === arr.length) {
    console.log(arr.join(''));
    return;
  }
  for (let i = start; i < arr.length; i++) {
    [arr[start], arr[i]] = [arr[i], arr[start]];  // swap
    permute(arr, start + 1);                       // recurse
    [arr[start], arr[i]] = [arr[i], arr[start]];  // swap back ← BACKTRACK
  }
}
```
</details>

<details>
<summary>Hint 3 — trace for "ab"</summary>

```
arr = ['a', 'b'], start = 0

  i=0: swap arr[0] with arr[0] → ['a', 'b']
    permute(['a','b'], 1)
      i=1: swap arr[1] with arr[1] → ['a', 'b']
        permute(['a','b'], 2) → start===length → prints "ab"
      swap back → ['a', 'b']
  swap back → ['a', 'b']

  i=1: swap arr[0] with arr[1] → ['b', 'a']
    permute(['b','a'], 1)
      i=1: swap arr[1] with arr[1] → ['b', 'a']
        permute(['b','a'], 2) → start===length → prints "ba"
      swap back → ['b', 'a']
  swap back → ['a', 'b']
```
</details>

<details>
<summary>Hint 4 — alternative: build from scratch (no swapping)</summary>

Another approach: pass a "chosen so far" string and a "remaining" string. Pick one character from remaining, add it to chosen, recurse.

```js
function helper(chosen, remaining) {
  if (remaining.length === 0) { console.log(chosen); return; }
  for (let i = 0; i < remaining.length; i++) {
    const newChosen    = chosen + remaining[i];
    const newRemaining = remaining.slice(0, i) + remaining.slice(i + 1);
    helper(newChosen, newRemaining);
  }
}
```

Cleaner to read, but creates more string copies.
</details>

## Write your solution
→ [`../solutions/12-permutations.js`](../solutions/12-permutations.js)

## Follow-ups
- Handle duplicates: if `s = "aab"`, print only unique permutations (3 instead of 6).
- Return the permutations in a sorted array.
- LeetCode 46: **Permutations** — exact same problem with integers.
- LeetCode 47: **Permutations II** — with duplicates.
