# Q18 — Next Smaller Element

**Difficulty:** Medium
**Pattern:** Monotonic stack (increasing)
**Expected:** O(n) time · O(n) space

## Problem

Given an array of integers `arr`, for each element find the **nearest smaller element to its right** — the first element to the right that is strictly smaller than the current element. If no such element exists, use `-1`.

## Examples

### Example 1
```
Input:  [4, 5, 2, 10, 8]
Output: [2, 2, -1, 8, -1]
```
- `4`: first smaller to the right is `2`. → `2`
- `5`: first smaller to the right is `2`. → `2`
- `2`: no smaller element to the right. → `-1`
- `10`: first smaller to the right is `8`. → `8`
- `8`: no smaller element to the right. → `-1`

### Example 2
```
Input:  [3, 1, 2, 4]
Output: [1, -1, -1, -1]
```

### Example 3
```
Input:  [1, 2, 3, 4]
Output: [-1, -1, -1, -1]
```

## Constraints
- `1 <= arr.length <= 10^5`
- `-10^6 <= arr[i] <= 10^6`

## Hints

<details>
<summary>Hint 1 — mirror the NGE algorithm</summary>

"Next Greater Element" uses a **decreasing** monotonic stack — you pop when the current element is greater than the top.

"Next Smaller Element" uses an **increasing** monotonic stack — you pop when the current element is **smaller** than the top.

Everything else is the same structure.
</details>

<details>
<summary>Hint 2 — algorithm</summary>

```
result = new Array(n).fill(-1)
stack = []   // stores indexes

for i from 0 to n-1:
  while stack not empty AND arr[stack.top()] > arr[i]:
    result[stack.pop()] = arr[i]   // arr[i] is the next smaller for that index
  stack.push(i)

// remaining items in stack have no smaller element to the right (already -1)
```
</details>

## Write your solution
→ [`../solutions/18-next-smaller-element.js`](../solutions/18-next-smaller-element.js)

## Follow-ups
- Find the **previous smaller element** for each position (look to the left).
- Find the **nearest greater or equal** element to the right.
- Combine next smaller (right) and previous smaller (left) to solve "Largest Rectangle in Histogram" (Q24).
