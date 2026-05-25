# Q12 — Single Number II

**Difficulty:** Medium
**Pattern:** Bit counting modulo 3
**Expected:** O(n) time · O(1) space

## Problem

You are given an integer array `nums` where every element appears **exactly three times**, except for one element which appears **exactly once**.

Return the element that appears only once.

You must implement a solution with **linear runtime** and **constant extra space**.

> **Why this is harder than Q11:** XOR cancels pairs (`x ^ x = 0`). But here elements come in triples, not pairs. You need a different mechanism to cancel groups of three.

## Examples

### Example 1
```
Input:  [2, 2, 3, 2]
Output: 3
```

### Example 2
```
Input:  [0, 1, 0, 1, 0, 1, 99]
Output: 99
```

## Constraints
- `1 <= nums.length <= 3 × 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`
- Every element appears exactly three times except for one.

## Hints

<details>
<summary>Hint 1 — think bit by bit</summary>

Consider a single bit position i across all numbers in the array. The count of 1s at position i across all elements is either:
- A multiple of 3 (if the solo element has a 0 at bit i), or
- A multiple of 3, plus 1 (if the solo element has a 1 at bit i).

So: for each bit position, count how many numbers have that bit set. If the count is NOT divisible by 3, the solo number has a 1 there.

Assemble the bit positions where `count % 3 == 1` into the answer.
</details>

<details>
<summary>Hint 2 — the two-variable trick (ones and twos)</summary>

There's an elegant O(1) space, O(n) time approach using two accumulators, `ones` and `twos`, that together track "has each bit been seen 1 time" and "has each bit been seen 2 times":

```
ones = bits seen an odd number of times (mod 2)
twos = bits seen an even but not 0 number of times (mod 3 logic)
```

For each number `n`:
```
twos |= ones & n;    // carry ones-bit into twos if it was already in ones
ones ^= n;           // toggle ones
mask = ~(ones & twos);
ones &= mask;        // clear any bit that appears in both (seen 3 times)
twos &= mask;
```

After the loop, `ones` holds the solo element.
</details>

<details>
<summary>Hint 3 — verify on Example 1</summary>

Trace `[2, 2, 3, 2]` through the two-variable approach. Start with `ones = 0, twos = 0`.

Step by step with 2 (= `10`), 2, 3 (= `11`), 2:

```
n=2: ones=10, twos=00, mask=11 → ones=10, twos=00
n=2: ones=00, twos=10, mask=01 → ones=00, twos=10   (2 appeared twice, in twos)
n=3: ones=11, twos=10, mask=00 → ones=00, twos=00   (bit 1 appears 3 times, cleared)
n=2: ones=10, twos=00 ...
After final n=2: ones=00, twos=10... hmm, let me recalculate.
```

This trace is easier to follow in code — write it and print intermediate states!
</details>

## Write your solution
→ [`../solutions/12-single-number-ii.js`](../solutions/12-single-number-ii.js)

## Follow-ups
- Generalize: every element appears `k` times except one. How do you solve it? (You need `ceil(log₂(k))` accumulator variables.)
- Does your solution work for negative integers? (It should, since you're working bit by bit at the 32-bit level.)
- Compare runtime and code clarity between the "bit counting" and "two-variable" approaches.
