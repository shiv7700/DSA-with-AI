# 26 — Dynamic Programming

> Dynamic Programming is the art of breaking a hard problem into smaller subproblems, solving each one once, writing the answer down, and never solving the same thing twice. It is the single most-asked topic in technical interviews. Take it slow.

## Learn Path

1. **Read [`notes.md`](./notes.md) first** — what DP is, the two prerequisites, recursion → memoization → tabulation, how to spot DP problems, how to write recurrences, every classic pattern with a worked example, and a cheatsheet at the end. This is long. Read a few lessons a day.
2. Solve questions in order. Each lives in `questions/<NN>-<slug>.md`.
3. Write your solution in the matching `solutions/<NN>-<slug>.js`.
4. Tick off the checklist below as you finish.

## Progress

### Pattern 1 — 1D Linear DP (Easy / Medium)
- [ ] [01 — Fibonacci (Memoized + Tabulated + O(1) Space)](./questions/01-fibonacci.md)
- [ ] [02 — Climbing Stairs](./questions/02-climbing-stairs.md)
- [ ] [03 — Min Cost Climbing Stairs](./questions/03-min-cost-climbing-stairs.md)
- [ ] [04 — House Robber](./questions/04-house-robber.md)
- [ ] [05 — House Robber II (Circular)](./questions/05-house-robber-ii.md)
- [ ] [06 — Delete and Earn](./questions/06-delete-and-earn.md)
- [ ] [07 — Decode Ways](./questions/07-decode-ways.md)
- [ ] [08 — Decode Ways II (with Wildcard)](./questions/08-decode-ways-ii.md)
- [ ] [09 — Maximum Subarray (Kadane's)](./questions/09-maximum-subarray.md)
- [ ] [10 — Maximum Product Subarray](./questions/10-maximum-product-subarray.md)
- [ ] [11 — Longest Increasing Subsequence](./questions/11-longest-increasing-subsequence.md)
- [ ] [12 — Number of Longest Increasing Subsequences](./questions/12-number-of-lis.md)
- [ ] [13 — Wiggle Subsequence](./questions/13-wiggle-subsequence.md)
- [ ] [14 — Word Break](./questions/14-word-break.md)
- [ ] [15 — Word Break II](./questions/15-word-break-ii.md)
- [ ] [16 — Perfect Squares](./questions/16-perfect-squares.md)
- [ ] [17 — Integer Break](./questions/17-integer-break.md)

### Pattern 1 — 1D Linear DP (Stock Problems)
- [ ] [18 — Best Time to Buy and Sell Stock I](./questions/18-stock-i.md)
- [ ] [19 — Best Time to Buy and Sell Stock II](./questions/19-stock-ii.md)
- [ ] [20 — Best Time to Buy and Sell Stock III](./questions/20-stock-iii.md)
- [ ] [21 — Best Time to Buy and Sell Stock IV](./questions/21-stock-iv.md)
- [ ] [22 — Best Time to Buy and Sell Stock with Cooldown](./questions/22-stock-cooldown.md)
- [ ] [23 — Best Time to Buy and Sell Stock with Fee](./questions/23-stock-fee.md)

### Pattern 2 — Coin / Combination DP
- [ ] [24 — Coin Change (Min Coins)](./questions/24-coin-change.md)
- [ ] [25 — Coin Change II (Number of Ways)](./questions/25-coin-change-ii.md)
- [ ] [26 — Combination Sum IV](./questions/26-combination-sum-iv.md)

### Pattern 3 — 2D Grid DP
- [ ] [27 — Unique Paths](./questions/27-unique-paths.md)
- [ ] [28 — Unique Paths II (With Obstacles)](./questions/28-unique-paths-ii.md)
- [ ] [29 — Minimum Path Sum](./questions/29-minimum-path-sum.md)
- [ ] [30 — Triangle (Min Path Top to Bottom)](./questions/30-triangle.md)
- [ ] [31 — Maximal Square](./questions/31-maximal-square.md)
- [ ] [32 — Maximal Rectangle](./questions/32-maximal-rectangle.md)
- [ ] [33 — Dungeon Game](./questions/33-dungeon-game.md)
- [ ] [34 — Cherry Pickup II](./questions/34-cherry-pickup-ii.md)

### Pattern 4 — Subsequence / Substring DP
- [ ] [35 — Longest Common Subsequence](./questions/35-longest-common-subsequence.md)
- [ ] [36 — Longest Common Substring](./questions/36-longest-common-substring.md)
- [ ] [37 — Shortest Common Supersequence](./questions/37-shortest-common-supersequence.md)
- [ ] [38 — Edit Distance](./questions/38-edit-distance.md)
- [ ] [39 — Distinct Subsequences](./questions/39-distinct-subsequences.md)
- [ ] [40 — Interleaving String](./questions/40-interleaving-string.md)
- [ ] [41 — Longest Palindromic Subsequence](./questions/41-longest-palindromic-subsequence.md)
- [ ] [42 — Longest Palindromic Substring](./questions/42-longest-palindromic-substring.md)
- [ ] [43 — Palindromic Substrings (Count All)](./questions/43-palindromic-substrings.md)
- [ ] [44 — Palindrome Partitioning II (Min Cuts)](./questions/44-palindrome-partitioning-ii.md)
- [ ] [45 — Regular Expression Matching](./questions/45-regular-expression-matching.md)
- [ ] [46 — Wildcard Matching](./questions/46-wildcard-matching.md)

### Pattern 5 — Knapsack Family
- [ ] [47 — 0/1 Knapsack](./questions/47-01-knapsack.md)
- [ ] [48 — Unbounded Knapsack](./questions/48-unbounded-knapsack.md)
- [ ] [49 — Subset Sum](./questions/49-subset-sum.md)
- [ ] [50 — Partition Equal Subset Sum](./questions/50-partition-equal-subset-sum.md)
- [ ] [51 — Target Sum](./questions/51-target-sum.md)
- [ ] [52 — Last Stone Weight II](./questions/52-last-stone-weight-ii.md)
- [ ] [53 — Ones and Zeroes (2D Knapsack)](./questions/53-ones-and-zeroes.md)

### Pattern 6 — Interval DP
- [ ] [54 — Burst Balloons](./questions/54-burst-balloons.md)
- [ ] [55 — Matrix Chain Multiplication](./questions/55-matrix-chain-multiplication.md)
- [ ] [56 — Min Cost to Cut a Stick](./questions/56-min-cost-to-cut-a-stick.md)
- [ ] [57 — Strange Printer](./questions/57-strange-printer.md)
- [ ] [58 — Remove Boxes](./questions/58-remove-boxes.md)
- [ ] [59 — Stone Game](./questions/59-stone-game.md)

### Pattern 7 — Bitmask DP
- [ ] [60 — Travelling Salesman Problem](./questions/60-travelling-salesman.md)
- [ ] [61 — Partition to K Equal Sum Subsets](./questions/61-partition-k-equal-subsets.md)
- [ ] [62 — Smallest Sufficient Team](./questions/62-smallest-sufficient-team.md)
- [ ] [63 — Maximum Students Taking Exam](./questions/63-maximum-students-taking-exam.md)

### Pattern 8 — Tree DP
- [ ] [64 — House Robber III (Binary Tree)](./questions/64-house-robber-iii.md)
- [ ] [65 — Diameter of Binary Tree](./questions/65-diameter-of-binary-tree.md)
- [ ] [66 — Maximum Path Sum in Binary Tree](./questions/66-maximum-path-sum-binary-tree.md)
- [ ] [67 — Binary Tree Cameras](./questions/67-binary-tree-cameras.md)

### Pattern 9 — Digit DP
- [ ] [68 — Count Numbers with Unique Digits](./questions/68-count-numbers-unique-digits.md)
- [ ] [69 — Numbers At Most N Given Digit Set](./questions/69-numbers-at-most-n-digit-set.md)
- [ ] [70 — Numbers with Repeated Digits](./questions/70-numbers-with-repeated-digits.md)

### Pattern 10 — Game / MinMax DP
- [ ] [71 — Predict the Winner](./questions/71-predict-the-winner.md)
- [ ] [72 — Can I Win](./questions/72-can-i-win.md)

### Hard / Advanced
- [ ] [73 — Russian Doll Envelopes](./questions/73-russian-doll-envelopes.md)
- [ ] [74 — Frog Jump](./questions/74-frog-jump.md)
- [ ] [75 — Race Car](./questions/75-race-car.md)
- [ ] [76 — K Inverse Pairs Array](./questions/76-k-inverse-pairs-array.md)
- [ ] [77 — Number of Music Playlists](./questions/77-number-of-music-playlists.md)

### Space Optimization Drill
- [ ] [78 — Space Optimize LCS to O(min(m,n))](./questions/78-space-optimize-lcs.md)
- [ ] [79 — Space Optimize 0/1 Knapsack to O(W)](./questions/79-space-optimize-knapsack.md)
- [ ] [80 — Space Optimize House Robber to O(1)](./questions/80-space-optimize-house-robber.md)

## Related Topics

- [02 — Arrays](../02-Arrays/) — arrays are the most common DP structure.
- [14 — Recursion & Backtracking](../14-Recursion-Backtracking/) — understand recursion deeply before DP.
- [19 — Two Pointers](../19-Two-Pointers/) — some DP problems reduce to two-pointer once you see the pattern.
- [10 — Hash Tables](../10-Hash-Tables/) — memoization uses hash maps.
- [08 — Trees](../08-Trees/) — tree DP builds on standard tree traversal.
