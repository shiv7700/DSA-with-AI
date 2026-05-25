# 21 — Bit Manipulation

> Every number is just a pattern of 1s and 0s. Bit manipulation lets you work directly with that pattern — flipping individual switches, extracting digits, and composing answers that would otherwise require elaborate loops. Master the six operators and a handful of tricks, and a whole class of "seemingly hard" problems becomes almost obvious.

## Learn Path

1. **Read [`notes.md`](./notes.md) first** — binary numbers, the six operators, truth tables, bit tricks, JS gotchas, BigInt, bitmask DP preview.
2. Solve questions in order. Each lives in `questions/<NN>-<slug>.md`.
3. Write your solution in the matching `solutions/<NN>-<slug>.js`.
4. Tick off the checklist below as you finish.

## Progress

### Easy (warm-up)
- [ ] [01 — Even or Odd via Bits](./questions/01-even-or-odd.md)
- [ ] [02 — Power of Two](./questions/02-power-of-two.md)
- [ ] [03 — Count Set Bits (Popcount)](./questions/03-count-set-bits.md)
- [ ] [04 — Position of the Only Set Bit](./questions/04-only-set-bit-position.md)
- [ ] [05 — Swap Without Temp Variable](./questions/05-swap-without-temp.md)
- [ ] [06 — Toggle a Specific Bit](./questions/06-toggle-bit.md)
- [ ] [07 — Decimal to Binary String (no toString)](./questions/07-decimal-to-binary.md)
- [ ] [08 — Binary String to Decimal](./questions/08-binary-to-decimal.md)
- [ ] [09 — Most Significant Set Bit Position](./questions/09-msb-position.md)
- [ ] [10 — Multiply and Divide by 2 with Shifts](./questions/10-shift-multiply-divide.md)

### Medium
- [ ] [11 — Single Number](./questions/11-single-number.md)
- [ ] [12 — Single Number II](./questions/12-single-number-ii.md)
- [ ] [13 — Single Number III](./questions/13-single-number-iii.md)
- [ ] [14 — Missing Number](./questions/14-missing-number.md)
- [ ] [15 — Find the Difference](./questions/15-find-the-difference.md)
- [ ] [16 — Reverse Bits](./questions/16-reverse-bits.md)
- [ ] [17 — Number of 1 Bits](./questions/17-number-of-1-bits.md)
- [ ] [18 — Counting Bits (0 to n)](./questions/18-counting-bits.md)
- [ ] [19 — Power of Two or Four](./questions/19-power-of-two-or-four.md)
- [ ] [20 — Hamming Distance](./questions/20-hamming-distance.md)
- [ ] [21 — Total Hamming Distance](./questions/21-total-hamming-distance.md)
- [ ] [22 — Sum of Two Integers Without + or -](./questions/22-sum-without-plus.md)
- [ ] [23 — Subtract Without Minus](./questions/23-subtract-without-minus.md)
- [ ] [24 — Bitwise AND of a Range](./questions/24-bitwise-and-of-range.md)
- [ ] [25 — Maximum XOR of Two Numbers](./questions/25-maximum-xor.md)
- [ ] [26 — Subsets via Bitmask](./questions/26-subsets-bitmask.md)

### Hard
- [ ] [27 — Maximum XOR With an Element From Array](./questions/27-max-xor-with-element.md)
- [ ] [28 — Minimum XOR Sum of Two Arrays](./questions/28-min-xor-sum.md)
- [ ] [29 — UTF-8 Validation](./questions/29-utf8-validation.md)
- [ ] [30 — N-Queens II (Bitmask)](./questions/30-n-queens-bitmask.md)
- [ ] [31 — Smallest Sufficient Team](./questions/31-smallest-sufficient-team.md)
- [ ] [32 — Shortest Path Visiting All Nodes](./questions/32-shortest-path-all-nodes.md)
- [ ] [33 — Travelling Salesman (Bitmask DP)](./questions/33-tsp-bitmask.md)
- [ ] [34 — Partition to K Equal Sum Subsets](./questions/34-partition-k-subsets.md)
- [ ] [35 — Number of Ways to Wear Different Hats](./questions/35-different-hats.md)

### JS Gotcha Drill
- [ ] [36 — Why Is (1 << 31) Negative in JS?](./questions/36-left-shift-31.md)
- [ ] [37 — Why Does ~5 Equal -6?](./questions/37-bitwise-not-twos-complement.md)
- [ ] [38 — When to Use BigInt for Bit Manipulation](./questions/38-bigint-bits.md)

## Related Topics

- [01 — Big-O Complexity](../01-Big-O-Complexity/) — understanding O(1) and O(n) before drilling tricks.
- [02 — Arrays](../02-Arrays/) — bitmask DP states are often just arrays indexed by an integer mask.
- [17 — Dynamic Programming](../17-Dynamic-Programming/) — bitmask DP is a DP technique.
- [12 — Tries](../12-Tries/) — bit tries power the "maximum XOR" family of questions.
