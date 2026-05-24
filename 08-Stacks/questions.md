# Stacks

> LIFO. Whenever you see "matching", "nearest previous", "undo", "function calls" — think stack.

## Concept Check

1. Stack operations and their complexity: `push`, `pop`, `peek`, `isEmpty`.
2. Implement a stack using:
   - An array
   - A linked list
3. Why is the call stack a stack? What is stack overflow?
4. When would you choose a stack over a queue?
5. What is a monotonic stack? When is it useful?

## Implement First

```js
class Stack {
  constructor() { this.items = []; }
  push(x)   { this.items.push(x); }
  pop()     { return this.items.pop(); }
  peek()    { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  size()    { return this.items.length; }
}
```
Then redo it with a **linked list** backing.

## Easy

1. Reverse a string using a stack.
2. Reverse an array using a stack.
3. Check if a string of brackets is balanced: `()[]{}`.
4. Check if a string is a palindrome using a stack.
5. Sort a stack using only one extra stack.
6. Implement two stacks in a single array.
7. Convert decimal to binary using a stack.

## Medium

8. **Valid Parentheses** — `()[]{}` matched correctly.
9. **Min Stack** — `push`, `pop`, `top`, `getMin` all in O(1).
10. **Max Stack** — same as above but for max.
11. **Implement Stack using Queues** (one or two queues).
12. **Evaluate Reverse Polish Notation** — postfix calculator.
13. **Infix to Postfix conversion**.
14. **Evaluate an Infix Expression** — with `+ - * / ( )`.
15. **Decode String** — `3[a2[bc]]` → `abcbcabcbcabcbc`.
16. **Daily Temperatures** — next warmer day (monotonic stack).
17. **Next Greater Element I & II** (II uses circular array).
18. **Next Smaller Element**.
19. **Asteroid Collision**.
20. **Remove K Digits** — smallest number after removing k digits.
21. **Backspace String Compare** — strings with `#` as backspace.
22. **Simplify Path** — Unix-style file path normalization.
23. **Validate Stack Sequences**.

## Hard

24. **Largest Rectangle in Histogram** — monotonic stack, O(n).
25. **Maximal Rectangle** — in a binary matrix.
26. **Trapping Rain Water** — using stack approach.
27. **Basic Calculator** — `+ - ( )` with arbitrary nesting.
28. **Basic Calculator II** — `+ - * /` no parens.
29. **Basic Calculator III** — all of the above plus parens.
30. **Longest Valid Parentheses** — using stack.

## Monotonic Stack Drill

31. Given an array, for each element find the index of the next greater element.
32. Given an array, for each element find the index of the previous smaller element.
33. Stock span problem — number of consecutive days price was ≤ today's.
