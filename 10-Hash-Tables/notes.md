# Hash Tables — Lessons from Zero

> 👋 Hey. If you just finished the Arrays chapter, you already know that *finding* something in an array takes O(n) time — you have to check every slot. Hash tables are the cure. By the end of these lessons you'll understand why this chapter is the single biggest multiplier on your interview performance.
>
> Total reading time at a relaxed pace: about 100–120 minutes with breaks. **You do not have to read it all in one sitting.**

---

## Table of Lessons

1. [The problem: arrays are slow at lookup](#lesson-1)
2. [The magical answer: a hash function](#lesson-2)
3. [Turning a key into an index — step by step](#lesson-3)
4. [Collisions — when two keys land in the same bucket](#lesson-4)
5. [Separate chaining — buckets as linked lists](#lesson-5)
6. [Open addressing — find the next open slot](#lesson-6)
7. [Average O(1) — but is that always true?](#lesson-7)
8. [Load factor and resizing](#lesson-8)
9. [JavaScript's built-in tools: Object, Map, Set](#lesson-9)
10. [Object vs Map — the real differences](#lesson-10)
11. [Set — when you only care about membership](#lesson-11)
12. [SameValueZero equality and the NaN gotcha](#lesson-12)
13. [WeakMap and WeakSet — the memory-conscious versions](#lesson-13)
14. [The interview superpower: swap O(n²) for O(n)](#lesson-14)
15. [Polynomial rolling hash — a real implementation](#lesson-15)
16. [Why cryptographic hashes are overkill](#lesson-16)
17. [Quick reference — patterns, templates, complexity](#lesson-17)
18. [You did it — what to do next](#lesson-18)

---

<a id="lesson-1"></a>
## Lesson 1 — The problem: arrays are slow at lookup

Let's say you're building a contacts app. You have 10,000 contacts stored in an array:

```js
const contacts = [
  { name: 'Alice',   phone: '555-0101' },
  { name: 'Bob',     phone: '555-0102' },
  // ... 9998 more
  { name: 'Zara',    phone: '555-9999' },
];
```

You want to find Zara's phone number. What does JavaScript have to do?

Start at index 0. Is it Zara? No. Index 1? No. Index 2? No. And so on. It might have to check all 10,000 entries before it finds her (or finds out she doesn't exist). That's **O(n) lookup** — the more contacts you have, the longer it takes.

Now picture this:

```
contacts.includes('Zara')      → O(n)   scan every slot
contacts.indexOf('Zara')       → O(n)   scan every slot
contacts.find(c => c.name === 'Zara') → O(n)   scan every slot
```

For 10 contacts, this is fine. For 10,000, it's tolerable. For 10 million? It starts to feel it. And for interview problems where you nest one O(n) operation inside another loop? You've just created **O(n²)** — potentially a billion operations for n = 100,000.

There has to be a better way.

> 🎯 **Key takeaway**
> Looking up a value in an array by *content* (not by index) always requires scanning — O(n). For large collections with frequent lookups, we need something smarter.

---

<a id="lesson-2"></a>
## Lesson 2 — The magical answer: a hash function

Here's the big idea. What if, instead of storing Zara at some random position in the array, we stored her at an address *derived from her name*?

Specifically: what if we took her name `'Zara'`, ran it through a mathematical function, and that function reliably produced the number `3847`? Then we'd store Zara at index `3847`. And when we want to look her up, we'd compute the same function on `'Zara'`, get `3847` again, and jump directly to slot `3847` — no scanning required.

That mathematical function is called a **hash function**. The slot it points to is called a **bucket**.

```
hash('Zara')  →  3847
hash('Alice') →  1204
hash('Bob')   →  7832

  Buckets:
  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
  │     │     │     │     │     │     │     │     │     │
  └─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘
  0     1     2     3    ...   1204  ...  3847  ...  7832
                               ↑            ↑         ↑
                             Alice         Zara       Bob
```

Now lookup is O(1): compute the hash, jump to that bucket, done. That's it. That's the whole trick.

> 💡 **Tip**
> The word "hash" comes from the kitchen — to "hash" something means to chop it up and mix it. A hash function chops up your key (like the letters in `'Zara'`) and mixes them into a single number. The result should look scrambled and unpredictable, even for very similar inputs.

---

<a id="lesson-3"></a>
## Lesson 3 — Turning a key into an index — step by step

Let's build a simple hash function ourselves. We have an array of 10 buckets (indexes 0–9). We need to turn any string key into a number from 0 to 9.

### Step 1: turn each character into a number

Every character has a numeric code. In JavaScript, `'A'.charCodeAt(0)` returns `65`, `'Z'` returns `90`, `'a'` returns `97`, etc.

```js
'A'.charCodeAt(0)   // 65
'Z'.charCodeAt(0)   // 90
'a'.charCodeAt(0)   // 97
'z'.charCodeAt(0)   // 122
```

### Step 2: combine them somehow

The simplest thing: add all the char codes.

```js
function simpleHash(key, size) {
  let total = 0;
  for (const char of key) {
    total += char.charCodeAt(0);
  }
  return total % size;   // keep it within 0..size-1
}

simpleHash('cat', 10)    // (99 + 97 + 116) % 10 = 312 % 10 = 2
simpleHash('act', 10)    // (97 + 99 + 116) % 10 = 312 % 10 = 2  ← same!
```

Wait — `'cat'` and `'act'` produce the same hash! That's a collision (we'll fix that in Lessons 4–5). For now, notice the core mechanism: **add up character codes, take modulo of the array size**.

### Step 3: use a prime modulus

A common trick for reducing collisions is to use a prime number as the array size. Primes distribute keys more evenly across buckets. That's why you often see hash tables initialized with sizes like 53, 97, or 193 — they're prime.

```js
simpleHash('cat', 53)    // 312 % 53 = 47
simpleHash('act', 53)    // 312 % 53 = 47   ← still a collision, because we're just summing
```

> ⚠️ **Simple summation hashes are weak**
> Adding char codes ignores order: `'cat'` and `'act'` and `'tac'` all produce the same sum. A good hash function should produce wildly different outputs for very similar inputs. We'll see the proper technique — polynomial rolling hashes — in Lesson 15.

---

<a id="lesson-4"></a>
## Lesson 4 — Collisions — when two keys land in the same bucket

No matter how good your hash function is, if you have more keys than buckets, two keys will inevitably land in the same bucket. That's called a **collision**.

Picture a locker bank at a school. There are 100 lockers, numbered 0–99. You have 150 students. By the pigeonhole principle, at least 50 students are going to have to share a locker. It's inevitable — you simply have more students than lockers.

```
hash('Alice') → 7
hash('Eve')   → 7    ← collision! both want bucket 7
```

There are two main strategies to handle this. We'll look at each in the next two lessons.

> 🎯 **Key takeaway**
> Collisions are inevitable when you have more keys than buckets. A good hash table handles them gracefully.

---

<a id="lesson-5"></a>
## Lesson 5 — Separate chaining — buckets as linked lists

In **separate chaining**, each bucket doesn't hold just one value. Instead, it holds a **list** of all the key-value pairs that hashed to this bucket.

Visually, each bucket is a "chain" of items:

```
Bucket array (size 7):

  0  →  [ ]
  1  →  [ ("Alice", "555-0101") ]
  2  →  [ ("Zara", "555-9999") → ("Eve", "555-0505") ]    ← both hashed to 2
  3  →  [ ]
  4  →  [ ("Bob", "555-0102") ]
  5  →  [ ]
  6  →  [ ("Dan", "555-0303") → ("Fay", "555-0707") ]    ← both hashed to 6
```

When you `set('Eve', '555-0505')`:
1. Compute `hash('Eve')` → say, `2`.
2. Go to bucket 2.
3. Append `('Eve', '555-0505')` to the chain at bucket 2.

When you `get('Eve')`:
1. Compute `hash('Eve')` → `2`.
2. Go to bucket 2.
3. Walk the chain at bucket 2 looking for a node whose key is `'Eve'`.
4. Found it. Return `'555-0505'`.

In JavaScript, the chain is usually implemented as an array of `[key, value]` pairs:

```js
class HashMap {
  constructor(size = 53) {
    this.keyMap = new Array(size);   // array of buckets, each bucket starts empty
  }

  _hash(key) {
    let total = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      total = (total * PRIME + key.charCodeAt(i)) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    const idx = this._hash(key);
    if (!this.keyMap[idx]) {
      this.keyMap[idx] = [];        // create the bucket chain
    }
    // check if key already exists (update rather than duplicate)
    for (const pair of this.keyMap[idx]) {
      if (pair[0] === key) { pair[1] = value; return; }
    }
    this.keyMap[idx].push([key, value]);
  }

  get(key) {
    const idx = this._hash(key);
    if (!this.keyMap[idx]) return undefined;
    for (const pair of this.keyMap[idx]) {
      if (pair[0] === key) return pair[1];
    }
    return undefined;
  }
}
```

### Why separate chaining is great

- Simple to implement.
- Even with collisions, lookup is fast *on average* — the chains stay short as long as the table isn't too full.
- Deletions are easy: just remove a node from the list.

> 💡 **Tip**
> The built-in JavaScript `Map` likely uses separate chaining (or a similar strategy) under the hood in V8, though the exact implementation is an engine detail.

---

<a id="lesson-6"></a>
## Lesson 6 — Open addressing — find the next open slot

In **open addressing**, there's only one value per bucket (no chains). When two keys hash to the same bucket, you "probe" nearby buckets until you find an empty one.

The simplest variant is **linear probing**: if bucket `h` is taken, try `h+1`, then `h+2`, and so on (wrapping around with modulo).

```
Inserting 'Alice' → hash = 3 → bucket 3 is empty → store there
Inserting 'Eve'   → hash = 3 → bucket 3 is taken → try 4 → empty → store there
Inserting 'Dan'   → hash = 3 → bucket 3 is taken → try 4 → taken → try 5 → empty → store there

  0  [  ]
  1  [  ]
  2  [  ]
  3  [ Alice ]    ← original hash
  4  [ Eve   ]    ← probed +1
  5  [ Dan   ]    ← probed +2
  6  [  ]
```

When looking up `'Dan'`:
1. Compute hash → 3.
2. Bucket 3 has `'Alice'`, not `'Dan'`. Probe forward.
3. Bucket 4 has `'Eve'`, not `'Dan'`. Keep probing.
4. Bucket 5 has `'Dan'`. Found it.

### Problems with linear probing

- **Clustering:** once you have a run of occupied buckets, new insertions keep extending the run, making lookups slower over time.
- **Deletion is tricky:** you can't just erase a slot, because future probes use it as a stepping stone. You typically mark deleted slots as "tombstones."

Other variants — **quadratic probing** (try `h+1`, `h+4`, `h+9`, ...) and **double hashing** (use a second hash function to compute the step size) — reduce clustering.

> 🎯 **Key takeaway**
> Separate chaining uses extra memory for the chains but handles collisions cleanly. Open addressing uses less memory but degrades as the table fills up. Most production hash maps use some variant of separate chaining.

---

<a id="lesson-7"></a>
## Lesson 7 — Average O(1) — but is that always true?

You've heard "hash tables are O(1) for lookup, insert, and delete." That's true **on average**, but the full picture is:

| Operation | Average case | Worst case |
|-----------|-------------|------------|
| `set(key, value)` | O(1) | O(n) |
| `get(key)` | O(1) | O(n) |
| `delete(key)` | O(1) | O(n) |
| `has(key)` | O(1) | O(n) |

### When does worst case happen?

When all keys hash to the **same bucket**. If your 1,000 keys all hash to bucket 5, then `get` has to scan a chain of 1,000 items — that's O(n).

In practice, a good hash function distributes keys uniformly so this almost never happens with real data. But it's not impossible, and some adversarial inputs can deliberately trigger it (called a **hash flooding attack**).

```
All at bucket 5:

  5  → [ key1 → key2 → key3 → key4 → ... → key1000 ]
          ↑ every get() scans this entire chain
```

Modern languages (including Python, Java, and browsers running JavaScript) randomize part of their hash function at startup to prevent hash flooding from external data.

> ⚠️ **For interviews, always say "amortized O(1) average case" when asked about hash map complexity.** The interviewer knows the worst case exists; mentioning it shows you've thought it through.

---

<a id="lesson-8"></a>
## Lesson 8 — Load factor and resizing

Imagine a hash table with 10 buckets holding 50 key-value pairs. On average, each bucket holds 5 items. Even with perfect distribution, every lookup has to scan 5 nodes. The table is **too full**.

The **load factor** is defined as:

```
load factor = number of stored items / number of buckets
```

When the load factor gets too high, the table **resizes**: it allocates a bigger array (typically double the size) and **rehashes** every existing key into the new table.

```
Before resize (load factor = 10/10 = 1.0 — too full!):

  0  [ Alice, Bob ]     ← chains growing long
  1  [ Eve, Dan, Fay ]
  2  [ ... ]
  ...

After resize to 20 buckets (load factor = 10/20 = 0.5 — much better):

  0  [ Alice ]          ← shorter chains
  1  [ Eve ]
  2  [ Bob ]
  3  [ Fay ]
  ...
```

A typical threshold is `0.75`: when more than 75% of buckets are used, resize. The resize operation is O(n) — it has to rehash everything — but it happens so rarely that the **amortized** cost per insert is still O(1).

> 💡 **Tip**
> This is the same "amortized O(1)" reasoning as `Array.push()`. Most of the time a single operation is fast; occasionally you pay a big one-time cost, but averaged over many operations the cost per step stays constant.

> 🎯 **Key takeaway**
> Load factor = items / buckets. When it exceeds ~0.75, the table resizes (doubles) and rehashes everything. This keeps chains short and lookup fast.

---

<a id="lesson-9"></a>
## Lesson 9 — JavaScript's built-in tools: Object, Map, Set

JavaScript gives you three built-in "hash-like" tools. Beginners often reach for plain `{}` objects out of habit — but there are specific situations where `Map` or `Set` is the right choice.

Let's meet all three.

### Object `{}`

You already know this one. It's the plain JavaScript dictionary:

```js
const ages = {};
ages['Alice'] = 30;
ages['Bob'] = 25;

console.log(ages['Alice']);   // 30
console.log('Bob' in ages);   // true
delete ages['Bob'];
```

An `Object` is basically a built-in hash map — keys are strings (or Symbols), values are anything.

### Map

`Map` is a purpose-built key-value collection added in ES6:

```js
const ages = new Map();
ages.set('Alice', 30);
ages.set('Bob', 25);

console.log(ages.get('Alice'));   // 30
console.log(ages.has('Bob'));     // true
ages.delete('Bob');
console.log(ages.size);           // 1
```

### Set

`Set` stores unique values — no keys, just values. Think of it as "an array that only stores each item once":

```js
const seen = new Set();
seen.add('apple');
seen.add('banana');
seen.add('apple');   // duplicate, silently ignored

console.log(seen.size);          // 2
console.log(seen.has('apple'));  // true
seen.delete('banana');
```

> 🎯 **Key takeaway**
> `Object` → key-value with string/Symbol keys. `Map` → key-value with any key type. `Set` → unique values only. All three have average-O(1) operations.

---

<a id="lesson-10"></a>
## Lesson 10 — Object vs Map — the real differences

They look similar, but the differences matter. Here's the full breakdown.

### 1. Key types

```js
const m = new Map();
m.set(42, 'a number key');
m.set(true, 'a boolean key');
m.set({ id: 1 }, 'an object as a key!');
m.set(NaN, 'even NaN works');
```

With a plain object, every key is automatically coerced to a string:

```js
const o = {};
o[42] = 'stored as "42" string';
o[{ id: 1 }] = 'stored as "[object Object]" string — oops!';
```

If you need non-string keys, **you must use `Map`**.

### 2. Insertion order

`Map` **always** preserves insertion order when you iterate. Older browsers' objects did not reliably do this. Modern JavaScript technically preserves insertion order for string keys, but:
- Integer-like keys (`'0'`, `'1'`, `'42'`) are sorted numerically first.
- Symbol keys are iterated last.
- It's weird and surprising.

```js
const obj = {};
obj['b'] = 2;
obj['a'] = 1;
obj['10'] = 10;
obj['2'] = 2;
console.log(Object.keys(obj));   // ['2', '10', 'a', 'b']  ← integer keys sorted first!

const map = new Map([['b', 2], ['a', 1], ['10', 10], ['2', 2]]);
console.log([...map.keys()]);    // ['b', 'a', '10', '2']  ← insertion order, always
```

If you care about the order your keys come out, **use `Map`**.

### 3. Size

```js
const m = new Map([['a', 1], ['b', 2]]);
m.size;         // 2   ← built-in .size property

const o = { a: 1, b: 2 };
Object.keys(o).length;   // 2  ← you have to compute it
```

### 4. Prototype pollution

A plain object inherits from `Object.prototype`, so it comes with built-in keys:

```js
const o = {};
'toString' in o;          // true  ← inherited, could collide with your data
'hasOwnProperty' in o;   // true

const m = new Map();
m.has('toString');        // false  ← clean slate, no inheritance
```

This is why, if you're using an object as a frequency counter, you sometimes see `Object.create(null)` instead of `{}` — it creates an object with *no* prototype, so no inherited keys.

### 5. Performance in hot loops

`Map` is consistently faster than `Object` for frequent `get`/`set`/`delete` operations, especially with a large number of entries. If you're doing millions of hash operations in a tight loop, use `Map`.

### The quick rule

```
Use Object when:                     Use Map when:
────────────────────────────         ────────────────────────────
Your keys are strings or Symbols     Keys can be any type
You want JSON serialization          You care about insertion order
You're modeling a record/entity      You need .size
Structure is known at design time    Frequent add/delete
```

---

<a id="lesson-11"></a>
## Lesson 11 — Set — when you only care about membership

`Set` is perfect when you need to answer: "Have I seen this value before?" or "Is this value in my collection?" — without caring about any associated data.

```js
// ── deduplication ──────────────────────────────────────
const arr = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(arr)];   // [1, 2, 3, 4]

// ── membership check ───────────────────────────────────
const banned = new Set(['spam@evil.com', 'bot@bad.com']);
function isAllowed(email) {
  return !banned.has(email);   // O(1) check
}

// ── counting unique items ──────────────────────────────
const words = ['cat', 'dog', 'cat', 'bird', 'dog'];
console.log(new Set(words).size);   // 3  (cat, dog, bird)
```

### Set API — everything you need

```js
const s = new Set([1, 2, 3]);

s.add(4);           // add a value
s.has(2);           // true  — O(1) membership check
s.delete(2);        // remove a value
s.size;             // 3  (after the delete)
s.clear();          // remove everything

// Iteration
for (const val of s) { … }
[...s]              // convert to array
```

### Set operations (JavaScript doesn't have built-ins, but here's how)

```js
// Union (all unique values from both)
const union = new Set([...setA, ...setB]);

// Intersection (only in both)
const intersection = new Set([...setA].filter(x => setB.has(x)));

// Difference (in A but not B)
const difference = new Set([...setA].filter(x => !setB.has(x)));
```

> 💡 **Tip**
> `Set` is the fastest way to deduplicate an array in JavaScript: `[...new Set(arr)]`. It's one line, readable, and O(n).

---

<a id="lesson-12"></a>
## Lesson 12 — SameValueZero equality and the NaN gotcha

`Map` and `Set` use an equality algorithm called **SameValueZero** — not strict equality (`===`) and not `Object.is()`.

The three differ only in two edge cases:

| Value | `===` | `Object.is()` | SameValueZero |
|-------|-------|---------------|---------------|
| `NaN === NaN` | `false` | `true` | `true` |
| `+0 === -0` | `true` | `false` | `true` |

### The NaN thing

```js
NaN === NaN;   // false   ← JavaScript's infamous quirk

const s = new Set();
s.add(NaN);
s.add(NaN);   // NOT a duplicate in regular ===, but...
s.size;        // 1!  ← Set correctly treats NaN as equal to itself
```

So `Set` and `Map` *correctly* treat `NaN` as equal to `NaN`. That's the SameValueZero behavior.

```js
const m = new Map();
m.set(NaN, 'not a number');
m.get(NaN);   // 'not a number'  ← works!
```

This matters in interview problems where your input might contain `NaN` (rare, but happens).

### The +0 / -0 thing

```js
Object.is(+0, -0);   // false — they're different!

const s = new Set();
s.add(+0);
s.add(-0);
s.size;    // 1  ← Set treats +0 and -0 as the same
```

In practice, you'll almost never deal with `-0` in interview problems. But it's good to know `Set` and `Map` collapse them to the same key.

> ✋ **Pause and try**
> What does `new Set([NaN, NaN, 1, 2, NaN]).size` return?
>
> <details>
> <summary>Show answer</summary>
>
> `3` — because `NaN` is treated as equal to itself under SameValueZero, so all three `NaN` entries are collapsed into one. The set contains `{NaN, 1, 2}`.
> </details>

---

<a id="lesson-13"></a>
## Lesson 13 — WeakMap and WeakSet — the memory-conscious versions

JavaScript has garbage collection: when nothing references an object anymore, the memory is freed. Here's the problem with regular `Map`:

```js
let button = document.querySelector('#myButton');
const handlers = new Map();
handlers.set(button, someHandler);

button = null;   // we're done with the button
// But handlers still holds a reference to the original DOM element!
// The DOM element can never be garbage-collected. Memory leak.
```

`WeakMap` solves this. Its keys are **weakly held** — if nothing else refers to the key object, the garbage collector can delete both the key and the value automatically.

```js
let button = document.querySelector('#myButton');
const handlers = new WeakMap();
handlers.set(button, someHandler);

button = null;
// Now nothing else references the DOM element.
// The WeakMap entry is automatically cleaned up. No leak.
```

### Rules and limitations of WeakMap

- Keys must be **objects** (not primitives). `weakMap.set('string', val)` throws.
- **Not iterable** — you can't loop through a WeakMap or get `.size`. You can only `get`, `set`, `delete`, and `has` if you already have the key.
- These restrictions are intentional. If you could iterate, you'd see keys that the garbage collector might have removed — undefined behavior.

### WeakSet is the same idea for sets

```js
const visitedNodes = new WeakSet();

function processNode(node) {
  if (visitedNodes.has(node)) return;   // already done
  visitedNodes.add(node);
  // ... process node ...
}
```

When `node` objects fall out of scope, `WeakSet` releases them automatically. No accumulation.

### When to use WeakMap / WeakSet

| Use case | Tool |
|----------|------|
| Cache per DOM element | `WeakMap` |
| Private data per class instance | `WeakMap` |
| "Have I visited this graph node?" | `WeakSet` |
| Event listeners per object | `WeakMap` |

> ⚠️ **Don't reach for WeakMap as a default**. In interviews and most algorithmic code, a regular `Map` is exactly what you want. WeakMap is an advanced tool for specific memory-management scenarios.

---

<a id="lesson-14"></a>
## Lesson 14 — The interview superpower: swap O(n²) for O(n)

This is the most important lesson for interviews. Once you internalize this pattern, a whole class of problems becomes straightforward.

### The naive approach — O(n²)

Here's a problem: given `[2, 7, 11, 15]` and target `9`, find two numbers that add up to target.

Naive approach: try every pair.

```js
function twoSum_brute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
}
```

This is O(n²). For n = 10,000, that's 100,000,000 operations. Slow.

### The hash-map approach — O(n)

The insight: for each number `x`, the number we need is `target - x`. Instead of scanning the whole array for that partner, we store every number we've seen in a `Map`. Then for each new number, we check the map in O(1).

```js
function twoSum(nums, target) {
  const seen = new Map();   // value → index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen.has(complement)) {
      return [seen.get(complement), i];   // found the pair!
    }

    seen.set(nums[i], i);   // remember this number for later
  }
}
```

One pass through the array, O(1) per step → **O(n) total**. We traded O(n) extra memory for the `seen` map, and in exchange we got to drop from O(n²) to O(n).

### The general pattern

Whenever you find yourself writing a nested loop to check "have I seen something that relates to what I'm looking at now?", ask:

> "Can I remember what I've seen so far in a hash map, and look it up in O(1)?"

This is the pattern behind Two Sum, Group Anagrams, Longest Consecutive Sequence, Subarray Sum Equals K, and dozens of other interview problems.

```
"For each element, check if its complement/pair/partner exists"
                        ↓
          Use a Map/Set to remember what you've seen
                        ↓
            O(1) lookup instead of O(n) scan
                        ↓
            O(n) total instead of O(n²)
```

> 🎯 **Key takeaway**
> Trading memory for speed is the core idea of every hash-table-based interview solution. See an O(n²) solution? Ask "can a hash map cut this to O(n)?" The answer is yes far more often than you'd guess.

---

<a id="lesson-15"></a>
## Lesson 15 — Polynomial rolling hash — a real implementation

Remember our simple hash from Lesson 3 (just summing char codes)? It was bad because `'cat'` and `'act'` produced the same hash. The fix is to make position count.

A **polynomial rolling hash** multiplies each character's code by a power of a prime number `p`, based on its position:

```
hash("cat") = charCode('c') * p^2
            + charCode('a') * p^1
            + charCode('t') * p^0
            (all mod some large prime or bucket count)
```

The base `p` is usually a small prime like `31` (for lowercase letters) or `53` (for all letters).

```js
function polynomialHash(key, tableSize) {
  const PRIME = 31;
  let hash = 0;
  let power = 1;

  for (let i = key.length - 1; i >= 0; i--) {
    hash = (hash + key.charCodeAt(i) * power) % tableSize;
    power = (power * PRIME) % tableSize;
  }

  return hash;
}

polynomialHash('cat', 1000)   // 99 + 97*31 + 116*961 = 99 + 3007 + 111476 = 114582 → 582
polynomialHash('act', 1000)   // 97 + 99*31 + 116*961 = 97 + 3069 + 111476 = 114642 → 642
//                              ↑ different! order now matters
polynomialHash('tac', 1000)   // 116 + 97*31 + 99*961 = 116 + 3007 + 95139  = 98262 → 262
```

Each anagram produces a different hash. That's exactly what we want.

### Why use a prime base?

Primes have a useful property: they "spread out" the contributions from each character position so they're less likely to cancel each other out or cluster together. With a non-prime base (say, 10), certain characters would repeatedly land on the same hash values.

### The "rolling" in rolling hash

"Rolling" refers to an optimization: if you're hashing a fixed-length window that slides along a string (e.g., Rabin-Karp substring search), you can update the hash in O(1) by removing the contribution of the exiting character and adding the contribution of the new one:

```
window "cat" → window "ate" (shift right by one):
new_hash = (old_hash - charCode('c') * p^(w-1)) * p + charCode('e')
```

This is how Rabin-Karp achieves O(n) string search rather than O(n*m).

> 🔬 **Going deeper (optional)**
> The Rabin-Karp algorithm and string hashing have their own deep rabbit hole. For most interview problems, you won't need to implement polynomial rolling hash from scratch — but knowing what it is means you can answer "what makes a good hash function?" with confidence.

---

<a id="lesson-16"></a>
## Lesson 16 — Why cryptographic hashes are overkill

When people hear "hash", they sometimes think of SHA-256 or MD5 — the cryptographic hashes used for passwords and file verification. These are completely different from the hash functions inside a hash table, and using one for the other is major overkill.

### The difference

| | Hash table hash | Cryptographic hash |
|--|-----------------|-------------------|
| **Speed** | Must be extremely fast (called millions of times) | Can be slow (security, not speed, is the goal) |
| **Purpose** | Distribute keys across buckets | Verify integrity; resist preimage attacks |
| **Reversibility** | Doesn't need to be irreversible | Must be computationally irreversible |
| **Output size** | Typically 32–64 bits | 256–512 bits (SHA-256, SHA-512) |
| **Collision resistance** | Collisions are tolerable (just handled by chaining) | Must be essentially impossible to find a collision |
| **Example** | MurmurHash, FNV, xxHash | SHA-256, SHA-3, bcrypt |

### The practical consequence

If you used SHA-256 as your hash table's hash function:
- It would work correctly (SHA-256 distributes keys very evenly).
- It would be catastrophically slow — SHA-256 is orders of magnitude slower than a purpose-built table hash.
- It would waste 256 bits of output when you only need a number from 0 to 52.

For data structures, use a fast, non-cryptographic hash. Save cryptographic hashes for authentication, file verification, and digital signatures.

> ⚠️ **Interview gotcha**: if an interviewer asks "should we use SHA-256 as the hash function for our hash table?", the correct answer is "no" — and now you know exactly why.

---

<a id="lesson-17"></a>
## Lesson 17 — Quick reference — patterns, templates, complexity

Here's your cheat sheet. Everything here we've covered in the lessons above.

### Complexity table

| Operation | Map/Set (average) | Map/Set (worst) | Array |
|-----------|-------------------|-----------------|-------|
| `set` / `add` | O(1) | O(n) | O(1) push, O(n) unshift |
| `get` / `has` | O(1) | O(n) | O(n) scan |
| `delete` | O(1) | O(n) | O(n) splice |
| Iteration | O(n) | O(n) | O(n) |

### Object vs Map vs Set — one-line summary

```
Object  → string keys, JSON-serializable, model an entity/record
Map     → any key type, ordered iteration, faster for many ops
Set     → unique values only, membership check in O(1)
WeakMap → object keys, GC-friendly, not iterable
WeakSet → object values, GC-friendly, not iterable
```

### Frequency counter template

"Count how many times each value appears":

```js
function buildFrequencyMap(arr) {
  const freq = new Map();
  for (const x of arr) {
    freq.set(x, (freq.get(x) ?? 0) + 1);
  }
  return freq;
}
```

### Complement lookup template (Two Sum pattern)

"For each item, check if its partner has already been seen":

```js
function findPair(nums, target) {
  const seen = new Map();   // value → index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return null;
}
```

### "Have I seen this?" template (cycle detection, deduplication)

```js
function hasDuplicate(arr) {
  const seen = new Set();
  for (const x of arr) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}
```

### Grouping template (Group Anagrams pattern)

"Group items by a key":

```js
function groupBy(items, keyFn) {
  const groups = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return groups;
}
```

### Prefix sum + Map template (Subarray Sum Equals K)

"Count subarrays with a given property using a running sum":

```js
function subarrayCount(nums, k) {
  const prefixSums = new Map([[0, 1]]);   // sum → count
  let sum = 0, count = 0;
  for (const n of nums) {
    sum += n;
    count += (prefixSums.get(sum - k) ?? 0);
    prefixSums.set(sum, (prefixSums.get(sum) ?? 0) + 1);
  }
  return count;
}
```

### ASCII diagram — separate chaining

```
HashMap with size 7, containing 5 entries:

  Bucket array
  ┌─────┬──────────────────────────────────────────────────┐
  │  0  │  null                                            │
  ├─────┼──────────────────────────────────────────────────┤
  │  1  │  → ["apple", 1]                                  │
  ├─────┼──────────────────────────────────────────────────┤
  │  2  │  → ["grape", 2] → ["fig", 5]  (collision!)       │
  ├─────┼──────────────────────────────────────────────────┤
  │  3  │  null                                            │
  ├─────┼──────────────────────────────────────────────────┤
  │  4  │  → ["banana", 3]                                 │
  ├─────┼──────────────────────────────────────────────────┤
  │  5  │  → ["cherry", 4]                                 │
  ├─────┼──────────────────────────────────────────────────┤
  │  6  │  null                                            │
  └─────┴──────────────────────────────────────────────────┘

  get("fig") → hash("fig") = 2 → scan chain at bucket 2
             → "grape" ≠ "fig", keep going
             → "fig" = "fig" ✓ → return 5
```

### Map/Set API quick reference

```js
// ── Map ─────────────────────────────────────────────────
const m = new Map();
m.set(key, value)       // add or update
m.get(key)              // retrieve (undefined if missing)
m.has(key)              // boolean
m.delete(key)           // remove, returns boolean
m.size                  // count of entries
m.clear()               // remove all
for (const [k, v] of m) { … }   // iterate in insertion order
[...m.keys()]           // array of keys
[...m.values()]         // array of values
[...m.entries()]        // array of [key, value] pairs
new Map([[k1, v1], [k2, v2]])    // initialize from pairs

// ── Set ─────────────────────────────────────────────────
const s = new Set();
s.add(value)            // add (duplicate is ignored)
s.has(value)            // boolean — O(1)
s.delete(value)         // remove
s.size                  // count of unique values
s.clear()               // remove all
for (const v of s) { … }        // iterate in insertion order
[...s]                  // convert to array
new Set([v1, v2, v3])   // initialize from iterable
```

---

<a id="lesson-18"></a>
## Lesson 18 — You did it. Now what?

Let's take stock of what you just learned.

1. **Why hash tables exist** — O(n) array lookup is too slow for large data; hash tables give O(1) average.
2. **How hash functions work** — char codes, polynomial combination, modulo.
3. **Collisions are inevitable** — separate chaining and open addressing both handle them.
4. **Average O(1) is conditional** — worst case is O(n) if all keys land in one bucket; load factor and resizing keep this rare.
5. **JavaScript's tools** — `Object`, `Map`, and `Set`, their differences, and when to use each.
6. **SameValueZero equality** — `Map` and `Set` treat `NaN === NaN`, unlike `===`.
7. **WeakMap / WeakSet** — same idea but GC-friendly; use for DOM caching, private data.
8. **The interview superpower** — any time you'd write a nested loop, ask "can a hash map flatten this to O(n)?"
9. **Polynomial rolling hash** — why order matters and how to hash strings properly.
10. **Cryptographic hashes are different** — SHA-256 is for security, not for data structures.

### What to do next

1. Open [`questions/00-implement-hashmap.md`](./questions/00-implement-hashmap.md). Build a HashMap from scratch. It's optional but deeply educational — understanding it from first principles will make every other problem in this chapter feel smaller.
2. Then work through the Easy questions in order. Each one targets a specific idea from these lessons.
3. Once the Easy ones feel routine, tackle the Medium problems — that's where the interesting combinations live.

### Pacing

- **Don't rush to the Hard problems.** The Medium problems have the highest return on investment for interviews.
- **The patterns repeat.** After Group Anagrams, the "sort and group" key idea shows up everywhere. After Subarray Sum Equals K, prefix-sum+map is a skill you own.
- **If you get stuck**, come back to Lesson 14's "complement lookup" template. A huge fraction of hash-table problems are variations of Two Sum.

You've got this. See you in [Q0](./questions/00-implement-hashmap.md). 💪
