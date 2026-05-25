# Q30 — Copy List with Random Pointer

**Difficulty:** Hard
**Pattern:** Hash map node cloning
**Expected:** O(n) time · O(n) space

## Problem

You are given a linked list where each node contains:
- `val` (integer)
- `next` (pointer to next node, or `null`)
- `random` (pointer to any node in the list, or `null`)

Return a **deep copy** of the list. The deep copy should consist of entirely new nodes. The `next` and `random` pointers of the new nodes should point to new nodes in the copy, mirroring the original structure.

## Examples

### Example 1
```
Original list (shown as [val, random_index]):
  Node 0: [7,  null]
  Node 1: [13, 0]
  Node 2: [11, 4]
  Node 3: [10, 2]
  Node 4: [1,  0]

Output: A deep copy with the same structure.
```

### Example 2
```
Original:  [[1, 1], [2, 1]]
Output:    deep copy of same structure
```

### Example 3
```
Input:  null
Output: null
```

## Constraints
- `0 <= list length <= 1000`
- `-10^4 <= Node.val <= 10^4`
- `random` points to any node in the list or is `null`.

## Hints

<details>
<summary>Hint 1 — the challenge: random pointers</summary>

`next` pointers are easy — just clone as you traverse. But `random` can point to any node, including ones you haven't created yet. If you try to set `random` while building the copy, the target node may not exist yet.
</details>

<details>
<summary>Hint 2 — two-pass with a Map</summary>

**Pass 1:** Create a clone of every node and store the mapping `original node → cloned node` in a `Map`.

**Pass 2:** For each original node, set the clone's `next` and `random` using the map:
```js
clone.next   = map.get(original.next);
clone.random = map.get(original.random);
```

This works because in pass 2, every original node already has a corresponding clone in the map.
</details>

<details>
<summary>Hint 3 — the O(1) space trick (interleaving)</summary>

An advanced solution avoids the extra Map:
1. Interleave clones into the original list: `A -> A' -> B -> B' -> ...`
2. Set `random` pointers for clones: `A'.random = A.random.next`.
3. Un-interleave the two lists.

This is O(n) time, O(1) space (ignoring the output). Good for impressing interviewers — but the map solution is simpler and perfectly acceptable.
</details>

## Write your solution
→ [`../solutions/30-copy-random-list.js`](../solutions/30-copy-random-list.js)

## Follow-ups
- What would change if nodes also had a `prev` pointer (doubly linked list with random pointers)?
- Implement the O(1) space interleaving approach after getting the map-based solution working.
