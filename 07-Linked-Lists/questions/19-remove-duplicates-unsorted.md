# Q19 — Remove Duplicates from Unsorted List

**Difficulty:** Medium
**Pattern:** Hash Set for seen values
**Expected:** O(n) time · O(n) space   |   O(n²) time · O(1) space (no-buffer variant)

## Problem

Given the head of an **unsorted** singly linked list, remove all duplicate nodes so that each value appears **only once**. Return the head of the modified list. The relative order of the remaining nodes should be preserved.

Implement it **twice**:
1. `removeDupsWithSet(head)` — using a `Set` for O(n) time.
2. `removeDupsNoBuffer(head)` — using O(1) extra space (two pointers; O(n²) time acceptable).

## Examples

### Example 1
```
Input:  1 -> 2 -> 3 -> 2 -> 1 -> null
Output: 1 -> 2 -> 3 -> null
```

### Example 2
```
Input:  1 -> 1 -> 1 -> null
Output: 1 -> null
```

### Example 3 — no duplicates
```
Input:  1 -> 2 -> 3 -> null
Output: 1 -> 2 -> 3 -> null
```

## Constraints
- `0 <= list length <= 10^4`
- The list is **not** guaranteed to be sorted.

## Hints

<details>
<summary>Hint 1 — with a Set</summary>

Maintain a `Set` of values you've already seen. Walk the list; if the current node's value is already in the set, delete it (via predecessor pointer). Otherwise, add the value to the set and advance.

```js
const seen = new Set();
let prev = null;
let curr = head;
while (curr !== null) {
  if (seen.has(curr.val)) {
    prev.next = curr.next;   // skip this duplicate
  } else {
    seen.add(curr.val);
    prev = curr;
  }
  curr = curr.next;
}
return head;
```
</details>

<details>
<summary>Hint 2 — without extra space (two nested pointers)</summary>

For each node `curr`, scan everything after it and remove any node with the same value.

```
outer pointer: curr walks through the list
inner pointer: runner starts at curr and removes any runner.next that equals curr.val
```

This is O(n²) but O(1) space — acceptable only for small lists.
</details>

## Write your solution
→ [`../solutions/19-remove-duplicates-unsorted.js`](../solutions/19-remove-duplicates-unsorted.js)

## Follow-ups
- What if you also had to **count** how many values were duplicated?
- Compare the sorted version (Q18) with this — why is the sorted version O(1) space without sacrificing O(n) time?
