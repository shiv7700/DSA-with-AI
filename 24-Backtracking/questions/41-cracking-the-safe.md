# Q41 — Cracking the Safe

**Difficulty:** Hard
**Pattern:** De Bruijn sequence via DFS — construct the shortest superstring containing all k-length combinations
**Expected:** O(k^n) time · O(k^n) space — where k = number of digits, n = password length

## Problem

There is a safe protected by a password. The password is a sequence of `n` digits where each digit can be in the range `[0, k - 1]`.

The safe has a peculiar knob: it accepts an unlimited-length input, and at any point in the input, the last `n` digits form the current combination being tested. It unlocks as soon as the last `n` digits match the password.

Given two integers `n` and `k`, return the **shortest input** string that is guaranteed to unlock the safe regardless of the password. Each combination must appear at least once as a contiguous substring of the returned string.

## Examples

### Example 1
```
Input:  n = 1, k = 2
Output: "01"
```
Combinations are "0" and "1" — both appear in "01".

### Example 2
```
Input:  n = 2, k = 2
Output: "01100"
```
Combinations are "00", "01", "10", "11". The string "01100" contains all four as substrings.

## Constraints
- `1 <= n <= 4`
- `1 <= k <= 10`
- `1 <= k^n <= 4096`

## Hints

<details>
<summary>Hint 1 — this is a De Bruijn sequence</summary>

The shortest string containing every length-n combination over an alphabet of size k is called a **De Bruijn sequence**. Its length is exactly `k^n + n - 1`. Your goal is to construct one.
</details>

<details>
<summary>Hint 2 — model as an Eulerian circuit</summary>

Build a directed graph where each node is an (n-1)-digit string. For each digit `d`, add an edge from node `s` to `s[1:] + d` labeled `d`. An Eulerian circuit in this graph traces out a De Bruijn sequence. Use Hierholzer's algorithm or DFS.
</details>

<details>
<summary>Hint 3 — simple DFS approach</summary>

Maintain a visited Set of all n-digit combinations seen so far. Start with `"0" * n`. At each step, greedily try digits `k-1, k-2, ..., 0`. Append a digit if the resulting last-n-chars combination has not been visited. Continue until all `k^n` combinations are covered.
</details>

## Write your solution
→ [`../solutions/41-cracking-the-safe.js`](../solutions/41-cracking-the-safe.js)

## Follow-ups
- Prove that a De Bruijn sequence always exists for any `n` and `k`.
- **Reconstruct Itinerary** — another Eulerian path problem on a directed graph.
- How would you extend this if the safe tests the last `n` **distinct** digits instead of the last `n` digits?
