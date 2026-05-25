# Q18 — Maximum XOR of Two Numbers in an Array

**Difficulty:** Hard
**Pattern:** Bit Trie (binary trie on 32-bit integers)
**Expected:** O(n × 32) = O(n) time · O(n × 32) space

## Problem

Given an integer array `nums`, find the **maximum result** of `nums[i] XOR nums[j]`, where `0 <= i <= j < n`.

> **XOR reminder:** `1 XOR 0 = 1`, `0 XOR 1 = 1`, `1 XOR 1 = 0`, `0 XOR 0 = 0`. To maximize XOR, you want bits that are **different** in each position.

## Examples

### Example 1
```
Input:  nums = [3, 10, 5, 25, 2, 8]
Output: 28
```
The maximum is `5 XOR 25 = 28`.

Binary: 5 = `00101`, 25 = `11001`. XOR = `11100` = 28.

### Example 2
```
Input:  nums = [14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70]
Output: 127
```

### Example 3 (edge cases)
```
Input:  nums = [0]         → 0
Input:  nums = [0, 0]      → 0
Input:  nums = [1, 2]      → 3
```

## Constraints
- `1 <= nums.length <= 2 × 10^5`
- `0 <= nums[i] <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — why XOR maximization is a trie problem</summary>

Build a bit trie: insert all numbers into a trie, bit by bit from the most significant bit (bit 31) down to bit 0. Each edge is `0` or `1`.

To maximize XOR of `x` with any number in the trie, greedily walk from bit 31 to bit 0:
- For each bit of `x`, try to go down the **opposite** branch (because opposite bits XOR to 1).
- If the opposite branch doesn't exist, take the same branch (this bit contributes 0 to XOR).

After 32 steps, the path you took is the number in the trie that maximizes XOR with `x`.
</details>

<details>
<summary>Hint 2 — bit trie structure</summary>

The bit trie has edges `'0'` and `'1'` instead of characters. A TrieNode is the same as always:

```js
class TrieNode {
  constructor() {
    this.children = {};   // children['0'] and children['1']
    this.isEnd = false;
  }
}
```

When inserting number `n`:
```js
for (let i = 31; i >= 0; i--) {
  const bit = (n >>> i) & 1;   // bit i of n (use >>> for unsigned right shift)
  const key = String(bit);
  if (!node.children[key]) node.children[key] = new TrieNode();
  node = node.children[key];
}
node.isEnd = true;
```
</details>

<details>
<summary>Hint 3 — the greedy walk</summary>

```js
function maxXorWith(root, x) {
  let node = root;
  let xorVal = 0;
  for (let i = 31; i >= 0; i--) {
    const bit = (x >>> i) & 1;
    const want = String(1 - bit);   // opposite bit
    if (node.children[want]) {
      xorVal |= (1 << i);           // this bit is 1 in XOR
      node = node.children[want];
    } else {
      node = node.children[String(bit)];
    }
  }
  return xorVal;
}
```

Call `maxXorWith` for each number in `nums`. Return the maximum.
</details>

## Write your solution
→ [`../solutions/18-maximum-xor.js`](../solutions/18-maximum-xor.js)

## Follow-ups
- LeetCode 421 — this exact problem.
- Can you solve it using only a hash set (not a trie)? — Yes, using a mask approach O(n × 32). Compare approaches.
- Q22 in this chapter extends this to pairs; Q23 asks for counts.
