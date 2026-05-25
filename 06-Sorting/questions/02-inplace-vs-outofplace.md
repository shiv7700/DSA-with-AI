# Q2 — In-place vs. Out-of-place

**Difficulty:** Easy (Concept Check)
**Pattern:** Sorting fundamentals
**Expected:** Understanding, no code required

## Problem

A sorting algorithm is called **in-place** if it sorts the array using only O(1) extra memory — a small fixed number of variables (loop counters, swap temporaries) but no additional arrays whose size grows with the input.

An **out-of-place** algorithm creates extra data structures proportional to the input, such as a temporary array of size n used during merging.

**Your tasks:**

1. For each algorithm below, state whether it is in-place or out-of-place and give the extra space used:

   - Bubble Sort
   - Selection Sort
   - Insertion Sort
   - Merge Sort
   - Quick Sort
   - Heap Sort
   - Counting Sort
   - Radix Sort

2. Why is Merge Sort's O(n) extra space unavoidable in the standard implementation?

3. Quick Sort is listed as "in-place" even though it uses O(log n) extra space for the recursion call stack. Why is the recursion stack not counted as "extra data structure" space in the usual analysis?

4. Give one real-world scenario where in-place sorting is critical (beyond just "saving memory").

## Examples

### Example 1 — illustrating extra space

```
Bubble Sort sorting [5, 3, 1, 4, 2]:

Only variables used (besides the input array itself):
  let i, j;        ← loop counters (O(1))
  let temp;        ← swap temporary (O(1))

No additional array. → In-place, O(1) extra space.
```

### Example 2

```
Merge Sort sorting [5, 3, 1, 4, 2]:

To merge [3, 5] and [1, 4]:
  temp = [3, 5, ?, ?]   ← needs a temporary array the same size as input

Size of temp array = O(n). → Out-of-place, O(n) extra space.
```

## Constraints

Conceptual question. No code required.

## Hints

<details>
<summary>Hint 1 — why Merge Sort needs the extra array</summary>

When merging two sorted halves back together, you need somewhere to put the merged result while you're still reading from both halves. You can't merge "into" the same array without overwriting values you haven't read yet. This is why a temporary array is fundamentally required.

(There exist in-place merge algorithms, but they are much more complex and have worse constant factors.)
</details>

<details>
<summary>Hint 2 — recursion stack space</summary>

The call stack stores return addresses and local variables for each active function call. In quick sort, the maximum recursion depth is O(log n) on average (O(n) worst case). This space is real but is usually distinguished from "input-related" extra space. By convention, in-place refers to additional data structures, not the call stack.
</details>

<details>
<summary>Hint 3 — a real-world scenario</summary>

Embedded systems (microcontrollers) have very limited RAM. Sorting sensor readings in-place might mean the difference between a program that fits in memory and one that doesn't.

Database systems that sort rows on disk (external sorting) also have strict memory limits — they use merge sort variants that process data in fixed-size pages.
</details>

## Write your solution
→ [`../solutions/02-inplace-vs-outofplace.js`](../solutions/02-inplace-vs-outofplace.js)

## Follow-ups
- Look up "in-place merge sort" — what is the time complexity trade-off for eliminating the O(n) space?
- Why does JavaScript's `Array.sort()` not need to worry about in-place vs. out-of-place from the programmer's perspective?
