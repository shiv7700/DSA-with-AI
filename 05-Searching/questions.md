# Searching

> Linear search is trivial. Binary search is deceptively tricky — be ready for edge cases.

## Concept Check

1. When is linear search the right choice over binary search?
2. Prerequisites for binary search? (sorted, random-access)
3. Why does `mid = Math.floor((left + right) / 2)` work in JS but can overflow in other languages?
4. Difference between iterative and recursive binary search — space complexity?
5. What is "binary search on the answer space"? Give one example.
6. Difference between `lowerBound` and `upperBound`.

## Easy

1. Implement linear search.
2. Implement iterative binary search.
3. Implement recursive binary search.
4. Find the first and last occurrence of a target in a sorted array.
5. Count occurrences of a target in a sorted array.
6. Find the floor and ceiling of `x` in a sorted array.
7. Find the index of the smallest element ≥ `x` (lower bound).
8. Find the square root of `n` (integer) using binary search.

## Medium

9. **Search in Rotated Sorted Array** — O(log n).
10. **Find Minimum in Rotated Sorted Array**.
11. **Search a 2D Matrix** — sorted row-wise and column-wise.
12. **Find Peak Element** — O(log n).
13. **First Bad Version** — classic binary search on answer.
14. **Find Kth Smallest Element in a Sorted Matrix**.
15. **Capacity to Ship Packages Within D Days** (binary search on answer).
16. **Koko Eating Bananas** — minimum eating speed.
17. **Find the Duplicate Number** — Floyd's / binary search variants.
18. **Median of a Row-wise Sorted Matrix**.

## Hard

19. **Median of Two Sorted Arrays** — O(log(min(m, n))).
20. **Aggressive Cows** / **Allocate Books** — binary search on answer.
21. **Painter's Partition Problem**.
22. **Split Array Largest Sum**.

## Pitfall Drill

23. Why does `while (left <= right)` vs `while (left < right)` matter? Write both versions of binary search.
24. What's wrong with `mid = (left + right) / 2`? (Hint: in JS, nothing — but explain why integer overflow matters in C++/Java.)
25. Off-by-one trap: in lower-bound, do you do `right = mid` or `right = mid - 1`?
