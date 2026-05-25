# Q15 — Why is arr.includes(x) O(n) but set.has(x) O(1)?

**Difficulty:** Easy–Medium (Conceptual + Practical)
**Pattern:** Data structure comparison — linear scan vs hash lookup
**Expected:** Written explanation with code example

## Question

`arr.includes(x)` and `set.has(x)` both answer the same question: "is `x` in this collection?" Yet their time complexities are very different.

Your answer should:
1. Explain why `arr.includes(x)` is O(n).
2. Explain why `set.has(x)` is O(1) on average.
3. Show with a code snippet how this matters — when would using `Set` vs `Array` for membership checks make a real difference?

## Examples

```js
// Array includes: O(n)
const arr = [1, 2, 3, 4, 5];
arr.includes(3);    // must scan: 1, 2, 3 — found at index 2
arr.includes(99);   // must scan: 1, 2, 3, 4, 5 — not found (n steps)

// Set has: O(1)
const set = new Set([1, 2, 3, 4, 5]);
set.has(3);    // direct hash lookup — ~1 step
set.has(99);   // direct hash lookup — ~1 step
```

Why is the Set faster? What "trick" does it use that an array cannot?

## Hints

<details>
<summary>Hint 1 — arrays store elements by position, not by value</summary>

An array at its core is just numbered slots. To answer "is 99 in here?", the only option is: check slot 0, check slot 1, ..., check slot n-1. There's no shortcut — the value 99 could be anywhere (or nowhere).

This is why `includes`, `indexOf`, and `find` are all O(n): they have no choice but to scan.
</details>

<details>
<summary>Hint 2 — Sets use hashing to skip the scan</summary>

A `Set` stores values through a **hash function**: it takes the value (say, 99) and computes a number from it (e.g., 99 mod bucket_count). That number is an index into an internal bucket array.

To check if 99 is in the set: compute the hash → jump to that bucket → check it. One step (approximately), regardless of how many items are in the set.

This is why `Set.has()` and `Map.get()` are O(1) average: the hash function tells you exactly where to look.
</details>

<details>
<summary>Hint 3 — when does this matter in practice?</summary>

The difference is irrelevant for small collections. But inside a loop:

```js
// O(n²) — includes inside a loop
for (const item of bigList) {
  if (otherArray.includes(item)) { ... }   // O(n) per iteration
}

// O(n) — Set.has inside a loop
const lookupSet = new Set(otherArray);     // O(n) to build, once
for (const item of bigList) {
  if (lookupSet.has(item)) { ... }         // O(1) per iteration
}
```

With n = 10,000 items, the first version does ~100 million checks. The second does ~20,000.
</details>

## Write your answer
→ [`../solutions/15-array-includes-vs-set.js`](../solutions/15-array-includes-vs-set.js)

## Follow-ups
- Build the "includes-in-a-loop" scenario above with n = 100,000 and benchmark both versions. What do you observe?
- `Set.has()` is O(1) **average** — what could make it O(n) worst case? (Hint: hash collisions.)
- `Map.has(key)`, `Map.get(key)`, and `Map.set(key, value)` are all O(1) average. How does a `Map` differ from a `Set`?
- What is the space cost of converting an array to a Set for the purpose of O(1) lookups?
