# Bit Manipulation — Lessons from Zero

> 👋 Hey. This file is for someone who has never touched binary numbers before. We're going to go slow, one idea at a time. By the end you'll look at a number like `42` and immediately think "101010 — ah, bit 1 is on, bits 3 and 5 are on." That moment of pattern-recognition is the whole goal.
>
> Total reading time at a relaxed pace: about 90–120 minutes, with breaks. **You do not have to read it all in one sitting.**

---

## Table of Lessons

1. [What is binary? (the light-switch idea)](#lesson-1)
2. [Counting in binary](#lesson-2)
3. [Converting between decimal and binary](#lesson-3)
4. [What is a "bit"?](#lesson-4)
5. [The six bitwise operators — overview](#lesson-5)
6. [AND (`&`) — the gatekeeper](#lesson-6)
7. [OR (`|`) — the joiner](#lesson-7)
8. [XOR (`^`) — the differ](#lesson-8)
9. [NOT (`~`) — the flipper](#lesson-9)
10. [Left shift (`<<`) and right shift (`>>`)](#lesson-10)
11. [Unsigned right shift (`>>>`) — the JS special case](#lesson-11)
12. [Truth tables at a glance](#lesson-12)
13. [Checking, setting, clearing, and toggling bit i](#lesson-13)
14. [Counting set bits — Brian Kernighan's trick](#lesson-14)
15. [Checking if a number is a power of 2](#lesson-15)
16. [Swapping two numbers without a temp variable](#lesson-16)
17. [XOR's magical identity — `x ^ x = 0`](#lesson-17)
18. [⚠️ JS gotcha: bitwise ops are 32-bit signed](#lesson-18)
19. [BigInt when you need more than 32 bits](#lesson-19)
20. [Preview: bitmask DP](#lesson-20)
21. [Preview: bit trie](#lesson-21)
22. [Quick reference](#lesson-22)
23. [You did it — what to do next](#lesson-23)

---

<a id="lesson-1"></a>
## Lesson 1 — What is binary? (the light-switch idea)

Imagine a row of light switches. Each switch can be in exactly one of two states: **ON** or **OFF**.

```
Switch:   #5    #4    #3    #2    #1    #0
        ┌────┬─────┬─────┬─────┬─────┬─────┐
State:  │ ON │ OFF │  ON │  ON │ OFF │ OFF │
        └────┴─────┴─────┴─────┴─────┴─────┘
```

That's exactly what a number looks like inside a computer. **Binary** is just a number system where every digit is either a 0 or a 1 — OFF or ON.

The decimal number system you already know uses ten symbols: 0 through 9. Binary uses only two: **0** and **1**.

Both are just ways of writing "how many things are there." Binary is the natural language of computers because transistors — the tiny switches inside a chip — have two states: conducting or not conducting. ON or OFF. 1 or 0.

> 🎯 **Key takeaway**
> Binary is the *alphabet* of computers. Every number, every character, every image on your screen is stored as a pattern of 1s and 0s.

---

<a id="lesson-2"></a>
## Lesson 2 — Counting in binary

In decimal, each digit represents a **power of 10**: ones, tens, hundreds, thousands, …

```
 3  4  7
 │  │  └─ 7 × 10⁰  =   7
 │  └──── 4 × 10¹  =  40
 └─────── 3 × 10²  = 300
              total = 347
```

Binary works the same way, but with **powers of 2**: ones, twos, fours, eights, sixteens, …

```
 1  0  1  0  1  0   ← binary number
 │  │  │  │  │  └─ 0 × 2⁰  =  0
 │  │  │  │  └──── 1 × 2¹  =  2
 │  │  │  └─────── 0 × 2²  =  0
 │  │  └────────── 1 × 2³  =  8
 │  └───────────── 0 × 2⁴  =  0
 └──────────────── 1 × 2⁵  = 32
                     total = 42
```

So the binary number `101010` equals decimal `42`.

Let's look at the first sixteen numbers in both systems side by side:

```
Decimal │ Binary    │ Description
────────┼───────────┼──────────────────────────
  0     │ 0000      │ no switches on
  1     │ 0001      │ switch #0 on
  2     │ 0010      │ switch #1 on
  3     │ 0011      │ switches #1 and #0 on
  4     │ 0100      │ switch #2 on
  5     │ 0101      │ switches #2 and #0 on
  6     │ 0110      │ switches #2 and #1 on
  7     │ 0111      │ switches #2, #1, #0 on
  8     │ 1000      │ switch #3 on
  9     │ 1001      │ switches #3 and #0 on
 10     │ 1010      │ switches #3 and #1 on
 11     │ 1011      │ switches #3, #1, #0 on
 12     │ 1100      │ switches #3 and #2 on
 13     │ 1101      │ switches #3, #2, #0 on
 14     │ 1110      │ switches #3, #2, #1 on
 15     │ 1111      │ all four switches on
```

> 💡 **Tip**
> An n-bit number can represent values from 0 to 2ⁿ − 1. Four bits: 0 to 15. Eight bits (1 byte): 0 to 255. Thirty-two bits: 0 to about 4.3 billion.

> ✋ **Pause and try**
> What decimal number does the binary `1001` represent?
>
> <details>
> <summary>Show answer</summary>
>
> `1×2³ + 0×2² + 0×2¹ + 1×2⁰ = 8 + 0 + 0 + 1 = 9`
> </details>

---

<a id="lesson-3"></a>
## Lesson 3 — Converting between decimal and binary

### Decimal → Binary

Repeatedly divide by 2 and note the remainders. The remainders, **read from bottom to top**, give you the binary representation.

Convert 42:

```
42 ÷ 2 = 21  remainder 0   ← least significant bit (rightmost)
21 ÷ 2 = 10  remainder 1
10 ÷ 2 =  5  remainder 0
 5 ÷ 2 =  2  remainder 1
 2 ÷ 2 =  1  remainder 0
 1 ÷ 2 =  0  remainder 1   ← most significant bit (leftmost)

Read upward: 1 0 1 0 1 0  →  42 in binary is 101010
```

In JavaScript, you can verify this with:

```js
(42).toString(2);   // '101010'
```

### Binary → Decimal

Multiply each bit by its power of 2 and sum.

```
101010
└───┴───┴───┴───┴───┴──── positions: 5 4 3 2 1 0

= 1×32 + 0×16 + 1×8 + 0×4 + 1×2 + 0×1
= 32 + 0 + 8 + 0 + 2 + 0
= 42
```

In JavaScript:

```js
parseInt('101010', 2);   // 42
```

> 🎯 **Key takeaway**
> Decimal-to-binary: divide by 2, collect remainders from bottom to top. Binary-to-decimal: weight each bit by its power of 2 and add.

---

<a id="lesson-4"></a>
## Lesson 4 — What is a "bit"?

A **bit** (short for *binary digit*) is a single 0 or 1 — a single switch.

Bits are numbered from 0 (rightmost, the "least significant") upward. When people say "bit 3 of a number", they mean the digit that represents 2³ = 8.

```
Number 42:  1  0  1  0  1  0
Bit pos:    5  4  3  2  1  0
             │        │  └── bit 1 = 1  (value 2)
             │        └───── bit 3 = 0  (value 0)
             └────────────── bit 5 = 1  (value 32)
```

A bit is either **set** (value 1) or **clear** (value 0). You'll hear those two words constantly.

A group of 8 bits is called a **byte**. A group of 32 bits is called a **word** in most contexts — and it's the key number for JavaScript's bitwise operators.

> 💡 **Real-world analogy**
> Think of file permissions on a Unix system: `rwxr-xr-x`. Those nine permission flags are stored as three groups of three bits. Checking whether you have read permission is literally testing if bit 2 is set. Bit manipulation is what operating systems use to manage those flags.

---

<a id="lesson-5"></a>
## Lesson 5 — The six bitwise operators — overview

JavaScript gives you six operators that work directly on the bits of a number. Here they are:

| Operator | Symbol | What it does (one-liner) |
|----------|--------|--------------------------|
| AND      | `&`    | 1 only if BOTH bits are 1 |
| OR       | `\|`   | 1 if EITHER bit is 1 |
| XOR      | `^`    | 1 if bits are DIFFERENT |
| NOT      | `~`    | flips every single bit |
| Left shift    | `<<`  | shifts bits left, fills with 0 |
| Right shift   | `>>`  | shifts bits right, sign-extends |
| Unsigned right shift | `>>>` | shifts bits right, fills with 0 |

The first three (`&`, `|`, `^`) are **binary** operators — they take two numbers and combine their bits pairwise. NOT (`~`) is **unary** — it takes one number and flips it. The shift operators take a number and an amount to shift.

We'll go through each one with worked examples and diagrams in the next several lessons.

---

<a id="lesson-6"></a>
## Lesson 6 — AND (`&`) — the gatekeeper

AND compares two numbers bit by bit. A result bit is **1 only if both input bits are 1**. Think of it as a strict gate: both must agree before the output turns on.

```
    0 1 1 0 1 0 0 1   (105)
  & 0 0 1 1 1 1 0 0   (60)
  ─────────────────
    0 0 1 0 1 0 0 0   (40)
```

Work column by column:
- Column 0: 1 AND 0 = 0
- Column 2: 0 AND 1 = 0
- Column 3: 1 AND 1 = 1
- Column 4: 0 AND 1 = 0  ← wait, let me re-read: 105 bit 4 = 0, 60 bit 4 = 1 → 0
- …and so on.

Let me pick a simpler example: `6 & 3`

```
    0 1 1 0   (6)
  & 0 0 1 1   (3)
  ─────────
    0 0 1 0   (2)
```

`6 & 3 = 2`.

### Most important use: masking

The single most useful thing AND does is **extract specific bits** from a number. You create a "mask" — a number with 1s only where you want to look — and AND it with your number.

**Is bit i set?**

```js
(x >> i) & 1   // shift bit i down to position 0, then AND with 1
```

**Is x even or odd?** (Check bit 0)

```js
x & 1   // 0 = even, 1 = odd
```

Because bit 0 is the "ones place", it's 1 for odd numbers and 0 for even numbers. This is faster than `x % 2` — though a good engine often optimizes them to the same code anyway.

```js
7 & 1   // 1  (7 is odd:  0111 → bit 0 is 1)
8 & 1   // 0  (8 is even: 1000 → bit 0 is 0)
```

> 🎯 **Key takeaway**
> AND is the *gatekeeper*. Combine a value with a mask to extract only the bits you care about. The mask has 1s where you want to look and 0s everywhere else.

---

<a id="lesson-7"></a>
## Lesson 7 — OR (`|`) — the joiner

OR compares bits pairwise. A result bit is **1 if either input bit is 1** (or both).

```
    0 1 1 0   (6)
  | 0 0 1 1   (3)
  ─────────
    0 1 1 1   (7)
```

`6 | 3 = 7`.

### Most important use: setting a specific bit

To **turn bit i ON** regardless of its current value:

```js
x | (1 << i)   // create a number with only bit i set, then OR it in
```

Example: set bit 3 of 5:

```
5  =  0 0 0 0 0 1 0 1
mask= 0 0 0 0 1 0 0 0   (1 << 3 = 8)
─────────────────────
     0 0 0 0 1 1 0 1   = 13
```

```js
5 | (1 << 3)   // 13  ✅
```

OR is also used to combine flags. In a permission system with `READ = 1`, `WRITE = 2`, `EXECUTE = 4`:

```js
const perms = READ | WRITE;   // 1 | 2 = 3 (binary 011) — both flags set
```

> 🎯 **Key takeaway**
> OR is the *joiner*. Use it to **turn bits on** or to combine multiple flags into one integer.

---

<a id="lesson-8"></a>
## Lesson 8 — XOR (`^`) — the differ

XOR (exclusive OR) produces **1 if the two bits are different**, 0 if they are the same.

```
    0 1 1 0   (6)
  ^ 0 0 1 1   (3)
  ─────────
    0 1 0 1   (5)
```

`6 ^ 3 = 5`.

### Three magical properties of XOR

1. **`a ^ a = 0`** — any value XORed with itself is zero. Same bits, so every position produces 0.
2. **`a ^ 0 = a`** — any value XORed with 0 is unchanged.
3. **`a ^ b ^ b = a`** — XOR is its own inverse. Apply it twice and you're back where you started.

These properties make XOR the go-to tool for "find the element that appears an odd number of times" — because all the paired elements cancel out.

### Most important uses

**Toggle a specific bit (flip it regardless of current state):**

```js
x ^ (1 << i)   // flip bit i
```

```
x    = 1 0 1 1   (11)
mask = 0 1 0 0   (1 << 2 = 4)
─────────────────
     = 1 1 1 1   (15)   ← bit 2 flipped from 0 to 1

apply again:
     = 1 0 1 1   (11)   ← bit 2 flipped back to 0
```

**Find the single unpaired element:**

```js
// Everything appears twice except one value.
// XOR all elements. Pairs cancel (x ^ x = 0). The lone value remains.
const nums = [4, 1, 2, 1, 2];
nums.reduce((acc, n) => acc ^ n, 0);   // 4
```

> 🎯 **Key takeaway**
> XOR is the *differ*. It flips bits and has the magical pairing property: XOR two equal values and you get zero. The lone survivor of a sea of duplicates will be revealed.

---

<a id="lesson-9"></a>
## Lesson 9 — NOT (`~`) — the flipper

NOT flips every single bit in the number: every 0 becomes 1, every 1 becomes 0.

```
~0 0 0 0 0 1 0 1   (5)
 = 1 1 1 1 1 0 1 0
```

Wait, what's that result? Read on to Lesson 18 for the full JS story — the short version is:

```js
~5   // -6  (in JavaScript, bitwise NOT uses two's-complement 32-bit integers)
```

The formula is simple: **`~x = -(x + 1)`** in JavaScript.

```js
~0    // -1
~1    // -2
~-1   //  0
~7    // -8
```

### Most important use: clearing a specific bit

To **turn bit i OFF** regardless of its current value, you combine AND and NOT:

```js
x & ~(1 << i)
```

This creates a mask with all 1s except bit i (which is 0). AND-ing with that mask clears exactly bit i.

```
x    = 1 1 0 1   (13)
mask = 0 1 0 0   (1 << 2 = 4)
~mask= 1 0 1 1   (~4)
─────────────────
x & ~mask = 1 0 0 1   (9)   ← bit 2 cleared
```

> 🎯 **Key takeaway**
> NOT flips everything. Its main practical use is creating "negative masks" for AND operations. Remember: in JS, `~x = -(x + 1)`.

---

<a id="lesson-10"></a>
## Lesson 10 — Left shift (`<<`) and right shift (`>>`)

### Left shift: `x << n`

Shift all bits to the **left** by n positions. Fill the vacated right positions with 0s. Drop the bits that fall off the left edge.

```
5  << 1:
  0 0 0 0 0 1 0 1   (5)
→ 0 0 0 0 1 0 1 0   (10)
```

```
5  << 2:
  0 0 0 0 0 1 0 1   (5)
→ 0 0 0 1 0 1 0 0   (20)
```

**Pattern:** `x << n` is the same as multiplying by 2ⁿ. Every left shift doubles the number.

```js
1 << 0   // 1     (2⁰)
1 << 1   // 2     (2¹)
1 << 2   // 4     (2²)
1 << 3   // 8     (2³)
1 << 4   // 16    (2⁴)
1 << 10  // 1024  (2¹⁰)
```

This is the bread and butter of bit tricks — `1 << i` creates a number with exactly bit i set and all others clear.

### Arithmetic right shift: `x >> n`

Shift all bits to the **right** by n positions. The leftmost vacated positions are filled with the **sign bit** (0 for positive numbers, 1 for negative numbers). Bits that fall off the right are discarded.

```
20  >> 1:
  0 0 0 1 0 1 0 0   (20)
→ 0 0 0 0 1 0 1 0   (10)
```

**Pattern:** `x >> n` is the same as dividing by 2ⁿ and rounding toward negative infinity (floor division).

```js
20 >> 1   // 10
20 >> 2   //  5
17 >> 1   //  8  (floor(17 / 2) = 8)
-8 >> 1   // -4  (sign bit preserved)
```

> ⚠️ **The sign-bit extension detail**
> For positive numbers, right shift fills with 0s. For negative numbers, it fills with 1s, keeping the number negative. This "arithmetic shift" preserves the sign. `>>>` (next lesson) does not.

---

<a id="lesson-11"></a>
## Lesson 11 — Unsigned right shift (`>>>`) — the JS special case

`>>>` always fills the vacated positions on the left with **0**, even for negative numbers. The result is always treated as an unsigned 32-bit integer.

```js
-1 >> 1    // -1   (arithmetic: sign bit propagated, stays negative)
-1 >>> 1   // 2147483647  (unsigned: fills with 0, result is 0x7FFFFFFF)
```

### Why does JS have this?

JavaScript numbers are 64-bit floating-point, but all bitwise ops internally work on **32-bit signed** integers. If you do `~` or `<<` or `>>`, the result is a signed 32-bit integer. But `>>>` converts the result to an **unsigned** 32-bit integer before returning.

The most common legitimate use of `>>> 0` is to convert a possibly-negative result into a positive integer:

```js
// Force a 32-bit unsigned interpretation:
(-1) >>> 0    // 4294967295  (which is 0xFFFFFFFF — all bits set)
```

You also see `>>> 1` (instead of `>> 1`) when computing a midpoint to avoid overflow:

```js
const mid = (left + right) >>> 1;   // safe unsigned average
```

> 💡 **Tip**
> Unless you're dealing with negative numbers in bitwise tricks, `>>` and `>>>` behave the same for positive inputs. Use `>>>` when you explicitly need the result treated as unsigned.

---

<a id="lesson-12"></a>
## Lesson 12 — Truth tables at a glance

These tables show what each operator outputs for every possible pair of single bits.

### AND

```
A  B  │  A & B
───────────────
0  0  │    0
0  1  │    0
1  0  │    0
1  1  │    1    ← only case that produces 1
```

### OR

```
A  B  │  A | B
───────────────
0  0  │    0
0  1  │    1
1  0  │    1
1  1  │    1    ← only case that stays 0 is 0|0
```

### XOR

```
A  B  │  A ^ B
───────────────
0  0  │    0    ← same
0  1  │    1    ← different
1  0  │    1    ← different
1  1  │    0    ← same
```

XOR means "exclusive OR" — "one or the other, but not both."

### NOT

```
A  │  ~A
──────────
0  │   1
1  │   0
```

> ✋ **Pause and try**
> What is `10 & 14`? Work it out column by column.
>
> <details>
> <summary>Show answer</summary>
>
> ```
>  10 = 1010
>  14 = 1110
>  ─────────
>       1010 = 10
> ```
> Column by column: 1&1=1, 0&1=0, 1&1=1, 0&0=0 → 1010 = 10.
> </details>

---

<a id="lesson-13"></a>
## Lesson 13 — Checking, setting, clearing, and toggling bit i

These four operations are the building blocks of every bit-manipulation problem. Memorize them.

### Check: is bit i set?

```js
(x >> i) & 1   // 1 if bit i is set, 0 if not
```

Or equivalently:

```js
(x & (1 << i)) !== 0
```

The first form is usually preferred for its clarity.

Example — is bit 3 of 42 set?

```
42 = 1 0 1 0 1 0
              ↑ bit 3 = 1  (value 8)

(42 >> 3) & 1
= 5 & 1
= (0 1 0 1) & (0 0 0 1)
= 0 0 0 1
= 1   ← yes, bit 3 is set
```

### Set: turn bit i ON

```js
x | (1 << i)
```

Creates a mask with only bit i as 1, then ORs it in. Any bit already 1 stays 1. Bit i becomes 1 regardless.

### Clear: turn bit i OFF

```js
x & ~(1 << i)
```

Creates a mask with only bit i as 0 (all others are 1), then ANDs. Bit i is forced to 0. All other bits stay unchanged.

### Toggle: flip bit i

```js
x ^ (1 << i)
```

Creates a mask with only bit i as 1, then XORs. XOR with 1 flips. All other bits are XORed with 0 and stay unchanged.

### Summary diagram

```
      x   =  0 1 0 1 1 0 1 0   (90)
   bit i  =      ↑  bit 5

Check:     (x >> 5) & 1   = 1  ← yes, it's set
Clear:     x & ~(1 << 5)  = 0 1 0 1 1 0 1 0 & 1 1 0 1 1 1 1 1 = 0 1 0 1 1 0 1 0... wait

Let's redo with a cleaner example:
   x  = 1 0 1 0  (10)  bit 1 = 1
   mask for bit 1 = 0 0 1 0  (2 = 1 << 1)

Check:   (10 >> 1) & 1  = 5 & 1 = 1   ✓ bit 1 is set
Set:     10 | 2 = 1 0 1 0 | 0 0 1 0 = 1 0 1 0 = 10   (already set, no change)
Clear:   10 & ~2 = 1 0 1 0 & 1 1 0 1 = 1 0 0 0 = 8   (bit 1 turned off)
Toggle:  10 ^ 2  = 1 0 1 0 ^ 0 0 1 0 = 1 0 0 0 = 8   (bit 1 flipped off)
```

> 🎯 **Key takeaway**
> | Goal | Code |
> |------|------|
> | Check bit i | `(x >> i) & 1` |
> | Set bit i | `x \| (1 << i)` |
> | Clear bit i | `x & ~(1 << i)` |
> | Toggle bit i | `x ^ (1 << i)` |

---

<a id="lesson-14"></a>
## Lesson 14 — Counting set bits — Brian Kernighan's trick

How many 1s are in the binary representation of a number? This is called the **popcount** (population count) or **Hamming weight**.

### Naive approach

Loop through each bit position and check it:

```js
function countBitsNaive(x) {
  let count = 0;
  while (x > 0) {
    count += x & 1;   // add 1 if the rightmost bit is set
    x >>>= 1;          // shift right (unsigned, so we don't loop forever on negatives)
  }
  return count;
}
```

This takes O(number of bits) — O(32) in JS, so technically O(1), but it's still 32 iterations in the worst case.

### Brian Kernighan's trick

There's a cleverer loop. Notice this magic: **`x & (x - 1)` clears the lowest set bit of x**.

Why? Subtracting 1 from a number flips the rightmost 1 and everything to its right:

```
x   = 1 0 1 1 0 0   (44)
x-1 = 1 0 1 0 1 1   (43)
x & (x-1) = 1 0 1 0 0 0   (40)  ← bit 2 (the lowest set bit) is now 0
```

If you repeatedly apply `x = x & (x - 1)` until `x` is 0, you execute exactly one iteration per **set bit** — not per total bit. A number with only 3 set bits takes 3 iterations.

```js
function countBits(x) {
  let count = 0;
  while (x !== 0) {
    x &= x - 1;   // clear the lowest set bit
    count++;
  }
  return count;
}

countBits(7);    // 7 = 111₂ → 3 set bits
countBits(128);  // 128 = 10000000₂ → 1 set bit  (one iteration only!)
countBits(255);  // 255 = 11111111₂ → 8 set bits
```

### The step-by-step for 44:

```
x = 101100 (44)  →  x & (x-1) = 101000 (40)   count = 1
x = 101000 (40)  →  x & (x-1) = 100000 (32)   count = 2
x = 100000 (32)  →  x & (x-1) = 000000 (0)    count = 3
x = 0 → stop

44 in binary is 101100, which has 3 set bits. ✓
```

> 🎯 **Key takeaway**
> `x & (x - 1)` strips the lowest set bit. Loop until x is 0, counting each strip. This is Brian Kernighan's algorithm and it runs in O(k) where k is the number of set bits.

---

<a id="lesson-15"></a>
## Lesson 15 — Checking if a number is a power of 2

A power of 2 in binary has **exactly one bit set**:

```
1  = 000001
2  = 000010
4  = 000100
8  = 001000
16 = 010000
32 = 100000
```

Non-powers of 2 have more than one bit set: 6 = 110, 7 = 111, 12 = 1100.

Here's the trick: for any power of 2 `x`, `x - 1` flips that one set bit and sets all bits below it:

```
8   = 1 0 0 0
8-1 = 0 1 1 1

8 & 7 = 1 0 0 0 & 0 1 1 1 = 0 0 0 0   ← zero!
```

For a non-power like 6:
```
6   = 1 1 0
6-1 = 1 0 1

6 & 5 = 1 1 0 & 1 0 1 = 1 0 0 = 4   ← non-zero!
```

So: `x > 0 && (x & (x - 1)) === 0` is true if and only if x is a power of 2.

```js
function isPowerOfTwo(x) {
  return x > 0 && (x & (x - 1)) === 0;
}

isPowerOfTwo(16);   // true
isPowerOfTwo(18);   // false (18 = 10010, two bits set)
isPowerOfTwo(1);    // true  (1 = 1, one bit set — 2⁰)
isPowerOfTwo(0);    // false (edge case: 0 & -1 = 0 but 0 is not a power)
```

> 💡 **Extension: power of 4?**
> Powers of 4 are also powers of 2, but their single set bit is always at an **even** position (0, 2, 4, 6, …). The mask `0xAAAAAAAA` has bits set at all odd positions. So:
> ```js
> function isPowerOfFour(x) {
>   return x > 0 && (x & (x - 1)) === 0 && (x & 0xAAAAAAAA) === 0;
> }
> ```

---

<a id="lesson-16"></a>
## Lesson 16 — Swapping two numbers without a temp variable

The classic "swap without temp" trick uses XOR. It works because of the properties we saw in Lesson 8.

```js
let a = 5;   // 101
let b = 3;   // 011

a ^= b;   // a = 5 ^ 3 = 110 (6)
b ^= a;   // b = 3 ^ 6 = 101 (5)  ← b is now the original a
a ^= b;   // a = 6 ^ 5 = 011 (3)  ← a is now the original b
```

Let's trace through bit by bit:

```
Start:     a = 101,  b = 011

Step 1: a ^= b
        a = 101 ^ 011 = 110

Step 2: b ^= a
        b = 011 ^ 110 = 101   ← this is the original value of a

Step 3: a ^= b
        a = 110 ^ 101 = 011   ← this is the original value of b

End:       a = 011 (3),  b = 101 (5)  ✓
```

> ⚠️ **One gotcha:** this trick fails if `a` and `b` are the same variable (i.e., both point to the same memory location, like `a === a`). The first step `a ^= a` sets `a` to 0 and you lose the value. If there's any chance they're the same, check first or use the destructuring swap: `[a, b] = [b, a]`.

In practice, in JavaScript, use the destructuring swap:

```js
[a, b] = [b, a];   // clean, idiomatic, zero-mistake
```

The XOR swap is more of a trivia/interview trick than production code.

---

<a id="lesson-17"></a>
## Lesson 17 — XOR's magical identity — `x ^ x = 0`

Let's revisit this because it's the key to several important problems.

```
x ^ x = 0  for all x
x ^ 0 = x  for all x
```

These two facts together mean: XOR-ing a sequence of numbers cancels all pairs.

**Example:** `1 ^ 2 ^ 3 ^ 2 ^ 1`

```
= (1 ^ 1) ^ (2 ^ 2) ^ 3
= 0 ^ 0 ^ 3
= 3
```

The 1s cancelled each other. The 2s cancelled each other. The 3, which appeared only once, survived.

### Finding the missing number

If you have numbers `0, 1, 2, ..., n` and one is missing, XOR all the expected values with all the actual values. Every pair cancels. The missing number survives.

```js
function missingNumber(nums) {
  let xor = nums.length;   // start with n (the value not yet in nums)
  for (let i = 0; i < nums.length; i++) {
    xor ^= i ^ nums[i];   // XOR expected index AND actual value
  }
  return xor;
}

missingNumber([3, 0, 1]);   // 2
```

### Finding two numbers that appear once

If two numbers appear once and all others appear twice, you can find both using XOR. The initial XOR of all elements gives you `a ^ b`. From there, find any set bit (both a and b disagree on it), and use that bit to partition the array into two groups. XOR each group separately to get a and b.

> 🎯 **Key takeaway**
> XOR's cancellation identity is one of the most elegant tools in the bit-manipulation toolkit. It lets you find "odd ones out" in O(n) time and O(1) space — no hash maps, no sorting.

---

<a id="lesson-18"></a>
## Lesson 18 — ⚠️ JS gotcha: bitwise ops are 32-bit signed

This is the most important warning in this entire notes file.

**JavaScript numbers are normally 64-bit floating-point** (IEEE 754 `double`). They can represent integers exactly up to 2^53.

But **all six bitwise operators** internally convert their operands to **32-bit signed two's-complement integers**, do the bit operation, and return a 32-bit result (or unsigned 32-bit for `>>>`).

This means:

```js
2 ** 31      // 2147483648  (fine as a number)
1 << 31      // -2147483648  ← NEGATIVE! Bit 31 is the sign bit in 32-bit signed
```

```
1 << 31:
  0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1
  shift left 31:
  1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
  ↑ this is the sign bit in 32-bit signed two's complement → -2147483648
```

Let's also look at what happens with large numbers:

```js
0x100000000 | 0    // 0  ← anything that doesn't fit in 32 bits is truncated
0xFFFFFFFF | 0     // -1  ← all 32 bits set = -1 in two's complement

~0                  // -1  (all bits flipped → all 1s = -1)
~-1                 //  0  (flip all 1s → all 0s = 0)
```

### Two's complement — the "why ~x = -(x+1)" explanation

In two's complement (how negative numbers are stored in binary), negating a number means: flip all bits, then add 1.

```
5  =  0000 0101
~5 =  1111 1010   ← flip all bits
-5 =  1111 1011   ← flip all bits AND add 1

So ~5 = -5 - 1 = -6
```

That's why `~x = -(x + 1)` in JavaScript.

### The key danger zones

```js
1 << 31   // -2147483648 (not 2147483648!)
1 << 32   //  1           (shift wraps around mod 32)
1 << 33   //  2           (same)
```

And the gotcha with counting bits — if you're not careful with signed right shift on negative numbers, you'll loop forever:

```js
// BAD: infinite loop if x is negative
let x = -1;
while (x > 0) {
  x >>= 1;   // -1 >> 1 = -1 (sign bit preserved), loop never ends!
}

// GOOD: use >>> for unsigned shift, or handle negatives explicitly
while (x !== 0) {
  x >>>= 1;   // fills with 0, always terminates
}
```

> ⚠️ **The rule:** In JavaScript, whenever you do bitwise operations with the intent to inspect individual bits, use `>>>` (unsigned right shift) for any operation that might involve negative numbers or that needs to shift over the sign bit. For most interview problems where inputs are non-negative, `>>` is fine.

---

<a id="lesson-19"></a>
## Lesson 19 — BigInt when you need more than 32 bits

If you need to do bit manipulation on numbers larger than 32 bits (or need to avoid the 32-bit truncation behavior), use **BigInt**:

```js
const big = BigInt('9007199254740993');   // larger than Number.MAX_SAFE_INTEGER

// BigInt bitwise ops use as many bits as needed (arbitrary precision)
big & BigInt(0xFF)    // extract the lowest 8 bits
big | (1n << 40n)     // set bit 40
big >> 1n             // right shift (BigInt doesn't have >>>)
```

Note the `n` suffix on BigInt literals: `1n`, `42n`, `0xFFn`, `1n << 40n`.

**When do you need BigInt?**

- When the problem explicitly says "64-bit integer" (common in problems ported from Java/C++).
- When building a bitmask for more than 32 items (e.g., bitmask DP with 33+ cities in TSP).
- When the problem says numbers can be up to 2^53 or larger.

**Most LeetCode/interview problems don't need it** — they're careful to stay within 32 bits for JavaScript compatibility.

> 💡 **Tip**
> BigInt is slower than regular numbers and has some quirks (you can't mix BigInt and Number arithmetic without explicit conversion). Use it only when the problem forces you outside 32 bits.

---

<a id="lesson-20"></a>
## Lesson 20 — Preview: bitmask DP

This is just a preview — you don't need to understand it deeply right now. Come back when you hit Q28 or Q31.

**The idea:** Some problems involve subsets of a small set (≤ 20 items). Each subset can be encoded as an integer where bit i indicates "is item i in the subset?"

For 4 items `{A, B, C, D}`:
```
0000 = {}          (no items)
0001 = {A}         (item 0 only)
0010 = {B}         (item 1 only)
0011 = {A, B}      (items 0 and 1)
1111 = {A, B, C, D} (all items)
```

You can iterate over all subsets from 0 to `(1 << n) - 1`, do DP transitions with bit tricks, and compute answers over all subsets efficiently.

This is bitmask DP. It's the technique behind the classic **Travelling Salesman** problem in O(2ⁿ · n²) time.

The key operations you need from this notes file:
- Iterate subsets: `for (let mask = 0; mask < (1 << n); mask++)`
- Add item i to set: `mask | (1 << i)`
- Remove item i from set: `mask & ~(1 << i)`
- Check if item i is in set: `(mask >> i) & 1`
- Enumerate sub-subsets of a mask: `for (let sub = mask; sub > 0; sub = (sub - 1) & mask)`

---

<a id="lesson-21"></a>
## Lesson 21 — Preview: bit trie

Also just a preview — relevant for Q25 and Q27.

A **bit trie** (also called "binary trie") is a tree structure where you build a trie character by character, but the "characters" are individual bits of a number (usually processed from most significant to least significant).

It lets you answer "what number in this set XORs with a query number to give the maximum result?" in O(32) = O(1) per query.

**How it works:**

For each number, insert it into the trie bit by bit (from bit 31 down to bit 0). Each internal node has two children: one for bit=0, one for bit=1.

To find the number that maximizes XOR with a query `q`:
- At each level, try to go the direction *opposite* to the current bit of `q` (to produce a 1 in the XOR result).
- If that direction doesn't exist, go the only available direction.

This gives you the maximum XOR in O(32) per query.

---

<a id="lesson-22"></a>
## Lesson 22 — Quick reference

Here's the cheat sheet. Every line here has been covered in the lessons above.

### The 6 operators at a glance

| Operator | Symbol | Output is 1 when… |
|----------|--------|-------------------|
| AND | `&` | both bits are 1 |
| OR | `\|` | at least one bit is 1 |
| XOR | `^` | bits are different |
| NOT | `~` | — (flips all bits) |
| Left shift | `<<` | — |
| Arithmetic right shift | `>>` | — |
| Unsigned right shift | `>>>` | — |

### Bit operation recipes

| Goal | Code |
|------|------|
| Check if x is even | `(x & 1) === 0` |
| Check if x is odd | `(x & 1) === 1` |
| Get bit i | `(x >> i) & 1` |
| Set bit i | `x \| (1 << i)` |
| Clear bit i | `x & ~(1 << i)` |
| Toggle bit i | `x ^ (1 << i)` |
| Lowest set bit | `x & -x` |
| Clear lowest set bit | `x & (x - 1)` |
| Is power of 2 | `x > 0 && (x & (x - 1)) === 0` |
| Count set bits (Brian Kernighan) | loop: `x &= x - 1; count++` until `x === 0` |
| Swap without temp (XOR) | `a ^= b; b ^= a; a ^= b;` |
| Multiply by 2ⁿ | `x << n` |
| Divide by 2ⁿ (floor) | `x >> n` |
| All n-bit masks | `(1 << n) - 1` |

### JS-specific gotchas

| Gotcha | What happens |
|--------|--------------|
| `1 << 31` | `-2147483648` (bit 31 is the sign bit) |
| `~x` | `-(x + 1)` always |
| `x \| 0` | converts to 32-bit signed int |
| `x >>> 0` | converts to 32-bit unsigned int |
| Bitwise on `1e30` | truncates to 0 first! |
| Max safe integer | 2^53 − 1; use BigInt beyond 32-bit ops |

### XOR identities

```
x ^ x  =  0    (self-cancellation)
x ^ 0  =  x    (identity)
x ^ y ^ y  =  x  (XOR is its own inverse)
```

---

<a id="lesson-23"></a>
## Lesson 23 — You did it. Now what?

Take a breath. You just learned:

1. **Binary numbers** — the alphabet of computers, place values as powers of 2.
2. **The six bitwise operators** — AND, OR, XOR, NOT, `<<`, `>>`, `>>>`.
3. **Truth tables** — the exact rules for each operator.
4. **Bit recipes** — check/set/clear/toggle any bit with one line.
5. **Brian Kernighan's trick** — count set bits elegantly.
6. **Power of 2 check** — `x > 0 && (x & (x-1)) === 0`.
7. **XOR's magical property** — pairs cancel, lone values survive.
8. **JS's 32-bit trap** — `1 << 31` is negative.
9. **BigInt** — when to escape the 32-bit limit.
10. **Bitmask DP and bit tries** — just a preview for now.

### What to do next

1. Open [`questions/01-even-or-odd.md`](./questions/01-even-or-odd.md).
2. Read the problem. Try to identify which operator(s) to use.
3. Open [`solutions/01-even-or-odd.js`](./solutions/01-even-or-odd.js) and write the code.
4. If you get stuck, come back here and re-read the relevant lesson.
5. Tick the box in [`README.md`](./README.md). Move on.

### Pacing

- **Easy problems:** do two or three a day. They're fast once you know the recipes.
- **Medium problems:** one a day is fine. Some (like Single Number III or Counting Bits) are more involved.
- **Hard problems:** take your time. Bitmask DP in particular takes a long time to internalize.

Bit manipulation is one of those topics where **10 minutes of thinking at a whiteboard beats 2 hours of staring at code**. Draw the bits. Work through a small example by hand. Then code.

See you in [Q1](./questions/01-even-or-odd.md). 💪
