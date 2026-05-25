# Q6 — V8's TimSort

**Difficulty:** Easy (Concept Check)
**Pattern:** JavaScript internals
**Expected:** Understanding, no code required

## Problem

**TimSort** is the sorting algorithm used by JavaScript's V8 engine (the engine behind Chrome and Node.js) to implement `Array.prototype.sort`. It is also used by Python, Java, and Android.

TimSort is a **hybrid algorithm** that combines Merge Sort and Insertion Sort to exploit naturally occurring patterns in real-world data.

**Your tasks:**

1. In your own words, what is TimSort? Describe it in 2–3 sentences.

2. TimSort starts by scanning for "runs." What is a run, and why are runs useful?

3. For short runs (below ~32–64 elements), TimSort uses Insertion Sort instead of continuing to divide. Why? What property of Insertion Sort makes it ideal for small or nearly-sorted sequences?

4. Fill in the blanks:

   ```
   TimSort worst-case time complexity: O(_______)
   TimSort best-case time complexity:  O(_______)
   TimSort space complexity:           O(_______)
   TimSort stable:                     ___________
   ```

5. Since V8's `.sort()` uses TimSort, should you ever implement your own sort for production JavaScript? When might you implement a sort from scratch?

6. TimSort's sort became stable in V8 in Chrome ___ / Node.js ___. (Research the version numbers.)

## Examples

### Example 1 — a run in real data

```
Partial temperature readings for a week:
[18, 19, 21, 22, 20, 17, 18, 19, 23]
      ↑ ascending run ↑   ↑ another run ↑

TimSort detects [18, 19, 21, 22] as a run (length 4) and
[17, 18, 19, 23] as another run (length 4).

It then merges these two runs efficiently.
If the array were already fully sorted, TimSort finds one giant run
and returns immediately: O(n) best case.
```

### Example 2 — Insertion Sort advantage

```
Nearly sorted: [1, 2, 3, 5, 4, 6, 7, 8]
                            ↑ ↑ only these two are swapped

Insertion Sort: spots that 4 needs to move one position left.
Inner loop runs exactly once. Total: O(n) — essentially a single pass.

Merge Sort: still divides recursively into single elements and rebuilds.
Doesn't exploit the nearly-sorted nature.
```

## Constraints

Conceptual question. Short answers and research.

## Hints

<details>
<summary>Hint 1 — what is a "run"?</summary>

A run is a maximal sequence of consecutive elements that are already in order (ascending or descending). For example, in `[3, 5, 7, 2, 4, 6]`, the runs are `[3, 5, 7]` and `[2, 4, 6]`. Real-world data often has many natural runs (e.g., time-series data, partially-sorted records), and TimSort exploits these instead of starting from scratch.
</details>

<details>
<summary>Hint 2 — why insertion sort for small chunks?</summary>

For n < ~32, the overhead of recursive calls in Merge Sort (function calls, memory allocation) exceeds the gains from better asymptotic complexity. Insertion Sort has tiny constant factors and excellent cache locality for small arrays. TimSort extends short runs to a minimum size using Insertion Sort before merging.
</details>

<details>
<summary>Hint 3 — stability guarantee</summary>

ECMAScript 2019 (ES10) added the formal requirement that `Array.prototype.sort` be stable. V8 made `.sort()` stable with Chrome 70 (released October 2018) and Node.js 11. In practice, any version you're likely to target supports stable sort.
</details>

## Write your solution
→ [`../solutions/06-timsort.js`](../solutions/06-timsort.js)

## Follow-ups
- Python also uses TimSort. Find the original Python implementation notes by Tim Peters (the "listsort.txt" file in the CPython repository). What specific optimizations does he describe?
- What is "galloping mode" in TimSort? When does it activate, and why does it help?
