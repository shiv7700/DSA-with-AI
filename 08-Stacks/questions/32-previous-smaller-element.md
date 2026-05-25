# Q32 — Previous Smaller Element

**Difficulty:** Medium (Monotonic Stack Drill)
**Pattern:** Monotonic stack (increasing)
**Expected:** O(n) time · O(n) space

## Problem

Given an array `arr` of integers, for each element return the **nearest smaller element to its left**. If no such element exists (nothing to the left is smaller), return `-1` for that position.

## Examples

### Example 1
```
Input:  [1, 6, 4, 10, 2, 5]
Output: [-1, 1, 1, 4, 1, 2]
```
- `arr[0]=1`: nothing to the left. → `-1`
- `arr[1]=6`: nearest smaller to the left is `1`. → `1`
- `arr[2]=4`: nearest smaller to the left is `1`. → `1`
- `arr[3]=10`: nearest smaller to the left is `4`. → `4`
- `arr[4]=2`: nearest smaller to the left is `1`. → `1`
- `arr[5]=5`: nearest smaller to the left is `2`. → `2`

### Example 2
```
Input:  [4, 3, 2, 1]
Output: [-1, -1, -1, -1]
```

### Example 3
```
Input:  [1, 2, 3, 4]
Output: [-1, 1, 2, 3]
```

## Constraints
- `1 <= arr.length <= 10^5`
- `-10^6 <= arr[i] <= 10^6`

## Hints

<details>
<summary>Hint 1 — process left to right, increasing stack</summary>

Maintain an **increasing** stack from bottom to top (smallest at bottom).

For each element `arr[i]`:
1. Pop elements from the stack that are **greater than or equal** to `arr[i]` — they can't be the "previous smaller" for future elements either.
2. If the stack is empty: `result[i] = -1`. Otherwise: `result[i] = stack.top()`.
3. Push `arr[i]`.

Because you maintain an increasing stack, `stack.top()` is always the nearest element to the left that is smaller than `arr[i]`.
</details>

<details>
<summary>Hint 2 — trace [1, 6, 4, 10, 2, 5]</summary>

```
i=0, val=1:  stack=[], result[0]=-1. push 1. stack=[1]
i=1, val=6:  top=1 < 6, don't pop. result[1]=1. push 6. stack=[1,6]
i=2, val=4:  top=6 ≥ 4, pop 6. top=1 < 4, stop. result[2]=1. push 4. stack=[1,4]
i=3, val=10: top=4 < 10, don't pop. result[3]=4. push 10. stack=[1,4,10]
i=4, val=2:  top=10 ≥ 2, pop. top=4 ≥ 2, pop. top=1 < 2, stop. result[4]=1. push 2. stack=[1,2]
i=5, val=5:  top=2 < 5. result[5]=2. push 5. stack=[1,2,5]
```
Result: [-1, 1, 1, 4, 1, 2] ✅
</details>

## Write your solution
→ [`../solutions/32-previous-smaller-element.js`](../solutions/32-previous-smaller-element.js)

## Follow-ups
- Find the **previous greater** element for each position.
- Combine this with Q18 (next smaller) to compute the "width" of each element as the largest extent it can be the minimum — this is the core of Largest Rectangle in Histogram (Q24).
