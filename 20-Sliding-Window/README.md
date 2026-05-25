# 20 — Sliding Window

> The sliding window pattern turns what would be an O(n²) nested-loop scan into a single O(n) pass. Master it and a huge class of "contiguous subarray / substring" problems becomes almost automatic.

## Learn Path

1. **Read [`notes.md`](./notes.md) first** — what a window is, fixed vs variable size, state inside the window, the "exactly K" trick, when negatives break things, monotonic deque preview.
2. Solve questions in order. Each lives in `questions/<NN>-<slug>.md`.
3. Write your solution in the matching `solutions/<NN>-<slug>.js`.
4. Tick off the checklist below as you finish.

## Progress

### Easy — Fixed-Size Window
- [ ] [01 — Max Sum Subarray of Size K](./questions/01-max-sum-subarray-k.md)
- [ ] [02 — Min Sum Subarray of Size K](./questions/02-min-sum-subarray-k.md)
- [ ] [03 — Average of All Subarrays of Size K](./questions/03-average-subarrays-k.md)
- [ ] [04 — First Negative in Every Window of Size K](./questions/04-first-negative-window.md)
- [ ] [05 — Maximum of All Subarrays of Size K](./questions/05-max-all-subarrays-k.md)
- [ ] [06 — Minimum of All Subarrays of Size K](./questions/06-min-all-subarrays-k.md)
- [ ] [07 — Count Occurrences of Anagrams](./questions/07-count-anagrams.md)
- [ ] [08 — Find All Anagrams in a String](./questions/08-find-all-anagrams.md)
- [ ] [09 — Permutation in String](./questions/09-permutation-in-string.md)
- [ ] [10 — Substrings of Size K with K Distinct Characters](./questions/10-substrings-k-distinct.md)
- [ ] [11 — Maximum Number of Vowels in a Substring of Given Length](./questions/11-max-vowels-substring.md)
- [ ] [12 — Diet Plan Performance](./questions/12-diet-plan-performance.md)

### Medium — Variable-Size Window
- [ ] [13 — Longest Substring Without Repeating Characters](./questions/13-longest-substring-no-repeat.md)
- [ ] [14 — Longest Substring with At Most K Distinct Characters](./questions/14-longest-at-most-k-distinct.md)
- [ ] [15 — Longest Substring with At Most Two Distinct Characters](./questions/15-longest-two-distinct.md)
- [ ] [16 — Longest Repeating Character Replacement](./questions/16-longest-repeating-replacement.md)
- [ ] [17 — Max Consecutive Ones III](./questions/17-max-consecutive-ones-iii.md)
- [ ] [18 — Minimum Size Subarray Sum](./questions/18-min-size-subarray-sum.md)
- [ ] [19 — Fruit Into Baskets](./questions/19-fruit-into-baskets.md)
- [ ] [20 — Subarray Product Less Than K](./questions/20-subarray-product-less-than-k.md)
- [ ] [21 — Number of Substrings Containing All Three Characters](./questions/21-substrings-all-three-chars.md)
- [ ] [22 — Get Equal Substrings Within Budget](./questions/22-equal-substrings-budget.md)
- [ ] [23 — Longest Subarray of 1's After Deleting One Element](./questions/23-longest-ones-after-delete.md)
- [ ] [24 — Number of Nice Subarrays](./questions/24-number-of-nice-subarrays.md)
- [ ] [25 — Binary Subarrays With Sum](./questions/25-binary-subarrays-with-sum.md)
- [ ] [26 — Subarrays with K Different Integers](./questions/26-subarrays-k-different.md)
- [ ] [27 — Count Number of Nice Subarrays (Variant)](./questions/27-nice-subarrays-variant.md)
- [ ] [28 — Replace the Substring for Balanced String](./questions/28-replace-substring-balanced.md)

### Hard
- [ ] [29 — Minimum Window Substring](./questions/29-minimum-window-substring.md)
- [ ] [30 — Substring with Concatenation of All Words](./questions/30-substring-concatenation-words.md)
- [ ] [31 — Sliding Window Maximum](./questions/31-sliding-window-maximum.md)
- [ ] [32 — Sliding Window Median](./questions/32-sliding-window-median.md)
- [ ] [33 — Longest Substring with At Least K Repeating Characters](./questions/33-longest-at-least-k-repeating.md)
- [ ] [34 — Smallest Range Covering Elements from K Lists](./questions/34-smallest-range-k-lists.md)

### Drill Questions
- [ ] [35 — Monotonic Deque: Window Maximum (Implement from Scratch)](./questions/35-monotonic-deque-max.md)
- [ ] [36 — Monotonic Deque: Window Minimum (Implement from Scratch)](./questions/36-monotonic-deque-min.md)
- [ ] [37 — Off-by-One Shrink Pitfall](./questions/37-off-by-one-shrink.md)
- [ ] [38 — Empty Window Edge Case](./questions/38-empty-window-edge.md)
- [ ] [39 — Exactly K via atMost(K) − atMost(K−1)](./questions/39-exactly-k-atmost-trick.md)

## Related Topics

- [02 — Arrays](../02-Arrays/) — foundation: indexing, loops, complexity.
- [19 — Two Pointers](../19-Two-Pointers/) — the left/right pointer technique this pattern builds on.
- [10 — Hash Tables](../10-Hash-Tables/) — frequency maps used inside variable windows.
- [03 — Strings](../03-Strings/) — most string window problems are sliding window problems.
