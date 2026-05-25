# Q28 — Kth Largest Element in a Stream

**Difficulty:** Easy
**Pattern:** Min-heap of size K as a live sliding answer
**Expected:** add O(log k) · constructor O(n log k) · O(k) space

## Problem

Design a class that finds the `k`-th largest element in a stream of integers.

The `k`-th largest element is the k-th largest value in sorted order (not the k-th distinct element).

Implement the `KthLargest` class:
- `constructor(k, nums)` — initializes the object with the integer `k` and the initial stream of integers `nums`.
- `add(val)` — appends `val` to the stream and returns the element representing the k-th largest element in the stream.

## Examples

### Example 1
```
k = 3
nums = [4, 5, 8, 2]

add(3)  → stream = [4,5,8,2,3]  sorted: [2,3,4,5,8]  3rd largest = 4
add(5)  → stream = [...,5]       sorted: [2,3,4,5,5,8] 3rd largest = 5
add(10) → stream = [...,10]      sorted: [2,3,4,5,5,8,10] 3rd largest = 5
add(9)  → stream = [...,9]       sorted: [2,3,4,5,5,8,9,10] 3rd largest = 8  (wait, let's recount)
         Actually: [2,3,4,5,5,8,9,10] → 3rd largest = 8
add(4)  → 3rd largest = 8
```

### Example 2
```
k = 1
nums = []

add(-3) → -3
add(-2) → -2
add(-4) → -2
add(0)  → 0
add(4)  → 4
```

## Constraints
- `1 <= k <= 10^4`
- `0 <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `-10^4 <= val <= 10^4`
- There will always be at least `k` elements in the array when `add` is called.
- At most `10^4` calls will be made to `add`.

## Hints

<details>
<summary>Hint 1 — the k-th largest is always the minimum of the top-k</summary>

A min-heap of exactly `k` elements always holds the k largest values seen so far. Its root (the minimum of those k) is the k-th largest.

When a new value arrives: if it's larger than the current k-th largest (the root), it displaces the root. Otherwise, it's smaller than the k-th largest and can be ignored.
</details>

<details>
<summary>Hint 2 — add() algorithm</summary>

```js
add(val) {
  this.heap.push(val);         // always add
  if (this.heap.size() > k) {
    this.heap.pop();            // evict the smallest if we have more than k
  }
  return this.heap.peek();     // root is the k-th largest
}
```

In the constructor, call `add` for each element in `nums`.
</details>

<details>
<summary>Hint 3 — constructor initialization</summary>

Simply call `this.add(num)` for each number in `nums`. The heap will naturally trim itself to size k, keeping only the k largest elements.

Alternatively, push all elements first, then pop until size is k — but calling `add` in a loop is cleaner and reuses the same logic.
</details>

## Write your solution
→ [`../solutions/28-kth-largest-in-stream.js`](../solutions/28-kth-largest-in-stream.js)

## Follow-ups
- How would you handle the k-th **smallest** in a stream? (Max-heap of size k.)
- What if the constraint required O(1) for `add` and O(k) for the k-th largest query?
- **Find Median from Data Stream** (Q11) — a harder variant maintaining both the median and accepting inserts.
