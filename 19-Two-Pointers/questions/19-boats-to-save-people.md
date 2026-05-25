# Q19 — Boats to Save People

**Difficulty:** Medium
**Pattern:** Two Pointers (opposite ends, greedy)
**Expected:** O(n log n) time · O(1) space

## Problem

You are given an array `people` where `people[i]` is the weight of the `i`th person, and an infinite number of boats where each boat can carry at most `limit` weight.

Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most `limit`.

Return the minimum number of boats to carry every given person.

## Examples

### Example 1
```
Input:  people = [1, 2],  limit = 3
Output: 1
```
One boat carries both people: 1 + 2 = 3 ≤ 3.

### Example 2
```
Input:  people = [3, 2, 2, 1],  limit = 3
Output: 3
```
Boats: (1, 2), (2), (3).

### Example 3
```
Input:  people = [3, 5, 3, 4],  limit = 5
Output: 4
```
Everyone must go alone: (3), (3), (4), (5).

### Example 4
```
Input:  people = [1, 2, 2, 3],  limit = 3
Output: 3
```
Boats: (1, 2), (2), (3).

## Constraints
- `1 <= people.length <= 5 * 10^4`
- `1 <= people[i] <= limit <= 3 * 10^4`

## Hints

<details>
<summary>Hint 1 — greedy insight</summary>

Sort the array. Then greedily try to pair the **heaviest person** with the **lightest person**. If they fit together, both board the same boat. If not, the heaviest person goes alone (no one lighter would help — they'd be even heavier combined with someone else).
</details>

<details>
<summary>Hint 2 — opposite-ends pointers</summary>

`left = 0` (lightest), `right = n - 1` (heaviest). In each step:
- If `people[left] + people[right] <= limit` → they share a boat, advance both.
- Otherwise → `right` goes alone, advance only `right`.
- Either way, one boat is used. Increment the boat count.
</details>

<details>
<summary>Hint 3 — why this greedy is optimal</summary>

The heaviest person must always go in some boat. If they can share with anyone, the best partner is the lightest remaining (greedy choice: minimizes waste). If we gave the lightest person a different partner, the heaviest would still need their own boat or a sub-optimal pairing.
</details>

## Write your solution
→ [`../solutions/19-boats-to-save-people.js`](../solutions/19-boats-to-save-people.js)

## Follow-ups
- What if each boat could carry up to 3 people? (The greedy two-pointer approach breaks — you'd need a different algorithm.)
- Compare with Q15 (Container With Most Water): both use opposite-ends and always move the "weaker" side, but for different reasons.
