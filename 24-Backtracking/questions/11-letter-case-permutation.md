# Q11 — Letter Case Permutation

**Difficulty:** Easy
**Pattern:** Backtracking — binary choice (uppercase / lowercase) at each letter position
**Expected:** O(2^L · n) time · O(n) space — where L is the number of letters in `s`

## Problem

Given a string `s`, you can transform every letter individually to be lowercase or uppercase. Return a list of all possible strings we could create. The digits in the string stay as-is. You may return the output in any order.

## Examples

### Example 1
```
Input:  s = "a1b2"
Output: ["a1b2","a1B2","A1b2","A1B2"]
```
The two letters `a` and `b` each have two cases; the digits `1` and `2` do not change.

### Example 2
```
Input:  s = "3z4"
Output: ["3z4","3Z4"]
```
Only the letter `z` has a case toggle.

## Constraints
- `1 <= s.length <= 12`
- `s` consists of lowercase English letters, uppercase English letters, and digits.

## Hints

<details>
<summary>Hint 1 — only branch at letter positions</summary>

For digit characters there is no choice — include them as-is and advance. For letter characters, branch into two recursive calls: one with the lowercase version, one with the uppercase version.
</details>

<details>
<summary>Hint 2 — working with a mutable character array</summary>

Convert `s` to a character array. At each letter index, set the character to lowercase, recurse to the next index, then set it to uppercase and recurse again. No explicit "unchoose" needed here because you overwrite the value rather than appending to a list.
</details>

<details>
<summary>Hint 3 — base case</summary>

When the index reaches the end of the string, join the character array into a string and push it to results.
</details>

## Write your solution
→ [`../solutions/11-letter-case-permutation.js`](../solutions/11-letter-case-permutation.js)

## Follow-ups
- **Letter Combinations of a Phone Number** — each digit expands to multiple letters rather than a binary toggle.
- Count the number of unique strings if some letters appear multiple times.
