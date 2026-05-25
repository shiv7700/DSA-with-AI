# Q15 — Bucket Sort

**Difficulty:** Medium (Implement from scratch)
**Pattern:** Non-comparison sort, distribution
**Expected:** O(n) average · O(n²) worst · O(n + k) space

## Problem

Implement **Bucket Sort** for an array of floating-point numbers uniformly distributed in the range **[0, 1)**.

Bucket sort distributes elements into a set of "buckets" (sub-arrays) based on their value. Elements close in value land in the same bucket. Each bucket is then sorted independently (using insertion sort, since buckets are small). Finally, all buckets are concatenated.

When the input is uniformly distributed, each bucket contains roughly n/k elements on average, and sorting each small bucket is fast.

**The algorithm:**
1. Create `n` empty buckets (one per input element is a natural choice).
2. For each element `x`, place it in bucket `Math.floor(x * n)`.
3. Sort each non-empty bucket with insertion sort (or any sort).
4. Concatenate all buckets in order.

**Properties:**
- **Stable**: Yes (if the bucket sub-sort is stable)
- **In-place**: No
- **Time**: O(n) average (uniform input), O(n²) worst (all elements in one bucket)
- **Space**: O(n + k)

## Examples

### Example 1
```
Input:  [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68]
n = 10 buckets (indices 0–9)

Distributing (bucket index = floor(x * 10)):
  Bucket 0: []
  Bucket 1: [0.17, 0.12]
  Bucket 2: [0.26, 0.21, 0.23]
  Bucket 3: [0.39]
  Bucket 4: []
  Bucket 5: []
  Bucket 6: [0.68]
  Bucket 7: [0.78, 0.72]
  Bucket 8: []
  Bucket 9: [0.94]

Sort each bucket:
  Bucket 1: [0.12, 0.17]
  Bucket 2: [0.21, 0.23, 0.26]
  Bucket 7: [0.72, 0.78]

Concatenate:
  [0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94]  ✓
```

### Example 2
```
Input:  [0.5, 0.1, 0.9]
Output: [0.1, 0.5, 0.9]
```

### Example 3
```
Input:  [0.3]
Output: [0.3]

Input:  []
Output: []
```

## Constraints
- `0 <= arr.length <= 10^4`
- `0 <= arr[i] < 1` (all floats strictly in [0, 1))
- Return a new sorted array.

## Hints

<details>
<summary>Hint 1 — creating and filling buckets</summary>

```js
const n = arr.length;
const buckets = Array.from({ length: n }, () => []);

for (const x of arr) {
  const bucketIndex = Math.floor(x * n);
  buckets[bucketIndex].push(x);
}
```

`Math.floor(x * n)` maps values in [0, 1) to bucket indices in [0, n-1]. Since `x < 1`, the maximum bucket index is `n - 1`.
</details>

<details>
<summary>Hint 2 — sorting each bucket</summary>

Insertion sort is ideal for small arrays and is already implemented in Q9. For simplicity, you can also use the built-in `.sort()` here since the bucket sub-sort is not the focus of this exercise:

```js
for (const bucket of buckets) {
  bucket.sort((a, b) => a - b);   // or use your insertionSort
}
```
</details>

<details>
<summary>Hint 3 — concatenation</summary>

```js
return [].concat(...buckets);
// or
const result = [];
for (const bucket of buckets) result.push(...bucket);
return result;
```
</details>

<details>
<summary>Hint 4 — handling input outside [0, 1)</summary>

For general input (not just [0, 1)), normalize by scaling:
```js
const min = Math.min(...arr);
const max = Math.max(...arr);
const range = max - min;

// bucket index = floor((x - min) / range * n)
// (handle range === 0 separately for all-equal arrays)
```
</details>

## Write your solution
→ [`../solutions/15-bucket-sort.js`](../solutions/15-bucket-sort.js)

## Follow-ups
- Adapt bucket sort to handle arbitrary floating-point numbers (not just [0, 1)) using normalization (see Hint 4).
- What happens to the time complexity if all n elements have the same value? Can you add a guard for this edge case?
- Is bucket sort useful for sorting integers? Compare with counting sort and radix sort.
