# Q31 — LRU Cache

**Difficulty:** Hard
**Pattern:** Doubly Linked List + Hash Map
**Expected:** O(1) time for both `get` and `put` · O(capacity) space

## Problem

Design a data structure that follows the **Least Recently Used (LRU)** cache eviction policy.

Implement the `LRUCache` class:
- `LRUCache(capacity)` — Initialize the cache with positive size `capacity`.
- `get(key)` — Return the value of the key if it exists, otherwise return `-1`. Accessing a key counts as recently used.
- `put(key, value)` — Update the value if the key exists; insert it if not. When the cache reaches capacity and needs to insert a new key, evict the **least recently used** key first.

Both `get` and `put` must run in **O(1)** time.

## Examples

### Example 1
```
LRUCache cache = new LRUCache(2);   // capacity 2

cache.put(1, 1);   // cache: {1=1}
cache.put(2, 2);   // cache: {1=1, 2=2}
cache.get(1);      // returns 1  (1 is now most recently used)
cache.put(3, 3);   // evicts key 2 (LRU), cache: {1=1, 3=3}
cache.get(2);      // returns -1  (evicted)
cache.put(4, 4);   // evicts key 1 (LRU), cache: {4=4, 3=3}
cache.get(1);      // returns -1  (evicted)
cache.get(3);      // returns 3
cache.get(4);      // returns 4
```

## Constraints
- `1 <= capacity <= 3000`
- `0 <= key <= 10^4`
- `0 <= value <= 10^5`
- Up to `2 * 10^5` calls to `get` and `put`.

## Hints

<details>
<summary>Hint 1 — why O(1) requires two data structures</summary>

A `Map` gives O(1) key lookup, but doesn't tell you which key was used least recently.

A **doubly linked list** in most-recently-used to least-recently-used order lets you move a node to the front in O(1) (because you have `prev` and `next` pointers) and evict from the back in O(1).

Combining both: `Map(key → DLL node)` + DLL gives O(1) for both operations.
</details>

<details>
<summary>Hint 2 — doubly linked list design</summary>

Maintain a DLL with a **dummy head** (MRU end) and a **dummy tail** (LRU end):

```
dummy_head <-> [most recently used] <-> ... <-> [least recently used] <-> dummy_tail
```

On `get(key)`: look up the node in the map, move it to right after `dummy_head`, return its value.

On `put(key, value)`:
- If key exists: update value, move node to front.
- If key doesn't exist: create new node, insert after `dummy_head`, add to map.
  - If `size > capacity`: remove the node just before `dummy_tail` (the LRU), delete its key from the map.
</details>

<details>
<summary>Hint 3 — helper methods to keep it clean</summary>

Implement two private helpers:
- `_addToFront(node)` — insert a node right after `dummy_head`.
- `_remove(node)` — remove a node from wherever it is in the DLL.

Every `get` and `put` operation becomes: `_remove` the node + `_addToFront` it.
</details>

## Write your solution
→ [`../solutions/31-lru-cache.js`](../solutions/31-lru-cache.js)

## Follow-ups
- **LFU Cache** — evict the least **frequently** used key (and among ties, the least recently used). More complex — requires two maps and a frequency-ordered DLL.
- Why can't you use a plain JavaScript `Map` alone for LRU (even though insertion-order is preserved in JS Maps)?
