# Q5 — Swap Two Numbers Without a Temp Variable

**Difficulty:** Easy
**Pattern:** XOR swap
**Expected:** O(1) time · O(1) space

## Problem

Given two integer variables `a` and `b`, swap their values **without using any temporary (third) variable**.

Implement the function `swapNums(a, b)` that returns `[b_original, a_original]` — i.e. `[a, b]` after the swap.

> **Why this matters:** The XOR swap is a classic interview question and a beautiful demonstration of XOR's self-inverse property. In modern JavaScript you'd use `[a, b] = [b, a]`, but understanding the XOR version deepens your mental model of XOR itself.

## Examples

### Example 1
```
Input:  a = 5, b = 3
Output: [3, 5]
```
After swap: a becomes 3, b becomes 5.

### Example 2
```
Input:  a = 0, b = 7
Output: [7, 0]
```

### Example 3
```
Input:  a = -4, b = 10
Output: [10, -4]
```

### Example 4 (same value)
```
Input:  a = 5, b = 5
Output: [5, 5]
```

## Constraints
- `-2^31 <= a, b <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — XOR's self-inverse property</summary>

Recall: `x ^ x = 0` and `x ^ 0 = x`.

So if you compute `a ^ b` and then XOR the result with either original, you can recover the other:

```
(a ^ b) ^ b = a   ← XOR with b twice → cancels out
(a ^ b) ^ a = b   ← XOR with a twice → cancels out
```
</details>

<details>
<summary>Hint 2 — three XOR assignments</summary>

The classic three-step XOR swap:

```
a ^= b     // a now holds a ^ b
b ^= a     // b now holds b ^ (a ^ b) = a  ← original a!
a ^= b     // a now holds (a ^ b) ^ a = b  ← original b!
```

Trace through with a = 5 (101) and b = 3 (011):
```
Step 1: a = 101 ^ 011 = 110
Step 2: b = 011 ^ 110 = 101  ← this is the original a = 5 ✓
Step 3: a = 110 ^ 101 = 011  ← this is the original b = 3 ✓
```
</details>

<details>
<summary>Hint 3 — the one gotcha</summary>

If `a` and `b` are the **same variable** (pointing to the same memory slot), the XOR swap breaks:

```
a ^= a   // a = 0  ← original value is LOST
a ^= a   // 0 ^ 0 = 0
a ^= a   // still 0
```

In a function that takes two separate arguments, this doesn't apply. But if you're swapping array elements at the same index (`arr[i]` where `i === j`), guard against it first.

In practice, always prefer: `[a, b] = [b, a]`.
</details>

## Write your solution
→ [`../solutions/05-swap-without-temp.js`](../solutions/05-swap-without-temp.js)

## Follow-ups
- Implement the swap using only arithmetic (`+` and `-`) instead of XOR.
- In C/C++, in-place XOR swap avoids allocating a temporary stack slot. Does this matter in JavaScript? (Spoiler: modern JS engines optimize `[a, b] = [b, a]` well.)
- Why does the XOR swap fail when both operands refer to the same memory location? Draw the three steps with the same variable to illustrate.
