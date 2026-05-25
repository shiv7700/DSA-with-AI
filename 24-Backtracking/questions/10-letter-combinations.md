# Q10 — Letter Combinations of a Phone Number

**Difficulty:** Medium
**Pattern:** Backtracking — map each digit to a set of characters, build all products
**Expected:** O(4^n · n) time · O(n) space — where n is the length of `digits`

## Problem

Given a string containing digits from `2` to `9` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on a telephone keypad) is given below. Note that `1` does not map to any letters.

```
2 → abc   3 → def   4 → ghi   5 → jkl
6 → mno   7 → pqrs  8 → tuv   9 → wxyz
```

## Examples

### Example 1
```
Input:  digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```
All combinations of one letter from "abc" and one from "def".

### Example 2
```
Input:  digits = ""
Output: []
```

### Example 3
```
Input:  digits = "2"
Output: ["a","b","c"]
```

## Constraints
- `0 <= digits.length <= 4`
- `digits[i]` is a digit in the range `['2', '9']`.

## Hints

<details>
<summary>Hint 1 — think of it as a Cartesian product</summary>

For each position in `digits`, you choose one letter from that digit's mapping. The result is the Cartesian product of all the letter groups. Backtracking naturally computes this: recurse through digit positions, appending one letter per level.
</details>

<details>
<summary>Hint 2 — tracking position with an index</summary>

Pass an index `i` indicating which digit you're currently expanding. When `i === digits.length`, the current partial string is a complete combination — record it.
</details>

<details>
<summary>Hint 3 — using a map for the phone keypad</summary>

Define a map `{ '2': 'abc', '3': 'def', ... }`. At each recursive call, look up `map[digits[i]]` and iterate over its characters.
</details>

## Write your solution
→ [`../solutions/10-letter-combinations.js`](../solutions/10-letter-combinations.js)

## Follow-ups
- How would you extend this to handle digit `1` as an optional mapping (e.g., space character)?
- **Letter Case Permutation** — a variant where each character is toggled between cases instead of mapped from digits.
- Return combinations in lexicographic order.
