# Q20 — Recursively Traverse a Nested Object and Collect Leaf Values

**Difficulty:** Medium
**Pattern:** Recursive structural decomposition — walk an object/tree, collect leaves
**Expected:** O(n) time · O(depth) space — where n = total key-value pairs

## Problem

Write a recursive function `collectLeaves(obj)` that traverses a deeply nested JavaScript object and returns an array of all **leaf values** — values that are not plain objects (i.e., numbers, strings, booleans, `null`, arrays).

> **Why this problem?** In real-world code, you deal with deeply nested JSON all the time (API responses, config files, DOM representations). Recursively walking a tree-shaped object is one of the most practical recursive skills you can have. This is also the first problem where the "tree" isn't explicitly a tree — it's an object, which is implicitly tree-shaped.

## Examples

### Example 1
```
Input:
{
  name: "Alice",
  age: 30,
  address: {
    city: "NYC",
    zip: "10001"
  }
}
Output: ["Alice", 30, "NYC", "10001"]
```

### Example 2
```
Input:
{
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
}
Output: [1, 2, 3]
```

### Example 3 (edge cases)
```
Input:  {}       → []
Input:  {x: 5}   → [5]
```

### Example 4 (arrays are leaves)
```
Input:  { scores: [10, 20], name: "Bob" }
Output: [[10, 20], "Bob"]    ← the array [10,20] is a single leaf
```
(We don't recurse into arrays — only into plain objects.)

## Constraints
- The object can be nested to any depth.
- Only recurse into plain objects (check with `typeof val === 'object' && val !== null && !Array.isArray(val)`).
- Arrays, primitives, and `null` are all considered leaf values.
- Return leaves in the order they are encountered (depth-first, key-insertion order).

## Hints

<details>
<summary>Hint 1 — when is something a "leaf"?</summary>

A value is a leaf if it is NOT a plain object. In JavaScript:

```js
function isPlainObject(val) {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}
```

- `42`, `"hello"`, `true`, `null`, `[1,2,3]` — all leaves.
- `{ a: 1 }` — NOT a leaf, it's an object to recurse into.
</details>

<details>
<summary>Hint 2 — the recursion</summary>

Iterate over the object's values. For each value:
- If it's a plain object: recurse into it and collect its leaves.
- Otherwise: it's a leaf — collect it.

```js
function collectLeaves(obj) {
  const result = [];
  for (const val of Object.values(obj)) {
    if (isPlainObject(val)) {
      result.push(...collectLeaves(val));   // recurse
    } else {
      result.push(val);                    // leaf
    }
  }
  return result;
}
```
</details>

<details>
<summary>Hint 3 — trace for {a:1, b:{c:2, d:3}}</summary>

```
collectLeaves({a:1, b:{c:2, d:3}})
  val = 1 → leaf → push 1
  val = {c:2, d:3} → plain object → recurse
    collectLeaves({c:2, d:3})
      val = 2 → leaf → push 2
      val = 3 → leaf → push 3
      returns [2, 3]
    spread [2, 3]
  returns [1, 2, 3]
```
</details>

<details>
<summary>Hint 4 — collecting key-value pairs instead of just values</summary>

To collect `{key, value}` pairs at the leaves (useful in real apps):

```js
function collectLeafPairs(obj, path = '') {
  const result = [];
  for (const [key, val] of Object.entries(obj)) {
    const fullPath = path ? `${path}.${key}` : key;
    if (isPlainObject(val)) {
      result.push(...collectLeafPairs(val, fullPath));
    } else {
      result.push({ path: fullPath, value: val });
    }
  }
  return result;
}
```
</details>

## Write your solution
→ [`../solutions/20-traverse-nested-object.js`](../solutions/20-traverse-nested-object.js)

## Follow-ups
- Modify `collectLeaves` to also recurse into arrays (i.e., treat array elements as part of the tree).
- Write `deepEqual(obj1, obj2)` using similar recursive traversal — check that two objects have the same structure and values.
- This exact traversal logic is used in `JSON.stringify`, Lodash's `_.flattenDeep`, and virtually every tree-diffing algorithm.
