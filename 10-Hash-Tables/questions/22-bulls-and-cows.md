# Q22 — Bulls and Cows

**Difficulty:** Medium
**Pattern:** Frequency map for unmatched characters
**Expected:** O(n) time · O(1) space (bounded by digit count 0–9)

## Problem

You are playing the **Bulls and Cows** guessing game. You have a secret number and a friend's guess, both as strings of digits of equal length.

- A **bull** is a digit that is in the correct position.
- A **cow** is a digit that is in the secret but in the wrong position.

Return a hint in the format `"xAyB"` where `x` is the number of bulls and `y` is the number of cows.

## Examples

### Example 1
```
Input:  secret = "1807",  guess = "7810"
Output: "1A3B"
```
- Position 1: `'8'` matches `'8'` → bull.
- Remaining secret digits (not bull positions): `1, 0, 7`. Remaining guess digits: `7, 1, 0`.
- `7` in guess matches `7` in remaining secret → cow.
- `1` in guess matches `1` in remaining secret → cow.
- `0` in guess matches `0` in remaining secret → cow.
- Total: 1 bull, 3 cows → `"1A3B"`.

### Example 2
```
Input:  secret = "1123",  guess = "0111"
Output: "1A1B"
```

## Constraints
- `1 <= secret.length <= 1000`
- `secret.length == guess.length`
- `secret` and `guess` consist of digits only.

## Hints

<details>
<summary>Hint 1 — handle bulls first</summary>

Walk both strings in parallel. Count positions where `secret[i] === guess[i]` — those are bulls. For non-matching positions, track what's unmatched in a frequency map.
</details>

<details>
<summary>Hint 2 — count cows from unmatched characters</summary>

Build a frequency map for unmatched digits in `secret`. Then for each unmatched digit in `guess`, if it appears in the map (count > 0), that's a cow — decrement the count and increment the cow counter.
</details>

## Write your solution
→ [`../solutions/22-bulls-and-cows.js`](../solutions/22-bulls-and-cows.js)

## Follow-ups
- What if digits can repeat in the secret? Does your solution handle that correctly?
- Generalize to a game where the "secret" contains letters, not just digits.
