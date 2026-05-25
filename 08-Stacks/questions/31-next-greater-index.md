# Q31 — Next Greater Element (Index)

**Difficulty:** Medium (Monotonic Stack Drill)
**Pattern:** Monotonic stack (decreasing)
**Expected:** O(n) time · O(n) space

## Problem

Given an array `arr` of integers, for each element return the **index** of the next greater element to its right. If no such element exists, return `-1` for that position.

(Sibling of Q17, but returns indexes instead of values.)

## Examples

### Example 1
```
Input:  [2, 1, 5, 3, 6]
Output: [2, 2, 4, 4, -1]
```
- `arr[0]=2`: next greater is `5` at index `2`. → `2`
- `arr[1]=1`: next greater is `5` at index `2`. → `2`
- `arr[2]=5`: next greater is `6` at index `4`. → `4`
- `arr[3]=3`: next greater is `6` at index `4`. → `4`
- `arr[4]=6`: no next greater. → `-1`

### Example 2
```
Input:  [3, 2, 1]
Output: [-1, -1, -1]
```

### Example 3
```
Input:  [1, 2, 3, 4]
Output: [1, 2, 3, -1]
```

## Constraints
- `1 <= arr.length <= 10^5`
- `-10^6 <= arr[i] <= 10^6`

## Hints

<details>
<summary>Hint 1 — monotonic stack storing indexes</summary>

Use a decreasing monotonic stack that stores **indexes** (not values). When the current element `arr[i]` is greater than `arr[stack.top()]`, pop and record `i` as the answer for that popped index.

```js
const result = new Array(n).fill(-1);
const stack = [];  // stores indexes

for (let i = 0; i < n; i++) {
  while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
    result[stack.pop()] = i;
  }
  stack.push(i);
}
```

Remaining items in the stack have no next greater element → stay `-1`.
</details>

## Write your solution
→ [`../solutions/31-next-greater-index.js`](../solutions/31-next-greater-index.js)

## Follow-ups
- Return the **value** of the next greater element instead of its index.
- Find the next **greater or equal** element.
- What changes if you want the next greater element to the **left** (previous greater)?
