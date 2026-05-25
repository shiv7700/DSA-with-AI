# Q8 — Boats to Save People

**Difficulty:** Medium
**Pattern:** Greedy · Two Pointers on Sorted Array
**Expected:** O(n log n) time · O(1) space

## Problem

You are given an array `people` where `people[i]` is the weight of the `i`-th person. Each rescue boat can carry **at most two people**, as long as the sum of their weights does not exceed `limit`.

Return the **minimum number of boats** needed to carry everyone.

## Examples

### Example 1
```
Input:  people = [1, 2],  limit = 3
Output: 1
```
Both people fit in one boat (1 + 2 = 3 ≤ 3).

### Example 2
```
Input:  people = [3, 2, 2, 1],  limit = 3
Output: 3
```
Boats: [3], [2, 1], [2]. Three boats needed.

### Example 3
```
Input:  people = [3, 5, 3, 4],  limit = 5
Output: 4
```
Boats: [5], [3], [3], [4] — wait: [3,2]? No 2 here. Actually: [4,1]? No 1. People are [3,5,3,4]. Limit 5: [5], [4], [3], [3] → 4 boats.

### Example 4
```
Input:  people = [1, 1, 1, 1],  limit = 3
Output: 2
```
Each boat holds two people.

## Constraints
- `1 <= people.length <= 5 * 10^4`
- `1 <= people[i] <= limit <= 3 * 10^4`

## Hints

<details>
<summary>Hint 1 — what's the greedy rule?</summary>

Sort people by weight. Use two pointers: `left` at the lightest person, `right` at the heaviest.

If the lightest and heaviest person can share a boat (`people[left] + people[right] <= limit`), put them together and advance both pointers inward. Otherwise, the heaviest person must go alone (no one lighter could pair with them either — they're the lightest candidate), so send the heaviest alone and advance `right` only.
</details>

<details>
<summary>Hint 2 — why does it work for this problem?</summary>

Exchange argument: suppose an optimal solution pairs the heaviest person with someone other than the lightest. We can swap the lightest person in — since the lightest person has the smallest weight, swapping can only keep the pairing valid (the lightest person won't cause the boat to exceed the limit if the other person didn't). So pairing the heaviest with the lightest (when possible) is always at least as good.
</details>

<details>
<summary>Hint 3 — implementation sketch</summary>

```js
people.sort((a, b) => a - b);
let left = 0, right = people.length - 1, boats = 0;
while (left <= right) {
  if (people[left] + people[right] <= limit) left++;
  right--;
  boats++;
}
return boats;
```
</details>

## Write your solution
→ [`../solutions/08-boats-to-save-people.js`](../solutions/08-boats-to-save-people.js)

## Follow-ups
- What if each boat could carry at most **3** people? (The two-pointer approach no longer works directly.)
- What if each boat had individual weight limits rather than one global limit?
