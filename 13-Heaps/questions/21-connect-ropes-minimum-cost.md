# Q21 — Connect Ropes with Minimum Cost

**Difficulty:** Medium
**Pattern:** Min-heap greedy — always merge the two smallest
**Expected:** O(n log n) time · O(n) space

## Problem

You are given an array `lengths` where `lengths[i]` is the length of the `i`-th rope. The cost to connect two ropes is equal to the sum of their lengths. Connect all the ropes into one rope, and return the **minimum total cost** to do so.

## Examples

### Example 1
```
Input:  lengths = [4, 3, 2, 6]
Output: 29
```
```
Step 1: Connect 2 and 3  → cost 5,  lengths = [4, 5, 6]
Step 2: Connect 4 and 5  → cost 9,  lengths = [9, 6]
Step 3: Connect 9 and 6  → cost 15, lengths = [15]
Total cost: 5 + 9 + 15 = 29
```
(Any other merge order yields a higher total.)

### Example 2
```
Input:  lengths = [1, 2, 3, 4, 5]
Output: 33
```
Optimal: 1+2=3 (cost 3), 3+3=6 (cost 6), 4+5=9 (cost 9), 6+9=15 (cost 15) → total 33.

### Example 3
```
Input:  lengths = [5]
Output: 0
```
Only one rope — no connections needed.

### Example 4
```
Input:  lengths = [1, 1]
Output: 2
```

## Constraints
- `1 <= lengths.length <= 10^5`
- `1 <= lengths[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — greedy: always merge the two shortest ropes first</summary>

Each merge cost is added once at the time of the merge, but the resulting rope participates in all future merges too. By keeping intermediate ropes as short as possible, you minimize the total accumulated cost.

This is exactly Huffman's algorithm — minimize the total weight by always merging the two lightest nodes.
</details>

<details>
<summary>Hint 2 — a min-heap makes "pick the two shortest" O(log n)</summary>

```
minHeap = heapify(lengths)
totalCost = 0

while heap.size() > 1:
  a = heap.pop()   // smallest rope
  b = heap.pop()   // second smallest
  merged = a + b
  totalCost += merged
  heap.push(merged)

return totalCost
```
</details>

<details>
<summary>Hint 3 — why is greedy optimal here?</summary>

This is Huffman coding in disguise. Shorter ropes that are merged early appear in fewer subsequent merges. If you ever merge a long rope early, it compounds the cost. A formal proof uses an exchange argument: swapping any other merge order with the greedy order never decreases the total cost.
</details>

## Write your solution
→ [`../solutions/21-connect-ropes-minimum-cost.js`](../solutions/21-connect-ropes-minimum-cost.js)

## Follow-ups
- This problem is isomorphic to **Huffman Coding** (data compression). Can you sketch how Huffman coding uses the same algorithm?
- What is the result if all ropes have the same length? Can you derive a formula?
- **Minimum Cost to Merge Stones** — a much harder DP variant where you can only merge `k` stones at a time.
