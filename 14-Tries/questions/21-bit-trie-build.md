# Q21 — Build a Bit Trie for 32-bit Integers

**Difficulty:** Medium (Bit Trie Drill)
**Pattern:** Bit Trie — binary representation, MSB-first insertion
**Expected:** O(n × 32) time · O(n × 32) space

## Problem

A **bit trie** is a trie where each edge is a single **bit** (`0` or `1`), not a character. Numbers are inserted bit by bit, most significant bit (bit 31) first, down to bit 0.

Your task: implement a `BitTrie` class with:
- `insert(num)` — inserts a 32-bit non-negative integer.
- `search(num)` — returns `true` if the number was inserted.
- `getMax()` — returns the maximum number stored.
- `getMin()` — returns the minimum number stored.

> **Why most significant bit first?** Because we want the first levels of the trie to represent the most important bits. This lets us make greedy decisions from most-to-least significant — critical for problems like max XOR.

## Examples

### Example 1
```
const bt = new BitTrie();
bt.insert(5);    // binary: 00000000000000000000000000000101
bt.insert(10);   // binary: 00000000000000000000000000001010
bt.insert(25);   // binary: 00000000000000000000000000011001

bt.search(5);    // true
bt.search(7);    // false
bt.getMax();     // 25
bt.getMin();     // 5
```

### Example 2
```
const bt = new BitTrie();
bt.insert(0);
bt.insert(2147483647);   // 2^31 - 1, all ones in binary

bt.getMax();   // 2147483647
bt.getMin();   // 0
bt.search(0);  // true
bt.search(1);  // false
```

## Constraints
- `0 <= num <= 2^31 - 1`
- At most `10^4` calls to `insert`, `search`, `getMax`, `getMin`.

## Hints

<details>
<summary>Hint 1 — bit extraction</summary>

To extract bit `i` (from 31 down to 0) of integer `n`:
```js
const bit = (n >>> i) & 1;
```
`>>>` is the **unsigned right shift** in JavaScript. Always use `>>>` instead of `>>` for bit manipulation on potentially large numbers to avoid sign issues.

The bit is either `0` or `1`. Use `String(bit)` or just use `bit` as an object key (JavaScript converts it automatically).
</details>

<details>
<summary>Hint 2 — insert and search</summary>

Exactly like a character trie, but with `'0'` and `'1'` as the edge labels. Insert all 32 bits, set `isEnd = true` at the last node.

For `search`, walk the 32 bits. If any bit's child is missing, return false. At the end, return `node.isEnd`.
</details>

<details>
<summary>Hint 3 — getMin and getMax with greedy walk</summary>

For `getMax`: at each level, prefer to go down the `'1'` branch (larger numbers have more 1-bits). If `'1'` branch doesn't exist, go `'0'`.

For `getMin`: at each level, prefer to go down the `'0'` branch. If `'0'` doesn't exist, go `'1'`.

Accumulate the value bit by bit as you walk.
</details>

## Write your solution
→ [`../solutions/21-bit-trie-build.js`](../solutions/21-bit-trie-build.js)

## Follow-ups
- Count how many stored numbers have a specific bit pattern in their upper 8 bits.
- What is the XOR of the minimum and maximum numbers? Compute it using the trie.
- Q22 builds on this to find the maximum XOR pair across all stored numbers.
