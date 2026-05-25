# Q5 — Sort a Stack

**Difficulty:** Easy
**Pattern:** Stack — use one extra stack
**Expected:** O(n²) time · O(n) space

## Problem

Given a stack of integers, sort it so that the **smallest item is on top**. You may use **one additional temporary stack**, but no other data structures (no arrays, no queues, no sets).

You may not use any built-in sort methods.

## Examples

### Example 1
```
Input stack (top to bottom):  [3, 1, 4, 2]   (3 is on top)
Output stack (top to bottom): [1, 2, 3, 4]   (1 is on top)
```

### Example 2
```
Input:  [5]
Output: [5]
```

### Example 3
```
Input:  []
Output: []
```

### Example 4
```
Input (top to bottom):  [2, 2, 1, 3]
Output (top to bottom): [1, 2, 2, 3]
```

## Constraints
- The stack can hold up to 1000 integers.
- `−10^6 <= values <= 10^6`
- You may only use a second stack as extra storage — no arrays, sets, or other structures.
- The original stack object should be sorted in place.

## Hints

<details>
<summary>Hint 1 — think of insertion sort</summary>

This is essentially **insertion sort** using a stack instead of an array.

Consider: if the temporary stack is already sorted (smallest on top), you want to insert a new element into its correct position.

To insert `x` into a sorted temp stack:
1. Pop elements from temp that are smaller than `x` — push them back to the original stack temporarily.
2. Push `x` onto temp.
3. Move everything you temporarily moved back from original to temp.
</details>

<details>
<summary>Hint 2 — full algorithm</summary>

```
temp = empty stack

while original is not empty:
  x = original.pop()
  while temp is not empty AND temp.peek() < x:
    original.push(temp.pop())   // move smaller items back
  temp.push(x)                  // x lands in the right spot

// Now temp holds the sorted stack, smallest on top
```

After this loop, move everything from temp back to original (so the result is in the original stack), or just return temp — whichever the problem asks for.
</details>

## Write your solution
→ [`../solutions/05-sort-stack.js`](../solutions/05-sort-stack.js)

## Follow-ups
- What is the time complexity of this approach? Can you do better than O(n²)?
- Sort the stack so the **largest** item is on top instead.
- Can you sort a stack recursively using only the call stack as extra storage (no second stack)? Think carefully about what recursion actually uses under the hood.
