# Q8 — Kth Largest Element in an Array

**Difficulty:** Medium
**Pattern:** Min-heap of size K
**Expected:** O(n log k) time · O(k) space

## Problem

Given an integer array `nums` and an integer `k`, return the **k-th largest** element in the array.

Note: this is the k-th largest in sorted order (so the 1st largest is the maximum, the 2nd largest is the second-biggest value, etc.). Duplicates count separately.

You must not sort the entire array (or at least understand why the heap approach is better).

## Examples

### Example 1
```
Input:  nums = [3, 2, 1, 5, 6, 4],  k = 2
Output: 5
```
Sorted descending: [6, 5, 4, 3, 2, 1]. The 2nd largest is 5.

### Example 2
```
Input:  nums = [3, 2, 3, 1, 2, 4, 5, 5, 6],  k = 4
Output: 4
```
Sorted descending: [6, 5, 5, 4, 3, 3, 2, 2, 1]. The 4th largest is 4.

### Example 3
```
Input:  nums = [1],  k = 1
Output: 1
```

## Constraints
- `1 <= k <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — which heap and why?</summary>

Use a **min-heap of size k**.

The idea: the min-heap holds the k largest elements seen so far. Its root is the *smallest* of those k elements — which is exactly the k-th largest!

When you see a new number:
- If the heap has fewer than k elements, add it.
- Otherwise, if the new number is larger than the root (current k-th largest), pop the root and push the new number.

After processing all n elements, the root is your answer.
</details>

<details>
<summary>Hint 2 — step by step for [3, 2, 1, 5, 6, 4], k = 2</summary>

```
Process 3: heap = [3]                    (size < 2)
Process 2: heap = [2, 3]                 (size < 2)
Process 1: 1 < heap.peek() (2)? Yes — skip
Process 5: 5 > heap.peek() (2)? Yes — pop 2, push 5 → heap = [3, 5]
Process 6: 6 > heap.peek() (3)? Yes — pop 3, push 6 → heap = [5, 6]
Process 4: 4 > heap.peek() (5)? No — skip
Answer: heap.peek() = 5  ✅
```
</details>

<details>
<summary>Hint 3 — time complexity breakdown</summary>

- For each of the n elements, you do at most one `pop` + `push` on a heap of size k.
- Each heap operation is O(log k).
- Total: O(n log k).

Compare to sorting everything: O(n log n). If k = 10 and n = 1,000,000, that's O(n log 10) ≈ O(3.3n) versus O(n log n) ≈ O(20n). The heap wins when k << n.
</details>

## Write your solution
→ [`../solutions/08-kth-largest-in-array.js`](../solutions/08-kth-largest-in-array.js)

## Follow-ups
- **K-th smallest** — how does the strategy flip? (Use max-heap of size k — see Q6.)
- **QuickSelect** — an O(n) average-time alternative. Worth knowing, though it's a different algorithm.
- **K largest elements** (not just the k-th): same min-heap approach — at the end, dump the entire heap.
