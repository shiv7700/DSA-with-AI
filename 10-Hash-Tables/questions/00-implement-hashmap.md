# Q0 — Implement a HashMap from Scratch

**Difficulty:** Medium (but deeply educational — do this one first)
**Pattern:** Hash function · Separate chaining · Resizing
**Expected:** O(1) average time per operation · O(n) space

## Problem

Build your own `HashMap` class without using JavaScript's built-in `Map`, `Object`, or `Set` as a backing store.

Your class must support the following operations:

| Method | Description |
|--------|-------------|
| `new HashMap(size?)` | Construct a hash map. Default bucket count is `53`. |
| `set(key, value)` | Store the value under the key. If the key already exists, update it. |
| `get(key)` | Return the value for the key, or `undefined` if not found. |
| `delete(key)` | Remove the key (and its value). Return `true` if it existed, `false` otherwise. |
| `has(key)` | Return `true` if the key exists. |
| `keys()` | Return an array of all unique keys. |
| `values()` | Return an array of all values. |
| `get size()` | Return the number of stored key-value pairs as a number. |

**Part 2 (stretch):** After your basic version works, add automatic resizing: when `load factor > 0.75`, double the bucket array and rehash everything.

> **Why build this?** You will never use this in production — JavaScript's `Map` is better in every way. But once you implement it yourself, you *own* the concept. Every hash-table interview question becomes familiar territory.

## Examples

```js
const map = new HashMap();

map.set('name', 'Alice');
map.set('age', 30);
map.set('name', 'Bob');   // update existing key

map.get('name');   // 'Bob'
map.get('city');   // undefined
map.has('age');    // true
map.size;          // 2

map.delete('age');
map.has('age');    // false
map.size;          // 1

map.keys();        // ['name']
map.values();      // ['Bob']
```

## Constraints

- Keys will always be strings.
- Values can be any JavaScript value.
- Your `_hash(key)` method must return an integer in the range `[0, bucketCount - 1]`.
- Use **separate chaining** (each bucket is an array of `[key, value]` pairs).
- Do not use `Map`, `Set`, or plain object `{}` as the backing store — use `new Array(size)`.

## Hints

<details>
<summary>Hint 1 — the hash function</summary>

Use a polynomial rolling hash. Iterate over each character of the key, accumulating a hash value:

```js
_hash(key) {
  const PRIME = 31;
  let hash = 0;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    hash = (hash * PRIME + key.charCodeAt(i)) % this.keyMap.length;
  }
  return hash;
}
```

Limiting to the first 100 characters keeps the hash fast for very long keys.
</details>

<details>
<summary>Hint 2 — set and get with chaining</summary>

Each bucket starts as `undefined`. When you need to store something in a bucket, create an empty array there first. Each entry in the array is a two-element array `[key, value]`.

For `set`: hash the key, go to the bucket, scan the chain for the key. If you find it, update the value. If not, push a new `[key, value]` pair.

For `get`: hash the key, go to the bucket, scan the chain for the key. If found, return the value. If not found, return `undefined`.
</details>

<details>
<summary>Hint 3 — keys() and values()</summary>

To collect all keys, iterate over every bucket (many will be `undefined` — skip those). For each non-empty bucket, iterate over its chain and collect the first element of each `[key, value]` pair.

```js
keys() {
  const result = [];
  for (const bucket of this.keyMap) {
    if (bucket) {
      for (const [key] of bucket) {
        result.push(key);
      }
    }
  }
  return result;
}
```
</details>

<details>
<summary>Hint 4 — resizing (stretch goal)</summary>

Track an internal `_count` that you increment on each `set` (new key) and decrement on each `delete`. After any `set`, check:

```js
if (this._count / this.keyMap.length > 0.75) {
  this._resize();
}
```

`_resize()` should create a new bucket array of double the length, then call `set` on the new table for every existing `[key, value]` pair.

Why double? Doubling ensures the resize happens at most O(log n) times as the map grows, keeping the amortized cost per insert at O(1).
</details>

## Write your solution
→ [`../solutions/00-implement-hashmap.js`](../solutions/00-implement-hashmap.js)

## Follow-ups
- Add an `entries()` method that returns an array of `[key, value]` pairs.
- Make your HashMap iterable with `Symbol.iterator` so you can use `for...of` on it.
- What would change if you used **open addressing** (linear probing) instead of separate chaining? Try implementing that variant too.
- Benchmark your HashMap against JavaScript's `Map` for 1,000,000 inserts. How close do you get?
