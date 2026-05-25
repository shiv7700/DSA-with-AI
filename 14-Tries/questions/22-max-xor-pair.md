# Q22 — Maximum XOR Pair in an Array — O(n·32)

**Difficulty:** Hard (Bit Trie Drill)
**Pattern:** Bit Trie — greedy bit-by-bit XOR maximization
**Expected:** O(n × 32) = O(n) time · O(n × 32) space

## Problem

Given an array of non-negative integers `nums`, find the **maximum value of `nums[i] XOR nums[j]`** for any pair `(i, j)` where `i != j` (or `i == j` is allowed — the max is the same since `x XOR x = 0` is never maximum unless all elements are 0).

> **This is the same problem as Q18 but phrased as a Bit Trie Drill.** If you've solved Q18, revisit it from a bit-trie implementation angle. The drill adds the implementation constraint: you must use a `BitTrie` class explicitly.

## Examples

### Example 1
```
Input:  nums = [3, 10, 5, 25, 2, 8]
Output: 28
```
5 XOR 25 = 28. Binary: 00101 XOR 11001 = 11100 = 28.

### Example 2
```
Input:  nums = [0, 0]
Output: 0
```

### Example 3
```
Input:  nums = [2, 4]
Output: 6
```
2 XOR 4 = 6. Binary: 010 XOR 100 = 110 = 6.

### Example 4
```
Input:  nums = [8, 10, 2]
Output: 10
```
8 XOR 2 = 10.

## Constraints
- `1 <= nums.length <= 2 × 10^5`
- `0 <= nums[i] < 2^31`

## Hints

<details>
<summary>Hint 1 — insert all, then query each</summary>

Phase 1: insert all numbers into the bit trie.

Phase 2: for each number `x` in `nums`, walk the trie greedily — at each bit, try to go the opposite direction (to maximize XOR). Compute the max XOR with `x`. Track the overall maximum.

Return the overall maximum.
</details>

<details>
<summary>Hint 2 — greedy correctness</summary>

Why is the greedy approach correct? Because we process bits from most significant to least significant. A 1 at a higher bit is always more valuable than any combination of lower bits. So if we can set bit `k` to 1 in the XOR, we should — regardless of lower bits.

This greedy works because setting the most significant bit to 1 adds more value than the maximum possible contribution of all lower bits combined.
</details>

<details>
<summary>Hint 3 — handling i ≠ j constraint</summary>

Actually, for maximum XOR, the constraint `i ≠ j` rarely matters in practice — `x XOR x = 0` is never the maximum unless the array has only one distinct value. The algorithm works correctly either way.

If you need to enforce `i ≠ j` strictly: during the query for `x`, you could ensure you're not just finding `x` itself. In practice, insert and query in two passes (insert all, then query all) and compare — the max will never be `x XOR x = 0` unless every element is identical.
</details>

## Write your solution
→ [`../solutions/22-max-xor-pair.js`](../solutions/22-max-xor-pair.js)

## Follow-ups
- Q23 extends this: count how many pairs have XOR less than k.
- Can you solve this problem without a trie in O(n × 32)? (Yes — there is a bitmask + set approach.) Implement both and compare clarity.
- Maximum XOR of a subarray — how would the problem change?
