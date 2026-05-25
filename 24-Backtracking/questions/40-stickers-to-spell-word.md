# Q40 — Stickers to Spell Word

**Difficulty:** Hard
**Pattern:** Backtracking + memoization on remaining character state
**Expected:** O(2^T · S · T) time · O(2^T) space — where T = target length, S = stickers count

## Problem

We are given `n` different stickers. Each sticker has a lowercase English word on it. You would like to spell out the given string `target` by cutting individual letters from your collection of stickers and rearranging them. You may use each sticker more than once if you want, and you have infinite copies of each sticker.

Return the minimum number of stickers that you need to spell out `target`, or `-1` if the task is impossible.

## Examples

### Example 1
```
Input:  stickers = ["with","example","science"], target = "thehat"
Output: 3
```
Use `"with"` (provides `t`, `h`), `"example"` (provides `e`, `a`), `"science"` (provides `e`, `c` ... wait; provides `e`). One possible combination: `"with" + "example" + "with"` gives `w,i,t,h,e,x,a,m,p,l,e,w,i,t,h` — covers `t,h,e,h,a,t`.

### Example 2
```
Input:  stickers = ["notice","possible"], target = "basicbasic"
Output: -1
```

## Constraints
- `n == stickers.length`
- `1 <= n <= 50`
- `1 <= stickers[i].length <= 10`
- `1 <= target.length <= 15`
- `stickers[i]` and `target` consist of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — represent remaining letters as a bitmask or sorted string</summary>

The state is which target letters still need to be covered. With `target.length <= 15`, encode the state as a bitmask of length up to 15 (each bit = one target letter position). Try applying each sticker to the current state and recurse with the new state.
</details>

<details>
<summary>Hint 2 — memoize on the remaining-letter state</summary>

Many different recursion paths lead to the same remaining set of letters. Cache the minimum stickers needed for each state. The number of states is at most `2^15 = 32768`.
</details>

<details>
<summary>Hint 3 — pruning: only use stickers that cover the first uncovered letter</summary>

To avoid counting the same combination in different orders, always fix the first uncovered position (say bit 0 of the state) and only try stickers that contain the corresponding target character. This reduces branching significantly.
</details>

## Write your solution
→ [`../solutions/40-stickers-to-spell-word.js`](../solutions/40-stickers-to-spell-word.js)

## Follow-ups
- **Word Break** — a simpler version where you check whether a target can be formed from a word list.
- Convert the bitmask DP here to a full bottom-up DP table.
- How does the "fix first uncovered letter" optimization reduce the number of states explored?
