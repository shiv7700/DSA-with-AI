# Q5 — Intersection of Two Arrays

**Difficulty:** Easy
**Pattern:** Set membership
**Expected:** O(n + m) time · O(min(n, m)) space

## Problem

Given two arrays `nums1` and `nums2`, return an array of their **intersection** — the values that appear in **both** arrays. Each value in the result must be unique (even if it appears multiple times in both inputs).

The result can be in any order.

## Examples

### Example 1
```
Input:  nums1 = [1, 2, 2, 1],  nums2 = [2, 2]
Output: [2]
```

### Example 2
```
Input:  nums1 = [4, 9, 5],  nums2 = [9, 4, 9, 8, 4]
Output: [4, 9]   (or [9, 4] — either order is fine)
```

### Example 3 (no overlap)
```
Input:  nums1 = [1, 2, 3],  nums2 = [4, 5, 6]
Output: []
```

### Example 4
```
Input:  nums1 = [1, 1, 1],  nums2 = [1, 1]
Output: [1]
```

## Constraints
- `1 <= nums1.length, nums2.length <= 10^3`
- `0 <= nums1[i], nums2[i] <= 10^3`

## Hints

<details>
<summary>Hint 1 — use a Set for O(1) lookup</summary>

Convert one array to a `Set`. Then iterate through the other array; for each element, check if it's in the set. If yes, it's in the intersection.

But wait — what if you add the same element twice? You need a second `Set` (or filter the result) to ensure uniqueness.
</details>

<details>
<summary>Hint 2 — clean two-Set approach</summary>

```js
const set1 = new Set(nums1);
const result = new Set();
for (const n of nums2) {
  if (set1.has(n)) result.add(n);
}
return [...result];
```

`result` is a `Set` so duplicates are automatically ignored.
</details>

## Write your solution
→ [`../solutions/05-array-intersection.js`](../solutions/05-array-intersection.js)

## Follow-ups
- **Intersection II** — return the intersection where each element appears as many times as it appears in both arrays (i.e., preserve duplicates). Hint: use frequency maps.
- If both arrays are sorted, can you solve it in O(1) extra space using two pointers?
- What is the intersection of three or more arrays?
