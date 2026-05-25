# 24 — Backtracking

> Recursion + state mutation + undo. At every fork in the decision tree, you **try a choice, recurse deeper, then undo the choice** so you can try the next one. Mastering the choose/explore/unchoose template and the pruning instinct will take you through subsets, permutations, N-Queens, grid search, and far beyond.

## Learn Path

1. **Read [`notes.md`](./notes.md) first** — the core idea, the canonical template, step-by-step walkthroughs of Subsets / Permutations / N-Queens, cloning rules, pruning techniques, memoization, and common mistakes.
2. Solve questions in order. Each lives in `questions/<NN>-<slug>.md`.
3. Write your solution in the matching `solutions/<NN>-<slug>.js`.
4. Tick off the checklist below as you finish.

## Progress

### Easy / Medium — Subsets, Permutations, Combinations
- [ ] [01 — Subsets](./questions/01-subsets.md)
- [ ] [02 — Subsets II (with duplicates)](./questions/02-subsets-ii.md)
- [ ] [03 — Permutations](./questions/03-permutations.md)
- [ ] [04 — Permutations II (with duplicates)](./questions/04-permutations-ii.md)
- [ ] [05 — Combinations](./questions/05-combinations.md)
- [ ] [06 — Combination Sum](./questions/06-combination-sum.md)
- [ ] [07 — Combination Sum II](./questions/07-combination-sum-ii.md)
- [ ] [08 — Combination Sum III](./questions/08-combination-sum-iii.md)
- [ ] [09 — Combination Sum IV (DP boundary)](./questions/09-combination-sum-iv.md)
- [ ] [10 — Letter Combinations of a Phone Number](./questions/10-letter-combinations.md)
- [ ] [11 — Letter Case Permutation](./questions/11-letter-case-permutation.md)
- [ ] [12 — Generate Parentheses](./questions/12-generate-parentheses.md)
- [ ] [13 — Restore IP Addresses](./questions/13-restore-ip-addresses.md)

### Grid / Path Backtracking
- [ ] [14 — Word Search](./questions/14-word-search.md)
- [ ] [15 — Word Search II (Trie + BT)](./questions/15-word-search-ii.md)
- [ ] [16 — Rat in a Maze](./questions/16-rat-in-a-maze.md)
- [ ] [17 — Unique Paths III](./questions/17-unique-paths-iii.md)
- [ ] [18 — Robot Room Cleaner](./questions/18-robot-room-cleaner.md)

### Classic Constraint Problems
- [ ] [19 — N-Queens](./questions/19-n-queens.md)
- [ ] [20 — N-Queens II (count solutions)](./questions/20-n-queens-ii.md)
- [ ] [21 — Sudoku Solver](./questions/21-sudoku-solver.md)
- [ ] [22 — Valid Sudoku (checker)](./questions/22-valid-sudoku.md)
- [ ] [23 — Combination Locker](./questions/23-combination-locker.md)
- [ ] [24 — Knight's Tour](./questions/24-knights-tour.md)
- [ ] [25 — Crossword Filler](./questions/25-crossword-filler.md)

### Partition Problems
- [ ] [26 — Palindrome Partitioning](./questions/26-palindrome-partitioning.md)
- [ ] [27 — Palindrome Partitioning II (min cuts)](./questions/27-palindrome-partitioning-ii.md)
- [ ] [28 — Partition to K Equal Sum Subsets](./questions/28-partition-k-equal-sum.md)
- [ ] [29 — Matchsticks to Square](./questions/29-matchsticks-to-square.md)
- [ ] [30 — Splitting Into Descending Consecutive Values](./questions/30-splitting-descending-consecutive.md)

### Pruning Drill
- [ ] [31 — Word Break II](./questions/31-word-break-ii.md)
- [ ] [32 — Beautiful Arrangement](./questions/32-beautiful-arrangement.md)
- [ ] [33 — Closest Equal Subset Sum](./questions/33-closest-equal-subset-sum.md)
- [ ] [34 — Expression Add Operators](./questions/34-expression-add-operators.md)
- [ ] [35 — 24 Game](./questions/35-24-game.md)

### Hard
- [ ] [36 — Remove Invalid Parentheses](./questions/36-remove-invalid-parentheses.md)
- [ ] [37 — Regular Expression Matching](./questions/37-regex-matching.md)
- [ ] [38 — Wildcard Matching](./questions/38-wildcard-matching.md)
- [ ] [39 — Word Pattern II](./questions/39-word-pattern-ii.md)
- [ ] [40 — Stickers to Spell Word](./questions/40-stickers-to-spell-word.md)
- [ ] [41 — Cracking the Safe](./questions/41-cracking-the-safe.md)
- [ ] [42 — Optimal Account Balancing](./questions/42-optimal-account-balancing.md)

### Optimization Drill
- [ ] [43 — Word Break → Memoized DP](./questions/43-word-break-to-dp.md)
- [ ] [44 — Combination Sum IV → DP](./questions/44-combination-sum-iv-dp.md)
- [ ] [45 — When Does Sorting Prune the Tree?](./questions/45-sort-and-prune.md)

## Related Topics

- [12 — Recursion](../12-Recursion/) — recursion fundamentals; read this before backtracking if recursion is new to you.
- [23 — Dynamic Programming](../23-Dynamic-Programming/) — memoized backtracking becomes DP.
- [11 — Trees](../11-Trees/) — DFS on trees is a special case of backtracking.
- [10 — Hash Tables](../10-Hash-Tables/) — Sets and Maps power O(1) pruning checks.
