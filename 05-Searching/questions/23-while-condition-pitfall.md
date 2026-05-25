# Q23 — Pitfall: `while (left <= right)` vs `while (left < right)`

**Difficulty:** Pitfall Drill
**Pattern:** Understanding binary search templates
**Expected:** N/A — this is a conceptual drill, not a coding problem

## Problem

This is a drill designed to force you to articulate the difference between the two main binary search loop conditions. **Answering these questions correctly — in writing — will cement your understanding** and help you avoid the most common binary search bugs.

Answer each question below, then check against the explanations.

---

### Question A

The following code has a bug. Identify it and fix it.

```js
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {          // ← is this right?
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

binarySearch([7], 7);  // Should return 0, but returns -1. Why?
```

---

### Question B

The following is a lower-bound implementation. Identify what happens if you change `while (left < right)` to `while (left <= right)`.

```js
function lowerBound(arr, target) {
  let left = 0;
  let right = arr.length;        // ← note: arr.length, not arr.length - 1

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) left = mid + 1;
    else right = mid;
  }

  return left;
}
```

What goes wrong if you change `<` to `<=`? Give a specific example.

---

### Question C

Write **both** versions of binary search:
1. The standard "exact match" version using `while (left <= right)`.
2. The lower-bound version using `while (left < right)`.

Label every difference between them.

---

## Constraints

No code to submit. This is a written/thinking exercise.

## Hints

<details>
<summary>Answer to Question A</summary>

**Bug:** When `arr = [7]`, `left = 0`, `right = 0`. The condition `left < right` is `0 < 0` = `false`. The loop never runs. We return `-1` without ever checking the single element.

**Fix:** Change `while (left < right)` to `while (left <= right)`. Now `0 <= 0` is `true`, we enter the loop, and `arr[0] === 7` → return 0. ✓

**Rule:** In the standard template (`right = arr.length - 1`), always use `<=`.
</details>

<details>
<summary>Answer to Question B</summary>

If `right = arr.length` (exclusive boundary) and you use `while (left <= right)`, you risk going out of bounds.

Example: `arr = [1, 2, 3]`, `target = 4`. `left=0, right=3`.
- `mid = 1`. `arr[1]=2 < 4`. `left=2`.
- `mid = 2`. `arr[2]=3 < 4`. `left=3`.
- Now `left=3, right=3`. `3 <= 3` is true. `mid=3`. `arr[3]` → **out of bounds (undefined)**!

With `<`, when `left=3, right=3`, the condition `3 < 3` is false → loop stops, we return `left=3` (which means "insert at end"). Correct.

**Rule:** When `right = arr.length` (exclusive), use `<`.
</details>

<details>
<summary>Answer to Question C — the side-by-side comparison</summary>

```
Standard binary search         Lower bound
─────────────────────────      ─────────────────────────
right = arr.length - 1         right = arr.length
while (left <= right) {        while (left < right) {
  ...                            ...
  left  = mid + 1;               left  = mid + 1;
  right = mid - 1;               right = mid;       ← different
}                              }
return -1;                     return left;          ← different
```

Three differences:
1. Initial `right` value.
2. Loop condition (`<=` vs `<`).
3. How `right` moves on the left-branch (`mid - 1` vs `mid`).
</details>

## Write your solution
→ [`../solutions/23-while-condition-pitfall.js`](../solutions/23-while-condition-pitfall.js)

The solution file asks you to implement both versions with tests that expose the difference.

## Follow-ups
- What does `while (left + 1 < right)` give you? (A third template — used in some problems to avoid edge cases. Both `left` and `left + 1` are candidates at exit.)
- Can you construct an input where the standard template gives a wrong answer if you use `right = arr.length` instead of `arr.length - 1`?
