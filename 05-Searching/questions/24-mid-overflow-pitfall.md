# Q24 — Pitfall: Integer Overflow and the `mid` Calculation

**Difficulty:** Pitfall Drill
**Pattern:** Understanding the `mid` formula
**Expected:** N/A — conceptual drill

## Problem

This drill covers a subtle but important difference between how `mid` is calculated in JavaScript vs lower-level languages. Understanding it helps you write portable, interview-ready code.

---

### Question A

In C++ or Java with 32-bit integers, the following line has a bug:

```cpp
int mid = (left + right) / 2;
```

What is the bug? Does it affect JavaScript?

---

### Question B

What does this JavaScript expression evaluate to, and why?

```js
const left = 2000000000;
const right = 2000000001;
const mid = Math.floor((left + right) / 2);

console.log(mid);   // ?
```

Is `mid` correct here in JavaScript?

---

### Question C

What is the overflow-safe formula for `mid`, and why is it equivalent?

```js
const mid = left + Math.floor((right - left) / 2);
```

Prove algebraically that this gives the same result as `Math.floor((left + right) / 2)`.

---

### Question D

Write a binary search that uses the overflow-safe formula. What's the only change from the standard template?

---

## Constraints

Written/thinking exercise. No external submission.

## Hints

<details>
<summary>Answer to Question A</summary>

**The bug:** In C++/Java, `int` is 32 bits, max value ~2.1 billion. If `left = 1,500,000,000` and `right = 2,000,000,000`, then `left + right = 3,500,000,000` — which **overflows** a 32-bit int, wrapping around to a negative number. The resulting `mid` is wrong (negative), and the loop may jump to a wrong position or run forever.

**JavaScript:** JavaScript uses 64-bit floating-point numbers (IEEE 754 double precision). These can represent integers exactly up to 2^53 ≈ 9 × 10^15. Since array indexes won't exceed that, `left + right` doesn't overflow. So in JavaScript, `(left + right) / 2` is safe.

**But:** Write the safe form anyway — it makes your code understandable to others and transferable to other languages.
</details>

<details>
<summary>Answer to Question B</summary>

```js
left + right = 4000000001
Math.floor(4000000001 / 2) = Math.floor(2000000000.5) = 2000000000
```

`mid = 2000000000`. This is correct. JavaScript handles it fine because 4000000001 is well within the 2^53 safe integer range.
</details>

<details>
<summary>Answer to Question C — algebraic proof</summary>

```
left + Math.floor((right - left) / 2)

Let d = right - left (always non-negative since left <= right)

= left + Math.floor(d / 2)
= Math.floor(left + d / 2)     (left is an integer, adding floor of fraction)
= Math.floor(left + (right - left) / 2)
= Math.floor((2*left + right - left) / 2)
= Math.floor((left + right) / 2)   ✓
```
</details>

<details>
<summary>Answer to Question D</summary>

Only line 5 changes:

```js
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);  // ← safe form

    if (arr[mid] === target) return mid;
    if (arr[mid] < target)   left  = mid + 1;
    else                     right = mid - 1;
  }

  return -1;
}
```
</details>

## Write your solution
→ [`../solutions/24-mid-overflow-pitfall.js`](../solutions/24-mid-overflow-pitfall.js)

The solution file asks you to implement binary search using the overflow-safe `mid` formula and add a comment explaining why.

## Follow-ups
- In JavaScript, `Number.MAX_SAFE_INTEGER = 2^53 - 1 = 9,007,199,254,740,991`. At what array size would even the safe form be at risk? (Never in practice — V8 doesn't support arrays larger than ~4 billion elements.)
- Why does C++ use `int` instead of `long` for array indexes by default? (Historical reasons — on 32-bit systems, pointers were 32 bits. Modern C++ idiom uses `size_t` or `ptrdiff_t` to avoid this.)
