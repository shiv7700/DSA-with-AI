# Q1 — Stable vs. Unstable Sort

**Difficulty:** Easy (Concept Check)
**Pattern:** Sorting fundamentals
**Expected:** Understanding, no code required

## Problem

A sorting algorithm is called **stable** if elements that compare as equal maintain their original relative order in the output.

Consider this list of students, each with a name and an age:

```
Original order:
  1. Carlos  (age 20)
  2. Aisha   (age 22)
  3. Diana   (age 20)
  4. Ben     (age 22)
  5. Elena   (age 19)
```

When you sort this list by **age** (ascending), there are two "correct" results:

**Result A (stable):**
```
Elena  (19)   ← only 19-year-old
Carlos (20)   ← Carlos was before Diana in original
Diana  (20)   ←
Aisha  (22)   ← Aisha was before Ben in original
Ben    (22)   ←
```

**Result B (unstable):**
```
Elena  (19)
Diana  (20)   ← Diana and Carlos swapped vs. original
Carlos (20)   ←
Ben    (22)   ← Ben and Aisha swapped vs. original
Aisha  (22)   ←
```

Both are sorted by age. The difference is whether the original ordering of equal-age students is preserved.

**Your tasks:**

1. In one sentence: what makes a sort "stable"?
2. Give a real-world scenario where stability matters.
3. Which of the following algorithms are stable? Bubble Sort, Merge Sort, Quick Sort, Insertion Sort, Selection Sort, Heap Sort.
4. If you must perform a stable sort in JavaScript using the built-in `.sort()`, can you rely on it being stable? (Hint: check the version of ECMAScript that guaranteed this.)

## Examples

### Example 1
```
Input:  [{ id: 1, val: 3 }, { id: 2, val: 1 }, { id: 3, val: 3 }]
Stable sort by val:   [{ id: 2, val: 1 }, { id: 1, val: 3 }, { id: 3, val: 3 }]
Unstable sort by val: [{ id: 2, val: 1 }, { id: 3, val: 3 }, { id: 1, val: 3 }]  (id 1 and id 3 swapped)
```

## Constraints

This is a conceptual question. Write your answers in comments or a short paragraph — no code required (unless you want to demonstrate with a small example).

## Hints

<details>
<summary>Hint 1 — think about what "equal" means for sorting</summary>

When two elements have the same sort key, the sorting algorithm has to decide which one goes first. A stable algorithm always keeps the one that appeared earlier in the input earlier in the output. An unstable algorithm makes no such promise.
</details>

<details>
<summary>Hint 2 — a practical scenario</summary>

Imagine a spreadsheet. First, you sort all rows by department. Then you sort by last name. With a stable sort, rows within each department stay in last-name order. With an unstable sort, the department grouping from step 1 gets scrambled.

Another scenario: sorting a leaderboard by score. Players with equal scores should keep their timestamp order (whoever scored first stays first).
</details>

<details>
<summary>Hint 3 — the JS guarantee</summary>

ECMAScript 2019 (ES10) officially specified that `Array.prototype.sort` must be stable. Before that, it was implementation-defined. V8 made its sort stable in Chrome 70 / Node.js 11 (2018). In any modern environment, you can rely on `.sort()` being stable.
</details>

## Write your solution
→ [`../solutions/01-stable-vs-unstable.js`](../solutions/01-stable-vs-unstable.js)

## Follow-ups
- Demonstrate stability empirically: write a test that would fail with an unstable sort and pass with a stable one.
- Research why QuickSort is typically unstable, and describe a variant that makes it stable (at the cost of extra space).
