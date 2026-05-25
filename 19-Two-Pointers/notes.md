# Two Pointers — Lessons from Zero

> 👋 Hey. This file is your deep-dive into the **Two Pointers** pattern. Unlike Arrays or Linked Lists, two pointers isn't a data structure — it's a *strategy*. A way of looking at a problem that lets you swap a slow double-loop for a single, elegant pass.
>
> Total reading time at a relaxed pace: about 60–75 minutes. Take breaks. The ASCII diagrams are meant to be stared at — don't skim them.

---

## Table of Lessons

1. [What is the Two Pointers pattern?](#lesson-1)
2. [Flavor 1 — Opposite ends (the hallway analogy)](#lesson-2)
3. [Walk-through: reverse an array in place](#lesson-3)
4. [Walk-through: check if an array is a palindrome](#lesson-4)
5. [Why sorted input matters for opposite-ends](#lesson-5)
6. [Walk-through: Two Sum II on a sorted array](#lesson-6)
7. [Flavor 2 — Same direction (slow pointer + fast pointer)](#lesson-7)
8. [Walk-through: remove duplicates from a sorted array](#lesson-8)
9. [Walk-through: move zeros to the end](#lesson-9)
10. [Floyd's cycle detection — the tortoise and the hare](#lesson-10)
11. [Walk-through: find the middle of a linked list](#lesson-11)
12. [Flavor 3 — Two arrays (merging)](#lesson-12)
13. [Walk-through: merge two sorted arrays](#lesson-13)
14. [Why two pointers drops O(n²) to O(n)](#lesson-14)
15. [Which problems scream "two pointers"?](#lesson-15)
16. [Sliding window — the special case](#lesson-16)
17. [Quick-reference cheat sheet](#lesson-17)
18. [You did it. What to do next](#lesson-18)

---

<a id="lesson-1"></a>
## Lesson 1 — What is the Two Pointers pattern?

Here's the setup: you have some sequential data — an array, a string, a linked list — and you need to look at two positions at once.

The naive approach is to write two nested loops. For every element at position `i`, you loop over every other element at position `j`. That works, but it costs you **O(n²)** — meaning if your array doubles in size, the work quadruples.

The two-pointer insight is:

> 🎯 **Instead of independently considering every pair, move two markers through the data in a coordinated way — so you never have to look at the same pair twice.**

That coordination is the key. The pointers don't wander. They follow a rule: "move inward if X, move outward if Y, advance the slower one if Z." Because each pointer moves at most `n` steps, the total work is **O(n)**.

Let's see what that looks like.

---

<a id="lesson-2"></a>
## Lesson 2 — Flavor 1: Opposite ends (the hallway analogy)

Imagine a long hallway with a student standing at each end. They start walking toward each other. The rule might be: "if you find what you're looking for before you meet, great — otherwise you've checked everything."

```
    [  A    B    C    D    E  ]
      ↑                    ↑
    left                 right
      ────────→     ←────────
      they walk toward each other
```

In code, that looks like this:

```js
let left = 0;
let right = arr.length - 1;

while (left < right) {
  // do something with arr[left] and arr[right]
  left++;
  right--;
}
```

The loop stops when the pointers meet or cross — at that point, every pair has been considered.

> 💡 **Key property:** Both pointers together take exactly `n` total steps. Left takes at most `n/2`, right takes at most `n/2`. Total: O(n).

When do you use opposite-ends pointers?

- When the problem involves **pairs** of elements — one from the left side, one from the right
- When the input is **sorted** (or symmetric) so you can make a smart decision at each step about which pointer to move
- Classic examples: reverse in place, palindrome check, Two Sum II, Container With Most Water, Trapping Rain Water

---

<a id="lesson-3"></a>
## Lesson 3 — Walk-through: reverse an array in place

**The problem:** given `[1, 2, 3, 4, 5]`, reverse it to `[5, 4, 3, 2, 1]` without creating a new array.

The insight: position 0 should hold what was in position 4. Position 1 should hold what was in position 3. Notice the symmetry? Element `i` swaps with element `n - 1 - i`. So start a pointer at each end and swap.

Let's trace every step:

```
Initial state:
  Index:  0    1    2    3    4
         ┌────┬────┬────┬────┬────┐
         │  1 │  2 │  3 │  4 │  5 │
         └────┴────┴────┴────┴────┘
          ↑                    ↑
        left=0             right=4

Step 1: left < right  →  swap arr[0] and arr[4]
         ┌────┬────┬────┬────┬────┐
         │  5 │  2 │  3 │  4 │  1 │
         └────┴────┴────┴────┴────┘
          ↑                    ↑
        left=0             right=4   (before advancing)

   Advance: left → 1, right → 3

Step 2: left < right  →  swap arr[1] and arr[3]
         ┌────┬────┬────┬────┬────┐
         │  5 │  4 │  3 │  2 │  1 │
         └────┴────┴────┴────┴────┘
               ↑         ↑
             left=1    right=3

   Advance: left → 2, right → 2

Step 3: left == right  →  single middle element, nothing to swap. STOP.

Final:   [5, 4, 3, 2, 1]  ✅
```

Here is the code:

```js
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // swap
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }

  return arr;
}
```

> ✋ **Pause and check your understanding**
> What would happen with an array of length 0 or 1?
>
> <details>
> <summary>Show answer</summary>
>
> - Length 0: `left = 0`, `right = -1`. The condition `0 < -1` is false immediately. Loop doesn't run. Returns `[]`. Correct.
> - Length 1: `left = 0`, `right = 0`. Condition `0 < 0` is false. Loop doesn't run. Returns `[42]`. Correct.
>
> Edge cases handled automatically — no special-casing needed. That's elegant.
> </details>

> 🎯 **Key takeaway:** Opposite-ends pointers are perfect for anything that's symmetric: reverse, palindrome, rotate.

---

<a id="lesson-4"></a>
## Lesson 4 — Walk-through: check if an array is a palindrome

A palindrome reads the same forwards and backwards. `[1, 2, 3, 2, 1]` is a palindrome. `[1, 2, 3, 4, 5]` is not.

The approach is basically the same as reversing — but instead of swapping, you *check* whether the two elements are equal.

```
arr = [1, 2, 3, 2, 1]

Step 1:  arr[0] vs arr[4]  →  1 == 1  ✅  left++, right--
Step 2:  arr[1] vs arr[3]  →  2 == 2  ✅  left++, right--
Step 3:  left == right (middle element)  →  STOP

All checks passed → it IS a palindrome.
```

```
arr = [1, 2, 3, 4, 5]

Step 1:  arr[0] vs arr[4]  →  1 != 5  ✗  return false immediately
```

```js
function isPalindrome(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    if (arr[left] !== arr[right]) return false;
    left++;
    right--;
  }

  return true;
}
```

> 💡 **Tip:** We return `false` the moment we find a mismatch. No need to check the rest. This early-exit is a form of short-circuit evaluation — you can never do *better* than O(n), but on average you bail out much earlier.

---

<a id="lesson-5"></a>
## Lesson 5 — Why sorted input matters for opposite-ends

Here's the critical question for opposite-ends two pointers: **which pointer do you move at each step?**

The answer depends on the problem, but for most problems involving sums, it requires a sorted array to know which direction to go.

Suppose you have `arr = [1, 3, 5, 8, 11]` and want to find two elements that sum to 14.

```
  [  1    3    5    8   11  ]
     ↑                  ↑
   left=0            right=4
   sum = 1 + 11 = 12   →  too small, need bigger numbers
   →  advance left (to get a bigger number from the left)

  [  1    3    5    8   11  ]
        ↑              ↑
      left=1         right=4
      sum = 3 + 11 = 14   →  FOUND IT! ✅
```

Why does moving `left` give us a bigger sum? Because the array is sorted — moving right inside a sorted array means bigger values.

If the sum is **too small** → move `left` right (to get a bigger left value)
If the sum is **too big**  → move `right` left (to get a smaller right value)
If equal → found!

**Without sorting, this logic breaks.** If the array isn't sorted, you can't know whether moving left or right will increase or decrease the sum. So you'd have to try both — and you're back to O(n²).

> ⚠️ **Before using opposite-ends two pointers for sum problems, always confirm: is the input sorted?**
> If not, you might need to sort it first (costs O(n log n)) and check whether that's allowed.

---

<a id="lesson-6"></a>
## Lesson 6 — Walk-through: Two Sum II on a sorted array

**Problem:** given a **sorted** array `nums` and a `target`, find two indexes whose values add to `target`. Return `[i, j]` (1-indexed).

Input: `[2, 7, 11, 15]`, target = `9`
Expected output: `[1, 2]`

Let's trace:

```
arr  =  [  2    7   11   15  ]
         ↑                ↑
       left=0           right=3
       sum = 2 + 15 = 17  →  too big
       →  move right left

arr  =  [  2    7   11   15  ]
         ↑           ↑
       left=0      right=2
       sum = 2 + 11 = 13  →  still too big
       →  move right left

arr  =  [  2    7   11   15  ]
         ↑       ↑
       left=0  right=1
       sum = 2 + 7 = 9  →  FOUND! ✅
       return [1, 2]  (1-indexed)
```

```js
function twoSumII(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      return [left + 1, right + 1];  // 1-indexed
    } else if (sum < target) {
      left++;   // need a bigger sum
    } else {
      right--;  // need a smaller sum
    }
  }

  return [];  // no solution (problem guarantees one exists)
}
```

**Time:** O(n) — each pointer moves at most n times.
**Space:** O(1) — just two integer variables.

Compare that to the hash-map Two Sum solution, which is also O(n) time but uses O(n) extra space. Two pointers on a sorted array wins on space.

> 🎯 **Key takeaway:** Sort + two pointers = O(n log n) overall. Often the sort step is free because the problem already guarantees sorted input (like Two Sum II). When it is free, two pointers beats hash maps on space.

---

<a id="lesson-7"></a>
## Lesson 7 — Flavor 2: Same direction (slow pointer + fast pointer)

Sometimes you need two pointers that start at the **same end** and move in the **same direction** — but at different speeds. The fast one races ahead; the slow one only advances when certain conditions are met.

Picture a tortoise and a hare running a race on the same track. The hare rockets ahead. The tortoise crawls. But they're on the same course, both moving left to right.

```
arr  =  [  1    2    2    3    3    4  ]
          ↑    ↑
        slow  fast
         they both start at the left
         fast races; slow only moves when it finds something new
```

This pattern is used for:

- **In-place compaction** — keeping some elements, discarding others, without extra space
- **Cycle detection** in linked lists (Floyd's algorithm — coming in Lesson 10)
- **Finding the middle** of a linked list

The general template:

```js
let slow = 0;

for (let fast = 0; fast < arr.length; fast++) {
  if (shouldKeep(arr[fast])) {
    arr[slow] = arr[fast];
    slow++;
  }
}

// arr[0..slow-1] now holds the kept elements
// the "length" of the filtered array is `slow`
```

---

<a id="lesson-8"></a>
## Lesson 8 — Walk-through: remove duplicates from a sorted array

**Problem:** given **sorted** `[1, 1, 2, 3, 3, 4]`, remove duplicates in place and return the new length. The first `k` elements of the array should hold the unique values.

Because the array is sorted, all duplicates are adjacent. That's key. The slow pointer marks the "write position" — where to put the next unique element. The fast pointer scans forward looking for values that differ from what slow is currently pointing at.

```
arr = [1, 1, 2, 3, 3, 4]

Initial:
        slow=0
        fast=0

fast=0:  arr[0]=1. Is arr[fast] != arr[slow]?
         arr[0]=1, arr[0]=1  →  same, skip. fast++

fast=1:  arr[1]=1. Is arr[fast] != arr[slow]?
         arr[1]=1, arr[0]=1  →  same, skip. fast++

fast=2:  arr[2]=2. Is arr[fast] != arr[slow]?
         arr[2]=2, arr[0]=1  →  DIFFERENT!
         slow++  (slow is now 1)
         arr[slow] = arr[fast]  →  arr[1] = 2
         fast++

         arr = [1, 2, 2, 3, 3, 4]
                    ↑  ↑
                  slow  fast

fast=3:  arr[3]=3 != arr[1]=2  →  DIFFERENT!
         slow++ → 2
         arr[2] = 3

         arr = [1, 2, 3, 3, 3, 4]
                       ↑     ↑
                     slow   fast

fast=4:  arr[4]=3 == arr[2]=3  →  same, skip. fast++

fast=5:  arr[5]=4 != arr[2]=3  →  DIFFERENT!
         slow++ → 3
         arr[3] = 4

         arr = [1, 2, 3, 4, 3, 4]
                          ↑        ↑
                        slow=3  fast=5

Loop ends (fast == length).

Return slow + 1 = 4.
The first 4 elements:  [1, 2, 3, 4]  ✅
```

```js
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let slow = 0;

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }

  return slow + 1;  // the new length
}
```

> 💡 **Note:** We don't bother clearing the tail of the array (positions `slow+1` onward). The problem only cares about the first `k` elements. Leaving junk at the end is fine.

> ✋ **Pause and try**
> What if the input is `[1, 1, 1, 1]`? Trace through the code.
>
> <details>
> <summary>Show answer</summary>
>
> `slow` starts at 0. `fast` runs from 1 to 3. Every element equals `nums[slow]=1`, so `slow` never moves. Return `slow + 1 = 1`. The first (and only) element is `1`. Correct.
> </details>

---

<a id="lesson-9"></a>
## Lesson 9 — Walk-through: move zeros to the end

**Problem:** given `[0, 1, 0, 3, 12]`, move all zeros to the end while keeping the order of non-zero elements. In place, no extra array.

Again: slow marks where to write the next non-zero. Fast scans forward. When fast finds a non-zero, slow "claims" it.

```
arr = [0, 1, 0, 3, 12]

slow=0, fast=0:
  arr[fast]=0  →  zero, skip. fast++

slow=0, fast=1:
  arr[fast]=1  →  non-zero!
  arr[slow]=arr[fast]  →  arr[0]=1
  slow++  →  1, fast++ → 2

  arr = [1, 1, 0, 3, 12]
         ↑  ↑
        (overwritten) slow=1, fast=2

slow=1, fast=2:
  arr[fast]=0  →  zero, skip. fast++

slow=1, fast=3:
  arr[fast]=3  →  non-zero!
  arr[1]=3, slow=2, fast=4

  arr = [1, 3, 0, 3, 12]

slow=2, fast=4:
  arr[fast]=12  →  non-zero!
  arr[2]=12, slow=3, fast=5

  arr = [1, 3, 12, 3, 12]

Loop ends. Now zero out indices slow..end:

  arr[3]=0, arr[4]=0

  arr = [1, 3, 12, 0, 0]  ✅
```

```js
function moveZeros(nums) {
  let slow = 0;

  // move all non-zeros to the front
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  // fill the rest with zeros
  while (slow < nums.length) {
    nums[slow] = 0;
    slow++;
  }

  return nums;
}
```

> 🎯 **Key takeaway for Flavor 2:** The slow pointer is a "write head." It only advances when it finds something worth keeping. The fast pointer is a "read head" that scans everything. Together they compact the data in one pass.

---

<a id="lesson-10"></a>
## Lesson 10 — Floyd's cycle detection: the tortoise and the hare 🐢🐇

This is one of the most elegant algorithms in all of computer science. It uses two pointers moving at different speeds to detect whether a linked list (or any sequence of values) has a cycle — a loop that never ends.

The everyday version: imagine two runners on a circular track. One is fast (hare), one is slow (tortoise). If the track is a loop, **the fast runner will eventually lap the slow runner** — they'll be in the same place at the same time. If the track has an end (no loop), the fast runner reaches the end and the race is over.

```
Linked list WITH a cycle:

  1 → 2 → 3 → 4 → 5
              ↑       ↓
              8 ← 7 ← 6

  tortoise (slow): moves 1 node per step
  hare (fast):     moves 2 nodes per step

  If they ever point to the same node → cycle exists.
```

```
Linked list WITHOUT a cycle:

  1 → 2 → 3 → 4 → 5 → null

  The hare reaches null first → no cycle.
```

Here's the algorithm in JavaScript for a linked list:

```js
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;         // tortoise: 1 step
    fast = fast.next.next;   // hare: 2 steps

    if (slow === fast) return true;  // they met!
  }

  return false;  // fast hit null → no cycle
}
```

> 🔬 **Why does it work?** If there's a cycle of length C, the hare enters it and starts lapping the tortoise. The distance between them decreases by 1 each step (hare gains 1 node per step on the tortoise). Eventually the gap hits 0 — they're at the same node. The math guarantees this takes at most O(n) steps.

> ⚠️ **The meeting node is NOT the start of the cycle.** To find where the cycle starts, you need a second phase: put one pointer back at `head`, keep the other at the meeting point, advance both one step at a time — they'll meet at the cycle's entrance. (This is Q23 in your questions list.)

---

<a id="lesson-11"></a>
## Lesson 11 — Walk-through: find the middle of a linked list

**Problem:** given a linked list, return the middle node (or the second-middle if length is even). You don't know the length in advance.

The trick: move `slow` one step at a time and `fast` two steps at a time. When `fast` reaches the end, `slow` is at the middle — because slow has covered half the distance.

```
List: 1 → 2 → 3 → 4 → 5 → null

Step 1:  slow=1  fast=1
Step 2:  slow=2  fast=3
Step 3:  slow=3  fast=5

fast.next = null  →  stop. Middle = slow = node(3) ✅


List: 1 → 2 → 3 → 4 → null  (even length)

Step 1:  slow=1  fast=1
Step 2:  slow=2  fast=3
Step 3:  slow=3  fast.next=null  →  stop. Middle = node(3) ✅
          (the second of the two middle nodes)
```

```js
function middleNode(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}
```

**Time:** O(n). **Space:** O(1). No need to count nodes first, no array needed.

> 💡 **This "half-speed trick" appears in several problems**: middle of a list, finding the entry of a cycle, determining if a linked list is a palindrome (find the middle, reverse the second half, compare). Once you recognize it, you'll reach for it automatically.

---

<a id="lesson-12"></a>
## Lesson 12 — Flavor 3: Two arrays (one pointer per array)

The third flavor doesn't operate on one sequence — it operates on **two**. You have a pointer into each array, and at each step you advance whichever pointer is "behind" (or process the smaller/equal element).

The classic example is merging two sorted arrays.

```
A = [1, 3, 5, 7]
B = [2, 4, 6, 8]

     ↑              ↑
    iA=0           iB=0

Compare A[0]=1 vs B[0]=2  →  1 is smaller, take it, advance iA

     iA=1           iB=0
Compare A[1]=3 vs B[0]=2  →  2 is smaller, take it, advance iB

     iA=1           iB=1
Compare A[1]=3 vs B[1]=4  →  3 is smaller, take it, advance iA

     iA=2           iB=1
... and so on

Result: [1, 2, 3, 4, 5, 6, 7, 8]
```

Two-array pointers are used for:
- Merging sorted arrays / sorted lists
- Finding the intersection or union of two sorted arrays
- Checking if one string is a subsequence of another

The key property: since both arrays are sorted, once you've processed an element, you never have to go back to it. Each pointer only moves forward.

---

<a id="lesson-13"></a>
## Lesson 13 — Walk-through: merge two sorted arrays

**Problem:** given two sorted arrays `A = [1, 3, 5]` and `B = [2, 4, 6]`, return a merged sorted array.

```
A = [1, 3, 5]
B = [2, 4, 6]
result = []

iA=0, iB=0:
  A[0]=1, B[0]=2  →  1 < 2  →  push 1, iA++

iA=1, iB=0:
  A[1]=3, B[0]=2  →  3 > 2  →  push 2, iB++

iA=1, iB=1:
  A[1]=3, B[1]=4  →  3 < 4  →  push 3, iA++

iA=2, iB=1:
  A[2]=5, B[1]=4  →  5 > 4  →  push 4, iB++

iA=2, iB=2:
  A[2]=5, B[2]=6  →  5 < 6  →  push 5, iA++

iA=3, iB=2:
  iA >= A.length  →  drain remaining B: push 6

result = [1, 2, 3, 4, 5, 6]  ✅
```

```js
function mergeSortedArrays(A, B) {
  const result = [];
  let iA = 0;
  let iB = 0;

  while (iA < A.length && iB < B.length) {
    if (A[iA] <= B[iB]) {
      result.push(A[iA]);
      iA++;
    } else {
      result.push(B[iB]);
      iB++;
    }
  }

  // drain whatever remains
  while (iA < A.length) { result.push(A[iA++]); }
  while (iB < B.length) { result.push(B[iB++]); }

  return result;
}
```

**Time:** O(m + n) — each element is visited once.
**Space:** O(m + n) — the result array.

> 🎯 **Key takeaway for Flavor 3:** One pointer per sorted sequence. Always advance the pointer at the smaller current element. After one sequence is exhausted, dump the rest of the other.

---

<a id="lesson-14"></a>
## Lesson 14 — Why two pointers drops O(n²) to O(n)

Let's be concrete about why this works.

**The brute force argument:** to check all pairs `(i, j)` in an array of length `n`, there are `n * (n-1) / 2` pairs — roughly `n²/2`. That's O(n²).

**The two-pointer argument:** each pointer moves at most `n` steps. There are 2 pointers. Total steps ≤ 2n. That's O(n).

The reason you can skip pairs is that your pointers follow a **monotone rule** — they only move in one direction. So when you move the left pointer right, you're saying "I will never need to pair the old left value with anything on the right — I've already learned enough to rule those pairs out." This is what the sorted order guarantees.

A visual for the "consider all pairs" problem:

```
Brute force considers ALL cells in this grid (n=5):

        1   3   5   8   11
    1 [ ×   ×   ×   ×   ×  ]
    3 [ ×   ×   ×   ×   ×  ]
    5 [ ×   ×   ×   ×   ×  ]
    8 [ ×   ×   ×   ×   ×  ]
   11 [ ×   ×   ×   ×   ×  ]

Two pointers only walks the PERIMETER, not the interior:

        1   3   5   8   11
    1 [ →   ·   ·   ·   ↓  ]    (converge toward center)
    3 [ ·   ·   ·   ↓   ·  ]
    5 [ ·   ·   X   ·   ·  ]    X = where they meet
    8 [ ·   ↑   ·   ·   ·  ]
   11 [ ↑   ·   ·   ·   ·  ]

Only n pairs considered instead of n².
```

> ✋ **Pause and think**
> Why does this only work on sorted arrays for sum problems?
>
> <details>
> <summary>Show answer</summary>
>
> Because "ruling out pairs" requires a guarantee. When you move `left` right on a sorted array, you know every element to the left of the new position is smaller — so every sum involving it is smaller. On an unsorted array, you have no such guarantee. Moving `left` might actually decrease the sum (if the next element is smaller). You couldn't make a confident decision about which pointer to move.
> </details>

---

<a id="lesson-15"></a>
## Lesson 15 — Which problems scream "two pointers"?

Here's how to recognize a two-pointer problem when you see one.

### Signal 1: "find a pair (or triplet) that meets a condition"

"Find two numbers that sum to X." "Find a pair with minimum absolute difference." "Find a triplet whose product is ≤ K."

If the input is sorted (or you're allowed to sort it), two pointers is the first thing to reach for.

### Signal 2: "in place, O(1) extra space"

"Remove all instances of value V in place." "Move all evens to the front." "Remove duplicates." "Compact the array."

The slow/fast flavor handles all of these — slow writes, fast reads.

### Signal 3: "linked list with cycle" or "middle of a linked list"

Anytime a problem mentions cycles in linked lists or asks for a position relative to the end of the list without knowing the length, Floyd's tortoise-and-hare is your friend.

### Signal 4: "merge two sorted..."

Two sorted arrays or lists → one pointer per array, advance the smaller.

### Signal 5: "can you do it without extra space?"

A problem that could be solved with a hash map (O(n) space) but asks for O(1) space — check whether sorting + two pointers buys you the same result.

### A cheat sheet of patterns → problems:

```
Opposite ends on sorted array:
  Two Sum II, 3Sum, 4Sum, Container With Most Water,
  Trapping Rain Water, Valid Triangle Number, Boats to Save People

Opposite ends on any sequence:
  Reverse array, Reverse string, Palindrome check,
  Rotate array (three-reverse trick)

Slow/fast in-place compaction:
  Remove duplicates, Remove element, Move zeros,
  Remove duplicates (at most 2), Partition list

Floyd's slow/fast (cycle):
  Linked list cycle detection, Cycle entry point,
  Happy number, Middle of linked list, Palindrome linked list

Two arrays:
  Merge sorted arrays, Merge sorted array (in place),
  Intersection, Union, Is subsequence, Backspace compare
```

---

<a id="lesson-16"></a>
## Lesson 16 — Sliding window: the special case

You'll often hear "sliding window" and "two pointers" used interchangeably. They're related, but not the same. Here's the distinction.

**Two pointers (general):** two indexes moving through data, with some rule about when each moves. The "window" between them isn't necessarily contiguous or of fixed meaning.

**Sliding window:** a *specific* kind of two pointer where the two indexes define the **left and right edges of a contiguous subarray or substring**, and the window itself has a property you're tracking (sum, character frequency, etc.). You slide it right, adding the new right element and removing the left element, without recomputing from scratch.

```
Two pointers — opposite ends (no "window"):
  [1, 5, 3, 2, 8]
   ↑           ↑
  left        right
  These don't define a contiguous window you're tracking.

Sliding window:
  [2, 1, 5, 1, 3, 2]  ← find max sum of size-3 window
   [2, 1, 5]           window slides →
      [1, 5, 1]
         [5, 1, 3]
            [1, 3, 2]
```

Think of it this way:

> 💡 **Sliding window is a subtype of two pointers. Every sliding window uses two pointers. Not every two-pointer solution is a sliding window.**

If a problem asks for the "longest/shortest subarray/substring that satisfies X," that's almost always a sliding window.

If a problem asks about pairs of elements or about in-place array manipulation, it's more likely a plain two-pointer.

For the full sliding window treatment, head to **[20 — Sliding Window](../20-Sliding-Window/)**.

---

<a id="lesson-17"></a>
## Lesson 17 — Quick-reference cheat sheet

### The three flavors at a glance

| Flavor | Pointers start | Both move... | Used for |
|--------|---------------|--------------|----------|
| Opposite ends | `left=0`, `right=n-1` | Toward each other | Reverse, palindrome, Two Sum II, rain water |
| Same direction (slow/fast) | Both at start (or 0) | Same direction, different speeds | Remove dups, move zeros, Floyd's, middle of list |
| Two arrays | `iA=0`, `iB=0` | One step per array, advance smaller | Merge sorted, intersection, union, subsequence |

### Template — opposite ends

```js
let left = 0;
let right = arr.length - 1;

while (left < right) {
  if (conditionMet(arr[left], arr[right])) {
    // found something
    left++;
    right--;
  } else if (needBigger) {
    left++;
  } else {
    right--;
  }
}
```

### Template — slow / fast (in-place compaction)

```js
let slow = 0;

for (let fast = 0; fast < arr.length; fast++) {
  if (shouldKeep(arr[fast])) {
    arr[slow] = arr[fast];
    slow++;
  }
}

// arr[0..slow-1] holds the result; length = slow
```

### Template — slow / fast (Floyd's cycle)

```js
let slow = head;
let fast = head;

while (fast !== null && fast.next !== null) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow === fast) return true;  // cycle!
}

return false;
```

### Template — two arrays

```js
let iA = 0, iB = 0;

while (iA < A.length && iB < B.length) {
  if (A[iA] <= B[iB]) {
    // process A[iA]
    iA++;
  } else {
    // process B[iB]
    iB++;
  }
}

// drain whichever array still has elements
while (iA < A.length) { /* process A[iA++] */ }
while (iB < B.length) { /* process B[iB++] */ }
```

### Complexity summary

| What | Time | Space | Notes |
|------|------|-------|-------|
| Any two-pointer solution | O(n) | O(1) | Each pointer takes at most n steps |
| With a sort step first | O(n log n) | O(1) | Sort dominates |
| Merge two sorted arrays | O(m + n) | O(m + n) | Result array allocated |
| Floyd's cycle detection | O(n) | O(1) | n = total nodes |

### Common gotchas

- **Forgot to sort first?** Opposite-ends for sum problems requires sorted input.
- **Off-by-one on return value?** `removeDuplicates` returns `slow + 1`, not `slow`.
- **1-indexed vs 0-indexed return?** Two Sum II returns 1-based indexes by convention.
- **Cycle start vs cycle detection?** Floyd's meeting point ≠ cycle entry. Need a second pass for entry.
- **Even vs odd length in palindrome check?** The `left < right` condition handles both — no special case needed.

---

<a id="lesson-18"></a>
## Lesson 18 — You did it. What to do next.

Let's recap what you've learned:

1. **Two pointers is a strategy**, not a data structure. It replaces O(n²) nested loops with a single O(n) pass.
2. **Three flavors:**
   - Opposite ends — for symmetric problems and sum searches on sorted data
   - Slow/fast — for in-place compaction and cycle detection
   - Two arrays — for merging and intersection of sorted sequences
3. **Why it works:** pointers move monotonically (one direction only). Each step rules out large swaths of pairs you'd otherwise have to check.
4. **Floyd's cycle detection** is a beautiful application of slow/fast pointers that detects loops in O(n) time and O(1) space.
5. **Sliding window is a special case** of two pointers where the window itself has a tracked property.

### What to do next

1. Open [`questions/01-reverse-string.md`](./questions/01-reverse-string.md) — you already understand the logic from Lesson 3.
2. Work through Easy questions 1–10 before tackling Medium.
3. After Q11–Q20 (opposite ends), come back and re-read Lesson 5 on sorted input — it'll land differently.
4. When you hit Q22–Q29 (slow/fast on linked lists), re-read Lessons 10–11 on Floyd's.
5. For Hard questions, make sure you've done the Arrays topic's Trapping Rain Water first — Q16 here adds the O(1) space insight on top.

### Pacing

- The first 10 (Easy) can likely be done in 2–3 sessions of focused work.
- Q11–Q20 are meaty — one per session is fine.
- Q22–Q29 (linked list problems) require understanding linked lists — do [`12-Linked-Lists`](../12-Linked-Lists/) first if you haven't.

You've got this. Open Q1. 💪

---

> 🔬 **Related topics:**
> - [02 — Arrays](../02-Arrays/) — where many two-pointer problems originate
> - [03 — Strings](../03-Strings/) — string palindromes, backspace compare
> - [12 — Linked Lists](../12-Linked-Lists/) — cycle detection, middle, reorder
> - [20 — Sliding Window](../20-Sliding-Window/) — the specialized subtype
