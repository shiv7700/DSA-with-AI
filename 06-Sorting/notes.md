# Sorting — Lessons from Zero

> 👋 Hey. Sorting is one of those topics that looks simple on the surface — "put things in order" — but it hides a surprising amount of depth. By the end of this file you'll understand not just *how* each algorithm works, but *why* we have so many of them and *when* to reach for each one.
>
> Total reading time at a relaxed pace: about 2 hours, with breaks. **You do not have to read it all in one sitting.**

---

## Table of Lessons

1. [Why sorting matters](#lesson-1)
2. [Stable vs. unstable sort](#lesson-2)
3. [In-place vs. out-of-place](#lesson-3)
4. [Comparison sorts vs. non-comparison sorts](#lesson-4)
5. [The O(n log n) lower bound — why you can't do better (usually)](#lesson-5)
6. [Bubble Sort — the one everyone learns first](#lesson-6)
7. [Selection Sort — finding the minimum, one pass at a time](#lesson-7)
8. [Insertion Sort — how you sort a hand of cards](#lesson-8)
9. [Merge Sort — divide, sort, combine](#lesson-9)
10. [Quick Sort — the partition trick](#lesson-10)
11. [Heap Sort — using a heap as a sorting tool](#lesson-11)
12. [Counting Sort — when your numbers have a small range](#lesson-12)
13. [Radix Sort — sorting digit by digit](#lesson-13)
14. [Bucket Sort — spread and sort in buckets](#lesson-14)
15. [Algorithm summary table](#lesson-15)
16. [JavaScript's `.sort()` — the lexicographic gotcha](#lesson-16)
17. [Custom comparator functions](#lesson-17)
18. [Multi-key sorting](#lesson-18)
19. [V8, TimSort, and what it means for you](#lesson-19)
20. [You did it — what to do next](#lesson-20)

---

<a id="lesson-1"></a>
## Lesson 1 — Why sorting matters

Imagine you have a phone book with a million names — but they're in random order. To find someone, you'd have to read every single entry until you found them. That could take a million steps.

Now imagine the same phone book, but sorted alphabetically. You can open to the middle, check if the name you want comes before or after that page, then jump to the appropriate half. Repeat a few times and you find any name in about 20 steps, even with a million entries. That's **binary search** — and it only works on sorted data.

This is the first big reason sorting matters: **sorting unlocks faster searching**.

But there are many more:
- **Duplicate detection** is easy when identical values are next to each other.
- **Scheduling problems** (who meets in the same room?) become easy once you sort events by start time.
- **Finding the k-th largest/smallest** element is instant in a sorted array.
- **Two-pointer and sliding window** techniques often require sorted input.

In coding interviews, a very large number of problems become tractable as soon as you sort first. Recognizing "I should sort this first" is one of the most valuable instincts you can build.

> 🎯 **Key takeaway**
> Sorting is not an end in itself. It is a tool that makes many other problems easier to solve. Learn to notice when sorting unlocks the door.

---

<a id="lesson-2"></a>
## Lesson 2 — Stable vs. unstable sort

Suppose you have a list of students with their names and ages:

```
[ { name: "Carlos",  age: 20 },
  { name: "Aisha",   age: 22 },
  { name: "Diana",   age: 20 },
  { name: "Ben",     age: 22 },
  { name: "Elena",   age: 19 } ]
```

You want to sort by **age** (ascending). There are two valid sorted results:

**Result A:**
```
Elena  (19)
Carlos (20)
Diana  (20)   ← Carlos and Diana are both 20
Aisha  (22)
Ben    (22)   ← Aisha and Ben are both 22
```

**Result B:**
```
Elena  (19)
Diana  (20)
Carlos (20)   ← Diana and Carlos swapped relative to original
Ben    (22)
Aisha  (22)   ← Ben and Aisha swapped relative to original
```

Both results are "sorted by age." But notice the difference: in **Result A**, Carlos (who came before Diana in the original list) still comes before Diana. Aisha still comes before Ben. The **relative order of equal elements is preserved**. This is called a **stable sort**.

In **Result B**, equal elements got shuffled around — that is an **unstable sort**.

### Why does stability matter?

Say you first sort the same student list by **name** (alphabetically), then sort again by **age**.

With a **stable** sort: within each age group, names stay in the alphabetical order from the first sort. You get a nicely organized list sorted primarily by age, and within the same age, alphabetically by name.

With an **unstable** sort: the alphabetical ordering from the first sort gets destroyed by the second sort. You get age order but random name order within ties.

This pattern — "sort by secondary key first, then primary key" — is a classic use of sort stability in real applications.

> 🎯 **Key takeaway**
> A **stable sort** preserves the original order of equal elements. An **unstable sort** may reorder them. Stability matters whenever you sort by multiple criteria or need predictable tie-breaking.

**Stable algorithms:** Merge Sort, Insertion Sort, Bubble Sort, Counting Sort, Radix Sort, TimSort.

**Unstable algorithms:** Quick Sort, Selection Sort, Heap Sort.

---

<a id="lesson-3"></a>
## Lesson 3 — In-place vs. out-of-place

Sorting often requires temporarily storing extra values. The question is: how much extra memory?

**In-place sorting** means the algorithm sorts the original array by rearranging elements within it, using only a constant (O(1)) amount of extra memory — maybe a few variables for loop counters or a temporary swap value, but no new arrays.

**Out-of-place sorting** (also called out-of-place or non-in-place) creates additional data structures proportional to the input size.

| Algorithm | Extra space |
|---|---|
| Bubble Sort | O(1) — a swap variable |
| Selection Sort | O(1) |
| Insertion Sort | O(1) |
| Quick Sort | O(log n) — the recursion call stack |
| Heap Sort | O(1) |
| Merge Sort | O(n) — needs a temporary array to merge |
| Counting Sort | O(k) — a count array of size k |
| Radix Sort | O(n + k) |
| Bucket Sort | O(n + k) |

### When does it matter?

In interviews, almost never — the inputs are small. In production, sorting a large dataset in memory can be the difference between fitting in RAM or not. Databases that sort gigabytes of data use on-disk sorting variants of merge sort precisely because memory is limited.

> 🎯 **Key takeaway**
> In-place means O(1) extra space. Out-of-place may need O(n) extra. Merge Sort's O(n) extra space is the price you pay for its guaranteed O(n log n) and stability.

---

<a id="lesson-4"></a>
## Lesson 4 — Comparison sorts vs. non-comparison sorts

### Comparison sorts

Most sorting algorithms work by **comparing** elements to each other. "Is A less than B? If so, A goes first." They make no assumptions about what the values actually are — they just ask "which comes first?" over and over.

Examples: Bubble, Selection, Insertion, Merge, Quick, Heap.

### Non-comparison sorts

Some algorithms use the **actual values** (typically integers) to figure out where an element goes directly — without comparing it to other elements. They are faster on specific kinds of input.

Examples: Counting Sort, Radix Sort, Bucket Sort.

The trade-off: non-comparison sorts are faster but require more assumptions about the data. Counting sort requires integers in a bounded range. Radix sort requires integers (or things representable as digit sequences). They can't sort arbitrary objects.

> 🎯 **Key takeaway**
> Comparison sorts work on anything. Non-comparison sorts are faster but only work on constrained data like integers in a range.

---

<a id="lesson-5"></a>
## Lesson 5 — The O(n log n) lower bound — why you can't do better (usually)

Here's a surprising fact: **no comparison-based sorting algorithm can be better than O(n log n)** in the worst case. Not just in practice — provably, mathematically impossible to do better using only comparisons.

Why? Here's the intuition (no formal proof needed):

Imagine you have `n` distinct elements. How many possible orderings are there? That's `n!` (n factorial). For `n = 10`, that's 3,628,800 possible orderings.

Each comparison you make eliminates roughly half of the remaining possibilities (it's like a yes/no question: "is A before B?"). To distinguish between `n!` outcomes with yes/no questions, you need at least `log₂(n!)` questions.

By a mathematical fact called **Stirling's approximation**, `log₂(n!)` grows as `n log n`. So any comparison sort must make at least `n log n` comparisons in the worst case.

```
n = 10:       n log n ≈  33 comparisons minimum
n = 1,000:    n log n ≈ 9,966 comparisons minimum
n = 1,000,000: n log n ≈ 19,931,569 comparisons minimum
```

Non-comparison sorts break this barrier by using extra information about the values. But the moment you're comparing general objects, O(n log n) is the wall.

> 💡 **Tip**
> When someone asks "can we sort faster?" the answer depends on what you know. For arbitrary data, O(n log n) is the limit. For integers in a known range, Counting Sort or Radix Sort can be O(n).

---

<a id="lesson-6"></a>
## Lesson 6 — Bubble Sort — the one everyone learns first

### The idea

Bubble sort makes repeated passes through the array. On each pass, it compares adjacent pairs and swaps them if they're in the wrong order. The largest unsorted element "bubbles" to the top (end) on each pass.

### ASCII trace

Let's sort `[5, 3, 1, 4, 2]`.

**Pass 1:**
```
[5, 3, 1, 4, 2]
 ↑  ↑           compare 5 and 3 → swap
[3, 5, 1, 4, 2]
    ↑  ↑        compare 5 and 1 → swap
[3, 1, 5, 4, 2]
       ↑  ↑     compare 5 and 4 → swap
[3, 1, 4, 5, 2]
          ↑  ↑  compare 5 and 2 → swap
[3, 1, 4, 2, 5]  ← 5 has bubbled to its correct position ✓
```

**Pass 2:**
```
[3, 1, 4, 2, 5]
 ↑  ↑           compare 3 and 1 → swap
[1, 3, 4, 2, 5]
    ↑  ↑        compare 3 and 4 → no swap
[1, 3, 4, 2, 5]
       ↑  ↑     compare 4 and 2 → swap
[1, 3, 2, 4, 5]  ← 4 has bubbled to its correct position ✓
```

**Pass 3:**
```
[1, 3, 2, 4, 5]
 ↑  ↑           compare 1 and 3 → no swap
[1, 3, 2, 4, 5]
    ↑  ↑        compare 3 and 2 → swap
[1, 2, 3, 4, 5]  ← 3 is now correct ✓
```

**Pass 4:**
```
[1, 2, 3, 4, 5]  ← all comparisons, no swaps → done early!
```

### The early-exit optimization

If you do an entire pass with **zero swaps**, the array is already sorted. You can stop immediately. This turns bubble sort's best-case complexity into O(n) — a single pass confirming everything is in order.

```
Already sorted input [1, 2, 3, 4, 5]:
 Pass 1: compare all 4 pairs, no swaps → EXIT early.
 Total: only n-1 comparisons. That's O(n).
```

### Complexity

| Case | Time | Space |
|------|------|-------|
| Best (already sorted) | O(n) | O(1) |
| Average | O(n²) | O(1) |
| Worst (reverse sorted) | O(n²) | O(1) |

**Stable?** Yes — we only swap when elements are strictly out of order, never when they're equal.  
**In-place?** Yes — only a swap variable needed.

### When is it useful?

Bubble sort is almost never used in practice. It's O(n²) on average and real implementations (like TimSort) are much better. **Its value is educational** — it is the simplest illustration of the idea "do passes and swap neighbors."

> 🎯 **Key takeaway**
> Bubble sort swaps adjacent pairs, bubbling the largest unsorted element to the end each pass. Add the early-exit optimization. It is O(n²) average, O(n) best. Stable, in-place.

---

<a id="lesson-7"></a>
## Lesson 7 — Selection Sort — finding the minimum, one pass at a time

### The idea

Selection sort divides the array into a "sorted left portion" and "unsorted right portion." On each pass it **finds the minimum** of the unsorted portion and swaps it to the front of the unsorted portion.

Think of organizing books on a shelf: you scan the whole shelf for the shortest book, put it at position 1. Then scan the remaining books for the shortest, put it at position 2. Repeat.

### ASCII trace

Sorting `[5, 3, 1, 4, 2]`:

```
Sorted | Unsorted
       | [5, 3, 1, 4, 2]   ← find min (1 at index 2), swap with index 0
[1]    | [3, 5, 4, 2]      ← find min (2 at index 3), swap with index 1
[1, 2] | [5, 4, 3]         ← find min (3 at index 3), swap with index 2
[1, 2, 3] | [4, 5]         ← find min (4 at index 3), swap with index 3
[1, 2, 3, 4] | [5]         ← only one element left, done
[1, 2, 3, 4, 5]
```

### Complexity

| Case | Time | Space |
|------|------|-------|
| Best | O(n²) | O(1) |
| Average | O(n²) | O(1) |
| Worst | O(n²) | O(1) |

Selection sort is always O(n²) regardless of input — there is no early-exit optimization because you still have to scan the entire unsorted portion to find the minimum.

**Stable?** No — swapping the minimum to the front can jump it past an equal element.  
**In-place?** Yes.

> ⚠️ **Stability note**
> Consider `[3a, 3b, 1]` (where `3a` and `3b` are both `3` but from different positions). Selection sort finds `1` as the minimum, swaps it with `3a`. The array becomes `[1, 3b, 3a]`. The relative order of the two `3`s flipped. Unstable.

### When is it useful?

Almost never for general sorting. Its one advantage: it makes exactly n-1 swaps (the minimum possible). If swapping is very expensive (e.g., writing to physical memory), selection sort minimizes that cost.

> 🎯 **Key takeaway**
> Selection sort scans for the minimum, swaps it into position, repeat. Always O(n²). In-place but unstable.

---

<a id="lesson-8"></a>
## Lesson 8 — Insertion Sort — how you sort a hand of cards

### The idea

Think of how you'd sort a hand of playing cards dealt to you one at a time. Each new card you pick up, you slide it left into the correct position among the cards you're already holding.

Insertion sort does exactly this. It grows a sorted portion on the left. For each new element, it shifts larger elements right to make room, then inserts the new element in its correct spot.

### ASCII trace

Sorting `[5, 3, 1, 4, 2]`:

```
[5 | 3, 1, 4, 2]    ← one element is trivially sorted
  ↑ take 3
  3 < 5, shift 5 right
[_, 5, 1, 4, 2]  then insert 3 at front
[3, 5 | 1, 4, 2]

  ↑ take 1
  1 < 5, shift 5 right
  1 < 3, shift 3 right
[_, _, 5, 4, 2]  then insert 1 at front
[1, 3, 5 | 4, 2]

  ↑ take 4
  4 < 5, shift 5 right
  4 > 3, stop
[1, 3, _, 5, 2]  insert 4 where 5 was
[1, 3, 4, 5 | 2]

  ↑ take 2
  2 < 5, shift 5 right
  2 < 4, shift 4 right
  2 < 3, shift 3 right
  2 > 1, stop
[1, _, _, _, 5]  insert 2
[1, 2, 3, 4, 5]  ✓
```

### Why insertion sort is fast on nearly-sorted data

Each element only needs to travel a short distance to its correct position. If the array is almost sorted (only a few elements out of place), the inner loop barely runs. This gives insertion sort an O(n) best case and an O(n·k) case where k is the maximum distance any element is from its final position.

This is exactly why **TimSort** (used by V8) starts with insertion sort on small chunks: real-world data often has local ordering, and insertion sort exploits that beautifully.

### Complexity

| Case | Time | Space |
|------|------|-------|
| Best (already sorted) | O(n) | O(1) |
| Average | O(n²) | O(1) |
| Worst (reverse sorted) | O(n²) | O(1) |

**Stable?** Yes — equal elements never get swapped past each other (we only shift when strictly greater).  
**In-place?** Yes.

> 🎯 **Key takeaway**
> Insertion sort is great for small arrays and nearly-sorted data. It's O(n) best case, O(n²) worst. Stable and in-place. It's the sorting "card hand" algorithm.

---

<a id="lesson-9"></a>
## Lesson 9 — Merge Sort — divide, sort, combine

### The idea

Merge sort uses a beautiful "divide and conquer" strategy:

1. **Divide** the array in half.
2. **Recursively sort** each half.
3. **Merge** the two sorted halves back together.

The hard part is step 3 — merging two sorted arrays. But merging is easy once you see it: use two pointers, one in each array, and always pick the smaller of the two pointed-to elements.

### ASCII trace — the merge step

Merging `[1, 4, 5]` and `[2, 3, 6]`:

```
left:   [1, 4, 5]   right: [2, 3, 6]   result: []
         ↑                  ↑
         1 vs 2 → take 1

left:   [1, 4, 5]   right: [2, 3, 6]   result: [1]
            ↑                ↑
            4 vs 2 → take 2

left:   [1, 4, 5]   right: [2, 3, 6]   result: [1, 2]
            ↑                   ↑
            4 vs 3 → take 3

left:   [1, 4, 5]   right: [2, 3, 6]   result: [1, 2, 3]
            ↑                      ↑
            4 vs 6 → take 4

left:   [1, 4, 5]   right: [2, 3, 6]   result: [1, 2, 3, 4]
               ↑                   ↑
               5 vs 6 → take 5

left:   [1, 4, 5]   right: [2, 3, 6]   result: [1, 2, 3, 4, 5]
                  (exhausted)           append remaining: 6

result: [1, 2, 3, 4, 5, 6]  ✓
```

### ASCII trace — the recursive decomposition

Sorting `[5, 3, 1, 4, 2]`:

```
           [5, 3, 1, 4, 2]
            /             \
       [5, 3, 1]          [4, 2]
        /      \           /   \
    [5, 3]     [1]       [4]   [2]
    /    \      |         |     |
  [5]   [3]    [1]       [4]   [2]
    \   /                 \   /
    [3, 5]               [2, 4]
       \        /            \   /
       [1, 3, 5]             [2, 4]
               \             /
               [1, 2, 3, 4, 5]
```

### Complexity

| Case | Time | Space |
|------|------|-------|
| Best | O(n log n) | O(n) |
| Average | O(n log n) | O(n) |
| Worst | O(n log n) | O(n) |

The O(n) space is for the temporary array used during merging. The O(log n) recursion stack is usually negligible.

**Stable?** Yes — when merging, ties go to the left half first, preserving original order.  
**In-place?** No — requires O(n) extra memory.

### Why O(n log n)?

The array is cut in half each time, giving log n levels of recursion. At each level, all n elements are processed once (merged). Total: n × log n.

> 🎯 **Key takeaway**
> Merge sort is guaranteed O(n log n) always — no bad inputs can make it slow. It's stable and the basis of TimSort. The cost is O(n) extra space.

---

<a id="lesson-10"></a>
## Lesson 10 — Quick Sort — the partition trick

### The idea

Quick sort also divides the array, but differently from merge sort. It picks a **pivot** element, then **partitions** the array: everything less than the pivot goes to the left, everything greater goes to the right. Then it recursively sorts each partition.

The clever part: the pivot is now in its exact final position after partitioning. You never need to touch it again.

### The partition step (Lomuto scheme)

Pick the last element as pivot. Use a pointer `i` to track "end of the less-than region."

```
Partitioning [3, 6, 8, 10, 1, 2, 1] with pivot = 1:

i = -1 (no "less than" elements yet)
j scans left to right:

j=0: arr[j]=3, 3 > 1 → skip
j=1: arr[j]=6, 6 > 1 → skip
j=2: arr[j]=8, 8 > 1 → skip
j=3: arr[j]=10, 10 > 1 → skip
j=4: arr[j]=1, 1 ≤ 1 → i++, swap arr[i] and arr[j]
     swap arr[0] and arr[4]: [1, 6, 8, 10, 3, 2, 1]  (pivot still at end)
j=5: arr[j]=2, 2 > 1 → skip
j=6: pivot itself, skip

Finally swap pivot (arr[end]) with arr[i+1]:
[1, 1, 8, 10, 3, 2, 6]
      ↑
      pivot is now at index 1, in its final position

Left partition: [1]        (indexes 0..0)
Right partition: [8, 10, 3, 2, 6]  (indexes 2..6)
```

### Complexity

| Case | Time | Space (stack) |
|------|------|-------|
| Best | O(n log n) | O(log n) |
| Average | O(n log n) | O(log n) |
| Worst | O(n²) | O(n) |

### Why quicksort can be O(n²) worst case

The worst case happens when the pivot is always the smallest or largest element — which means one partition has n-1 elements and the other has 0. You end up making n recursive calls each processing n-1 elements: n + (n-1) + … + 1 = n²/2.

This happens with a naïve "always pick last element" scheme on **already-sorted input**.

**Fix:** pick a random pivot (random pivot quicksort). This makes the worst case astronomically unlikely.

**Stable?** No — partitioning can change the relative order of equal elements.  
**In-place?** Yes (in terms of array space, just the recursion stack).

> 💡 **Tip**
> In practice, quicksort is often faster than merge sort because it has better cache behavior and a small constant factor. It's not the worst-case champion (merge sort wins there), but it wins on average real-world data.

> 🎯 **Key takeaway**
> Quick sort picks a pivot, partitions around it, recurse on both sides. Average O(n log n), worst O(n²) (avoidable with random pivot). In-place, unstable.

---

<a id="lesson-11"></a>
## Lesson 11 — Heap Sort — using a heap as a sorting tool

### What is a heap?

A **max-heap** is a nearly-complete binary tree where every parent is greater than or equal to its children. The largest element is always at the root. We can store a heap in an array using index arithmetic:

```
For element at index i:
  Parent:       Math.floor((i - 1) / 2)
  Left child:   2 * i + 1
  Right child:  2 * i + 2
```

### The idea

Heap sort has two phases:

1. **Heapify** (build a max-heap from the array): starting from the last non-leaf node and going backwards, "sift down" each element so it satisfies the heap property. This takes O(n).

2. **Sort** (extract the max repeatedly): swap the root (maximum) with the last element, shrink the heap by one, sift the new root down to restore the heap. Repeat n-1 times.

### ASCII trace

Sorting `[4, 10, 3, 5, 1]`. After building the max-heap:

```
      10
     /  \
    5    3
   / \
  4   1

Array: [10, 5, 3, 4, 1]
```

Now extract max repeatedly:

```
Step 1: swap root (10) with last (1), shrink heap
        [1, 5, 3, 4, | 10]  sift down 1 → [5, 4, 3, 1, | 10]
Step 2: swap root (5) with last unsorted (1), shrink heap
        [1, 4, 3, | 5, 10]  sift down 1 → [4, 1, 3, | 5, 10]
Step 3: swap root (4) with last unsorted (3), shrink heap
        [3, 1, | 4, 5, 10]  sift down 3 → [3, 1, | 4, 5, 10]  (already ok)
Step 4: swap root (3) with (1)
        [1, | 3, 4, 5, 10]  heap of size 1, done
Final:  [1, 3, 4, 5, 10]  ✓
```

### Complexity

| Case | Time | Space |
|------|------|-------|
| Best | O(n log n) | O(1) |
| Average | O(n log n) | O(1) |
| Worst | O(n log n) | O(1) |

**Stable?** No — the heap structure does not preserve original order.  
**In-place?** Yes — everything happens within the same array.

Heap sort is the only algorithm that is simultaneously O(n log n) worst case **and** O(1) space. Merge sort needs O(n) space. Quicksort is O(n) worst case.

However, heap sort has poor cache behavior (it jumps around the array a lot), so it is slower in practice than quicksort or merge sort despite having "better" theoretical guarantees.

> 🎯 **Key takeaway**
> Heap sort uses a max-heap to repeatedly extract the maximum. O(n log n) all cases, O(1) space. In-place, unstable.

---

<a id="lesson-12"></a>
## Lesson 12 — Counting Sort — when your numbers have a small range

### The idea

Counting sort breaks the comparison-sort lower bound by not comparing elements at all. Instead, it counts how many times each value appears, then uses those counts to place elements directly.

It requires: **non-negative integers** with a known maximum value `k`.

### Example

Sort `[4, 2, 2, 8, 3, 3, 1]`. Values are in range [0, 8], so k = 8.

**Step 1: Count occurrences**
```
Value:  0  1  2  3  4  5  6  7  8
Count:  0  1  2  2  1  0  0  0  1
```

**Step 2: Compute prefix sums** (how many values ≤ index?)
```
Value:    0  1  2  3  4  5  6  7  8
Cumul:    0  1  3  5  6  6  6  6  7
```
This tells you: the final sorted position of value `v` is in range `[cumul[v-1], cumul[v]-1]`.

**Step 3: Place elements** (scan original array right-to-left for stability)
```
Input:   [4, 2, 2, 8, 3, 3, 1]
Output:  [1, 2, 2, 3, 3, 4, 8]
```

### Complexity

| Case | Time | Space |
|------|------|-------|
| All | O(n + k) | O(n + k) |

Where `k` is the range of values.

**Stable?** Yes (with the right-to-left placement trick).  
**In-place?** No — needs an output array of size n.

### When is it useful?

When values are integers in a small, known range. Sort 1 million ages (0–120): `k = 120`, absolutely blazing fast. Sort 10 numbers with values up to 10 billion: `k = 10^10` — completely impractical.

> ⚠️ **Don't use counting sort when k >> n**. The space and time cost is O(k), not O(n).

---

<a id="lesson-13"></a>
## Lesson 13 — Radix Sort — sorting digit by digit

### The idea

Radix sort sorts integers by processing one digit position at a time, starting from the **least significant digit (LSD)** to the most significant. It uses a stable counting sort as a subroutine for each digit position.

Because you use a stable sort at each step, earlier results are preserved within each group — and after processing all digit positions, you have a fully sorted array.

### Example

Sort `[170, 45, 75, 90, 802, 24, 2, 66]`:

```
Pass 1 (ones digit):
  170, 90 → 0
  802, 2  → 2
  24      → 4
  45, 75  → 5
  66      → 6
After:  [170, 90, 802, 2, 24, 45, 75, 66]

Pass 2 (tens digit):
  802, 2     → 0
  24         → 2
  45         → 4
  66         → 6
  170, 75    → 7
  90         → 9
After:  [802, 2, 24, 45, 66, 170, 75, 90]

Pass 3 (hundreds digit):
  2, 24, 45, 66, 75, 90  → 0 (leading 0s)
  170                    → 1
  802                    → 8
After:  [2, 24, 45, 66, 75, 90, 170, 802]  ✓
```

### Complexity

`d` = number of digit positions, `k` = base (usually 10).

| Case | Time | Space |
|------|------|-------|
| All | O(d × (n + k)) | O(n + k) |

For fixed-width integers, `d` is constant (e.g., 32-bit integers have at most 10 decimal digits), making this effectively O(n).

**Stable?** Yes.  
**In-place?** No.

> 🎯 **Key takeaway**
> Radix sort sorts digit by digit using a stable subroutine. Blazing fast for fixed-length integers, strings, or keys with a bounded "alphabet."

---

<a id="lesson-14"></a>
## Lesson 14 — Bucket Sort — spread and sort in buckets

### The idea

Bucket sort is ideal for **floating-point numbers uniformly distributed in [0, 1)**. The idea:

1. Create n empty "buckets" (sub-arrays).
2. Distribute each element into a bucket: element `x` goes into bucket `floor(x * n)`.
3. Sort each bucket individually (usually with insertion sort — buckets are small).
4. Concatenate all buckets.

If the elements are uniformly distributed, each bucket gets roughly the same number of elements (about 1 on average), and sorting n buckets of ~1 element each is essentially O(n).

### Example

Sort `[0.72, 0.17, 0.39, 0.26, 0.54, 0.81, 0.12]` using 7 buckets:

```
Bucket 0: [0.12, 0.17]
Bucket 1: []
Bucket 2: [0.26]
Bucket 3: [0.39]
Bucket 4: []
Bucket 5: [0.54]
Bucket 6: []
Bucket 7: [0.72]
Bucket 8: [0.81]

Sort each bucket (already sorted or single element):
Concatenate: [0.12, 0.17, 0.26, 0.39, 0.54, 0.72, 0.81]  ✓
```

### Complexity

| Case | Time | Space |
|------|------|-------|
| Average (uniform) | O(n) | O(n + k) |
| Worst (all in one bucket) | O(n²) | O(n + k) |

**Stable?** Yes (if the bucket sub-sort is stable).  
**In-place?** No.

> ⚠️ **Bucket sort is only fast when data is uniformly distributed.** If all elements land in one bucket, you've just done an O(n²) sort.

---

<a id="lesson-15"></a>
## Lesson 15 — Algorithm summary table

Here's everything at a glance. Come back to this table often.

| Algorithm | Best | Average | Worst | Space | Stable | In-place |
|---|---|---|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No | Yes |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | No |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No | Yes |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No | Yes |
| Counting Sort | O(n + k) | O(n + k) | O(n + k) | O(n + k) | Yes | No |
| Radix Sort | O(d(n+k)) | O(d(n+k)) | O(d(n+k)) | O(n + k) | Yes | No |
| Bucket Sort | O(n) | O(n) | O(n²) | O(n + k) | Yes | No |

> 💡 **Reading the table**
> - `k` = range of values (for counting/radix/bucket)
> - `d` = number of digit positions (for radix)
> - Quick Sort's O(log n) space is the recursion stack, not additional arrays

---

<a id="lesson-16"></a>
## Lesson 16 — JavaScript's `.sort()` — the lexicographic gotcha

This is the single most common sorting bug in JavaScript. You need to know this cold.

### The default `.sort()` converts to strings

```js
[10, 2, 1, 25, 5].sort();
// Expected: [1, 2, 5, 10, 25]
// Actual:   [1, 10, 2, 25, 5]   ← !!
```

Without a comparator, `.sort()` converts every element to a **string** and sorts them alphabetically (lexicographically). In string order, `"10"` comes before `"2"` because `"1" < "2"`. This is correct string-sorting behavior, but wrong number-sorting behavior.

Here's what "alphabetical" means for these numbers:

```
"1"  → 1
"10" → 1, then 0
"2"  → 2
"25" → 2, then 5
"5"  → 5

Alphabetical order: "1", "10", "2", "25", "5"
                     ↑
                    This is what you see above
```

### The fix: always use a comparator for numbers

```js
[10, 2, 1, 25, 5].sort((a, b) => a - b);
// [1, 2, 5, 10, 25]  ✓  (ascending)

[10, 2, 1, 25, 5].sort((a, b) => b - a);
// [25, 10, 5, 2, 1]  ✓  (descending)
```

How does the comparator work? The sort algorithm calls your function with pairs `(a, b)` and expects:
- **Negative number** → `a` should come **before** `b`
- **Positive number** → `b` should come **before** `a`
- **Zero** → equal, order doesn't matter

So `(a, b) => a - b` returns negative when a < b (a first) and positive when a > b (b first) — that's ascending order.

### `.sort()` mutates the original array

This is also important. `.sort()` is one of the **mutating** array methods (covered in Arrays Lesson 13). It changes the array in place and returns the same reference.

```js
const scores = [50, 80, 95, 30, 70];
const sorted = scores.sort((a, b) => a - b);

console.log(sorted === scores);   // true — same array!
console.log(scores);              // [30, 50, 70, 80, 95] — original changed!
```

If you don't want the original modified, copy first:

```js
const sorted = [...scores].sort((a, b) => a - b);
// or
const sorted = scores.toSorted((a, b) => a - b);   // modern, non-mutating
```

> ⚠️ **The `.sort()` gotcha in one sentence**
> JavaScript's `.sort()` uses **string comparison by default**. Always pass a comparator when sorting numbers.

---

<a id="lesson-17"></a>
## Lesson 17 — Custom comparator functions

A comparator is a function `(a, b) => number`. The sort algorithm calls it and uses the sign of the result to decide ordering. Let's master all the forms.

### Numbers (ascending / descending)

```js
// Ascending
arr.sort((a, b) => a - b);

// Descending
arr.sort((a, b) => b - a);
```

### Strings

```js
// Lexicographic (default behavior, but explicit)
arr.sort((a, b) => a.localeCompare(b));

// Case-insensitive
arr.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
```

### Objects by a property

```js
const students = [
  { name: 'Carlos', grade: 85 },
  { name: 'Aisha', grade: 92 },
  { name: 'Diana', grade: 85 },
];

// Sort by grade descending
students.sort((a, b) => b.grade - a.grade);
// [Aisha:92, Carlos:85, Diana:85]
```

### Absolute value

```js
[-3, 1, -7, 4, -2].sort((a, b) => Math.abs(a) - Math.abs(b));
// [1, -2, -3, 4, -7]
```

### Custom ordering (not by numeric value)

```js
const order = { 'low': 0, 'medium': 1, 'high': 2 };
['high', 'low', 'medium', 'high'].sort((a, b) => order[a] - order[b]);
// ['low', 'medium', 'high', 'high']
```

> 🎯 **Key takeaway**
> The comparator's contract: return negative to put `a` first, positive to put `b` first, zero for equal. You can sort anything with any ordering rule as long as you express it as a number.

---

<a id="lesson-18"></a>
## Lesson 18 — Multi-key sorting

Sometimes you need to sort by multiple criteria: primarily by one field, and when those are equal, by a secondary field (and maybe a tertiary one).

### The chained comparator pattern

```js
const students = [
  { name: 'Carlos', age: 20, grade: 'B' },
  { name: 'Aisha',  age: 22, grade: 'A' },
  { name: 'Diana',  age: 20, grade: 'A' },
  { name: 'Ben',    age: 22, grade: 'B' },
  { name: 'Elena',  age: 19, grade: 'A' },
];

// Sort by age ascending, then by name ascending
students.sort((a, b) => {
  if (a.age !== b.age) return a.age - b.age;   // primary: age
  return a.name.localeCompare(b.name);          // secondary: name
});
```

Result:
```
Elena  (19, A)
Carlos (20, B)
Diana  (20, A)  ← Carlos comes before Diana because C < D alphabetically
Aisha  (22, A)
Ben    (22, B)  ← Aisha comes before Ben because A < B alphabetically
```

### Sorting by N keys generically

```js
function multiKeySort(arr, keys) {
  return arr.sort((a, b) => {
    for (const { key, order } of keys) {
      const dir = order === 'desc' ? -1 : 1;
      if (a[key] < b[key]) return -1 * dir;
      if (a[key] > b[key]) return  1 * dir;
    }
    return 0;
  });
}

multiKeySort(students, [
  { key: 'age',  order: 'asc' },
  { key: 'name', order: 'asc' },
]);
```

### The "first sort by secondary, then by primary" trick

For **stable sorts**, you can achieve multi-key sorting by sorting twice:
1. Sort by the secondary key.
2. Sort by the primary key (stably).

Because the second sort is stable, equal-primary elements retain their secondary ordering from step 1.

> ⚠️ This trick only works if the sort is stable. JavaScript's `.sort()` is stable in all modern environments (V8 guarantee since Node.js 11 / Chrome 70).

---

<a id="lesson-19"></a>
## Lesson 19 — V8, TimSort, and what it means for you

### What is TimSort?

**TimSort** is the sorting algorithm that V8 (the JavaScript engine in Chrome and Node.js) uses for `Array.prototype.sort`. It was originally developed for Python by Tim Peters in 2002 and later adopted by Java, Android, and V8.

TimSort is a **hybrid algorithm**: it combines merge sort and insertion sort, taking the best of both.

### How TimSort works (simplified)

1. **Scan for "runs"** — naturally occurring ascending (or descending) sequences in the data. Real-world data almost always has some local structure; TimSort exploits this.
2. If a run is too short (less than ~32–64 elements), **extend it with insertion sort** — which is fast on short and nearly-sorted sequences.
3. **Merge runs** using a merge sort-like strategy with careful size constraints that guarantee O(n log n) total.

### Why is TimSort so good?

- **Best case O(n)**: if the data is already sorted, TimSort detects one big run and does nothing.
- **O(n log n) worst case**: guaranteed, unlike quicksort.
- **Stable**: relative order of equal elements is preserved.
- **Cache-friendly**: works on contiguous runs of memory.
- **Adapts to real-world data**: most real data has natural partial order.

### What this means for you

1. **`.sort()` is stable** in all modern JS engines. You can rely on it for multi-key sorting (see Lesson 18).
2. **`.sort()` is fast** — O(n log n) with excellent constant factors. Don't try to "beat" it with a hand-rolled sort.
3. **The lexicographic default is still there** — stability doesn't help if you forget the comparator for numbers. The gotcha from Lesson 16 still applies.
4. **`toSorted()`** (ES2023) is the non-mutating version: same algorithm, returns a new array.

> 💡 **Tip**
> You will essentially never write your own sort for production JavaScript. You'll write them for interviews and to understand algorithms. In production, just use `.sort()` with the right comparator.

---

<a id="lesson-20"></a>
## Lesson 20 — You did it. Now what?

That was a lot of ground. Don't worry if some of it feels fuzzy — it will solidify through practice.

What you should walk away with:

1. **You know why sorting matters** — it unlocks searching, deduplication, scheduling, and more.
2. **You understand stable vs. unstable** — preserving relative order of equal elements.
3. **You know in-place vs. out-of-place** — O(1) extra space vs. O(n).
4. **You understand the O(n log n) lower bound** — no comparison sort can do better.
5. **You've walked through all major algorithms** — Bubble, Selection, Insertion, Merge, Quick, Heap, Counting, Radix, Bucket.
6. **You know the JS `.sort()` gotcha** — always pass a comparator for numbers.
7. **You can write multi-key comparators**.
8. **You know V8 uses TimSort** — stable, adaptive, and the reason `.sort()` is already fast.

### What to do next

1. Open [`questions/07-bubble-sort.md`](./questions/07-bubble-sort.md). Implement bubble sort from scratch (with early exit).
2. Work through each implementation question in order (07–15). Don't skip any.
3. Then move to the apply questions (16–20) — they use sorting as a tool, not as the goal.
4. Medium and hard questions (21–30) are where the real problem-solving starts.
5. Finish with the pitfall drill (31–33) — real gotchas that trip up even experienced developers.

### Pacing

- **Don't rush the implementation questions.** Understanding how merge sort and quicksort work at a deep level pays dividends for the rest of your career.
- **Draw the ASCII trace yourself** before reading the code. The drawing builds the mental model.
- **If a problem seems hard, re-read the relevant lesson** before looking at hints.

You're building real skills. Stick with it. See you in [Q7](./questions/07-bubble-sort.md).
