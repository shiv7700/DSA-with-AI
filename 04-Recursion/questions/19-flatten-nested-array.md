# Q19 — Flatten a Nested Array

**Difficulty:** Medium
**Pattern:** Recursive structural decomposition — process each element, recurse into arrays
**Expected:** O(n) time · O(depth) space — where n = total elements, depth = max nesting

## Problem

Write a recursive function `flattenArray(arr)` that takes a nested array of arbitrary depth and returns a single flat array containing all the non-array values in the original order.

> **Why this problem?** Arrays in real applications are often nested — JSON data, directory trees, etc. This problem teaches you to walk a structure recursively by checking the type of each element: if it's an array, go deeper; if it's a leaf value, collect it. This exact pattern appears in tree traversals, JSON parsing, and DOM manipulation.

## Examples

### Example 1
```
Input:  [1, [2, 3], [4, [5, 6]]]
Output: [1, 2, 3, 4, 5, 6]
```

### Example 2
```
Input:  [[1, [2]], [[[3]]], 4]
Output: [1, 2, 3, 4]
```

### Example 3 (edge cases)
```
Input:  []         → []
Input:  [1, 2, 3]  → [1, 2, 3]   (already flat)
Input:  [[[1]]]    → [1]          (3 levels deep)
```

### Example 4
```
Input:  [1, "hello", [true, [null, 2]]]
Output: [1, "hello", true, null, 2]
```
(Works with any value type, not just numbers.)

## Constraints
- Arrays can be nested to any depth.
- Elements can be any JavaScript value (numbers, strings, booleans, `null`, etc.).
- Do not use the built-in `Array.prototype.flat(Infinity)` (that would defeat the purpose).
- Return a new flat array.

## Hints

<details>
<summary>Hint 1 — the core idea: check if each element is an array</summary>

Walk through the input array. For each element:
- If it's an array: **flatten it recursively** and concatenate the result.
- If it's not an array (it's a leaf value): just add it to the result.

```js
function flattenArray(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));  // recurse and spread
    } else {
      result.push(item);                  // leaf value
    }
  }
  return result;
}
```
</details>

<details>
<summary>Hint 2 — the pure recursive version (no loop)</summary>

If you want to avoid the `for` loop entirely and use only recursion:

```js
function flattenArray(arr, index = 0) {
  if (index === arr.length) return [];
  const item = arr[index];
  const rest = flattenArray(arr, index + 1);

  if (Array.isArray(item)) {
    return [...flattenArray(item), ...rest];
  } else {
    return [item, ...rest];
  }
}
```

Note: using spread with `reduce` is another elegant option:
```js
const flatten = arr =>
  arr.reduce((acc, val) =>
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
```
</details>

<details>
<summary>Hint 3 — trace for [1, [2, [3]]]</summary>

```
flattenArray([1, [2, [3]]])
  item = 1 → not array → push 1
  item = [2, [3]] → is array → recurse
    flattenArray([2, [3]])
      item = 2 → push 2
      item = [3] → recurse
        flattenArray([3])
          item = 3 → push 3
          returns [3]
        spread [3]
      returns [2, 3]
    spread [2, 3]
  returns [1, 2, 3]
```
</details>

## Write your solution
→ [`../solutions/19-flatten-nested-array.js`](../solutions/19-flatten-nested-array.js)

## Follow-ups
- Flatten only 1 level deep (like `Array.prototype.flat(1)`). How do you modify the recursion?
- Flatten up to `maxDepth` levels. Add a `depth` parameter and only recurse while `depth > 0`.
- The built-in: `arr.flat(Infinity)` — know it exists, but now you understand what it does under the hood.
