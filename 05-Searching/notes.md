# Searching — Lessons from Zero

> 👋 Hey. This file is for someone who's never formally studied searching algorithms before. We're going to build your intuition slowly — from "checking every single thing" all the way up to one of the most elegant algorithms in computer science: binary search.
>
> Total reading time at a relaxed pace: about 80–100 minutes. Take breaks. You do not have to read it all in one sitting.

---

## Table of Lessons

1. [What does "searching" even mean?](#lesson-1)
2. [Linear search — the "go through every door" approach](#lesson-2)
3. [When linear search is actually the right call](#lesson-3)
4. [The dictionary trick — binary search intuition](#lesson-4)
5. [Two prerequisites you must never skip](#lesson-5)
6. [Tracing binary search step by step](#lesson-6)
7. [Writing binary search in JavaScript](#lesson-7)
8. [The `<=` vs `<` trap (most common binary search bug)](#lesson-8)
9. [The `mid - 1` vs `mid` trap](#lesson-9)
10. [Iterative vs recursive binary search](#lesson-10)
11. [Lower bound and upper bound](#lesson-11)
12. ["Binary search on the answer space" — a preview](#lesson-12)
13. [Complexity summary and mental model](#lesson-13)
14. [Quick reference](#lesson-14)
15. [You did it — what to do next](#lesson-15)

---

<a id="lesson-1"></a>
## Lesson 1 — What does "searching" even mean?

Searching, in the computer science sense, means: **given a collection of items and a target, find whether the target is in the collection — and if so, where.**

That's it. The collection is usually an array. The target is a value. The answer is an index (or -1 / null to mean "not found").

You do this kind of thing in everyday life constantly:

- You look for your keys in a pile of objects on a table.
- You look for a contact in your phone's contacts list.
- You look for the word "photosynthesis" in a dictionary.
- You look for a seat number on a boarding pass.

Each of those situations is a search. And the smart strategy you use depends heavily on **whether the collection is organized**.

A pile of random objects on a table? You just go through them one by one.

A dictionary? You open it roughly in the middle — because you know the words are in alphabetical order — and you instantly eliminate half the book.

That distinction — random vs organized (sorted) — is the heart of everything in this topic.

> 🎯 **Key takeaway**
> Searching means: is this value in my collection, and if so, where? The best strategy depends on whether the collection is sorted.

---

<a id="lesson-2"></a>
## Lesson 2 — Linear search — the "go through every door" approach

Imagine you're looking for your friend in an apartment building. You have no idea which floor they're on, and no intercom system. All you can do is **knock on every door** until you find them.

That's linear search.

You start at the beginning of the array and look at each element in turn. When you find what you're looking for, you stop and return the index. If you reach the end without finding it, you return -1.

```js
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
```

Simple, right? Let's trace it on an example:

```
arr    = [14, 3, 27, 8, 42, 5, 19]
target = 42

i=0: arr[0] = 14  ≠ 42  → keep going
i=1: arr[1] = 3   ≠ 42  → keep going
i=2: arr[2] = 27  ≠ 42  → keep going
i=3: arr[3] = 8   ≠ 42  → keep going
i=4: arr[4] = 42  = 42  ✓ found! return 4
```

We checked 5 elements before finding it. If `42` were at the end (or not there at all), we'd check every single element.

**Complexity:**
- Best case: O(1) — the target is at index 0.
- Worst case: O(n) — the target is at the last position, or not present at all.
- Average case: O(n) — on average, you check half the array.

> 🎯 **Key takeaway**
> Linear search checks every element until it finds the target. It's O(n) in the worst and average case. It requires no special order in the array.

---

<a id="lesson-3"></a>
## Lesson 3 — When linear search is actually the right call

Binary search sounds exciting, and it is. But don't assume it's always better. There are real situations where linear search is the correct choice.

**1. The array is unsorted.**

Binary search requires the array to be sorted (we'll see why in Lesson 5). If your data isn't sorted, you'd have to sort it first — and sorting costs O(n log n). If you're only searching once, that's worse than just doing a linear search in O(n).

**2. The array is small.**

For arrays under ~20 elements, the overhead of setting up `left`/`mid`/`right` pointers isn't worth it. Linear search is simpler to read, simpler to debug, and fast enough.

**3. You're searching for a condition, not an exact value.**

Linear search works on any array and any condition. Binary search requires the array to be sorted *with respect to the condition you're testing*. "Find the first element that satisfies some arbitrary function" — linear search handles this without any preconditions.

**4. You need to find ALL matching elements.**

Binary search efficiently finds *one* position. If you want every index where the value appears, you'd need multiple binary searches or a linear scan anyway.

**5. The data structure doesn't support random access.**

Binary search requires jumping to the middle element instantly — O(1) random access. Linked lists don't have this. For a linked list, finding the middle requires traversing half the list — so binary search loses its advantage. (Arrays have O(1) random access; linked lists do not.)

> 💡 **Tip**
> A good engineer doesn't always reach for the "fancy" tool. They reach for the right tool. If you're searching a 10-element array once, `arr.indexOf(target)` is perfectly fine and everyone who reads your code will understand it instantly.

> 🎯 **Key takeaway**
> Linear search is the right choice when: data is unsorted, the array is small, you don't have random access, or you only need to search once and sorting would be wasteful.

---

<a id="lesson-4"></a>
## Lesson 4 — The dictionary trick — binary search intuition

Here's the moment everything changes.

Imagine you're looking up the word **"quantum"** in a 1000-page dictionary. What do you do?

You don't start at page 1 and flip through every single page. That would take forever. Instead, you open the dictionary **right in the middle** — page 500, say. You look at the top word on that page.

- If the word there comes **after** "quantum" alphabetically, you know "quantum" must be in the **left half** — pages 1–499. You throw away the right half.
- If the word there comes **before** "quantum" alphabetically, you know "quantum" must be in the **right half** — pages 501–1000. You throw away the left half.
- If it's exactly "quantum" — you're done!

Now you do the same thing again with whichever half remains. Open to its middle. Throw away half again. Repeat.

```
Start:     pages 1 ─────────────────────── 1000
           open page 500: word is "middle" (before "quantum")
           throw away left half

Now:       pages 501 ──────────── 1000
           open page 750: word is "rain" (after "quantum")
           throw away right half

Now:       pages 501 ──── 750
           open page 625: word is "ponder" (before "quantum")
           throw away left half

Now:       pages 626 ─── 750
           ...and so on
```

Each time you look at ONE page and immediately eliminate HALF of what remains. A 1000-page dictionary? You find any word in **at most 10 comparisons** (because 2^10 = 1024 > 1000). A one million page book? At most 20 comparisons.

This is **binary search**: repeatedly cut your search space in half.

> 🎯 **Key takeaway**
> Binary search looks at the middle element, decides which half the target must be in, and throws the other half away. It repeats until found or the space is empty. This gives O(log n) time — extraordinary efficiency.

---

<a id="lesson-5"></a>
## Lesson 5 — Two prerequisites you must never skip

Binary search has exactly two requirements. Violate either one and it falls apart.

### Prerequisite 1: The array must be sorted

Why? Because the whole idea relies on being able to say "it must be to the LEFT of the middle" or "it must be to the RIGHT." That only works if the elements are in order.

If the array is `[3, 1, 4, 1, 5, 9, 2, 6]` (unsorted), you look at the middle element `5`. You're searching for `2`. Is `2` to the left or right of `5`? You have no idea — `2` could be anywhere.

But if the array is `[1, 1, 2, 3, 4, 5, 6, 9]` (sorted), you look at the middle element `3`. You're searching for `2`. `2 < 3`, so it must be to the LEFT. You eliminate the right half with certainty.

**Sorted = you can reason about direction. Unsorted = you cannot.**

### Prerequisite 2: Random access in O(1)

Binary search needs to jump to the middle element instantly. That's `arr[mid]` — a single operation that takes the same time regardless of which index `mid` is.

Arrays in JavaScript (and most languages) support this. Linked lists do not. For a linked list, to get to the "middle" node, you'd have to traverse from the head — that costs O(n) just to find the middle. The binary search advantage disappears.

> ⚠️ **Don't forget these**
> If someone asks you to do binary search on a linked list, the correct answer is usually "I'd convert it to an array first" or "I'd use a different algorithm." Binary search on a linked list isn't impossible, but it loses the O(log n) advantage.

> 🎯 **Key takeaway**
> Binary search requires: (1) a **sorted** array, and (2) **O(1) random access**. Arrays tick both boxes. Linked lists do not.

---

<a id="lesson-6"></a>
## Lesson 6 — Tracing binary search step by step

Let's trace through a real example so you see every pointer move.

**Array:** `[2, 5, 8, 12, 16, 23, 38, 42, 55, 72]` (10 elements, sorted)
**Target:** `23`

We start with:
- `left = 0` (first index)
- `right = 9` (last index)

```
Indexes:   0    1    2    3    4    5    6    7    8    9
Array:   [ 2,   5,   8,  12,  16,  23,  38,  42,  55,  72 ]
          ↑L                                              ↑R
```

**Step 1:** `mid = Math.floor((0 + 9) / 2) = 4`

```
Indexes:   0    1    2    3    4    5    6    7    8    9
Array:   [ 2,   5,   8,  12,  16,  23,  38,  42,  55,  72 ]
          ↑L              ↑M                          ↑R

arr[4] = 16. Target is 23. 23 > 16, so target is in the RIGHT half.
→ Set left = mid + 1 = 5
```

**Step 2:** `mid = Math.floor((5 + 9) / 2) = 7`

```
Indexes:   0    1    2    3    4    5    6    7    8    9
Array:   [ 2,   5,   8,  12,  16,  23,  38,  42,  55,  72 ]
                              ↑L        ↑M        ↑R

arr[7] = 42. Target is 23. 23 < 42, so target is in the LEFT half.
→ Set right = mid - 1 = 6
```

**Step 3:** `mid = Math.floor((5 + 6) / 2) = 5`

```
Indexes:   0    1    2    3    4    5    6    7    8    9
Array:   [ 2,   5,   8,  12,  16,  23,  38,  42,  55,  72 ]
                              ↑L  ↑M   ↑R

arr[5] = 23. Target is 23. 23 === 23. ✓ Found! Return 5.
```

Three steps to find an element in a 10-element array. Linear search would take up to 10 steps.

Now let's trace a **not-found** case. Same array, target is `20`.

```
Step 1: left=0, right=9, mid=4. arr[4]=16. 20>16. left=5.
Step 2: left=5, right=9, mid=7. arr[7]=42. 20<42. right=6.
Step 3: left=5, right=6, mid=5. arr[5]=23. 20<23. right=4.

Now: left=5, right=4. left > right. Stop. Return -1.
```

The moment `left > right`, the search space is empty. The target doesn't exist.

> ✋ **Pause and trace yourself**
> Given `arr = [1, 3, 5, 7, 9, 11, 13, 15]`, trace binary search for target `7`.
> What's `mid` on each step? When does it stop?
>
> <details>
> <summary>Show answer</summary>
>
> ```
> left=0, right=7, mid=3. arr[3]=7. Found! Return 3. (Just one step — lucky!)
> ```
> </details>

> 🎯 **Key takeaway**
> Each step computes `mid`, compares `arr[mid]` to the target, then either returns or moves `left`/`right` to narrow the search. When `left > right`, the array has been fully eliminated — target not present.

---

<a id="lesson-7"></a>
## Lesson 7 — Writing binary search in JavaScript

Here is the standard iterative binary search:

```js
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;                // found it
    } else if (arr[mid] < target) {
      left = mid + 1;            // target is in right half
    } else {
      right = mid - 1;           // target is in left half
    }
  }

  return -1;                     // not found
}
```

Let's read each line:

- `let left = 0; let right = arr.length - 1;` — the search space starts as the entire array.
- `while (left <= right)` — keep going as long as there are elements to check. When `left > right`, the space is empty.
- `const mid = Math.floor((left + right) / 2)` — find the middle index. We `Math.floor` to always get a whole number.
- Three branches: found it, go right, go left.
- `return -1` — we never found it.

### The mid calculation — why `Math.floor`?

`(left + right)` might be odd. For example: `left=3, right=6`. `3+6 = 9`. `9/2 = 4.5`. We want a whole index. `Math.floor(4.5) = 4`. ✓

Alternatively: `Math.floor(left + (right - left) / 2)`. This gives the same result in JavaScript — but in languages like C++/Java with fixed-size integers, `left + right` can overflow if both are large numbers. That's why you see this form in older code. In JavaScript, numbers are 64-bit floats, so overflow isn't an issue, but it's good to know why the subtraction form exists.

> 💡 **Tip**
> In JavaScript, `Math.floor((left + right) / 2)` and `left + Math.floor((right - left) / 2)` are equivalent and both safe. Use whichever is more readable to you.

---

<a id="lesson-8"></a>
## Lesson 8 — The `<=` vs `<` trap (most common binary search bug)

This is **the** most common mistake in binary search. It's subtle. Stare at it for a moment.

```js
// Version A — CORRECT for standard binary search
while (left <= right) { ... }

// Version B — has a bug for some inputs
while (left < right) { ... }
```

**Why does `<=` matter?**

Consider an array with a single element: `arr = [7]`, target = `7`.

- `left = 0`, `right = 0`.
- `left <= right` is `0 <= 0` → **true**. We enter the loop, check `arr[0] === 7`, found! Return 0. ✓
- `left < right` is `0 < 0` → **false**. We never enter the loop. We return -1. ✗

The element we're looking for is right there, and the `<` version misses it completely because the last candidate is at a position where `left === right`.

**The rule:** In the standard template where `right = arr.length - 1` and you move with `left = mid + 1` / `right = mid - 1`, you **must** use `<=`.

There is a second common template where `right = arr.length` (one past the end) and you use `<`. You'll meet this in the lower-bound pattern (Lesson 11). The two templates have different semantics — mixing them up causes bugs.

For now, memorize:

```
right = arr.length - 1   →   while (left <= right)
right = arr.length       →   while (left < right)
```

> ⚠️ **This will get you in an interview.** Most binary search bugs that cause infinite loops or missed elements come from using the wrong condition or the wrong boundary update.

> 🎯 **Key takeaway**
> In the standard template: `right = arr.length - 1`, loop condition is `while (left <= right)`. Changing `<=` to `<` causes you to miss the last candidate.

---

<a id="lesson-9"></a>
## Lesson 9 — The `mid - 1` vs `mid` trap

Once you know where the target isn't, you move your pointers. But you have to move them the right way.

```js
if (arr[mid] < target) {
  left = mid + 1;    // NOT left = mid
}
```

Why `mid + 1` and not just `mid`?

Because you already know `arr[mid] !== target` (you checked that in the first branch). So `mid` itself is definitely not the answer. You don't need to check it again. By moving `left = mid + 1`, you skip `mid` and look only at elements strictly to the right.

If you wrote `left = mid`, your search space doesn't shrink when `left === mid`. On the next iteration, `mid` would be computed as the same value again. **You get an infinite loop.**

```
Example: arr = [1, 2], target = 2
left=0, right=1, mid=0
arr[0]=1 < 2  →  if you do left = mid, left stays 0.
Next: left=0, right=1, mid=0 again. Infinite loop.
         ^^^^ same state!

Correct: left = mid + 1 = 1.
Next: left=1, right=1, mid=1. arr[1]=2 = 2. Found!
```

Same logic applies to the right pointer:

```js
if (arr[mid] > target) {
  right = mid - 1;   // NOT right = mid
}
```

You already know `mid` isn't the answer. Skip it.

**Exception:** In the lower-bound and upper-bound patterns, you sometimes write `right = mid` — but only in a specific template where `right = arr.length` and you use `left < right`. We'll cover that carefully in Lesson 11.

> 🎯 **Key takeaway**
> In standard binary search: always move to `mid + 1` (not `mid`) when going right, and `mid - 1` (not `mid`) when going left. Doing otherwise causes infinite loops.

---

<a id="lesson-10"></a>
## Lesson 10 — Iterative vs recursive binary search

You can write binary search two ways: **iterative** (with a `while` loop) or **recursive** (a function that calls itself with a narrower range).

### Iterative (the standard choice)

```js
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target)   left = mid + 1;
    else                     right = mid - 1;
  }

  return -1;
}
```

**Space complexity:** O(1). You just have three integer variables.

### Recursive

```js
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;              // base case: empty range

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] < target)   return binarySearchRecursive(arr, target, mid + 1, right);
  else                     return binarySearchRecursive(arr, target, left, mid - 1);
}
```

**Space complexity:** O(log n). Each recursive call adds a frame to the call stack. Since we halve the range each time, the call stack can go at most `log n` levels deep.

### Which should you use?

In most interview settings, **iterative is preferred**:
- O(1) space vs O(log n)
- No risk of stack overflow on very large arrays
- Easier to reason about loops than recursion for many people

That said, **recursive** binary search is worth knowing because:
- Some problems (like recursive divide-and-conquer) naturally call for recursion
- It directly reflects the mathematical definition
- Interviewers sometimes ask for it explicitly

```
         Iterative                    Recursive
         ─────────                    ─────────
Space:   O(1)                         O(log n)  ← call stack
Style:   while loop                   function calls itself
Prefer:  generally                    when problem is naturally recursive
```

> 💡 **Tip**
> For production JavaScript code: iterative. For understanding the logic deeply: read the recursive version too. Both implementations halve the search space every step — the difference is only in how that "halving" is expressed.

---

<a id="lesson-11"></a>
## Lesson 11 — Lower bound and upper bound

Standard binary search finds *some* index where `arr[mid] === target`. But what if the target appears multiple times? Which index does it return? It's implementation-defined — usually the first one it hits, which might be in the middle.

For many real problems, you want:

- **Lower bound** — the **first** index where the value is ≥ `x`. In other words, "where would `x` be inserted to keep the array sorted, from the left?"
- **Upper bound** — the **first** index where the value is > `x`. In other words, "where would `x` be inserted to keep the array sorted, from the right?"

These are the building blocks for problems like "count occurrences of X" and "find first/last position."

### Lower bound

```js
// Returns the first index i such that arr[i] >= target.
// Returns arr.length if target is greater than all elements.
function lowerBound(arr, target) {
  let left = 0;
  let right = arr.length;   // NOTE: right = arr.length, not arr.length - 1

  while (left < right) {    // NOTE: strict <, not <=
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;           // NOTE: right = mid, not mid - 1
    }
  }

  return left;              // left === right at the end
}
```

Let's trace it on `arr = [1, 2, 4, 4, 4, 7, 9]`, target = `4`:

```
left=0, right=7
mid=3: arr[3]=4. 4 >= 4, so right=3.

left=0, right=3
mid=1: arr[1]=2. 2 < 4, so left=2.

left=2, right=3
mid=2: arr[2]=4. 4 >= 4, so right=2.

left=2, right=2. Stop (left === right). Return 2. ✓
```

The first `4` is at index 2. Correct.

### Upper bound

```js
// Returns the first index i such that arr[i] > target.
// Returns arr.length if target is >= all elements.
function upperBound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}
```

Trace on the same array, target = `4`:

```
left=0, right=7
mid=3: arr[3]=4. 4 <= 4, so left=4.

left=4, right=7
mid=5: arr[5]=7. 7 > 4, so right=5.

left=4, right=5
mid=4: arr[4]=4. 4 <= 4, so left=5.

left=5, right=5. Stop. Return 5. ✓
```

The first element greater than `4` is at index 5 (which is `7`). Correct.

### Counting occurrences with lower + upper bound

```js
function countOccurrences(arr, target) {
  return upperBound(arr, target) - lowerBound(arr, target);
}
```

For our example: `upperBound = 5`, `lowerBound = 2`, so `5 - 2 = 3`. The value `4` appears 3 times. ✓

### The two templates side by side

```
Standard binary search:          Lower / upper bound:
────────────────────────         ────────────────────
right = arr.length - 1           right = arr.length
while (left <= right)            while (left < right)
left = mid + 1  (go right)       left = mid + 1  (go right)
right = mid - 1 (go left)        right = mid     (go left)
```

Notice the differences carefully. They're small but critical.

> ⚠️ **Do not mix the templates.** If you use `right = arr.length` but also `while (left <= right)`, you'll go out of bounds. If you use `right = arr.length - 1` but `right = mid` on the left branch, you risk an infinite loop.

> 🎯 **Key takeaway**
> Lower bound = first index ≥ target. Upper bound = first index > target. Both use the `right = arr.length` / `while (left < right)` template, not the standard one.

---

<a id="lesson-12"></a>
## Lesson 12 — "Binary search on the answer space" — a preview

Here's where binary search stops feeling like just a "find this in an array" trick and becomes a powerful problem-solving weapon.

The key insight: **you don't have to binary search on the array itself. You can binary search on the answer.**

What does that mean?

Many problems sound like: "find the minimum value of X such that some condition holds." These problems often have the property that:

1. If X works, then X+1 also works (or X-1 also works — the condition is **monotone**).
2. There's a clear minimum and maximum value X could be.

When those two things are true, you can binary search across the *range of possible answers* and test each candidate.

**Example: Square root of n**

You want the integer square root of `n`. You know the answer is between `1` and `n`. For any guess `mid`, you check: is `mid * mid <= n`? That's a binary condition: either too small or not too small. You can binary search.

```
n = 36. Possible answers: 1 to 36.
mid = 18: 18*18 = 324 > 36. Too big. right = 17.
mid = 8:  8*8   = 64  > 36. Too big. right = 7.
mid = 4:  4*4   = 16  < 36. OK so far. left = 5.
mid = 6:  6*6   = 36  = 36. left = 7.
left=7 > right=6. Stop. Answer is left - 1 = 6. ✓
```

**More examples you'll see:**

- **Koko Eating Bananas** — binary search on eating speed.
- **Capacity to Ship Packages** — binary search on ship capacity.
- **Aggressive Cows / Allocate Books** — binary search on minimum distance / max pages per student.

The pattern is always: define the answer range, write a `canSolve(mid)` function, binary search on `[lo, hi]` to find the boundary.

```js
// General template
function solveWithBinarySearchOnAnswer(params) {
  let lo = MIN_POSSIBLE_ANSWER;
  let hi = MAX_POSSIBLE_ANSWER;
  let result = -1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);

    if (canSolve(mid, params)) {
      result = mid;        // mid works, but maybe we can do better
      hi = mid - 1;        // try smaller (if minimizing)
    } else {
      lo = mid + 1;        // mid doesn't work, try bigger
    }
  }

  return result;
}
```

> 💡 **Tip**
> Whenever you hear "minimum value such that ..." or "maximum value such that ...", think binary search on the answer space. The hardest part is identifying that the condition is monotone — once you do, the code writes itself.

> 🎯 **Key takeaway**
> Binary search doesn't have to run on an input array. It can run on the range of possible answers. If the condition is monotone (once true, stays true), binary search finds the boundary.

---

<a id="lesson-13"></a>
## Lesson 13 — Complexity summary and mental model

Let's make sure the intuitions from all the lessons click together.

### Why is binary search O(log n)?

Start with `n` elements. Each step cuts the remaining elements in half:

```
After step 1:   n / 2   elements remain
After step 2:   n / 4   elements remain
After step 3:   n / 8   elements remain
After step k:   n / 2^k elements remain
```

We stop when `n / 2^k = 1`, i.e., when `2^k = n`, i.e., when `k = log₂(n)`.

So binary search takes at most `log₂(n)` steps. That's O(log n).

### The numbers in practice

```
n           linear search    binary search
──────────  ─────────────    ─────────────
10          ≤10 steps        ≤4 steps
100         ≤100 steps       ≤7 steps
1,000       ≤1,000 steps     ≤10 steps
1,000,000   ≤1,000,000       ≤20 steps
1,000,000,000,000  (1T)     ≤40 steps
```

Binary search on a trillion-element sorted array finds any element in at most 40 comparisons. That is not a typo.

### When does binary search apply?

The question to ask yourself: **"Does my search space have a sorted order I can exploit?"**

- Array is sorted numerically? ✓ Classic binary search.
- Array is sorted, but I want a range (first/last position)? ✓ Lower/upper bound.
- Problem asks for min/max of some value, and larger always means "easier to satisfy"? ✓ Binary search on answer space.
- Rotated sorted array? ✓ Modified binary search (one half is always sorted — Lesson 9 in questions).
- 2D matrix where rows and columns are individually sorted? ✓ Treat as flattened 1D sorted array.

### Full algorithm comparison

| Algorithm       | Time     | Space | Requires        |
|-----------------|----------|-------|-----------------|
| Linear search   | O(n)     | O(1)  | Nothing         |
| Binary search   | O(log n) | O(1)  | Sorted + random access |
| Hash set lookup | O(1)     | O(n)  | Extra space     |

> 🎯 **Key takeaway**
> Binary search runs in O(log n) because each comparison halves the search space. This makes it blazingly fast on large sorted data. Linear search is O(n) but works anywhere.

---

<a id="lesson-14"></a>
## Lesson 14 — Quick reference

Paste this into your notes. Everything here was covered in the lessons above.

### Standard binary search (exact match)

```js
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;      // inclusive right boundary

  while (left <= right) {           // <= because right is inclusive
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target)   left  = mid + 1;
    else                     right = mid - 1;
  }

  return -1;
}
```

### Lower bound (first index ≥ target)

```js
function lowerBound(arr, target) {
  let left = 0;
  let right = arr.length;           // exclusive right boundary

  while (left < right) {            // strict < because right is exclusive
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] < target) left  = mid + 1;
    else                   right = mid;      // don't exclude mid
  }

  return left;
}
```

### Upper bound (first index > target)

```js
function upperBound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] <= target) left  = mid + 1;
    else                    right = mid;
  }

  return left;
}
```

### Recursive binary search

```js
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target)   return binarySearchRecursive(arr, target, mid + 1, right);
  else                     return binarySearchRecursive(arr, target, left, mid - 1);
}
```

### Template comparison

```
Template          right init       loop condition    left move    right move
────────────────  ───────────────  ────────────────  ──────────   ──────────
Standard (exact)  arr.length - 1   left <= right     mid + 1      mid - 1
Lower/upper bound arr.length       left < right      mid + 1      mid
```

### Complexity

| | Time | Space |
|---|---|---|
| Linear search | O(n) | O(1) |
| Binary search (iterative) | O(log n) | O(1) |
| Binary search (recursive) | O(log n) | O(log n) |
| Lower / upper bound | O(log n) | O(1) |

---

<a id="lesson-15"></a>
## Lesson 15 — You did it. Now what?

That was a lot of careful detail. Binary search rewards that care — it's one of those algorithms where a single wrong character (`<` vs `<=`, `mid` vs `mid - 1`) breaks everything.

What you should walk away with:

1. **You understand linear search** — check each element until you find it. O(n). No prerequisites.
2. **You understand binary search** — check the middle, throw away half. O(log n). Requires sorted + random access.
3. **You know the two templates** — standard (exact match) vs lower/upper bound. They differ in exactly three places.
4. **You've seen the most common bugs** — wrong loop condition, wrong pointer update.
5. **You know binary search can apply to answer spaces** — not just sorted arrays.

That's enough to start.

### What to do next

1. Open [`questions/01-linear-search.md`](./questions/01-linear-search.md). It's a warm-up — just implement it.
2. Then [`questions/02-binary-search-iterative.md`](./questions/02-binary-search-iterative.md). This locks in the standard template.
3. After those two, you should feel the difference viscerally.
4. The Medium problems will challenge your understanding of what "sorted" really means (rotated arrays, 2D matrices, answer spaces).

### Pacing

- Don't rush. Binary search is one of those things that "clicks" suddenly after enough repetition.
- If you get an infinite loop: check your pointer updates first.
- If you get an off-by-one error (returning the wrong index, or missing the element): check your loop condition and whether you're using the right template.
- **The pitfall drill questions (23–25) are worth doing** — they directly test the most common failure modes.

You're building something real. Stick with it. See you in [Q1](./questions/01-linear-search.md). 💪
