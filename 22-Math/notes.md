# Math & Number Theory — Lessons from Zero

> 👋 Hey. This file is for someone who hasn't done number theory before — or did it years ago and forgot it. We're going to build up from basic divisibility to modular arithmetic, prime sieves, fast exponentiation, and a little geometry. One idea at a time.
>
> Don't worry if you haven't seen this stuff. You don't need a math degree. You need curiosity and patience.
>
> Total reading time at a relaxed pace: about 90 minutes. **Take breaks. Seriously.**

---

## Table of Lessons

1. [Divisibility and remainders — the pizza split](#lesson-1)
2. [The modulo operator in JavaScript](#lesson-2)
3. [Why modulo matters — overflow protection](#lesson-3)
4. [GCD — the greatest common divisor](#lesson-4)
5. [Euclid's algorithm, walked through step by step](#lesson-5)
6. [LCM — the least common multiple](#lesson-6)
7. [Prime numbers — the atoms of arithmetic](#lesson-7)
8. [Checking if a number is prime (trial division up to √n)](#lesson-8)
9. [The Sieve of Eratosthenes](#lesson-9)
10. [Counting and finding all divisors of N](#lesson-10)
11. [Prime factorization](#lesson-11)
12. [Modular arithmetic — clock math](#lesson-12)
13. [Modular arithmetic identities (add, multiply, subtract)](#lesson-13)
14. [Fast exponentiation — the squaring trick](#lesson-14)
15. [Modular exponentiation](#lesson-15)
16. [Fibonacci — five different implementations](#lesson-16)
17. [Factorials, combinations, and combinatorics intuition](#lesson-17)
18. [JS Number precision — `2^53 - 1` and when to use BigInt](#lesson-18)
19. [Modular inverse — Fermat's Little Theorem preview](#lesson-19)
20. [Euler's Totient and a first glimpse at deeper number theory](#lesson-20)
21. [Coordinate geometry basics](#lesson-21)
22. [Quick reference — complexity cheat sheet](#lesson-22)

---

<a id="lesson-1"></a>
## Lesson 1 — Divisibility and remainders — the pizza split

Imagine you're splitting **17 slices of pizza** equally among **5 friends**. Each friend gets **3 slices**, and you have **2 slices left over**. That leftover is the **remainder**.

In math terms: `17 = 5 × 3 + 2`. More formally, we say:

```
17 divided by 5  →  quotient 3, remainder 2
```

We write `17 mod 5 = 2`. Read it as "seventeen mod five equals two."

A few more examples to make it concrete:

```
20 mod 5 = 0    (20 pizzas ÷ 5 friends = 4 each, none left over)
21 mod 5 = 1    (21 ÷ 5 = 4 each, 1 left over)
22 mod 5 = 2
23 mod 5 = 3
24 mod 5 = 4
25 mod 5 = 0    (cycle restarts!)
26 mod 5 = 1
...
```

Notice: modding by 5 gives you answers that cycle through `0, 1, 2, 3, 4` and then reset. That's no coincidence — you'll see this cycling pattern everywhere.

**Divisibility** is just "does the remainder equal zero?" If `a mod b === 0`, then `b` **divides** `a` cleanly.

```
12 is divisible by 4 (12 mod 4 = 0)   ✅
13 is NOT divisible by 4 (13 mod 4 = 1)  ✗
```

> 🎯 **Key takeaway**
> `a mod b` is the remainder when you divide `a` by `b`. If it's 0, `b` divides `a` evenly. This is the foundation of almost everything else in this chapter.

---

<a id="lesson-2"></a>
## Lesson 2 — The modulo operator in JavaScript

In JavaScript, the modulo operator is `%`.

```js
console.log(17 % 5);   // 2
console.log(20 % 5);   // 0
console.log(7 % 2);    // 1  (odd test: any odd number mod 2 = 1)
console.log(8 % 2);    // 0  (even test)
```

**Even/odd check:**

```js
function isEven(n) {
  return n % 2 === 0;
}

isEven(10);   // true
isEven(7);    // false
```

This is one of the most common uses of `%`. Any even number mod 2 is 0; any odd number mod 2 is 1.

**A gotcha with negative numbers:**

```js
console.log(-7 % 3);   // -1  (JavaScript keeps the sign of the dividend)
```

In mathematics, `-7 mod 3 = 2` (you always get a non-negative result). But JavaScript gives `-1`. This matters if you ever use `%` with negative numbers. Safe fix:

```js
function mod(a, m) {
  return ((a % m) + m) % m;
}

mod(-7, 3);   // 2   ✅
mod(7, 3);    // 1   ✅ (works for positives too)
```

> 💡 **Tip**
> The `% n % n` trick `((a % m) + m) % m` is the safest way to compute a mathematically correct modulo in JavaScript, especially when `a` might be negative.

---

<a id="lesson-3"></a>
## Lesson 3 — Why modulo matters — overflow protection

Here's a situation you'll hit in competitive programming and interview problems constantly:

> "Compute the answer modulo `10^9 + 7`."

Why do they ask this? Because the real answer might be astronomically large — like the number of ways to arrange 100 items (`100!`), which has 158 digits. No computer variable can hold that.

`10^9 + 7` (= 1,000,000,007) is a special number: it's **prime**, and it's small enough to fit comfortably in a 32-bit integer. By keeping all intermediate results mod this number, we prevent values from ever growing uncontrollably.

**The magic properties that make this work:**

```
(a + b) % m  =  ((a % m) + (b % m)) % m
(a * b) % m  =  ((a % m) * (b % m)) % m
(a - b) % m  =  ((a % m) - (b % m) + m) % m   // + m to keep it non-negative
```

Let's verify the multiplication rule with a tiny example: compute `(14 * 13) mod 5`.

```
Direct:   14 * 13 = 182,   182 mod 5 = 2
Via rule: (14 mod 5) * (13 mod 5) mod 5
        = 4 * 3 mod 5
        = 12 mod 5
        = 2   ✅
```

Same answer, but we never let numbers grow past `m` at any step.

> ⚠️ **Important for JS**
> JavaScript's safe integer limit is `2^53 - 1` ≈ 9 × 10^15. If you multiply two numbers both around `10^9`, you get `10^18` — that's **beyond safe integer range** and you'll get wrong answers silently. Apply `% MOD` after every multiplication. We'll revisit JS number limits in Lesson 18.

> 🎯 **Key takeaway**
> When a problem says "output the answer mod 10^9 + 7", they're protecting you from overflow. Apply `% MOD` after every addition and every multiplication.

---

<a id="lesson-4"></a>
## Lesson 4 — GCD — the greatest common divisor

The **GCD** (greatest common divisor) of two numbers is the largest number that divides both of them without a remainder.

**Example:** What's the GCD of 12 and 8?

Divisors of 12: `1, 2, 3, 4, 6, 12`
Divisors of 8:  `1, 2, 4, 8`

Common divisors: `1, 2, 4`

Greatest common divisor: **4**

So `gcd(12, 8) = 4`.

Real-world analogy: you have a 12-cm rope and an 8-cm rope. What's the longest ruler you could use to measure both exactly, with no leftover? A 4-cm ruler works: 12 = 4 × 3, 8 = 4 × 2.

Another example: `gcd(36, 48)`?

```
Divisors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36
Divisors of 48: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48
Common: 1, 2, 3, 4, 6, 12
GCD = 12
```

The brute-force approach (list divisors of both, find the max common one) works but is slow for large numbers. The efficient approach is Euclid's algorithm — next lesson.

> 🎯 **Key takeaway**
> GCD(a, b) is the biggest number that divides both a and b. Useful everywhere: simplifying fractions, finding tile sizes, LCM computation.

---

<a id="lesson-5"></a>
## Lesson 5 — Euclid's algorithm, walked through step by step

Euclid discovered something beautiful around 300 BCE: to find `gcd(a, b)`, you don't need to list every divisor. You just use the fact that:

```
gcd(a, b) = gcd(b, a mod b)
```

And when `b` hits 0, the GCD is `a`.

Let's trace it for `gcd(48, 36)`:

```
Step 1: gcd(48, 36)  →  gcd(36, 48 mod 36)  =  gcd(36, 12)
Step 2: gcd(36, 12)  →  gcd(12, 36 mod 12)  =  gcd(12, 0)
Step 3: b = 0, so GCD = 12   ✅
```

Another one: `gcd(100, 75)`:

```
Step 1: gcd(100, 75)  →  gcd(75, 100 mod 75) = gcd(75, 25)
Step 2: gcd(75, 25)   →  gcd(25, 75 mod 25)  = gcd(25, 0)
Step 3: b = 0, GCD = 25   ✅
```

A messier one: `gcd(252, 105)`:

```
gcd(252, 105)
→ gcd(105, 252 mod 105) = gcd(105, 42)
→ gcd(42,  105 mod 42)  = gcd(42, 21)
→ gcd(21,  42 mod 21)   = gcd(21, 0)
→ 21
```

**In code:**

```js
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];   // swap a ← b, b ← a mod b
  }
  return a;
}

gcd(48, 36);    // 12
gcd(252, 105);  // 21
```

**Why is it fast?** At each step, the smaller number gets at least halved. So after at most `2 * log2(min(a, b))` steps, we're done. That's **O(log(min(a, b)))** — crazy fast even for numbers in the billions.

**Recursive version** (same logic, different style):

```js
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
```

Both versions are correct. The iterative one avoids call-stack growth for large numbers.

> ✋ **Pause and try**
> What is `gcd(17, 5)`? Trace through the steps.
>
> <details>
> <summary>Show answer</summary>
>
> ```
> gcd(17, 5) → gcd(5, 17 mod 5) = gcd(5, 2)
> gcd(5, 2)  → gcd(2, 5 mod 2)  = gcd(2, 1)
> gcd(2, 1)  → gcd(1, 2 mod 1)  = gcd(1, 0)
> b = 0, GCD = 1
> ```
> 17 and 5 share no common divisor larger than 1 — they are **coprime**.
> </details>

> 🎯 **Key takeaway**
> `gcd(a, b) = gcd(b, a % b)`, stop when `b = 0`. Time: O(log min(a, b)). Memorize this — it's in dozens of problems.

---

<a id="lesson-6"></a>
## Lesson 6 — LCM — the least common multiple

The **LCM** (least common multiple) of two numbers is the smallest number that is a multiple of both.

**Example:** What's the LCM of 4 and 6?

Multiples of 4: `4, 8, 12, 16, 20, 24, …`
Multiples of 6: `6, 12, 18, 24, …`

First common one: **12**. So `lcm(4, 6) = 12`.

Real-world analogy: Bus A comes every 4 minutes, Bus B every 6 minutes. They both stop at the same time to start. When's the next time they're both at the stop together? In 12 minutes.

**Computing LCM from GCD:**

There's a slick formula that avoids listing multiples:

```
lcm(a, b) = (a * b) / gcd(a, b)
```

Why? Because GCD captures all the shared prime factors. Dividing by GCD prevents double-counting them.

```
lcm(4, 6):  gcd(4, 6) = 2,  lcm = (4 * 6) / 2 = 12   ✅
lcm(12, 8): gcd(12, 8) = 4, lcm = (12 * 8) / 4 = 24   ✅
```

**In code:**

```js
function lcm(a, b) {
  return (a / gcd(a, b)) * b;   // divide first to avoid overflow
}
```

Notice `(a / gcd) * b` instead of `(a * b) / gcd`. The first version divides first, keeping numbers smaller. With the second, `a * b` could overflow before you divide. Dividing first is a good habit.

> 💡 **Tip**
> `lcm(a, b) = a / gcd(a, b) * b`. Always divide before multiplying to keep intermediate values small.

---

<a id="lesson-7"></a>
## Lesson 7 — Prime numbers — the atoms of arithmetic

A **prime number** is a whole number greater than 1 that has exactly two divisors: 1 and itself.

```
2  → divisors: 1, 2        → prime ✅
3  → divisors: 1, 3        → prime ✅
4  → divisors: 1, 2, 4     → NOT prime (has divisor 2)
5  → divisors: 1, 5        → prime ✅
6  → divisors: 1, 2, 3, 6  → NOT prime
7  → divisors: 1, 7        → prime ✅
```

Primes are called the "atoms" of arithmetic because of the **Fundamental Theorem of Arithmetic**: every integer greater than 1 can be written as a **unique product of primes**.

```
12 = 2 × 2 × 3
18 = 2 × 3 × 3
100 = 2 × 2 × 5 × 5
```

There's no other way to write 12 as a product of primes except `2 × 2 × 3`. This uniqueness is remarkable and underlies a lot of cryptography and algorithm design.

Special cases:
- **1 is NOT prime.** It has only one divisor (itself). Primes need exactly two.
- **2 is the ONLY even prime.** Every other even number has 2 as a factor.

> 🎯 **Key takeaway**
> A prime has exactly two divisors. Every number is a unique product of primes. These facts power a huge portion of number theory.

---

<a id="lesson-8"></a>
## Lesson 8 — Checking if a number is prime (trial division up to √n)

**Brute force:** check if any number from 2 to n−1 divides n.

```js
// O(n) — works but slow for large n
function isPrimeSlow(n) {
  if (n < 2) return false;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}
```

**Key insight for the O(√n) version:**

If `n` has a divisor `d` greater than `√n`, then `n / d` is a divisor **smaller** than `√n`. So if `n` has any divisor at all (other than 1 and n), one of them must be ≤ √n.

Therefore: we only need to check divisors up to `√n`.

```js
// O(√n) — much faster
function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;   // quick even check

  for (let i = 3; i * i <= n; i += 2) {
    //                ↑ equivalent to i <= Math.sqrt(n)
    //                                            ↑ only odd numbers
    if (n % i === 0) return false;
  }
  return true;
}
```

Two micro-optimizations here:
1. Check if `n % 2 === 0` first (handles all even numbers instantly).
2. Then only loop through **odd** numbers (2, 3 are already handled), so `i += 2` instead of `i++`. Cuts work in half.

Let's trace it for `n = 29`:
```
√29 ≈ 5.38, so we check up to 5.
i = 3: 29 % 3 = 2 → not divisible
i = 5: 29 % 5 = 4 → not divisible
Loop ends. isPrime(29) = true  ✅
```

For `n = 35`:
```
√35 ≈ 5.9, check up to 5.
i = 3: 35 % 3 = 2 → not divisible
i = 5: 35 % 5 = 0 → DIVISIBLE!
isPrime(35) = false  ✅ (35 = 5 × 7)
```

> 🎯 **Key takeaway**
> To check if `n` is prime, only test divisors from 2 to √n. If none divide it, it's prime. Time: O(√n).

---

<a id="lesson-9"></a>
## Lesson 9 — The Sieve of Eratosthenes

Suppose you want **all** primes up to `N = 30`. Calling `isPrime(n)` for each number from 2 to 30 would work, but it's slower than it needs to be. The **Sieve** does it all at once.

**How it works:**

Imagine writing all numbers from 2 to N on a grid. Now, going through them in order:
- Circle 2 (it's prime). Then **cross out** every multiple of 2 (4, 6, 8, …) — they can't be prime.
- Circle 3 (still uncrossed — it's prime). Cross out every multiple of 3 (6, 9, 12, …).
- 4 is already crossed out — skip.
- Circle 5. Cross out 10, 15, 20, 25, 30.
- 6 crossed. 7: circle, cross out 14, 21, 28.
- Continue until done.

What's left circled is every prime up to 30: `2, 3, 5, 7, 11, 13, 17, 19, 23, 29`.

**In code:**

```js
function sieve(n) {
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        //       ↑ start at i², not 2i — everything below i² was already crossed
        isPrime[j] = false;
      }
    }
  }

  const primes = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) primes.push(i);
  }
  return primes;
}

sieve(30);
// [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

**Why start crossing out at `i * i`?**

When we reach prime `p`, all multiples `2p, 3p, 4p, …, (p-1)p` have already been crossed out by smaller primes (2, 3, …, p−1). The first new crossing-out we need to do is `p * p`.

**Complexity:** O(n log log n) — nearly linear. Crazy fast.

> 🔬 **Going deeper (optional)**
> The **linear sieve** runs in exactly O(n) by ensuring each composite number is crossed out exactly once. It's a bit more complex to code. For interview purposes, the standard sieve is always enough.

> ✋ **Pause and try**
> Trace the sieve for n = 20 by hand. Which numbers get crossed out by 2? By 3? By 5? What's left?
>
> <details>
> <summary>Show answer</summary>
>
> Crossed by 2: 4, 6, 8, 10, 12, 14, 16, 18, 20
> Crossed by 3: 9, 15 (6, 12, 18 already crossed by 2)
> Crossed by 5: 25 > 20, so just checking: nothing new under 20
> Primes: 2, 3, 5, 7, 11, 13, 17, 19
> </details>

> 🎯 **Key takeaway**
> The sieve finds all primes up to N in O(n log log n) by crossing out multiples. Use when you need primes in bulk.

---

<a id="lesson-10"></a>
## Lesson 10 — Counting and finding all divisors of N

A **divisor** of `n` is any integer `d` such that `n % d === 0`.

Divisors of 36: `1, 2, 3, 4, 6, 9, 12, 18, 36` → 9 divisors.

**Key insight:** divisors come in **pairs**. If `d` divides `n`, then so does `n / d`.

For 36:
```
1 × 36 = 36
2 × 18 = 36
3 × 12 = 36
4 × 9  = 36
6 × 6  = 36   ← d = n/d (square root case)
```

So we only need to check up to `√n`. For each divisor `d` we find below `√n`, we get a corresponding `n/d` divisor above `√n` for free.

```js
function getDivisors(n) {
  const divisors = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      divisors.push(i);
      if (i !== n / i) divisors.push(n / i);   // avoid duplicate at √n
    }
  }
  return divisors.sort((a, b) => a - b);
}

getDivisors(36);   // [1, 2, 3, 4, 6, 9, 12, 18, 36]
getDivisors(12);   // [1, 2, 3, 4, 6, 12]
```

**Counting divisors only (no list):**

```js
function countDivisors(n) {
  let count = 0;
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      count += (i === n / i) ? 1 : 2;   // perfect square root counts once
    }
  }
  return count;
}

countDivisors(36);   // 9
countDivisors(12);   // 6
countDivisors(7);    // 2 (prime — only 1 and 7)
```

**Complexity:** O(√n) — same reasoning as the prime check.

> 💡 **Tip**
> Perfect squares have an **odd** number of divisors (because one of the pairs is d = d). Every other number has an **even** count. This is the trick behind the "Bulb Switcher" problem (Q42).

---

<a id="lesson-11"></a>
## Lesson 11 — Prime factorization

**Prime factorization** means writing a number as a product of primes.

```
60 = 2 × 2 × 3 × 5 = 2² × 3 × 5
```

**Trial division approach:** divide by 2 as many times as possible, then by 3, 4, 5, …, up to √n.

```js
function primeFactors(n) {
  const factors = [];
  for (let p = 2; p * p <= n; p++) {
    while (n % p === 0) {
      factors.push(p);
      n = Math.floor(n / p);
    }
  }
  if (n > 1) factors.push(n);   // leftover is a prime factor
  return factors;
}

primeFactors(60);    // [2, 2, 3, 5]
primeFactors(84);    // [2, 2, 3, 7]
primeFactors(13);    // [13]  (13 is prime itself)
```

**Why does this work?** After we've divided out all 2s, all 3s, etc., if there's a remainder `n > 1` at the end, it must be a prime (because we already divided out everything up to √original_n).

**Complexity:** O(√n) in the worst case.

> 🎯 **Key takeaway**
> Trial division up to √n finds all prime factors. Divide out each prime completely before moving to the next.

---

<a id="lesson-12"></a>
## Lesson 12 — Modular arithmetic — clock math

You've seen modulo as "the remainder." But there's a richer way to think about it: **clock arithmetic**.

A clock has 12 positions: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 (or 1–12 — same idea). When you go past 11, you wrap back to 0.

```
Current time: 10 o'clock
Add 5 hours: 10 + 5 = 15... but on a 12-hour clock, that's 15 mod 12 = 3 o'clock.
```

This is exactly modular arithmetic. We say we're "working mod 12."

**In modular arithmetic, we write:**

```
10 + 5 ≡ 3  (mod 12)
```

The `≡` symbol means "congruent to" — not exactly equal, but equal when you wrap around.

**Why 1,000,000,007?** It's prime. Primes are special for modular arithmetic: for any non-zero `a`, `a` has a unique multiplicative inverse mod a prime `m`. (More in Lesson 19.)

> 💡 **Analogy**
> If you've ever written CSS `transform: rotate(...)` and gone past 360°, you've used modular arithmetic. 370° is the same angle as 10°.

---

<a id="lesson-13"></a>
## Lesson 13 — Modular arithmetic identities (add, multiply, subtract)

These rules let you keep numbers small throughout a computation. They're the most important formulas in competitive-programming math:

```
(a + b) mod m  =  ((a mod m) + (b mod m)) mod m
(a - b) mod m  =  ((a mod m) - (b mod m) + m) mod m   // + m to stay non-negative
(a × b) mod m  =  ((a mod m) × (b mod m)) mod m
```

**Worked example — computing 99 × 101 mod 7:**

```
Direct: 99 × 101 = 9999,  9999 mod 7 = 9999 - 1428 × 7 = 9999 - 9996 = 3

Via rule:
  99 mod 7 = 99 - 14 × 7 = 99 - 98 = 1
  101 mod 7 = 101 - 14 × 7 = 101 - 98 = 3
  (1 × 3) mod 7 = 3   ✅
```

Same answer, with much smaller intermediate numbers.

**A coding pattern you'll write constantly:**

```js
const MOD = 1_000_000_007n;   // BigInt version for large products

function addMod(a, b, m) {
  return (a + b) % m;
}

function mulMod(a, b, m) {
  return (a * b) % m;           // use BigInt if a, b can be ~10^9
}
```

> ⚠️ **Multiplication trap in JS**
> If `a` and `b` are both around `10^9`, then `a * b` is around `10^18`. JavaScript's `Number` type can't represent integers above `2^53 - 1 ≈ 9 × 10^15` exactly. `10^18 > 9 × 10^15`, so you'll silently get the wrong answer. Solution: use `BigInt` for the multiply, then convert back. We cover this in Lesson 18.

> 🎯 **Key takeaway**
> Apply `% m` after every addition and multiplication. Add `+ m` before the final `% m` in subtractions to prevent negative results.

---

<a id="lesson-14"></a>
## Lesson 14 — Fast exponentiation — the squaring trick

**Problem:** compute `2^10`. You could multiply 2 by itself 10 times — that's 9 multiplications.

But there's a smarter way, based on one observation:

```
2^10 = (2^5)^2           — one squaring gives us 2^10 from 2^5
2^5  = (2^2)^2 × 2       — 2^4 squared is 2^8; that's too far, so 2^4 × 2 = 2^5
2^2  = 2 × 2 = 4
```

The pattern: at each step, if the exponent is even, square. If odd, peel off one factor.

```
n = 10 (even):  result = (a^5)^2
n = 5  (odd):   result = a × (a^4)^1's answer... let me redo this clearly
```

**The algorithm in plain English:**

```
To compute a^n:
  if n == 0: return 1
  if n is even: return (a^(n/2))^2
  if n is odd:  return a × a^(n-1)
```

**Trace for `2^10`:**

```
2^10  → (2^5)^2
2^5   → 2 × (2^4)
2^4   → (2^2)^2
2^2   → (2^1)^2
2^1   → 2 × (2^0)
2^0   → 1

Building back up:
2^1 = 2 × 1 = 2
2^2 = 2^2 = 4
2^4 = 4^2 = 16
2^5 = 2 × 16 = 32
2^10 = 32^2 = 1024   ✅
```

Only **4 multiplications** instead of 9. For `2^1000`, you'd do about 20 multiplications instead of 999. Massive difference.

**In code:**

```js
function fastPow(a, n) {
  if (n === 0) return 1;
  if (n % 2 === 0) {
    const half = fastPow(a, n / 2);
    return half * half;
  } else {
    return a * fastPow(a, n - 1);
  }
}

fastPow(2, 10);   // 1024
fastPow(3, 5);    // 243
```

**Iterative version** (avoids recursion overhead):

```js
function fastPow(base, exp) {
  let result = 1;
  while (exp > 0) {
    if (exp % 2 === 1) result *= base;   // if current bit is 1, multiply in
    base *= base;                         // square the base
    exp = Math.floor(exp / 2);           // shift right one bit
  }
  return result;
}
```

**Why O(log n)?** The exponent halves at each step, so we need at most log₂(n) steps.

> 🎯 **Key takeaway**
> Fast exponentiation computes `a^n` in O(log n) multiplications by repeatedly squaring. This is one of the most important algorithmic tricks in math.

---

<a id="lesson-15"></a>
## Lesson 15 — Modular exponentiation

Combining the ideas from the last two lessons: compute `a^b mod m`.

The naive approach: compute `a^b` first, then take mod m. Problem: `a^b` can be astronomically large before you mod it.

The smart approach: apply `% m` at every step of the fast exponentiation.

```js
function modPow(base, exp, mod) {
  let result = 1n;
  base = BigInt(base) % BigInt(mod);
  exp = BigInt(exp);
  mod = BigInt(mod);

  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    base = (base * base) % mod;
    exp = exp / 2n;
  }
  return Number(result);
}

modPow(2, 10, 1000);      // 24    (1024 mod 1000)
modPow(3, 1000, 1000007); // some big-looking number, computed safely
```

We use `BigInt` here because intermediate products (before the `% mod`) can be as large as `mod^2`, which can exceed `2^53 - 1` if `mod` is around `10^9`.

**Where this is used:**
- RSA encryption (literally powers in modular arithmetic)
- Fermat's little theorem (see Lesson 19)
- "Super Pow" type problems where the exponent is given as an array of digits

> 💡 **Tip**
> Any problem that says "compute X mod 10^9+7 where X involves large exponents" is using modular exponentiation. Reach for this pattern immediately.

---

<a id="lesson-16"></a>
## Lesson 16 — Fibonacci — five different implementations

The Fibonacci sequence: `0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, …`

Each number is the sum of the two before it: `F(n) = F(n-1) + F(n-2)`, with `F(0) = 0, F(1) = 1`.

**Implementation 1 — Naive recursion (DO NOT use for large n):**

```js
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

This computes `fib(5)` by computing `fib(4)` and `fib(3)`. But `fib(4)` also computes `fib(3)`. And `fib(3)` computes `fib(2)` twice. The work **doubles** for every extra step. This is **O(2^n)** — catastrophically slow. `fib(50)` will freeze your browser.

**Implementation 2 — Memoization (top-down DP):**

```js
function fib(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  const result = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, result);
  return result;
}
```

Now each `fib(k)` is computed only once and cached. **O(n) time, O(n) space.**

**Implementation 3 — Iterative (bottom-up DP, O(n) time, O(1) space):**

```js
function fib(n) {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}
```

This is the clean, preferred implementation. Only two variables, no recursion.

**Implementation 4 — Matrix exponentiation (O(log n)):**

The Fibonacci sequence satisfies this matrix identity:

```
[F(n+1)]   [1 1]^n   [1]
[F(n)  ] = [1 0]   × [0]
```

By using fast matrix exponentiation (squaring the matrix), we can get the nth Fibonacci in O(log n) time. Useful if you need `fib(10^18)`.

**Implementation 5 — Binet's formula (O(1), but float precision issues):**

```
F(n) = round( φ^n / √5 )   where φ = (1 + √5) / 2 ≈ 1.6180339...
```

Works for small n. For large n, floating-point rounding errors make it unreliable.

> ⚠️ **JS precision warning**
> Fibonacci numbers grow roughly as φ^n. `F(80) ≈ 2.34 × 10^16`, which is larger than `Number.MAX_SAFE_INTEGER = 2^53 - 1 ≈ 9 × 10^15`. For n > 78, you need `BigInt` or modular arithmetic.

> 🎯 **Key takeaway**
> Use iterative Fibonacci for most problems. Use matrix exponentiation when n is huge. Never use naive recursion.

---

<a id="lesson-17"></a>
## Lesson 17 — Factorials, combinations, and combinatorics intuition

**Factorial:** `n! = n × (n-1) × … × 2 × 1`. Counts the number of ways to arrange n distinct items.

```
5! = 5 × 4 × 3 × 2 × 1 = 120
```

How many ways can you arrange 5 books on a shelf? 120.

Factorials grow **insanely fast**: `20! = 2,432,902,008,176,640,000`. That's already past JS's safe integer range. For n > 20, use `BigInt` or take mod.

```js
function factorial(n) {
  let result = 1n;   // BigInt
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}
```

**Combinations (choosing k items from n):**

```
C(n, k) = n! / (k! × (n-k)!)
```

Pronounced "n choose k." How many ways can you pick 3 friends from a group of 7?

```
C(7, 3) = 7! / (3! × 4!) = 5040 / (6 × 24) = 5040 / 144 = 35
```

**Modular combinations using Fermat's Little Theorem:**

When you need `C(n, k) mod p` (p prime), you can't just compute the factorials and divide — division doesn't work directly in modular arithmetic. Instead:

```
C(n, k) mod p = n! × modInverse(k!) × modInverse((n-k)!) mod p
```

where `modInverse(x) = x^(p-2) mod p` (Fermat's little theorem). More in Lesson 19.

**Pascal's triangle** gives you a visual:

```
       1
      1 1
     1 2 1
    1 3 3 1
   1 4 6 4 1
  1 5 10 10 5 1
```

Each number is the sum of the two above it. `C(n, k)` is the `k`th number (0-indexed) in the `n`th row.

> 🎯 **Key takeaway**
> Factorials count arrangements, combinations count selections. Both explode quickly — use BigInt or mod for large inputs.

---

<a id="lesson-18"></a>
## Lesson 18 — JS Number precision — `2^53 - 1` and when to use BigInt

JavaScript uses **64-bit floating-point** (IEEE 754 double) for all numbers. This gives you:

- Approximately 15–17 significant decimal digits
- **Safe integer range:** `-2^53 + 1` to `2^53 - 1`

```js
Number.MAX_SAFE_INTEGER   // 9007199254740991   (≈ 9 × 10^15)
Number.MIN_SAFE_INTEGER   // -9007199254740991
```

"Safe" means the integer can be represented exactly. Beyond this range, integers get rounded:

```js
console.log(9007199254740992);      // 9007199254740992   ← OK
console.log(9007199254740993);      // 9007199254740992   ← WRONG (rounded!)
console.log(9007199254740994);      // 9007199254740994   ← happens to be OK
console.log(9007199254740995);      // 9007199254740996   ← WRONG again
```

**When do you exceed this limit?**

- Factorials: `n! > 9 × 10^15` for `n > 18`
- Fibonacci: `F(n) > 9 × 10^15` for `n > 78`
- Products in modular exponentiation: if both factors are ~`10^9`, their product is `~10^18`

**`BigInt` to the rescue:**

```js
const big = 9007199254740993n;   // note the 'n' suffix — this is BigInt
console.log(big);                // 9007199254740993   ✅ exact!

const a = BigInt(1000000000) * BigInt(1000000000);
console.log(a);   // 1000000000000000000n   ✅
```

**Caveats with BigInt:**
- Can't mix `BigInt` and `Number` in operations: `1n + 1` throws a TypeError
- No `Math.*` functions work with BigInt
- `BigInt` is slower than `Number`
- Use BigInt only when you need it

```js
// Pattern: convert in, compute with BigInt, convert out
function safeMultiply(a, b, mod) {
  return Number(BigInt(a) * BigInt(b) % BigInt(mod));
}
```

> ⚠️ **Real mistake alert**
> This is a sneaky bug: you're computing something modulo `10^9 + 7`, your intermediate multiplication is `(a % MOD) * (b % MOD)`. Both factors are at most `10^9`. Their product is at most `10^18`. That's beyond `MAX_SAFE_INTEGER`. Your `%` operates on a wrong (rounded) product. Use `BigInt` for that multiply, or keep the numbers smaller.

> 🎯 **Key takeaway**
> JavaScript integers are exact only up to `2^53 - 1 ≈ 9 × 10^15`. Products of two `10^9` numbers overflow this. Use `BigInt` for such multiplications, then convert back.

---

<a id="lesson-19"></a>
## Lesson 19 — Modular inverse — Fermat's Little Theorem preview

Sometimes we need to do **modular division**: compute `a / b mod p`.

But wait — division doesn't work directly in modular arithmetic. `(10 / 2) mod 7 = 5 mod 7 = 5`, but how do you get there without actual division?

The answer: instead of dividing by `b`, we **multiply by the modular inverse of b**.

The **modular inverse** of `b` (mod p) is a number `b^{-1}` such that:

```
b × b^{-1} ≡ 1  (mod p)
```

**Fermat's Little Theorem:** if `p` is prime and `b` is not a multiple of `p`, then:

```
b^(p-1) ≡ 1  (mod p)
```

Rearranging: `b × b^(p-2) ≡ 1 (mod p)`. So the inverse is `b^(p-2) mod p`.

**Example: find the inverse of 3 mod 7:**

```
3^(7-2) mod 7 = 3^5 mod 7
= 243 mod 7
= 243 - 34 × 7 = 243 - 238 = 5

Check: 3 × 5 = 15,  15 mod 7 = 1   ✅
```

So dividing by 3 modulo 7 is the same as multiplying by 5.

**In code:**

```js
const MOD = 1_000_000_007n;

function modInverse(b, mod = MOD) {
  return modPow(b, mod - 2n, mod);
}

// Then: (a / b) mod p = a * modInverse(b) mod p
```

This is how competitive programming computes `nCr mod p`: precompute factorials, use modular inverse to simulate division.

> 💡 **When does this NOT work?**
> Fermat's little theorem only works when `p` is prime and `b` is not a multiple of `p`. For non-prime moduli, you'd use the **extended Euclidean algorithm** instead (Q48, Q49).

---

<a id="lesson-20"></a>
## Lesson 20 — Euler's Totient and a first glimpse at deeper number theory

**Euler's Totient function φ(n)** (phi of n) counts how many integers from 1 to n are **coprime** to n (share no factor other than 1).

```
φ(8) = ?
Numbers 1–8: 1, 2, 3, 4, 5, 6, 7, 8
Coprime to 8: 1, 3, 5, 7  (the odd numbers — because gcd(odd, 8) = 1 for odd < 8)
φ(8) = 4
```

```
φ(7) = 6  (7 is prime — everything from 1 to 6 is coprime to a prime)
φ(12) = 4  (1, 5, 7, 11 are coprime to 12)
```

**Formula for prime p:** `φ(p) = p - 1`.

**Formula for prime power:** `φ(p^k) = p^(k-1) × (p - 1)`.

**For a general n** with prime factorization `p1^a1 × p2^a2 × …`:

```
φ(n) = n × ∏(1 - 1/pi)   for each prime pi dividing n
```

Example: `φ(12) = φ(2^2 × 3) = 12 × (1 - 1/2) × (1 - 1/3) = 12 × 1/2 × 2/3 = 4`.

**Why it matters:** The generalization of Fermat's Little Theorem uses φ:

```
a^φ(n) ≡ 1  (mod n)   when gcd(a, n) = 1
```

This is **Euler's theorem**, and Fermat's Little Theorem is a special case (when n is prime, φ(n) = n-1).

> 🔬 **Going deeper (optional)**
> The **Extended Euclidean Algorithm** (Q48) finds integers `x, y` such that `a×x + b×y = gcd(a, b)`. It's used to compute modular inverses when the modulus isn't prime. See `questions/48-extended-euclidean.md` and `questions/49-modular-inverse.md`.

---

<a id="lesson-21"></a>
## Lesson 21 — Coordinate geometry basics

A few geometry facts you'll need for Q51–Q57.

**Distance between two points:**

```
dist((x1, y1), (x2, y2)) = √((x2-x1)² + (y2-y1)²)
```

In code, you often work with **squared distance** to avoid `Math.sqrt` (which is slow and introduces floating-point error):

```js
function distSq(p1, p2) {
  const dx = p2.x - p1.x, dy = p2.y - p1.y;
  return dx * dx + dy * dy;
}
```

**Cross product (2D):**

Given three points A, B, C, the "cross product" of vectors AB and AC is:

```
cross = (B.x - A.x) × (C.y - A.y) - (B.y - A.y) × (C.x - A.x)
```

- If `cross > 0`: A, B, C are in counterclockwise order.
- If `cross < 0`: clockwise order.
- If `cross = 0`: the three points are **collinear** (on the same line).

```js
function cross(A, B, C) {
  return (B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x);
}

function collinear(A, B, C) {
  return cross(A, B, C) === 0;
}
```

**Why avoid slope?**

Calculating slope involves division: `slope = (y2 - y1) / (x2 - x1)`. This breaks when `x2 === x1` (vertical line, division by zero) and introduces floating-point inaccuracy. Cross product avoids both problems — it's all integer arithmetic.

**Checking line segment intersection:**

Two line segments AB and CD intersect if:
- A and B are on opposite sides of line CD, AND
- C and D are on opposite sides of line AB.

We check "opposite sides" using the sign of the cross product.

> 💡 **Tip**
> Prefer integer arithmetic (squared distances, cross products) over floating-point operations (sqrt, slope) whenever possible in geometry problems.

---

<a id="lesson-22"></a>
## Lesson 22 — Quick reference — complexity cheat sheet

Here are all the key algorithms from this chapter, with their complexities:

### Core algorithms

| Algorithm | Time | Space | Notes |
|-----------|------|-------|-------|
| Check divisibility `a % b == 0` | O(1) | O(1) | Instant |
| Check prime (trial division) | O(√n) | O(1) | Only check up to √n |
| GCD (Euclid) | O(log min(a,b)) | O(1) | Iterative preferred |
| LCM via GCD | O(log min(a,b)) | O(1) | Use `a / gcd * b` |
| All divisors of n | O(√n) | O(d(n)) | d(n) = # divisors |
| Prime factorization | O(√n) | O(log n) | # factors ≤ log n |
| Sieve of Eratosthenes up to n | O(n log log n) | O(n) | For bulk prime queries |
| Fast exponentiation `a^b` | O(log b) | O(log b) recursion | Iterative is O(1) space |
| Modular exponentiation | O(log b) | O(1) | Use BigInt for multiply |
| Fibonacci (iterative) | O(n) | O(1) | Two variables |
| Fibonacci (matrix) | O(log n) | O(1) | For huge n |
| `n! mod p` (precompute up to n) | O(n) | O(n) | Store factorial array |
| `C(n,k) mod p` using Fermat | O(n + log p) | O(n) | Precompute factorials |

### JS-specific reminders

| Concern | Rule |
|---------|------|
| Max safe integer | `2^53 - 1 = 9007199254740991` |
| When to use BigInt | Any multiply that could exceed `9 × 10^15` |
| Negative modulo | `((a % m) + m) % m` |
| Avoid float in geometry | Use squared distances, cross products |
| `10^9 + 7` | Standard prime modulus for competitions |

### When to reach for what

```
Just checking one number for primality?   → isPrime in O(√n)
Need all primes up to N?                  → Sieve
Need GCD/LCM?                             → Euclid, then lcm = a/gcd*b
Need a^b fast?                            → Fast exponentiation
Need a^b mod m?                           → Modular exponentiation with BigInt
Need C(n,k) mod p?                        → Precompute factorials + Fermat inverse
Coordinates?                              → Cross product for orientation/collinearity
```

---

You're done with the lessons! Now open `questions/01-is-prime.md` and work through the problems in order. Tick off the checklist in `README.md` as you go.

The easy problems build the muscle memory. The medium ones put the toolkit to use in creative ways. The hard ones and theory drill will push you — take your time.

**You don't have to rush. You just have to keep going.** 💪
