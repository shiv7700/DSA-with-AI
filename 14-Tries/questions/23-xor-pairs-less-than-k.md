# Q23 — Count Pairs With XOR Less Than K

**Difficulty:** Hard (Bit Trie Drill)
**Pattern:** Bit Trie — counting XOR-bounded pairs
**Expected:** O(n × 32) time · O(n × 32) space

## Problem

Given an array of non-negative integers `nums` and a non-negative integer `k`, return the **number of pairs** `(i, j)` with `i < j` such that `nums[i] XOR nums[j] < k`.

## Examples

### Example 1
```
Input:  nums = [1, 2, 3, 4, 5],  k = 4
Output: 4
```
Valid pairs (0-indexed, checking i < j):
- 1 XOR 2 = 3 < 4 ✓
- 1 XOR 3 = 2 < 4 ✓
- 2 XOR 3 = 1 < 4 ✓
- 4 XOR 5 = 1 < 4 ✓
- 1 XOR 4 = 5, not < 4
- ... (others also fail)

### Example 2
```
Input:  nums = [0, 1, 2, 3],  k = 2
Output: 2
```
- 0 XOR 1 = 1 < 2 ✓
- 2 XOR 3 = 1 < 2 ✓

### Example 3
```
Input:  nums = [10, 20, 30],  k = 40
Output: 3
```
All three pairs: 10 XOR 20 = 30, 10 XOR 30 = 20, 20 XOR 30 = 10. All < 40.

## Constraints
- `1 <= nums.length <= 10^4`
- `0 <= nums[i] < 2^15`
- `0 <= k < 2^15`

## Hints

<details>
<summary>Hint 1 — brute force</summary>

Check all pairs. O(n²). With n = 10^4, that's 5 × 10^7 — borderline, might pass but slow. Aim for the trie solution.
</details>

<details>
<summary>Hint 2 — bit-by-bit counting with a trie</summary>

Insert numbers one at a time. Before inserting `nums[i]`, query the trie: how many already-inserted numbers `y` satisfy `nums[i] XOR y < k`?

This is a "walk the trie with k as a guide" problem:

At each bit position (from MSB to LSB), let `xBit` = bit of `nums[i]` and `kBit` = bit of `k`:
- If `kBit = 1`: going down the branch where XOR bit = 0 (i.e., same as `xBit`) **guarantees** this bit of XOR < `kBit`, so count ALL numbers in that subtree. Then continue down the branch where XOR bit = 1 (opposite of `xBit`) — these still might contribute (future bits will decide).
- If `kBit = 0`: we must make XOR bit = 0 at this position (otherwise XOR would already exceed k). So we can only continue down the branch where the XOR bit = 0 (i.e., same as `xBit`).

Each node needs a `count` field for the number of numbers in its subtree.
</details>

<details>
<summary>Hint 3 — augmented trie node</summary>

```js
class BitTrieNode {
  constructor() {
    this.children = {};   // '0' and '1'
    this.count = 0;       // how many numbers pass through this node
  }
}
```

When inserting, increment `count` at every node along the path. When querying for "how many numbers have XOR with x less than k", use the counting logic from Hint 2.
</details>

## Write your solution
→ [`../solutions/23-xor-pairs-less-than-k.js`](../solutions/23-xor-pairs-less-than-k.js)

## Follow-ups
- Count pairs with XOR **equal to** k.
- Count pairs with XOR **greater than** k (use: total pairs minus pairs with XOR ≤ k).
- What changes if we allow `i == j`?
