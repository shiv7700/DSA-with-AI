# Q23 — Validate Stack Sequences

**Difficulty:** Medium
**Pattern:** Stack — simulate push/pop sequence
**Expected:** O(n) time · O(n) space

## Problem

Given two integer arrays `pushed` and `popped`, each with distinct values and the same length `n`, return `true` if this could be the result of a sequence of push and pop operations on an initially empty stack.

## Examples

### Example 1
```
Input:  pushed = [1, 2, 3, 4, 5],  popped = [4, 5, 3, 2, 1]
Output: true
```
One valid sequence: push 1, push 2, push 3, push 4, pop 4, push 5, pop 5, pop 3, pop 2, pop 1.

### Example 2
```
Input:  pushed = [1, 2, 3, 4, 5],  popped = [4, 3, 5, 1, 2]
Output: false
```
After popping 4 and 3, the stack is [1, 2, 5]. Popping 5 then 1 is impossible — 2 is on top of 1.

## Constraints
- `1 <= pushed.length == popped.length <= 1000`
- `0 <= pushed[i], popped[i] <= 1000`
- All values in `pushed` are distinct.

## Hints

<details>
<summary>Hint 1 — simulate with a real stack</summary>

Simulate the process directly. Use a real auxiliary stack and two pointers (or indexes) into `pushed` and `popped`.

1. Push elements from `pushed` one by one.
2. After each push, check if the current top matches `popped[popIdx]`. If yes, pop and advance `popIdx`. Repeat while the condition holds.
3. After processing all pushes, if `popIdx === n`, the sequence is valid.
</details>

<details>
<summary>Hint 2 — trace for Example 2</summary>

```
pushed=[1,2,3,4,5], popped=[4,3,5,1,2]
pushIdx=0, popIdx=0

Push 1: stack=[1]. Top=1 ≠ 4. Continue.
Push 2: stack=[1,2]. Top=2 ≠ 4. Continue.
Push 3: stack=[1,2,3]. Top=3 ≠ 4. Continue.
Push 4: stack=[1,2,3,4]. Top=4 == popped[0]=4. Pop! stack=[1,2,3], popIdx=1.
         Top=3 == popped[1]=3. Pop! stack=[1,2], popIdx=2.
Push 5: stack=[1,2,5]. Top=5 == popped[2]=5. Pop! stack=[1,2], popIdx=3.
         Top=2 ≠ popped[3]=1. Stop.
All pushed. stack=[1,2], popIdx=3.
popped[3]=1, but top is 2. Pop would give 2, not 1.
→ stack is not empty and doesn't match → return false. ✅
```
</details>

## Write your solution
→ [`../solutions/23-validate-stack-sequences.js`](../solutions/23-validate-stack-sequences.js)

## Follow-ups
- Can you solve this in O(1) extra space (not counting the input arrays)?
- What if values in `pushed` are not distinct? Does the algorithm need to change?
