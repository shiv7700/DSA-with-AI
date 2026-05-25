# Q16 — How Does Array.prototype.sort Work in V8?

**Difficulty:** Medium (Conceptual)
**Pattern:** JS internals — sort algorithm and complexity
**Expected:** Written explanation with a code correctness example

## Question

`Array.prototype.sort()` in JavaScript is a built-in method. Your question has two parts:

**Part A — Algorithm:** What sorting algorithm does V8 (Node.js/Chrome) use for `Array.prototype.sort()`? What is its time complexity (best, average, worst case)? What is its space complexity?

**Part B — Correctness pitfall:** The following code has a subtle bug. Identify it and explain why.

```js
const nums = [10, 2, 1, 25, 5, 100, 3];
nums.sort();
console.log(nums);  // What does this print? Is it correct?
```

Show the fix and explain why the default sort behaves the way it does.

## Examples

```
// What you expect:
Input:  [10, 2, 1, 25, 5, 100, 3]
Output: [1, 2, 3, 5, 10, 25, 100]

// What you actually get with nums.sort():
Output: [1, 10, 100, 2, 25, 3, 5]    ← sorted as strings, not numbers
```

## Hints

<details>
<summary>Hint 1 — what algorithm is Timsort?</summary>

V8 uses **Timsort** (since Node.js 11 / V8 7.0). Timsort is a hybrid of merge sort and insertion sort. It:
- Detects natural "runs" (already-sorted sequences) in the input.
- Uses insertion sort for small runs (fast in practice due to low overhead).
- Merges runs using merge sort.

Time complexity: O(n log n) in all cases (best, average, worst). Space complexity: O(n) — it needs auxiliary space for the merge step.

Before Timsort, V8 used quicksort for large arrays (O(n²) worst case). Timsort eliminated that worst case.
</details>

<details>
<summary>Hint 2 — why does default sort() treat elements as strings?</summary>

The ECMAScript specification defines the default sort comparator as: convert each element to a string, then compare lexicographically (dictionary order). `'10' < '2'` because `'1' < '2'` as the first character.

This is useful for arrays of strings (alphabetical sort) but wrong for numbers. You must always provide a numeric comparator when sorting numbers.
</details>

<details>
<summary>Hint 3 — the correct comparator</summary>

```js
nums.sort((a, b) => a - b);   // ascending
nums.sort((a, b) => b - a);   // descending
```

The comparator `(a, b) => a - b` returns:
- negative if a should come before b
- positive if b should come before a
- zero if they're equal

This is the standard numeric sort comparator. Memorize it.
</details>

## Write your answer
→ [`../solutions/16-array-sort-algorithm.js`](../solutions/16-array-sort-algorithm.js)

## Follow-ups
- Is `Array.prototype.sort()` **stable**? (Does it preserve the original order of equal elements?) Look it up — when did this become a guaranteed part of the spec?
- What is the space complexity of Timsort? Why does it need extra space (unlike in-place sorts like heapsort)?
- What algorithm would you use if you needed to sort an array of 5 elements vs 5 million elements? Does `Array.sort` do something smart for small arrays?
- Write a sort that arranges objects by a `name` property alphabetically, handling case-insensitivity.
