# Sliding Window — Lessons from Zero

> 👋 Hey. This is for someone who has never used the sliding window technique before. We're going to go slow. By the end you'll have a clear mental picture of what a "window" is, why it saves you from nested loops, and how to recognize and solve these problems with confidence.
>
> Total reading time at a relaxed pace: about 60–80 minutes. Take breaks. The ASCII diagrams are worth staring at.

---

## Table of Lessons

1. [What is a "window"?](#lesson-1)
2. [A fixed-size window — the camera analogy](#lesson-2)
3. [Why you don't need to recompute from scratch](#lesson-3)
4. [Walk-through: Max Sum of K Consecutive Elements](#lesson-4)
5. [Variable-size windows — expand right, contract left](#lesson-5)
6. [Walk-through: Longest Substring Without Repeating Characters](#lesson-6)
7. [State inside the window (sum, count, frequency map)](#lesson-7)
8. [The "exactly K" trick — atMost(K) − atMost(K−1)](#lesson-8)
9. [Recognizing a sliding window problem](#lesson-9)
10. [Why negative numbers can break a naive variable window](#lesson-10)
11. [Monotonic deque — window max/min in O(1) each](#lesson-11)
12. [Templates you'll use every day](#lesson-12)
13. [Quick reference and complexity table](#lesson-13)
14. [You did it — what to do next](#lesson-14)

---

<a id="lesson-1"></a>
## Lesson 1 — What is a "window"?

Imagine a long row of numbered houses on a street. You're standing in a helicopter above the street, looking down through a rectangular window in the floor. That window can only show you — say — **three houses at a time**.

```
Houses:  1    2    3    4    5    6    7    8    9
       ┌────┬────┬────┬────┬────┬────┬────┬────┬────┐
Value: │ 2  │ 1  │ 5  │ 1  │ 3  │ 2  │ 4  │ 3  │ 1  │
       └────┴────┴────┴────┴────┴────┴────┴────┴────┘
               ╰────────────╯
                  window (size 3): houses 2, 3, 4
```

You can ask: "What's the **sum** of the houses I can see right now?" The answer is `1 + 5 + 1 = 7`.

Now you slide the window one house to the right:

```
Houses:  1    2    3    4    5    6    7    8    9
       ┌────┬────┬────┬────┬────┬────┬────┬────┬────┐
Value: │ 2  │ 1  │ 5  │ 1  │ 3  │ 2  │ 4  │ 3  │ 1  │
       └────┴────┴────┴────┴────┴────┴────┴────┴────┘
                    ╰────────────╯
                     window: houses 3, 4, 5 → sum = 9
```

That's the whole idea. A **window** is just a contiguous slice of an array (or string). It has a **left edge** and a **right edge**, and the stuff between them is "inside the window."

The technique is called **sliding window** because you move this slice step by step along the array, updating your answer as you go.

> 🎯 **Key takeaway**
> A window is a contiguous slice of an array defined by two indexes: a left boundary and a right boundary. As it moves, elements enter at the right and leave at the left.

---

<a id="lesson-2"></a>
## Lesson 2 — A fixed-size window — the camera analogy

Think of a TV camera crew filming a row of people standing in a line. The camera shows exactly **5 people** at once. As the camera slowly pans right, one new person enters the frame on the right and one person leaves the frame on the left.

```
People:  A    B    C    D    E    F    G    H    I    J
Heights: 4    2    7    1    9    3    8    5    2    6

Frame 1: A B C D E
         ╰───────────╯  visible: 4 2 7 1 9

Frame 2:   B C D E F
             ╰───────────╯  visible: 2 7 1 9 3

Frame 3:     C D E F G
               ╰───────────╯  visible: 7 1 9 3 8
```

At each position, you might ask: "Who is the **tallest** person I can see right now?" That's the **max in the current window**.

Or: "What's the **sum of heights** I can see?" That's the **sum of the current window**.

A **fixed-size window** is exactly this: the window always shows the same number of elements (`k`). As you move it one step to the right:
- One element **enters** from the right.
- One element **leaves** from the left.
- Everything else in the middle stays.

> 💡 **Key idea**
> You never need to look at every element in the window from scratch after each step. You already know what was in the window — you just need to account for the one element that left and the one that arrived.

---

<a id="lesson-3"></a>
## Lesson 3 — Why you don't need to recompute from scratch

Let's say you want the **sum of every 3 consecutive values** in this array:

```
arr = [2, 1, 5, 1, 3, 2]
```

The naive approach (what a beginner's first instinct might be):

```
Window [0..2]: 2 + 1 + 5 = 8
Window [1..3]: 1 + 5 + 1 = 7
Window [2..4]: 5 + 1 + 3 = 9
Window [3..5]: 1 + 3 + 2 = 6
```

For each window, you summed 3 numbers. That's 4 windows × 3 additions = **12 operations**. For an array of length `n` and window size `k`, the naive approach does `(n - k + 1) × k` operations, which is roughly O(n·k).

If `n = 10,000` and `k = 5,000`, you're doing 25 million additions. Slow.

Now the **sliding window** approach:

```
Step 1: Compute the first window sum = 2 + 1 + 5 = 8.

Step 2: Slide right by 1.
  - The element leaving the left  is arr[0] = 2.
  - The element entering the right is arr[3] = 1.
  - New sum = old sum - arr[0] + arr[3]
            = 8        - 2      + 1
            = 7        ✓

Step 3: Slide right by 1.
  - Leaving: arr[1] = 1.
  - Entering: arr[4] = 3.
  - New sum = 7 - 1 + 3 = 9   ✓

Step 4: Slide right by 1.
  - Leaving: arr[2] = 5.
  - Entering: arr[5] = 2.
  - New sum = 9 - 5 + 2 = 6   ✓
```

```
arr:  [  2  |  1  |  5  |  1  |  3  |  2  ]
         ↑ out                      ↑ in
              ╰──── current window ────╯
      subtract leaving, add entering → O(1) per step
```

Total operations: compute once (k additions), then `(n - k)` single additions and subtractions. That's **O(n)** total — no matter how big `k` is.

> 🎯 **Key takeaway**
> Each element enters the window once and leaves the window once. Total work is proportional to `n`, not `n × k`. That's why sliding window is O(n).

---

<a id="lesson-4"></a>
## Lesson 4 — Walk-through: Max Sum of K Consecutive Elements

Let's write the full algorithm together.

**Problem:** Given `arr = [2, 1, 5, 1, 3, 2]` and `k = 3`, find the maximum sum of any 3 consecutive elements.

**Answer we expect:** 9 (the window `[5, 1, 3]`).

```
arr = [2, 1, 5, 1, 3, 2]
       0  1  2  3  4  5
```

**Step 1 — Build the first window (indexes 0..k-1)**

```js
let windowSum = 0;
for (let i = 0; i < k; i++) {
  windowSum += arr[i];
}
// windowSum = 2 + 1 + 5 = 8
let maxSum = windowSum;
```

At this point:

```
[  2  |  1  |  5  ]  1    3    2
 ╰── windowSum=8 ──╯
 maxSum = 8
```

**Step 2 — Slide the window from position k to n-1**

```js
for (let right = k; right < arr.length; right++) {
  windowSum += arr[right];          // add new element on the right
  windowSum -= arr[right - k];      // remove old element from the left
  maxSum = Math.max(maxSum, windowSum);
}
```

Let's trace through:

```
right=3: add arr[3]=1, remove arr[0]=2  → windowSum = 8 + 1 - 2 = 7
         [  1  |  5  |  1  ]  3    2
          ╰── windowSum=7 ──╯
         maxSum = max(8, 7) = 8

right=4: add arr[4]=3, remove arr[1]=1  → windowSum = 7 + 3 - 1 = 9
              [  5  |  1  |  3  ]  2
               ╰── windowSum=9 ──╯
         maxSum = max(8, 9) = 9  ✓

right=5: add arr[5]=2, remove arr[2]=5  → windowSum = 9 + 2 - 5 = 6
                   [  1  |  3  |  2  ]
                    ╰── windowSum=6 ──╯
         maxSum = max(9, 6) = 9  ✓
```

**Final answer:** 9.

Full code:

```js
function maxSumSubarrayK(arr, k) {
  let windowSum = 0;

  // build first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  let maxSum = windowSum;

  // slide
  for (let right = k; right < arr.length; right++) {
    windowSum += arr[right];
    windowSum -= arr[right - k];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```

Clean and O(n). Every element touched exactly twice — once when it enters, once when it leaves.

> ✋ **Pause and try**
> What changes if you want the **minimum** sum instead? Try modifying the code above before reading on.
>
> <details>
> <summary>Show answer</summary>
>
> Just change `Math.max` to `Math.min` and initialize `minSum = windowSum`. Everything else is identical.
> </details>

---

<a id="lesson-5"></a>
## Lesson 5 — Variable-size windows — expand right, contract left

Fixed-size windows always have the same width. But many problems ask: "Find the **longest** (or **shortest**) subarray such that [some condition]."

Here, the window size is not fixed. It **grows** and **shrinks** dynamically.

The mental model: imagine an elastic rubber band stretched between two fingers. Your right finger (`right`) always moves forward. Your left finger (`left`) moves forward only when the rubber band violates some rule.

```
arr = [2, 1, 5, 2, 3, 2]

      left                right
        ↓                   ↓
[  2  |  1  |  5  |  2  |  3  |  2  ]
 ╰────── window ─────────────────────╯
```

**Two rules:**
1. Move `right` forward to **expand** the window and consider new elements.
2. Move `left` forward to **contract** the window when the window becomes invalid.

```
         left → contract when invalid
           ↓
[  .  |  .  |  .  |  .  |  .  |  .  ]
                                ↑
                         right → always advances
```

Here is the universal variable-size window template:

```js
let left = 0;
// windowState can be a sum, count, map, etc.

for (let right = 0; right < arr.length; right++) {
  // 1. Expand: add arr[right] to window state
  // ...

  // 2. Contract: while the window is invalid, remove arr[left] and advance left
  while (/* window is invalid */) {
    // remove arr[left] from window state
    // ...
    left++;
  }

  // 3. The window [left..right] is now valid.
  //    Update your answer (length, count, etc.)
}
```

The key insight: **`left` never goes backwards**. Both `left` and `right` only move forward. So the total number of steps (summed across all iterations of both the outer `for` and the inner `while`) is at most `2n`. That's why the algorithm is O(n) even though there's a `while` loop inside a `for` loop.

> ⚠️ **Common beginner mistake**
> People see a `while` inside a `for` and think "that must be O(n²)!" Not here. Because `left` never moves backwards, each element leaves the window **at most once**. Count the total moves: `right` advances `n` times, `left` advances at most `n` times. Total: O(n).

---

<a id="lesson-6"></a>
## Lesson 6 — Walk-through: Longest Substring Without Repeating Characters

This is probably the single most famous sliding window problem. Let's go step by step.

**Problem:** Given the string `"abcabcbb"`, find the length of the longest substring (contiguous characters) with no repeated character.

**Expected answer:** 3 (`"abc"`).

We'll track a **Set** of characters currently in the window. The window is invalid when it contains a duplicate.

```js
function lengthOfLongestSubstring(s) {
  const inWindow = new Set();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    // contract: remove from left until no duplicate
    while (inWindow.has(s[right])) {
      inWindow.delete(s[left]);
      left++;
    }

    // expand: add new character
    inWindow.add(s[right]);

    // update answer
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

Let's trace on `"abcabcbb"`:

```
s = a  b  c  a  b  c  b  b
    0  1  2  3  4  5  6  7

right=0: add 'a'. window={a}. len=1. maxLen=1
         [a]

right=1: add 'b'. window={a,b}. len=2. maxLen=2
         [a b]

right=2: add 'c'. window={a,b,c}. len=3. maxLen=3
         [a b c]

right=3: 'a' is in window!
         → remove s[left]=s[0]='a', left=1. window={b,c}
         → 'a' no longer in window, stop contracting
         add 'a'. window={b,c,a}. len=3. maxLen=3
           [b c a]

right=4: 'b' is in window!
         → remove s[1]='b', left=2. window={c,a}
         → 'b' gone, stop.
         add 'b'. window={c,a,b}. len=3. maxLen=3
             [c a b]

right=5: 'c' is in window!
         → remove s[2]='c', left=3. window={a,b}
         → 'c' gone.
         add 'c'. window={a,b,c}. len=3. maxLen=3
               [a b c]

right=6: 'b' is in window!
         → remove s[3]='a', left=4. window={b,c}
         → 'b' still in window!
         → remove s[4]='b', left=5. window={c}
         → 'b' gone.
         add 'b'. window={c,b}. len=2. maxLen=3
                 [c b]

right=7: 'b' is in window!
         → remove s[5]='c', left=6. window={b}
         → 'b' still in window!
         → remove s[6]='b', left=7. window={}
         → 'b' gone.
         add 'b'. window={b}. len=1. maxLen=3
                     [b]

Final answer: 3 ✓
```

Notice how `left` only ever moved forward. Each character entered and left the window at most once.

> 🔬 **Going deeper (optional)**
> Instead of a `Set`, you can use a `Map` from character → last-seen-index. This lets you jump `left` directly to `lastSeen[char] + 1` without stepping through characters one by one. Slightly faster in practice, same O(n) asymptotically.

---

<a id="lesson-7"></a>
## Lesson 7 — State inside the window

Different problems need different things tracked inside the window. Here's a tour.

### Simple sum

Used when the constraint is about the **total value** inside the window.

```js
let windowSum = 0;
// add arr[right] to windowSum when expanding
// subtract arr[left] from windowSum when contracting
```

Example: Minimum Size Subarray Sum (find shortest subarray with sum ≥ target).

### Count of something

Used when the constraint is about **how many** of something exists inside the window.

```js
let zeros = 0;
// zeros++ when arr[right] === 0
// zeros-- when arr[left] === 0
// window is invalid when zeros > k
```

Example: Max Consecutive Ones III (flip at most K zeros to ones).

### Frequency map

Used when the constraint involves **which characters/values appear** inside the window.

```js
const freq = {};  // or new Map()
// freq[arr[right]] = (freq[arr[right]] || 0) + 1
// freq[arr[left]]--
// if (freq[arr[left]] === 0) delete freq[arr[left]]
```

Example: Longest Substring with At Most K Distinct Characters (window is invalid when `Object.keys(freq).length > k`).

```
s = "eceba",  k = 2

Window expands to include distinct chars ≤ 2:

right=0: add 'e'. freq={e:1}. distinct=1. len=1
right=1: add 'c'. freq={e:1,c:1}. distinct=2. len=2
right=2: add 'e'. freq={e:2,c:1}. distinct=2. len=3
right=3: add 'b'. freq={e:2,c:1,b:1}. distinct=3 > 2!
         → remove 'e', freq={e:1,c:1,b:1}. distinct=3 → still >2
         → remove 'c', freq={e:1,b:1}. distinct=2. left=2
         add done. len=2
right=4: add 'a'. freq={e:1,b:1,a:1}. distinct=3 > 2!
         → remove 'e', freq={b:1,a:1}. distinct=2. left=3
         len=2
maxLen=3 (the window "ece") ✓
```

### Two counts / "need" tracking

Used when you need the window to **contain all characters of a target**. Instead of comparing the full map each step, you track a `need` counter: how many characters are still unsatisfied.

```
When freq[char] goes from 0 to 1 for a needed char → need--
When freq[char] goes from 1 to 0 for a needed char → need++
The window is valid when need === 0.
```

Example: Minimum Window Substring.

> 🎯 **Key takeaway**
> The variable inside the window depends on the problem. But the template is always the same: expand right, contract left when invalid, update answer. Only the "state" and "invalid" definition change.

---

<a id="lesson-8"></a>
## Lesson 8 — The "exactly K" trick

Some problems ask for subarrays with **exactly K** of something (e.g., exactly K odd numbers, exactly K distinct characters).

Exactly-K windows are awkward with the standard template because once you have K of something and add one more, you have K+1 — but contracting back to K isn't straightforward.

The elegant fix:

```
count(exactly K) = count(at most K) − count(at most K − 1)
```

Instead of writing one complicated function, you write **one simple `atMost(k)` function** that counts subarrays with **at most K** of the thing. Then:

```js
function exactlyK(arr, k) {
  return atMost(arr, k) - atMost(arr, k - 1);
}
```

Why does this work? Think of it as a venn diagram:

```
Subarrays with ≤ K odd numbers:   ●●●●●●●●●●●●●●●●●
Subarrays with ≤ K−1 odd numbers: ●●●●●●●●●●●●●
                                               ╰───╯
                                           The extra ones
                                        are EXACTLY K odds
```

The `atMost(k)` function is a standard variable-size window. You count a new valid subarray each time you update: `count += right - left + 1` (every subarray ending at `right` that starts anywhere from `left` to `right` is valid).

```js
function atMost(arr, k) {
  let left = 0, count = 0;
  let state = 0; // e.g. number of odd values in window

  for (let right = 0; right < arr.length; right++) {
    if (arr[right] % 2 !== 0) state++; // example: counting odds

    while (state > k) {
      if (arr[left] % 2 !== 0) state--;
      left++;
    }

    count += right - left + 1; // all subarrays ending at right
  }
  return count;
}
```

> 💡 **Why `count += right - left + 1`?**
> At any point where the window `[left..right]` is valid, the subarrays ending at `right` that are also valid are: `[left..right]`, `[left+1..right]`, `[left+2..right]`, …, `[right..right]`. That's exactly `right - left + 1` subarrays.

---

<a id="lesson-9"></a>
## Lesson 9 — Recognizing a sliding window problem

You've seen the technique. Now: how do you spot that a problem *is* a sliding window problem before you even start coding?

### Strong signals

Look for these words or phrases in the problem statement:

| Phrase | What it usually means |
|---|---|
| "contiguous subarray" | sliding window candidate |
| "contiguous substring" | sliding window candidate |
| "window of size K" | fixed-size window |
| "longest … such that" | variable-size, maximize length |
| "shortest … such that" | variable-size, minimize length |
| "at most K distinct" | variable window with map |
| "exactly K" | `atMost(K) − atMost(K−1)` |
| "contains all characters of…" | need-based tracking |

### The decision tree

```
Does the problem involve a CONTIGUOUS portion of an array or string?
  │
  YES
  │
  ├── Is the size FIXED?
  │     YES → fixed-size sliding window
  │
  └── Is it asking for LONGEST or SHORTEST with some constraint?
        │
        YES → variable-size sliding window
        │
        └── Is the constraint about having EXACTLY K of something?
              YES → atMost(K) − atMost(K−1) trick
```

### What sliding window does NOT help with

- Problems where the elements **don't have to be contiguous** (use a different technique).
- Problems where the array has **negative numbers** and you're looking for a sum constraint → the window might need to contract from the left even though the sum is still too small. That breaks the "contract only when invalid" logic. (More in Lesson 10.)
- Problems where you need the **global** max/min across all elements (not just inside a window).

> ✋ **Pause and try**
> Which of these are sliding window problems?
> 1. "Find the maximum sum subarray of length 5."
> 2. "Find two numbers in the array that add up to a target."
> 3. "Find the longest substring that contains at most 2 distinct characters."
> 4. "Find the kth largest element in the array."
>
> <details>
> <summary>Show answers</summary>
>
> 1. Yes — fixed-size window of size 5.
> 2. No — the two elements don't need to be contiguous. Use a hash map (Two Sum pattern).
> 3. Yes — variable-size window, contract when distinct chars > 2.
> 4. No — no contiguity requirement. Use a sort or a heap.
> </details>

---

<a id="lesson-10"></a>
## Lesson 10 — Why negative numbers can break the naive variable window

This is a subtle but important trap. Let's see it in action.

**Problem:** Find the smallest subarray with sum ≥ 7 in `[2, 1, 5, 2, 3, 2]`.

The window works fine here because all values are positive. When we add a new element on the right, the sum can only increase. When it exceeds the target, contracting the left is safe — removing from the left can only decrease the sum.

```
arr = [2, 1, 5, 2, 3, 2]   target = 7

right=0: sum=2. Not ≥ 7. No contraction.
right=1: sum=3. Not ≥ 7.
right=2: sum=8. ≥ 7! Contract:
         remove arr[0]=2 → sum=6. Not ≥ 7. Stop.
         Window [1..2], length 2. ans=2
right=3: sum=8. ≥ 7! Contract:
         remove arr[1]=1 → sum=7. Still ≥ 7. Keep contracting.
         remove arr[2]=5 → sum=2. Not ≥ 7. Stop.
         Window [3..3], length 1. ans=1
...
```

This works because **positive values** guarantee: adding makes things bigger, removing makes things smaller. The window "monotonically" behaves as expected.

**Now try with negatives:** `[-3, 4, 3, -2, 5]`, target = 6.

When `right = 1`, sum = -3 + 4 = 1. When `right = 2`, sum = 1 + 3 = 4. When `right = 3`, sum = 4 + (-2) = 2. When `right = 4`, sum = 2 + 5 = 7 ≥ 6!

But wait — if we contract by removing `arr[0] = -3`, the sum becomes 7 − (−3) = **10**, which is still ≥ 6, so we'd keep contracting. But what if removing something negative from the left makes the sum *bigger*, causing us to contract forever in a bad direction?

The fundamental problem: **with negative numbers, removing from the left can increase or decrease the sum unpredictably**. The window can no longer rely on "contract = make smaller." The invariant is broken.

> ⚠️ **The rule**
> The standard variable-size sliding window for sums only works reliably when **all values are non-negative**. If the array can contain negatives, you typically need **prefix sums + a hash map** instead. (That's the technique behind "Subarray Sum Equals K" — see the Arrays chapter, Q19.)

```
Subarray Sum = prefix[right] − prefix[left−1]

If we store all prefix sums we've seen in a Map,
we can check instantly: "has prefix[right] − target appeared before?"
This is O(n) time, O(n) space, handles negatives.
```

This isn't something to solve right now — just remember the warning flag: **negatives + sum constraint → think prefix sum, not sliding window**.

---

<a id="lesson-11"></a>
## Lesson 11 — Monotonic deque — window max/min in O(1) each

So far, the state we track inside the window has been simple: a sum, a count, or a frequency map. But what if you need the **maximum** or **minimum** of the window at every step?

The naive approach: after each slide, loop through the k elements in the window to find the max. That's O(k) per step, so O(n·k) overall. Back to slow.

The clever approach: a **monotonic deque** (double-ended queue).

### The idea

Keep a deque of **indexes** (not values). The deque maintains the invariant that the values at those indexes are **strictly decreasing** (for a window maximum). The front of the deque always holds the index of the current window's maximum.

```
arr = [1, 3, -1, -3, 5, 3, 6, 7],   k = 3

We want max for each window of size 3.

Step-by-step, deque holds indexes of candidates for max:

i=0: arr[0]=1.  Deque is empty → push 0.    Deque: [0]
i=1: arr[1]=3.  3 > arr[0]=1 → pop 0, push 1.  Deque: [1]
i=2: arr[2]=-1. -1 < arr[1]=3 → just push 2. Deque: [1, 2]
     Window [0..2] complete. Max = arr[deque[0]] = arr[1] = 3. ✓

i=3: arr[3]=-3. -3 < arr[2]=-1 → push 3. Deque: [1, 2, 3]
     Front is index 1, which is inside window [1..3]. Max = arr[1] = 3. ✓

i=4: arr[4]=5.  5 > arr[3]=-3 → pop 3.
                5 > arr[2]=-1 → pop 2.
                5 > arr[1]=3  → pop 1.
                Deque empty, push 4.  Deque: [4]
     Window [2..4]. Front=4, inside window. Max = arr[4] = 5. ✓

i=5: arr[5]=3.  3 < arr[4]=5 → push 5. Deque: [4, 5]
     Window [3..5]. Front=4, inside. Max = arr[4] = 5. ✓

i=6: arr[6]=6.  6 > arr[5]=3 → pop 5.
                6 > arr[4]=5 → pop 4.
                Push 6.  Deque: [6]
     Window [4..6]. Front=6, inside. Max = arr[6] = 6. ✓

i=7: arr[7]=7.  7 > arr[6]=6 → pop 6, push 7.  Deque: [7]
     Window [5..7]. Front=7, inside. Max = arr[7] = 7. ✓

Result: [3, 3, 5, 5, 6, 7] ✓
```

Two maintenance rules:
1. **Remove from the front** if the front index has fallen outside the window (`deque[0] <= right - k`).
2. **Remove from the back** while the back value is ≤ the new value (it can never be the max while the new element is around and still in the window later).

```js
function maxSlidingWindow(arr, k) {
  const deque = [];  // stores indexes
  const result = [];

  for (let right = 0; right < arr.length; right++) {
    // remove indexes out of window
    while (deque.length && deque[0] <= right - k) {
      deque.shift();
    }

    // maintain decreasing invariant
    while (deque.length && arr[deque[deque.length - 1]] <= arr[right]) {
      deque.pop();
    }

    deque.push(right);

    // window is fully formed
    if (right >= k - 1) {
      result.push(arr[deque[0]]);
    }
  }

  return result;
}
```

Each element is pushed and popped at most once → O(n) total.

> 💡 **For window minimum**, flip the invariant: maintain a **strictly increasing** deque. The front always holds the minimum.

> 🎯 **Key takeaway**
> The monotonic deque lets you answer "what is the max/min in the current window?" in amortized O(1) per step. This is how you solve "Sliding Window Maximum" (Q31) in O(n) instead of O(n·k).

---

<a id="lesson-12"></a>
## Lesson 12 — Templates you'll use every day

Here are four ready-to-use templates. Copy and adapt.

### Template A — Fixed-size window (sum)

```js
function fixedWindowSum(arr, k) {
  let windowSum = 0;

  // build first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  let best = windowSum;

  // slide
  for (let right = k; right < arr.length; right++) {
    windowSum += arr[right];
    windowSum -= arr[right - k];
    best = Math.max(best, windowSum);  // or Math.min for minimum
  }
  return best;
}
```

### Template B — Variable-size window (longest valid)

```js
function longestValid(arr, isValid, updateAdd, updateRemove) {
  let left = 0;
  let maxLen = 0;
  // initialize your window state here

  for (let right = 0; right < arr.length; right++) {
    updateAdd(arr[right]);   // add arr[right] to state

    while (!isValid()) {
      updateRemove(arr[left]);
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
```

### Template C — Variable-size window (shortest valid)

```js
function shortestValid(arr) {
  let left = 0;
  let minLen = Infinity;
  // initialize window state

  for (let right = 0; right < arr.length; right++) {
    // add arr[right] to state

    while (/* window is valid — try to shrink */) {
      minLen = Math.min(minLen, right - left + 1);
      // remove arr[left] from state
      left++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}
```

The key difference from Template B: here you contract **while the window is valid** (not while invalid), because you want to shrink as much as possible while still meeting the condition.

### Template D — Count subarrays (atMost trick)

```js
function atMost(arr, k) {
  let left = 0;
  let count = 0;
  // initialize state (e.g., distinct = 0, freq = {})

  for (let right = 0; right < arr.length; right++) {
    // add arr[right] to state

    while (/* state exceeds k */) {
      // remove arr[left] from state
      left++;
    }

    count += right - left + 1;  // subarrays ending at right
  }
  return count;
}

function exactlyK(arr, k) {
  return atMost(arr, k) - atMost(arr, k - 1);
}
```

### Template E — Fixed-size window (frequency map, for anagram problems)

```js
function countAnagrams(s, pattern) {
  const need = {};
  for (const c of pattern) need[c] = (need[c] || 0) + 1;
  let matched = 0;         // how many characters are fully satisfied
  const required = Object.keys(need).length;
  const window = {};
  let result = 0;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window[c] = (window[c] || 0) + 1;
    if (need[c] !== undefined && window[c] === need[c]) matched++;

    if (right >= pattern.length - 1) {
      if (matched === required) result++;

      const left = right - pattern.length + 1;
      const lc = s[left];
      if (need[lc] !== undefined && window[lc] === need[lc]) matched--;
      window[lc]--;
    }
  }
  return result;
}
```

---

<a id="lesson-13"></a>
## Lesson 13 — Quick reference and complexity table

### When to use each window type

| Situation | Window type | Template |
|---|---|---|
| Fixed K, optimize sum/product | Fixed | A |
| Longest subarray/substring with property | Variable (longest) | B |
| Shortest subarray with property | Variable (shortest) | C |
| Count subarrays with exactly K | atMost trick | D |
| Anagram / permutation match | Fixed with freq map | E |
| Max/min in every window | Fixed + monotonic deque | — |

### Complexity

| Problem type | Time | Space |
|---|---|---|
| Fixed-size window (sum, avg) | O(n) | O(1) |
| Variable-size window (set/map) | O(n) | O(k) or O(alphabet) |
| Anagram / frequency matching | O(n + |p|) | O(alphabet) |
| Sliding window max/min (deque) | O(n) | O(k) |
| Sliding window median (two heaps) | O(n log k) | O(k) |

### The "does my problem break the window?" checklist

```
□ Are all values non-negative?
    NO → for sum constraints, use prefix sum + map instead.

□ Is the array/string contiguous (no jumping around)?
    NO → sliding window won't work directly.

□ Are you asking about a specific position in sorted order (kth)?
    YES → not a window problem. Think sort/heap.

□ Do you need the exact-K count?
    YES → use atMost(K) - atMost(K-1).
```

### Common window states at a glance

```
Tracking sums          → running sum variable
Tracking counts        → running count variable
Tracking distinct keys → freq map (Map or {})
Tracking "need"        → freq map + satisfied-count variable
Tracking max/min       → monotonic deque of indexes
```

---

<a id="lesson-14"></a>
## Lesson 14 — You did it. Now what?

You now have a complete mental model of the sliding window technique. Let's recap what you know:

1. **A window is a contiguous slice** defined by `left` and `right` indexes.
2. **Fixed-size windows**: build the first window, then slide one step at a time — add the new right element, remove the old left element.
3. **Why it's O(n)**: each element enters the window once and leaves once. Two passes, O(n).
4. **Variable-size windows**: `right` always advances; `left` advances only when the window becomes invalid. Still O(n) because `left` never moves backwards.
5. **State inside**: can be a sum, count, frequency map, or "need" counter. The template stays the same.
6. **Exactly K**: use `atMost(K) − atMost(K−1)`.
7. **Negatives break sums**: use prefix sum + hash map instead.
8. **Monotonic deque**: O(1) per step for window max/min.

### What to do next

1. Open [`questions/01-max-sum-subarray-k.md`](./questions/01-max-sum-subarray-k.md).
2. Read the problem. Try to solve it on paper first.
3. Open [`solutions/01-max-sum-subarray-k.js`](./solutions/01-max-sum-subarray-k.js) and write your code.
4. If you get stuck, re-read the relevant lesson here. Then look at the hints in the question file.
5. Work through the Easy questions before jumping to Medium. The patterns build on each other.

### Pacing

- The first 6 questions are basically variations on the same template. Do them all — the repetition builds muscle memory.
- Questions 13–20 are where the variable window clicks. If one feels hard, re-read Lessons 5 and 6.
- Questions 29–34 are genuinely hard. Don't rush there.

You're building a skill, not cramming facts. **Slow repetition beats fast skimming.**

See you in [Q1](./questions/01-max-sum-subarray-k.md). 💪
