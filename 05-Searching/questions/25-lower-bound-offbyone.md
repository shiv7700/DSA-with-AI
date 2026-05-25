# Q25 — Pitfall: Off-by-one in Lower Bound (`right = mid` vs `right = mid - 1`)

**Difficulty:** Pitfall Drill
**Pattern:** Understanding pointer updates in the lower-bound template
**Expected:** N/A — conceptual drill

## Problem

This drill targets the most frequent off-by-one error in lower-bound binary search: using `right = mid - 1` when you should use `right = mid`.

---

### Question A

The following lower-bound implementation has a bug. Find it and explain why it's wrong.

```js
function lowerBound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;   // ← is this right?
    }
  }

  return left;
}

// Test:
lowerBound([1, 3, 5, 7], 3);   // Should return 1, returns ???
```

Trace the execution step by step to show the wrong result.

---

### Question B

Explain in one sentence why `right = mid` is correct and `right = mid - 1` is wrong in the lower-bound template.

---

### Question C

By contrast, in the **standard binary search** (exact match, `right = arr.length - 1`), why is `right = mid - 1` correct?

---

### Question D

Complete this table. For each template, fill in the correct `right` update on the "go left" branch.

| Template          | `right` init    | Loop condition | Go-left update |
|-------------------|-----------------|----------------|----------------|
| Standard (exact)  | `arr.length - 1`| `left <= right`| `right = ???`  |
| Lower bound       | `arr.length`    | `left < right` | `right = ???`  |
| Upper bound       | `arr.length`    | `left < right` | `right = ???`  |

---

## Hints

<details>
<summary>Answer to Question A — tracing the bug</summary>

`arr = [1, 3, 5, 7]`, `target = 3`. Correct answer: index 1.

```
left=0, right=4
mid=2. arr[2]=5. 5 >= 3. → right = mid - 1 = 1.

left=0, right=1
mid=0. arr[0]=1. 1 < 3.  → left = mid + 1 = 1.

left=1, right=1. 1 < 1 is false. Stop. Return 1. ✓
```

Wait — it gives 1 here. Let's try `target = 5`:

```
left=0, right=4
mid=2. arr[2]=5. 5 >= 5. → right = mid - 1 = 1.   ← WRONG! We just excluded the answer.

left=0, right=1
mid=0. arr[0]=1. 1 < 5. → left = 1.

left=1, right=1. Stop. Return 1.  ← Wrong! The first index ≥ 5 is 2, not 1.
```

`right = mid - 1` excluded index 2 (where `arr[2] = 5`) even though 5 is a valid candidate for the answer. We threw it away.
</details>

<details>
<summary>Answer to Question B</summary>

When `arr[mid] >= target`, `mid` could be the answer (it satisfies `arr[mid] >= target`). Setting `right = mid - 1` excludes `mid` from consideration, potentially throwing away the correct answer. Setting `right = mid` keeps `mid` as a candidate while still shrinking the search space (because `left < right` prevents an infinite loop when `left = mid`).
</details>

<details>
<summary>Answer to Question C</summary>

In the standard template, when `arr[mid] > target`, `mid` is definitely NOT the answer (we know the target is strictly less than `arr[mid]`, so the answer must be to the left of `mid`). It's safe to move `right = mid - 1` to skip `mid`.

The key difference: **in standard search you've already confirmed `arr[mid] !== target` before branching** — so `mid` can be excluded. In lower bound, `arr[mid] >= target` means `mid` could still be the answer, so you can't exclude it.
</details>

<details>
<summary>Answer to Question D</summary>

| Template          | `right` init    | Loop condition | Go-left update |
|-------------------|-----------------|----------------|----------------|
| Standard (exact)  | `arr.length - 1`| `left <= right`| `right = mid - 1` |
| Lower bound       | `arr.length`    | `left < right` | `right = mid`     |
| Upper bound       | `arr.length`    | `left < right` | `right = mid`     |
</details>

## Write your solution
→ [`../solutions/25-lower-bound-offbyone.js`](../solutions/25-lower-bound-offbyone.js)

The solution file asks you to implement both the **broken** and **correct** lower bound, with tests that expose the difference.

## Follow-ups
- Write a test suite that catches all three pitfalls covered in Q23, Q24, Q25. Run your earlier Q2, Q7 solutions against it.
- Memorize the mnemonic: **"In lower bound, mid might BE the answer — don't throw it away."**
