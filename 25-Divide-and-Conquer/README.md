# 25 — Divide and Conquer

> Split the problem into smaller pieces, solve each piece recursively, then glue the answers back together. This single idea powers merge sort, quicksort, binary search, Karatsuba multiplication, the FFT, and a dozen other algorithms you'll see in interviews and production systems.

## Learn Path

1. **Read [`notes.md`](./notes.md) first** — the pattern, recursion trees, merge sort, quicksort, binary search, Master Theorem intuition, Karatsuba, closest pair, D&C vs DP.
2. Solve questions in order. Each lives in `questions/<NN>-<slug>.md`.
3. Write your solution in the matching `solutions/<NN>-<slug>.js`.
4. Tick off the checklist below as you finish.

## Progress

### Concept Check & Theory
- [ ] [01 — Recurrence: T(n) = 2T(n/2) + n (Merge Sort)](./questions/01-recurrence-merge-sort.md)
- [ ] [02 — Recurrence: T(n) = 2T(n/2) + 1 (Binary Search recursive)](./questions/02-recurrence-binary-search-recursive.md)
- [ ] [03 — Recurrence: T(n) = 4T(n/2) + n (Matrix multiply variant)](./questions/03-recurrence-matrix-multiply.md)
- [ ] [04 — Recurrence: T(n) = 7T(n/2) + n² (Strassen)](./questions/04-recurrence-strassen.md)
- [ ] [05 — Recurrence: T(n) = T(n/2) + 1 (Binary Search)](./questions/05-recurrence-binary-search.md)
- [ ] [06 — Recurrence: T(n) = T(n-1) + n (Selection Sort)](./questions/06-recurrence-selection-sort.md)
- [ ] [07 — Recurrence: T(n) = 2T(n-1) + 1 (Tower of Hanoi)](./questions/07-recurrence-tower-of-hanoi.md)

### Easy / Medium
- [ ] [08 — Binary Search (recursive)](./questions/08-binary-search.md)
- [ ] [09 — Merge Sort](./questions/09-merge-sort.md)
- [ ] [10 — Quick Sort (both partition schemes)](./questions/10-quick-sort.md)
- [ ] [11 — Quickselect — Kth Smallest](./questions/11-quickselect.md)
- [ ] [12 — Maximum Subarray (D&C version)](./questions/12-maximum-subarray-dnc.md)
- [ ] [13 — Pow(x, n) — fast exponentiation](./questions/13-pow-x-n.md)
- [ ] [14 — Sqrt(x) — binary search](./questions/14-sqrt-x.md)
- [ ] [15 — Search a 2D Matrix II](./questions/15-search-2d-matrix.md)
- [ ] [16 — Majority Element (D&C)](./questions/16-majority-element.md)
- [ ] [17 — The Skyline Problem](./questions/17-skyline-problem.md)
- [ ] [18 — Different Ways to Add Parentheses](./questions/18-different-ways-parentheses.md)
- [ ] [19 — Beautiful Array](./questions/19-beautiful-array.md)
- [ ] [20 — Count of Range Sum](./questions/20-count-range-sum.md)

### Hard
- [ ] [21 — Count of Smaller Numbers After Self](./questions/21-count-smaller-after-self.md)
- [ ] [22 — Reverse Pairs](./questions/22-reverse-pairs.md)
- [ ] [23 — Median of Two Sorted Arrays](./questions/23-median-two-sorted-arrays.md)
- [ ] [24 — Closest Pair of Points](./questions/24-closest-pair-of-points.md)
- [ ] [25 — Karatsuba Multiplication](./questions/25-karatsuba.md)
- [ ] [26 — Strassen's Matrix Multiplication](./questions/26-strassen.md)
- [ ] [27 — Fast Fourier Transform](./questions/27-fft.md)
- [ ] [28 — Burst Balloons](./questions/28-burst-balloons.md)
- [ ] [29 — Kth Smallest in Sorted Matrix](./questions/29-kth-smallest-sorted-matrix.md)

### Combine-Step Drills
- [ ] [30 — What if the combine step were O(n²)?](./questions/30-combine-step-quadratic.md)
- [ ] [31 — Why is the strip check in closest-pair O(n)?](./questions/31-closest-pair-strip.md)

## Related Topics

- [02 — Arrays](../02-Arrays/) — the data structure we sort and search.
- [05 — Searching](../05-Searching/) — binary search applied.
- [06 — Sorting](../06-Sorting/) — merge sort and quicksort in a broader sorting context.
- [14 — Dynamic Programming](../14-Dynamic-Programming/) — overlapping subproblems vs independent subproblems.
- [01 — Big-O Complexity](../01-Big-O-Complexity/) — Master Theorem, recursion trees.
