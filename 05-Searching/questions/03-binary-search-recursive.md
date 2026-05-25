# Q3 — Recursive Binary Search

**Difficulty:** Easy
**Pattern:** Binary search (recursive)
**Expected:** O(log n) time · O(log n) space (call stack)

## Problem

You are given a **sorted** (ascending) array of distinct integers `arr` and a `target` integer. Return the **index** of `target` using **recursive** binary search. Return `-1` if not found.

You may not use a loop — the halving must happen through recursive function calls.

> **Why implement both forms?** The recursive form directly mirrors the mathematical definition of binary search: "search left half OR right half, recursively." Understanding both versions deepens your intuition and prepares you for divide-and-conquer problems where recursion is natural.

## Examples

### Example 1
```
Input:  arr = [1, 3, 5, 7, 9, 11, 13], target = 7
Output: 3
```

### Example 2
```
Input:  arr = [2, 4, 6, 8, 10], target = 5
Output: -1
```

### Example 3 (target at first index)
```
Input:  arr = [10, 20, 30, 40, 50], target = 10
Output: 0
```

### Example 4 (target at last index)
```
Input:  arr = [10, 20, 30, 40, 50], target = 50
Output: 4
```

## Constraints
- `1 <= arr.length <= 10^5`
- `-10^9 <= arr[i], target <= 10^9`
- `arr` is sorted in strictly ascending order.
- Implement using recursion — no `while`/`for` loops.

## Hints

<details>
<summary>Hint 1 — function signature and base case</summary>

Your recursive function should accept `arr`, `target`, `left`, and `right`. Use default parameter values so the initial call looks clean:

```js
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1)
```

The base case: if `left > right`, the search space is empty — return `-1`.
</details>

<details>
<summary>Hint 2 — the recursive step</summary>

Compute `mid` exactly as in the iterative version. Then:
- If `arr[mid] === target`, return `mid`.
- If `arr[mid] < target`, recursively search the right half: call with `left = mid + 1`.
- Otherwise, search the left half: call with `right = mid - 1`.

Each call reduces the search space by half — that's what gives you O(log n) time even with recursion.
</details>

<details>
<summary>Hint 3 — space complexity</summary>

Each recursive call adds one frame to the JavaScript call stack. Since you halve the space each time, you'll have at most log₂(n) frames on the stack simultaneously. That's O(log n) space — more than the iterative O(1), but still tiny.
</details>

## Write your solution
→ [`../solutions/03-binary-search-recursive.js`](../solutions/03-binary-search-recursive.js)

## Follow-ups
- What is the maximum recursion depth for an array of 10^6 elements? (~20 levels — well within JavaScript's stack limit.)
- Rewrite it so it also returns the number of recursive calls it made.
- Can you implement it with *tail recursion*? (JavaScript doesn't optimize tail calls in V8, but the form is educational.)
