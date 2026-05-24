# Sorting

> You'll rarely write sort algorithms in production, but they are the foundation for understanding *every* algorithmic trade-off: time/space, stable/unstable, in-place/out-of-place.

## Concept Check

1. Stable vs unstable sort — give an example where stability matters.
2. In-place vs out-of-place — what's the extra space cost?
3. Comparison sort vs non-comparison sort — give one of each.
4. What's the theoretical lower bound for comparison-based sorting? Why?
5. Why is `Array.prototype.sort()` default lexicographic? Show the gotcha:
   ```js
   [10, 2, 1].sort(); // ?
   ```
6. What algorithm does V8 use for `sort` today? (Hint: TimSort).

## Implement These From Scratch

7. **Bubble Sort** — with the early-exit optimization.
8. **Selection Sort**.
9. **Insertion Sort** — and explain why it's fast on nearly-sorted data.
10. **Merge Sort** — recursive, then iterative bottom-up.
11. **Quick Sort** — Lomuto and Hoare partition schemes.
12. **Heap Sort** — build a max-heap then sort.
13. **Counting Sort** — for non-negative integers in a known range.
14. **Radix Sort** — LSD variant.
15. **Bucket Sort** — for floats in [0, 1).

For each, list:
- Best / Average / Worst time
- Space
- Stable? In-place?

## Easy Apply

16. Sort an array of 0s, 1s, 2s (Dutch National Flag).
17. Sort an array by absolute value.
18. Sort strings by length, then lexicographically as tiebreaker.
19. Given `arr` and a custom comparator, sort objects by multiple keys.
20. Find the K largest elements in an array.

## Medium

21. **Merge Intervals** — sort by start, then merge overlapping.
22. **Meeting Rooms II** — minimum number of meeting rooms.
23. **Sort Characters by Frequency**.
24. **Largest Number** — arrange numbers to form the largest concatenation.
25. **Kth Largest Element** — quickselect, O(n) average.
26. **Wiggle Sort** — `nums[0] < nums[1] > nums[2] < nums[3]...`
27. **Pancake Sort** — only operation allowed is `flip(k)`.

## Hard

28. **Count Inversions** in an array — using merge sort, O(n log n).
29. **Reverse Pairs** — count pairs where `i < j` and `nums[i] > 2 * nums[j]`.
30. **Maximum Gap** — between successive elements when sorted, O(n) (bucket sort).

## Pitfall Drill

31. Why does `[1, 5, 10, 2].sort()` return `[1, 10, 2, 5]`? How do you fix it?
32. What happens when your comparator returns inconsistent values (e.g., random)? Why is that dangerous?
33. Sorting `NaN`, `undefined`, and `null` — what does JS do?
