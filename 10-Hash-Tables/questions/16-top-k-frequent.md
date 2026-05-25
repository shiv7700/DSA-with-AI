# Q16 — Top K Frequent Elements

**Difficulty:** Medium
**Pattern:** Frequency map + bucket sort (or heap)
**Expected:** O(n) time · O(n) space (bucket sort) or O(n log k) with heap

## Problem

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in **any order**.

## Examples

### Example 1
```
Input:  nums = [1, 1, 1, 2, 2, 3],  k = 2
Output: [1, 2]
```
`1` appears 3 times, `2` appears 2 times — the top 2.

### Example 2
```
Input:  nums = [1],  k = 1
Output: [1]
```

### Example 3
```
Input:  nums = [4, 4, 4, 5, 5, 6],  k = 2
Output: [4, 5]
```

## Constraints
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `k` is in the range `[1, number of unique elements]`.
- The answer is **guaranteed** to be unique (no tie-breaking needed).
- Your algorithm's time complexity **must be better than** O(n log n).

## Hints

<details>
<summary>Hint 1 — build the frequency map first</summary>

Count the frequency of each number (frequency map). This is always step 1 for any "most frequent" problem.
</details>

<details>
<summary>Hint 2 — naive: sort by frequency (O(n log n))</summary>

Sort the unique elements by their frequency (descending) and take the first `k`. This is O(n log n) — technically fine for most inputs, but the problem asks for better.
</details>

<details>
<summary>Hint 3 — bucket sort for O(n)</summary>

Maximum possible frequency is `n` (if all elements are the same). Create an array `buckets` of `n + 1` slots, where `buckets[f]` is the list of numbers that appear exactly `f` times.

Walk the frequency map and fill the buckets. Then iterate buckets from the end (highest frequency first) and collect elements until you have `k`.

```js
const buckets = new Array(nums.length + 1).fill(null).map(() => []);
for (const [num, freq] of freqMap) {
  buckets[freq].push(num);
}
const result = [];
for (let f = buckets.length - 1; f >= 0 && result.length < k; f--) {
  result.push(...buckets[f]);
}
return result.slice(0, k);
```
</details>

## Write your solution
→ [`../solutions/16-top-k-frequent.js`](../solutions/16-top-k-frequent.js)

## Follow-ups
- **Sort Characters by Frequency** (Q17) — same idea applied to characters in a string.
- **Top K Frequent Words** — like this problem but with strings, and ties broken alphabetically.
- Implement using a min-heap of size `k` for the O(n log k) version.
