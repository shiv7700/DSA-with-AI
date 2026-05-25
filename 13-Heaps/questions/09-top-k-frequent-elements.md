# Q9 — Top K Frequent Elements

**Difficulty:** Medium
**Pattern:** Frequency map + min-heap of size K
**Expected:** O(n log k) time · O(n) space

## Problem

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

## Examples

### Example 1
```
Input:  nums = [1, 1, 1, 2, 2, 3],  k = 2
Output: [1, 2]
```
`1` appears 3 times, `2` appears 2 times, `3` appears once. The top 2 most frequent are 1 and 2.

### Example 2
```
Input:  nums = [1],  k = 1
Output: [1]
```

### Example 3
```
Input:  nums = [4, 4, 4, 5, 5, 6, 6],  k = 2
Output: [4, 5]  (or [4, 6], since 5 and 6 are tied at 2)
```

## Constraints
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `k` is in the range `[1, number of unique elements]`
- The answer is guaranteed to be unique (no tie at the k-th position).

## Hints

<details>
<summary>Hint 1 — build a frequency map first</summary>

Use a `Map` to count how many times each number appears. This takes one O(n) pass.

After this step you have entries like `{ 1 → 3, 2 → 2, 3 → 1 }`.
</details>

<details>
<summary>Hint 2 — apply the min-heap-of-size-K pattern</summary>

Iterate over the frequency map entries. Maintain a min-heap (ordered by frequency) of at most `k` elements. When the heap exceeds size `k`, pop the element with the lowest frequency — it cannot be in the top-k.

After processing all entries, the heap contains exactly the `k` most frequent elements.
</details>

<details>
<summary>Hint 3 — the heap key is frequency, not the number itself</summary>

Your heap elements should be pairs `[frequency, number]`. The comparator should order by frequency ascending so the least-frequent element sits at the root (and gets evicted first).

```
minHeap by frequency
push [3, 1], [2, 2], [1, 3] with k=2
→ pop [1, 3] (lowest frequency evicted)
→ heap = [[2, 2], [3, 1]]
→ result = [2, 1]
```
</details>

<details>
<summary>Hint 4 — alternative O(n) approach (bucket sort)</summary>

Create a `buckets` array of length `n+1` where `buckets[freq]` holds all numbers with that frequency. Then scan from `n` down to `1`, collecting elements until you have `k`.

This is O(n) time but requires more code. The heap approach is more general and is what interviewers usually expect.
</details>

## Write your solution
→ [`../solutions/09-top-k-frequent-elements.js`](../solutions/09-top-k-frequent-elements.js)

## Follow-ups
- **Top K frequent words** (Q17) — same idea but elements are strings, with alphabetical tiebreak.
- Can you solve this in O(n) time using bucket sort?
- What if the array were a stream of numbers arriving one at a time?
