# Q9 — Generate Binary Numbers from 1 to N

**Difficulty:** Easy
**Pattern:** BFS-like level-by-level generation using a queue
**Expected:** O(n) time · O(n) space

## Problem

Given a positive integer `n`, generate all binary numbers from `1` to `n` (inclusive) in order. Return them as an array of strings.

**Signature:**
```js
function generateBinaryNumbers(n) { ... }
// Returns: string[]
```

## Examples

### Example 1
```
Input:  n = 5
Output: ['1', '10', '11', '100', '101']
```

### Example 2
```
Input:  n = 1
Output: ['1']
```

### Example 3
```
Input:  n = 10
Output: ['1', '10', '11', '100', '101', '110', '111', '1000', '1001', '1010']
```

## Constraints
- `1 <= n <= 1000`
- Return binary representations as strings (no leading zeros).

## Hints

<details>
<summary>Hint 1 — why a queue?</summary>

Think about the structure of binary numbers. From `1`, you can generate `10` and `11` by appending `'0'` and `'1'`. From `10`, you get `100` and `101`. From `11`, you get `110` and `111`. This is exactly a BFS tree!

```
          1
        /   \
       10   11
      / \   / \
    100 101 110 111
```

Use a queue to process level by level and collect results in BFS order.
</details>

<details>
<summary>Hint 2 — the algorithm</summary>

```
1. Enqueue '1'.
2. While result has fewer than n items:
   a. Dequeue the front string s.
   b. Add s to results.
   c. Enqueue s + '0'.
   d. Enqueue s + '1'.
3. Return results.
```
</details>

<details>
<summary>Hint 3 — why not just use toString(2)?</summary>

`(5).toString(2)` gives `'101'`. You could loop 1..n and convert each. That works too and is O(n log n). But the queue approach is an elegant demonstration of how BFS generates structured sequences — and shows up in harder problems.
</details>

## Write your solution
→ [`../solutions/09-generate-binary-numbers.js`](../solutions/09-generate-binary-numbers.js)

## Follow-ups
- Modify the solution to generate binary numbers that have exactly `k` bits set (i.e., `k` ones).
- Can you generate all n-bit binary strings (strings of length exactly n) using a similar queue approach?
- What other sequences can you generate level-by-level using a queue? (Think: combinations, permutations of a fixed prefix length.)
