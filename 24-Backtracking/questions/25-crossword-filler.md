# Q25 — Crossword Puzzle Filler

**Difficulty:** Hard
**Pattern:** Backtracking — assign words to slots, prune on letter conflicts
**Expected:** O(W! · L) time in the worst case · O(slots · L) space — where W = words, L = word length

## Problem

Given a `10 x 10` character grid representing a crossword puzzle and a list of words to place, determine whether all the words can be placed in the puzzle. The grid uses `'-'` for open cells and `'+' `for blocked cells. Words must fill the horizontal and vertical runs of open cells exactly.

Return `true` if the words can all be placed (one word per slot), or `false` if it is impossible. A word can only be used once.

## Examples

### Example 1
```
Input:
  grid = ["++++++++++",
          "+---------",
          "+---------",
          "+---------",
          "++++++++++",
          "+---------",
          "+---------",
          "+---------",
          "+---------",
          "++++++++++"],
  words = ["LONDON","NORWAY","OSLO","DELHI","PARIS"]
Output: true
```

### Example 2
```
Input:
  grid = ["+-+", "+-+", "+++"],
  words = ["AB","AB"]
Output: true
```

## Constraints
- The grid is `10 x 10`.
- `1 <= words.length <= 10`
- Words contain only uppercase letters.
- Each word is distinct.

## Hints

<details>
<summary>Hint 1 — extract slots first</summary>

Parse the grid to find all horizontal and vertical runs of `'-'` cells (slots). For each slot, record its starting position, direction, and length. This separates parsing from backtracking.
</details>

<details>
<summary>Hint 2 — assign one word per slot</summary>

Try assigning each unused word to the current unfilled slot. Before recursing, verify the word is compatible: every cell in the slot is either `'-'` or already matches the corresponding letter of the word.
</details>

<details>
<summary>Hint 3 — write and undo letter assignments</summary>

When assigning a word to a slot, overwrite the grid cells. After backtracking, restore them to `'-'`. Intersecting slots will share cells — the compatibility check handles these intersections as pruning.
</details>

## Write your solution
→ [`../solutions/25-crossword-filler.js`](../solutions/25-crossword-filler.js)

## Follow-ups
- How does the order in which you fill slots affect performance?
- Can constraint propagation (arc consistency) reduce the search space before backtracking?
- **Sudoku Solver** — a simpler version of constraint-satisfaction backtracking.
