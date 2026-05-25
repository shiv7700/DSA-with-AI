# Q7 — Convert Min-Heap to Max-Heap

**Difficulty:** Easy
**Pattern:** Heapify
**Expected:** O(n) time · O(1) extra space

## Problem

Given an array that represents a valid min-heap, convert it **in place** into an array that represents a valid max-heap.

You do NOT need to preserve any particular ordering among equal-priority elements — just ensure the max-heap property holds (every parent ≥ both children) after the conversion.

## Examples

### Example 1
```
Input:  [1, 3, 2, 7, 5, 4, 6]   (valid min-heap)
Output: a valid max-heap, e.g. [7, 5, 6, 1, 3, 2, 4]
```
Verify: `7≥5` ✅, `7≥6` ✅, `5≥1` ✅, `5≥3` ✅, `6≥2` ✅, `6≥4` ✅

### Example 2
```
Input:  [1]
Output: [1]
```

### Example 3
```
Input:  [1, 2, 3, 4, 5, 6, 7]
Output: [7, 5, 6, 4, 2, 1, 3]  (or any valid max-heap)
```

## Constraints
- `1 <= arr.length <= 10^5`
- `-10^9 <= arr[i] <= 10^9`
- Modify the array in place and return it.

## Hints

<details>
<summary>Hint 1 — you don't need to use the "min-heap" structure at all</summary>

The fact that the input is a min-heap doesn't help or hurt. You're converting to a max-heap, and the best algorithm for that is the same as building any heap from scratch: Floyd's O(n) algorithm.

Ignore the min-heap property of the input. Just treat it as an unsorted array and build a max-heap from it using bottom-up siftDown (but now siftDown in the max-heap direction).
</details>

<details>
<summary>Hint 2 — max-heap siftDown</summary>

The only difference from the min-heap siftDown is the comparison direction: instead of tracking the "smallest" child, track the "largest" child.

```js
function siftDownMax(arr, n, i) {
  while (true) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest === i) break;
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    i = largest;
  }
}
```
</details>

## Write your solution
→ [`../solutions/07-min-to-max-heap.js`](../solutions/07-min-to-max-heap.js)

## Follow-ups
- Is there a way to convert a max-heap to a min-heap in the same O(n) fashion? (Yes — same idea, just use min-heap siftDown.)
- After conversion, the array is no longer sorted. What if you then wanted the array in sorted order? (Answer: heap sort — see Q33.)
