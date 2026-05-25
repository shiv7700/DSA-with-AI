# Q4 — O(n log n) Lower Bound

**Difficulty:** Easy (Concept Check)
**Pattern:** Sorting theory
**Expected:** Understanding, no code required

## Problem

There is a mathematical proof that **no comparison-based sorting algorithm can sort n distinct elements faster than O(n log n)** in the worst case. This is not just "we haven't found a faster one" — it is provably impossible.

Your task is to understand the intuition behind this lower bound.

**The decision tree argument (intuition):**

Any comparison sort can be modeled as a **decision tree**: each internal node is a comparison ("is arr[i] < arr[j]?"), each leaf is a possible final ordering, and each path from root to leaf represents one execution of the algorithm.

```
                 arr[0] < arr[1]?
                /               \
          arr[1] < arr[2]?    arr[0] < arr[2]?
          /         \           /          \
     [0,1,2]   arr[0]<arr[2]? [0,2,1]  arr[1]<arr[2]?
                /       \                 /       \
           [0,2,1]   [2,0,1]        [1,0,2]   [2,1,0]

(Simplified example for n=3)
```

For n distinct elements, there are n! possible orderings (leaves).

A binary tree with n! leaves must have height at least ⌈log₂(n!)⌉.

By Stirling's approximation: log₂(n!) ≈ n log₂ n.

Therefore: any comparison sort needs at least n log n comparisons in the worst case.

**Your tasks:**

1. For n = 4, how many possible orderings are there? What is the minimum height of the decision tree?
2. Fill in this table:

   | n | n! | log₂(n!) | n log₂(n) |
   |---|---|---|---|
   | 3 | 6 | ~2.58 | ~4.75 |
   | 4 | ? | ? | ? |
   | 8 | ? | ? | ? |
   | 10 | ? | ? | ? |

3. Why doesn't this lower bound apply to Counting Sort and Radix Sort?

## Examples

### Example 1 — lower bound for n = 3

```
3! = 6 possible orderings of [a, b, c]:
  [a,b,c], [a,c,b], [b,a,c], [b,c,a], [c,a,b], [c,b,a]

A binary tree with 6 leaves has height at least ⌈log₂(6)⌉ = 3.
So any comparison sort for 3 elements makes at least 3 comparisons in the worst case.

Insertion sort on 3 elements: in the worst case it makes exactly 3 comparisons. Optimal!
```

## Constraints

Conceptual question. Math and short answers.

## Hints

<details>
<summary>Hint 1 — computing n!</summary>

4! = 4 × 3 × 2 × 1 = 24.
8! = 40,320.
10! = 3,628,800.

log₂(24) ≈ 4.58, so a comparison sort for n=4 needs at least 5 comparisons in the worst case.
</details>

<details>
<summary>Hint 2 — why Counting Sort bypasses this</summary>

The lower bound applies only to algorithms that learn about element order exclusively through comparisons. Counting Sort doesn't compare elements — it uses the numeric value of each element directly to compute its position. It gains more than one bit of information per operation, which is why it can be O(n) rather than O(n log n).
</details>

<details>
<summary>Hint 3 — practical implication</summary>

This means that Merge Sort and Heap Sort (both O(n log n) worst case) are theoretically optimal comparison sorts. Any algorithm that claims to be faster than O(n log n) for arbitrary data either:
(a) uses extra information about the values (like Counting Sort), or
(b) is only faster in the average or best case (like Insertion Sort on nearly-sorted data), or
(c) is incorrect.
</details>

## Write your solution
→ [`../solutions/04-lower-bound.js`](../solutions/04-lower-bound.js)

## Follow-ups
- Look up the formal proof using "information-theoretic lower bound." Can you explain it in your own words?
- Merge Sort achieves O(n log n) comparisons. Does that mean it makes the minimum number of comparisons possible? (Answer: almost — there are sorting networks that achieve slightly fewer, but they're impractical.)
