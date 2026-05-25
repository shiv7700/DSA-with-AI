# Q20 — K Largest Elements

**Difficulty:** Easy
**Pattern:** Sorting, partial sort
**Expected:** O(n log n) time · O(1) extra space (or O(n log k) with a heap)

## Problem

Given an array of integers and a number `k`, return the **k largest elements** in **descending order**.

You may assume `1 <= k <= arr.length`.

## Examples

### Example 1
```
Input:  arr = [3, 2, 1, 5, 6, 4],  k = 2
Output: [6, 5]
```

### Example 2
```
Input:  arr = [3, 2, 3, 1, 2, 4, 5, 5, 6],  k = 4
Output: [6, 5, 5, 4]
```

### Example 3
```
Input:  arr = [1],  k = 1
Output: [1]
```

### Example 4
```
Input:  arr = [7, 7, 7, 7],  k = 2
Output: [7, 7]
```

## Constraints
- `1 <= arr.length <= 10^4`
- `-10^4 <= arr[i] <= 10^4`
- `1 <= k <= arr.length`
- Return the k largest values sorted in descending order.

## Hints

<details>
<summary>Hint 1 — simple sort approach</summary>

Sort the array in descending order, then take the first `k` elements:

```js
return [...arr].sort((a, b) => b - a).slice(0, k);
```

This is O(n log n) time, O(n) space (the copy). Simple and correct.
</details>

<details>
<summary>Hint 2 — can we do better?</summary>

If k << n, it seems wasteful to sort the entire array just to take k elements. A more efficient approach uses a **min-heap of size k**:

- Maintain a heap of the k largest elements seen so far.
- For each new element: if it is larger than the heap's minimum, remove the min and insert the new element.
- After processing all elements, the heap contains the k largest.

This is O(n log k) time, O(k) space. Much better when k is small.

For this problem, the simple sort approach is fine and expected.
</details>

<details>
<summary>Hint 3 — alternative using Quickselect</summary>

Quickselect can find the k-th largest element in O(n) average time. Once you know the k-th largest value, you can partition the array into elements >= that value. But this doesn't sort the result — you'd still need to sort the k elements if order matters.

Quickselect is implemented in Q25.
</details>

## Write your solution
→ [`../solutions/20-k-largest-elements.js`](../solutions/20-k-largest-elements.js)

## Follow-ups
- Implement the heap-based O(n log k) solution.
- If the array is a stream (you receive elements one at a time and can't store them all), which approach do you use?
- What if duplicates are not allowed in the output? (Return the k largest **distinct** values.)
