# Q5 — JS `.sort()` Lexicographic Gotcha

**Difficulty:** Easy (Concept Check)
**Pattern:** JavaScript specifics
**Expected:** Understanding + code fix

## Problem

JavaScript's `Array.prototype.sort()` has a well-known trap that catches beginners and experienced developers alike.

Without a comparator function, `.sort()` converts every element to a **string** and sorts them in lexicographic (alphabetical) order. For arrays of strings, this is often what you want. For arrays of numbers, it produces wrong results.

```js
[10, 2, 1, 25, 5].sort();
// What do you expect?  [1, 2, 5, 10, 25]
// What you actually get: ???
```

**Your tasks:**

1. Predict the output of `[10, 2, 1, 25, 5].sort()` and explain why.
2. Write the correct ascending numeric sort.
3. Write the correct descending numeric sort.
4. Without running it, predict the output of `[100, 9, 20, 3].sort()`.
5. `.sort()` mutates the original array. Demonstrate this with an example, then show two ways to sort without mutating the original.
6. What does `[null, 1, undefined, 2, NaN].sort()` produce? (Check the ECMAScript spec behavior if needed.)

## Examples

### Example 1
```
Input:  [10, 2, 1, 25, 5].sort()
Output: [1, 10, 2, 25, 5]
```
Explanation: sorted as strings — "1" < "10" < "2" < "25" < "5" because '1' < '2' < '5' in character code order.

### Example 2
```
Input:  [10, 2, 1, 25, 5].sort((a, b) => a - b)
Output: [1, 2, 5, 10, 25]
```

### Example 3 (mutation)
```
const scores = [50, 30, 80];
const sorted = scores.sort((a, b) => a - b);
sorted === scores;   // true — same array reference!
```

## Constraints

- You must provide working JavaScript code for tasks 2, 3, and 5.
- Tasks 1, 4, and 6 are short-answer or prediction tasks.

## Hints

<details>
<summary>Hint 1 — how string comparison works</summary>

Strings are compared character by character. `"10"` and `"2"`: compare first characters `'1'` vs `'2'`. The character code for `'1'` is 49, for `'2'` is 50. So `"10" < "2"`, meaning `10` sorts before `2`. That is why all numbers starting with `'1'` (10, 100, 1000) come before numbers starting with `'2'`.
</details>

<details>
<summary>Hint 2 — the comparator contract</summary>

`arr.sort(compareFn)` calls `compareFn(a, b)` for pairs of elements:
- If it returns a **negative number** → `a` comes first
- If it returns a **positive number** → `b` comes first  
- If it returns **0** → equal, keep current relative order

So for ascending numbers: `(a, b) => a - b`
- If a = 2 and b = 10: `2 - 10 = -8` (negative) → 2 comes first ✓
- If a = 10 and b = 2: `10 - 2 = 8` (positive) → 2 comes first ✓
</details>

<details>
<summary>Hint 3 — non-mutating sort</summary>

Two approaches:
```js
// Spread into a copy first
const sorted = [...original].sort((a, b) => a - b);

// ES2023 toSorted (returns a new array, does not mutate)
const sorted = original.toSorted((a, b) => a - b);
```
</details>

<details>
<summary>Hint 4 — NaN, null, undefined</summary>

ECMAScript specifies that `undefined` always sorts to the end, regardless of the comparator. `null` is converted to the string `"null"` (or to 0 with a numeric comparator). `NaN` comparisons return `NaN` which is treated as 0 by the sort, leading to unpredictable results — behavior is implementation-dependent.
</details>

## Write your solution
→ [`../solutions/05-sort-gotcha.js`](../solutions/05-sort-gotcha.js)

## Follow-ups
- Why does `[1, 5, 10, 2].sort()` return `[1, 10, 2, 5]` and not `[1, 2, 5, 10]`? Trace through the string comparisons.
- Write a sort comparator for an array of date strings in `"YYYY-MM-DD"` format. Do you need a custom comparator, or does the default work correctly?
