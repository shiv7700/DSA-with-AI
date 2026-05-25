# Arrays — Lessons from Zero

> 👋 Hey. This file is for someone who's never formally learned data structures before. We're going to go slow. Each lesson teaches **one small idea**. Don't skip. Don't rush. When you finish a lesson, you should feel a small win. That's the whole goal.
>
> Total reading time if you take it at a relaxed pace: about 90 minutes, with breaks. **You do not have to read it all in one sitting.**

---

## Table of Lessons

1. [What's an array? (the mailbox idea)](#lesson-1)
2. [Indexes, and why we count from 0](#lesson-2)
3. [Reading from an array](#lesson-3)
4. [Writing to an array](#lesson-4)
5. [How big is an array? (`length`)](#lesson-5)
6. [Adding things to an array](#lesson-6)
7. [Removing things from an array](#lesson-7)
8. [Wait — why is the FRONT so slow?](#lesson-8)
9. [Your first taste of "complexity" (Big-O, gently)](#lesson-9)
10. [Searching: "is this thing in my array?"](#lesson-10)
11. [Looping through an array (the 3 main ways)](#lesson-11)
12. [Transforming arrays: `map`, `filter`, `reduce`](#lesson-12)
13. [⚠️ The single biggest source of array bugs](#lesson-13)
14. [Copying an array (and the trap with objects inside)](#lesson-14)
15. [Common mistakes beginners make](#lesson-15)
16. [A first peek at "array patterns" (just a preview)](#lesson-16)
17. [Quick reference (now it'll make sense)](#lesson-17)
18. [🔬 Going deeper: how JavaScript stores arrays internally (optional)](#lesson-18)
19. [You did it — what to do next](#lesson-19)

---

<a id="lesson-1"></a>
## Lesson 1 — What's an array? (the mailbox idea)

Imagine an apartment building. On the ground floor, there's a long row of mailboxes. Each one is the same size. Each one has a number painted on it: **#0, #1, #2, #3, …**

You can put something in any mailbox. You can take something out. You can walk up to any mailbox **by its number** without checking the others.

```
Mailbox:   #0       #1       #2       #3       #4
         ┌────────┬────────┬────────┬────────┬────────┐
Holds:   │ letter │ flyer  │ bill   │ package│ empty  │
         └────────┴────────┴────────┴────────┴────────┘
```

That's an array.

In code, let's make an array of your three best friends' names:

```js
const friends = ['Aisha', 'Bilal', 'Chen'];
```

Picture it as three mailboxes:

```
            #0          #1          #2
         ┌─────────┬─────────┬─────────┐
friends: │ 'Aisha' │ 'Bilal' │ 'Chen'  │
         └─────────┴─────────┴─────────┘
```

That's it. An array is a numbered row of slots, each holding one thing.

> 🎯 **Key takeaway**
> An array stores values in **numbered slots** in order. The numbers are called **indexes**.

---

<a id="lesson-2"></a>
## Lesson 2 — Indexes, and why we count from 0

You probably noticed the first mailbox is **#0**, not #1. That feels weird at first. Why?

The way to remember it: the **index is the distance from the start**.

- `friends[0]` means "0 mailboxes after the start" → the very first one
- `friends[1]` means "1 mailbox after the start" → the second one
- `friends[2]` means "2 mailboxes after the start" → the third one

So in a 3-element array, the indexes are 0, 1, and 2. **The last index is always `length - 1`** — not `length`. Beginners trip on this constantly.

For our friends list (3 names):
- First friend: `friends[0]` → `'Aisha'`
- Last friend: `friends[2]` → `'Chen'`
- `friends[3]` → there's no mailbox #3, so this gives `undefined`.

> ✋ **Pause and try**
> If `songs = ['Yesterday', 'Imagine', 'Wonderwall', 'Hey Jude']`, what would `songs[1]` return? What about `songs[5]`?
>
> <details>
> <summary>Show answer</summary>
>
> - `songs[1]` → `'Imagine'`  (remember: 0 is `'Yesterday'`)
> - `songs[5]` → `undefined`  (no mailbox at #5)
> </details>

> 🎯 **Key takeaway**
> Indexes count from 0. The last index of an array is `length - 1`. Reaching for an index that doesn't exist gives you `undefined` — JavaScript won't throw an error.

---

<a id="lesson-3"></a>
## Lesson 3 — Reading from an array

Reading is just `array[index]`. That's it. Let's see it in action.

```js
const cart = ['Notebook', 'Pen', 'Eraser', 'Highlighter'];

console.log(cart[0]);   // 'Notebook'
console.log(cart[3]);   // 'Highlighter'
console.log(cart[7]);   // undefined  (no item there)
```

**This is fast.** Like, *really* fast. JavaScript doesn't have to look through the other elements to find the one you want — it computes exactly where mailbox #3 is and goes straight there.

We say this operation is **constant time** — meaning it takes the same tiny amount of time whether your array has 10 elements or 10 million. Cool, right?

> 💡 **Tip**
> Whenever you see `arr[i]`, picture: "JavaScript jumps directly to that mailbox." No searching. No looping. Just a direct grab.

---

<a id="lesson-4"></a>
## Lesson 4 — Writing to an array

Writing is just as easy:

```js
const cart = ['Notebook', 'Pen', 'Eraser', 'Highlighter'];

cart[1] = 'Pencil';
console.log(cart);   // ['Notebook', 'Pencil', 'Eraser', 'Highlighter']
```

We replaced what was in mailbox #1. The old `'Pen'` is gone — overwritten.

You can also write to a slot that doesn't exist yet:

```js
const cart = ['Notebook', 'Pen'];
cart[3] = 'Stapler';
console.log(cart);   // ['Notebook', 'Pen', <1 empty item>, 'Stapler']
```

Wait, what's that `<1 empty item>` thing?

When you skip a slot like that, JavaScript creates a **"hole"** at index 2. It's not `undefined` (well, sort of), it's literally a missing slot. **This is bad practice** — it makes arrays slower and behaves oddly. We'll come back to this in Lesson 15.

For now: don't skip indexes when writing.

> 🎯 **Key takeaway**
> `arr[i] = value` writes to slot `i`. Don't write to a slot far past the end — it creates holes that confuse JavaScript.

---

<a id="lesson-5"></a>
## Lesson 5 — How big is an array? (`length`)

Every array has a `.length` property that tells you how many slots it has.

```js
const friends = ['Aisha', 'Bilal', 'Chen'];
console.log(friends.length);   // 3
```

A useful trick — the last element is at `length - 1`:

```js
const lastFriend = friends[friends.length - 1];   // 'Chen'
```

(In modern JavaScript, there's an even shorter way: `friends.at(-1)` also gives you `'Chen'`.)

**A small surprise:** `.length` isn't read-only. You can *set* it.

```js
const arr = [1, 2, 3, 4, 5];
arr.length = 2;
console.log(arr);   // [1, 2]   — the last three were dropped!
```

Setting `length` to a smaller number cuts the array short. Useful sometimes, weird if you didn't know it was possible.

> ✋ **Pause and try**
> If `messages = ['hey', 'hi', 'hello', 'yo']`, how do you get the **last** message without hardcoding 3?
>
> <details>
> <summary>Show answer</summary>
>
> Two clean options:
> - `messages[messages.length - 1]` → `'yo'`
> - `messages.at(-1)` → `'yo'`
> </details>

---

<a id="lesson-6"></a>
## Lesson 6 — Adding things to an array

There are two common ways to add a new item: **at the end** or **at the front**. JavaScript gives you a method for each.

### Adding to the end: `push`

Imagine your friends list and you make a new friend, Diana.

```js
const friends = ['Aisha', 'Bilal', 'Chen'];
friends.push('Diana');

console.log(friends);   // ['Aisha', 'Bilal', 'Chen', 'Diana']
```

Picture: there was empty space to the right of mailbox #2. JavaScript just dropped `'Diana'` into a new mailbox #3. Nobody else moved.

```
Before:   #0       #1       #2
        ┌────────┬────────┬────────┐
        │ Aisha  │ Bilal  │ Chen   │
        └────────┴────────┴────────┘

After:    #0       #1       #2       #3
        ┌────────┬────────┬────────┬────────┐
        │ Aisha  │ Bilal  │ Chen   │ Diana  │
        └────────┴────────┴────────┴────────┘
                                    ↑ new
```

**This is fast.** No existing element had to move.

### Adding to the front: `unshift`

Now you reconnect with an old friend, Aamir, who should go at the start (because the list is alphabetical, say).

```js
const friends = ['Aisha', 'Bilal', 'Chen', 'Diana'];
friends.unshift('Aamir');

console.log(friends);   // ['Aamir', 'Aisha', 'Bilal', 'Chen', 'Diana']
```

Looks the same, right? But behind the scenes, something **completely different** happened. We'll dig into that in two lessons. For now, just know:

- `push(x)` — adds `x` to the end. **Fast.** ✅
- `unshift(x)` — adds `x` to the start. **Slow.** ⚠️ (We'll see why soon.)

> 🎯 **Key takeaway**
> `push` adds to the end. `unshift` adds to the front. They look similar but behave very differently underneath.

---

<a id="lesson-7"></a>
## Lesson 7 — Removing things from an array

Same shape, two methods: one for the end, one for the front.

### Removing from the end: `pop`

```js
const playlist = ['Yesterday', 'Imagine', 'Wonderwall', 'Hey Jude'];
const removed = playlist.pop();

console.log(removed);    // 'Hey Jude'
console.log(playlist);   // ['Yesterday', 'Imagine', 'Wonderwall']
```

`pop()` removes the **last** element and returns it. **Fast.** ✅

### Removing from the front: `shift`

```js
const playlist = ['Yesterday', 'Imagine', 'Wonderwall'];
const removed = playlist.shift();

console.log(removed);    // 'Yesterday'
console.log(playlist);   // ['Imagine', 'Wonderwall']
```

`shift()` removes the **first** element and returns it. But this one is **slow.** ⚠️

> 💡 **Tip — memorize this:**
> ```
> Front of array      Back of array
> ┌──────────────┐    ┌──────────────┐
> │   SLOW       │    │   FAST       │
> │  shift /     │    │  push /      │
> │  unshift     │    │  pop         │
> └──────────────┘    └──────────────┘
> ```
> Operations at the **back** are fast. Operations at the **front** are slow. Next lesson explains why.

---

<a id="lesson-8"></a>
## Lesson 8 — Wait, why is the FRONT so slow?

This is the most important intuition in this whole topic. Once it clicks, you'll have it forever.

Picture our friends array again:

```
          #0       #1       #2
        ┌────────┬────────┬────────┐
        │ Aisha  │ Bilal  │ Chen   │
        └────────┴────────┴────────┘
```

We want to add `'Aamir'` at the **front**. But mailbox #0 is **already taken by Aisha**. We can't just plop Aamir into #0 — that would erase Aisha.

So what does JavaScript do? It moves everyone over.

```
Step 1: Chen moves from #2 to #3
        ┌────────┬────────┬────────┬────────┐
        │ Aisha  │ Bilal  │   ?    │ Chen   │
        └────────┴────────┴────────┴────────┘

Step 2: Bilal moves from #1 to #2
        ┌────────┬────────┬────────┬────────┐
        │ Aisha  │   ?    │ Bilal  │ Chen   │
        └────────┴────────┴────────┴────────┘

Step 3: Aisha moves from #0 to #1
        ┌────────┬────────┬────────┬────────┐
        │   ?    │ Aisha  │ Bilal  │ Chen   │
        └────────┴────────┴────────┴────────┘

Step 4: Aamir lands in #0
        ┌────────┬────────┬────────┬────────┐
        │ Aamir  │ Aisha  │ Bilal  │ Chen   │
        └────────┴────────┴────────┴────────┘
```

Three friends had to move. If we had a thousand friends, **a thousand friends would have to move**. If we had a million, a million.

Now flip it around: `push('Diana')` doesn't need to move anybody, because the end of the array has nothing in its way.

**This is the whole reason front operations are slow.** It's not magic — there's literally more physical work to do.

> 🎯 **Key takeaway**
> The end of an array has empty space next to it. The front does not. That's why **`push` and `pop` are fast, while `unshift` and `shift` are slow.**

Tuck this intuition away. You'll lean on it constantly.

---

<a id="lesson-9"></a>
## Lesson 9 — Your first taste of "complexity" (Big-O, gently)

You'll hear people say things like **"that's O(1)"** or **"that's O(n)"**. These are just shorthand for "how does the running time grow as your data gets bigger?" Don't be intimidated — it's much simpler than it sounds.

### O(1) — constant time

"Takes the same amount of time, no matter how big the array is."

Examples: `arr[i]` (read), `arr[i] = x` (write), `arr.push(x)`, `arr.pop()`, `arr.length`.

Whether you have 10 elements or 10 million, these are basically instant.

### O(n) — linear time

"The time grows in proportion to how big the array is."

Examples: `arr.shift()`, `arr.unshift(x)`, `arr.indexOf(x)`, a `for` loop over the whole array.

If your array doubles in size, the work doubles. If it grows 1000×, the work grows 1000×.

### O(n²) — quadratic time

"For each element, you do work proportional to the whole array."

This usually happens with **nested loops** — a loop inside a loop. We avoid this when we can, because if `n = 1000`, then `n² = 1,000,000`. Big.

### O(log n) — logarithmic time

"Doubling the array adds just *one* more step to the work."

This is what binary search gives you. Crazy fast — you'll meet it in topic 05.

### A rough mental picture

```
   n = 1000

   O(1)       ≈ 1 step          ← like one fingersnap
   O(log n)   ≈ 10 steps         ← still basically instant
   O(n)       ≈ 1,000 steps      ← fast
   O(n log n) ≈ 10,000 steps     ← fast enough
   O(n²)      ≈ 1,000,000 steps  ← uh oh
```

You don't need a formal math definition right now. Just remember: **big-O tells you how operations scale as data grows.** Bigger is worse.

> 🔬 **Going deeper (optional)**
> Big-O has its own dedicated notes in `01-Big-O-Complexity/notes.md`. If this lesson is fuzzy, go read that next — but you can absolutely keep going with Arrays first and circle back. Most people learn Big-O by feeling it in real examples, exactly like we did in Lesson 8.

> 🎯 **Key takeaway**
> O(1) = constant (instant). O(n) = scales with size. O(n²) = scales with size *squared*. Lower is better.

---

<a id="lesson-10"></a>
## Lesson 10 — Searching: "is this thing in my array?"

You'll often want to ask: "is X in this array?" or "where is X?". JavaScript gives you four common methods.

```js
const songs = ['Yesterday', 'Imagine', 'Wonderwall', 'Hey Jude'];

songs.includes('Imagine');           // true       ← just yes/no
songs.indexOf('Imagine');            // 1          ← position, or -1 if missing
songs.indexOf('Smells Like Teen Spirit'); // -1

songs.find(s => s.startsWith('W'));     // 'Wonderwall'  ← first match by condition
songs.findIndex(s => s.startsWith('W'));// 2
```

Use them like this:

- **`includes(x)`** when you just need true/false.
- **`indexOf(x)`** when you need the position.
- **`find(fn)`** / **`findIndex(fn)`** when the condition is more complex than "equal to X."

### All of these are O(n)

Why? Because the only way to know if `'Imagine'` is in the array is to check each slot one by one until you find it. JavaScript has no shortcut.

If you find yourself doing many `includes` checks in a loop, that becomes O(n²) — and that's where a different data structure (`Set`, topic 10) saves you. But we're not there yet.

> 💡 **Tip**
> `includes` and `indexOf` use strict equality (`===`) under the hood. They work great for primitives (numbers, strings, booleans) but **don't work for finding an object by its contents** — only by reference. If you need that, use `find` with a custom condition.

> ✋ **Pause and try**
> How would you check if `'Diana'` is in the friends array AND get her position in one go?
>
> <details>
> <summary>Show answer</summary>
>
> ```js
> const i = friends.indexOf('Diana');
> if (i !== -1) {
>   console.log(`Found at index ${i}`);
> } else {
>   console.log('Not found');
> }
> ```
> </details>

---

<a id="lesson-11"></a>
## Lesson 11 — Looping through an array (the 3 main ways)

You'll loop over arrays *all the time*. Here are the three ways you'll see, and when to pick each.

### Way 1: classic `for` loop

```js
const cart = ['Notebook', 'Pen', 'Eraser'];

for (let i = 0; i < cart.length; i++) {
  console.log(i, cart[i]);
}
// 0 Notebook
// 1 Pen
// 2 Eraser
```

**Use when:** you need the index, or you want to `break` out early, or you might modify the loop counter (e.g., iterate backwards).

### Way 2: `for...of`

```js
for (const item of cart) {
  console.log(item);
}
// Notebook
// Pen
// Eraser
```

**Use when:** you only need the values and you find this cleaner to read (you usually do).

### Way 3: `.forEach()`

```js
cart.forEach((item, i) => {
  console.log(i, item);
});
```

**Use when:** you want a callback-style iteration and you don't need to `break` out early.

### A gotcha with `forEach`

You **cannot** `break` or `return` out of `forEach` to stop early. The callback's `return` only ends that one call, not the whole loop. If you might want to bail early, use `for` or `for...of`.

```js
// ❌ Doesn't stop at 'Pen' — keeps going through all items
cart.forEach(item => {
  if (item === 'Pen') return;   // only returns from this iteration
  console.log(item);
});
```

> ⚠️ **Don't use `for...in` on arrays**
> ```js
> for (const i in cart) { … }   // ❌ avoid
> ```
> `for...in` is for object **keys**. On arrays it usually works but it can iterate inherited properties and gives you keys as strings, not numbers. It's a common beginner mistake. Use `for...of` instead.

> 🎯 **Key takeaway**
> `for` (with index) is the most flexible. `for...of` is the cleanest. `.forEach` is fine but can't break early.

---

<a id="lesson-12"></a>
## Lesson 12 — Transforming arrays: `map`, `filter`, `reduce`

These three methods are the heart of "functional" JavaScript. They take an array and give you back something **new** — without changing your original. Once you internalize these, you'll write a lot less `for` loops.

Let's say we have a list of products in a store:

```js
const products = [
  { name: 'Notebook', price: 5 },
  { name: 'Pen', price: 1 },
  { name: 'Backpack', price: 40 },
  { name: 'Eraser', price: 1 },
];
```

### `.map()` — "do something to each item, give me a new array"

Get just the names:

```js
const names = products.map(p => p.name);
// ['Notebook', 'Pen', 'Backpack', 'Eraser']
```

Apply a discount:

```js
const discounted = products.map(p => ({ ...p, price: p.price * 0.9 }));
```

**`map` always returns an array of the same length** as the original.

### `.filter()` — "keep only items that match a condition"

Get only items under $10:

```js
const cheap = products.filter(p => p.price < 10);
// [{ name: 'Notebook', price: 5 }, { name: 'Pen', price: 1 }, { name: 'Eraser', price: 1 }]
```

**`filter` always returns an array, but it might be shorter** (or empty).

### `.reduce()` — "fold the array into a single value"

Get the total price of everything:

```js
const total = products.reduce((sum, p) => sum + p.price, 0);
// 47
```

The first argument is the **reducer function**: `(accumulator, currentItem) => newAccumulator`. The second is the **starting value** for the accumulator.

`reduce` is the most powerful of the three, and the most confusing at first. Read it as: "**start at 0. For each product, add its price to the running total.**"

### Chaining them together

This is where it gets fun:

```js
const totalCostOfCheapItems = products
  .filter(p => p.price < 10)         // keep only cheap items
  .map(p => p.price)                 // get just their prices
  .reduce((sum, price) => sum + price, 0);   // add them up
// 7
```

You can read top-to-bottom and follow the data flow. Most developers prefer this over a hand-written `for` loop for this kind of thing.

> 💡 **Tip**
> If you find yourself writing a `for` loop that builds up another array, ask: "can I use `map` or `filter`?" If you're building up a single value, ask: "can I use `reduce`?"

> ✋ **Pause and try**
> Given `scores = [50, 80, 95, 30, 70]`, write code (using only `filter` and `length`) to count how many scores are above 60.
>
> <details>
> <summary>Show answer</summary>
>
> ```js
> const passCount = scores.filter(s => s > 60).length;
> // 3
> ```
> </details>

---

<a id="lesson-13"></a>
## Lesson 13 — ⚠️ The single biggest source of array bugs

Pay close attention here. **This is the bug you will write at some point and not understand for an hour.**

JavaScript's array methods come in two flavors:

- **Mutating methods** — they CHANGE your array in place
- **Non-mutating methods** — they leave your array alone and give you back a new one

When you don't know which is which, you can accidentally change someone else's array and not realize it.

### The list

| Mutating (changes your array) | Non-mutating (returns new) |
|---|---|
| `push`, `pop`, `shift`, `unshift` | `slice`, `concat`, `[...arr]` |
| `splice` | `map`, `filter`, `reduce` |
| `sort`, `reverse` | `flat`, `flatMap`, `join` |
| `fill`, `copyWithin` | `find`, `findIndex`, `includes` |
|  | `indexOf`, `some`, `every`, `at` |
|  | `toSorted`, `toReversed`, `toSpliced` (newer) |

### Watch this bug happen

You write a "biggest number" helper:

```js
function biggestNumber(numbers) {
  return numbers.sort()[numbers.length - 1];
}

const scores = [50, 80, 95, 30, 70];
biggestNumber(scores);    // returns 95   ✅ correct

console.log(scores);
// [30, 50, 70, 80, 95]   ← OH NO, the original was rearranged!
```

Whoever called `biggestNumber(scores)` didn't expect their `scores` array to get reordered. But it did — because `.sort()` is **mutating**.

### The fix

If you might want to change the array but only your local copy, **copy first, mutate the copy:**

```js
function biggestNumber(numbers) {
  return [...numbers].sort()[numbers.length - 1];
  //     ↑ make a copy, then sort the copy
}
```

Or use the **non-mutating** version if it exists (modern JavaScript added some):

```js
return numbers.toSorted()[numbers.length - 1];
```

### A simpler rule

> 🎯 **Key takeaway**
> If a method's name **sounds like an action** (`sort`, `reverse`, `push`, `pop`), it probably changes your array. If it **sounds like a question or a recipe** (`map`, `filter`, `find`, `includes`), it probably gives you back something new without touching your array.
>
> When in doubt, check the docs — or just copy the array first to be safe.

---

<a id="lesson-14"></a>
## Lesson 14 — Copying an array (and the trap with objects inside)

Copying sounds simple. It mostly is. But there's a trap.

### Three easy ways to copy an array

```js
const original = [1, 2, 3];

const a = [...original];        // spread (most common)
const b = original.slice();     // slice with no args
const c = Array.from(original); // Array.from
```

All three give you a brand new array. Modify one, the others (and the original) are unaffected:

```js
a.push(99);
console.log(a);         // [1, 2, 3, 99]
console.log(original);  // [1, 2, 3]   ← untouched
```

### The trap: objects inside the array

This is sneaky. Watch:

```js
const original = [{ name: 'Alice' }, { name: 'Bob' }];
const copy = [...original];

copy[0].name = 'CHANGED';

console.log(original[0].name);   // 'CHANGED'   ← wait, what?!
```

We changed `copy[0]`, but `original[0]` also changed?! Why?

Because **we only copied the outer array**. The inner objects are *shared* between both arrays.

Picture it:

```
original ──┐                ┌── copy
           ↓                ↓
        ┌────┬────┐      ┌────┬────┐
        │ ●  │ ●  │      │ ●  │ ●  │
        └─┼──┴─┼──┘      └─┼──┴─┼──┘
          │    │           │    │
          ↓    ↓           ↓    ↓
     ┌─────────────┐  ┌─────────────┐
     │ name: Alice │  │ name: Bob   │
     └─────────────┘  └─────────────┘
        ↑ BOTH arrays point to the SAME two objects.
        ↑ Changing the object via one array is visible from the other.
```

This is called a **shallow copy**. It copies the array structure but not the things inside.

### How to make a real, fully-independent copy

```js
const original = [{ name: 'Alice' }, { name: 'Bob' }];
const deepCopy = structuredClone(original);

deepCopy[0].name = 'CHANGED';
console.log(original[0].name);   // 'Alice'   ✅
```

`structuredClone()` is a modern, built-in function. It recursively clones everything: arrays, objects inside arrays, arrays inside objects, all the way down.

> 🎯 **Key takeaway**
> A shallow copy (spread, slice, Array.from) copies the array but **shares the items inside**. For arrays of objects you plan to mutate, use `structuredClone()`.

---

<a id="lesson-15"></a>
## Lesson 15 — Common mistakes beginners make

Every one of these will trip you up someday. Read them now so you remember "oh wait, I've seen this before."

### Mistake 1: `sort()` doesn't sort numbers the way you'd expect

```js
console.log([10, 2, 1, 25, 5].sort());
// Expected: [1, 2, 5, 10, 25]
// Got:      [1, 10, 2, 25, 5]   ← !!
```

**What happened?** Without a comparator, `sort()` converts each element to a string and sorts alphabetically. `'10'` comes before `'2'` because `'1' < '2'`.

**Fix:** always pass a comparator when sorting numbers.

```js
[10, 2, 1, 25, 5].sort((a, b) => a - b);    // [1, 2, 5, 10, 25]  ✅
```

Read `(a, b) => a - b` as: "if `a - b` is negative, `a` comes first; if positive, `b` comes first; if zero, they're equal."

### Mistake 2: comparing arrays with `===`

```js
[1, 2] === [1, 2];   // false
```

Two different arrays are different *objects*, even if their contents match. `===` only returns true if both variables point to the **same** array in memory.

To compare contents element-by-element:

```js
function arraysEqual(a, b) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}
```

Or for primitives only, a cheap trick: `JSON.stringify(a) === JSON.stringify(b)`.

### Mistake 3: `delete arr[i]` doesn't actually remove

```js
const arr = [1, 2, 3];
delete arr[1];

console.log(arr);          // [1, <empty>, 3]
console.log(arr.length);   // 3   ← length didn't change!
```

`delete` leaves a hole. The slot is still there, just empty.

**Fix:** use `splice` to actually remove and shift.

```js
arr.splice(1, 1);   // remove 1 element at index 1
```

### Mistake 4: `new Array(3)` doesn't do what you'd guess

```js
const a = new Array(3);
console.log(a);   // [ <3 empty items> ]   ← three holes, not three undefineds

a.map(() => 'hi');
// [ <3 empty items> ]   ← map skipped the holes!
```

`new Array(3)` creates an array with `length = 3` but **no actual slots**. Map, forEach, filter, etc. all skip holes silently. This is a common source of "why isn't my loop running?" bugs.

**Fix:** initialize with `fill` or use `Array.from`.

```js
new Array(3).fill(0);                       // [0, 0, 0]    ✅
Array.from({ length: 3 }, (_, i) => i);     // [0, 1, 2]    ✅
```

### Mistake 5: removing elements while looping forward

```js
const arr = [1, 2, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    arr.splice(i, 1);   // remove evens
  }
}

console.log(arr);   // [1, 3, 4, 5]   ← 4 wasn't removed!
```

When you remove index 1, everything shifts left. The next value (`3`) is now at index 1, but your loop advances to index 2 anyway, **skipping it**.

**Fix:** loop **backwards** when you're removing.

```js
for (let i = arr.length - 1; i >= 0; i--) {
  if (arr[i] % 2 === 0) arr.splice(i, 1);
}
```

Or, much cleaner: don't mutate. Use `filter`.

```js
const odds = arr.filter(x => x % 2 !== 0);
```

### Mistake 6: negative indexing (it doesn't work like Python)

```js
arr[-1];    // undefined   ← not "last element"!
```

Negative numbers as indexes are just weird property names in JavaScript. To get the last element:

```js
arr[arr.length - 1];   // classic
arr.at(-1);            // modern (works since 2022)
```

### Mistake 7: thinking `forEach` returns something

```js
const doubled = [1, 2, 3].forEach(n => n * 2);
console.log(doubled);   // undefined   ← !!
```

`.forEach` returns nothing (`undefined`). If you want a transformed array, use `.map`:

```js
const doubled = [1, 2, 3].map(n => n * 2);   // [2, 4, 6]   ✅
```

> 🎯 **Key takeaway**
> When something feels surprising in JavaScript arrays, **check this list first**. Half of all array bugs are one of these seven mistakes.

---

<a id="lesson-16"></a>
## Lesson 16 — A first peek at "array patterns" (just a preview)

When you start solving harder array problems, you'll notice the same handful of *strategies* keep showing up. We call these **patterns**.

We're not going to dive deep here — each one has its own dedicated topic later. But here's a quick preview so you recognize them when you see them.

### Pattern A: Two pointers

Two markers walking through the array, often from opposite ends, doing something with the pair.

```
[ 1, 2, 3, 4, 5 ]
  ↑           ↑
  left       right
```

Used for: reversing an array, checking palindromes, finding pairs that sum to a target, container with most water.

**Deep dive:** [`19-Two-Pointers`](../19-Two-Pointers/)

### Pattern B: Sliding window

A "window" of consecutive elements that slides along the array. You don't recompute from scratch each time — just add the new element entering and subtract the one leaving.

```
[ 2, 1, 5, 1, 3, 2 ]
  ╰──┴──╯   window of size 3, slides right one step at a time
```

Used for: max sum of any 3 consecutive, longest substring without repeats, smallest window containing X.

**Deep dive:** [`20-Sliding-Window`](../20-Sliding-Window/)

### Pattern C: Prefix sum

Precompute a running total so you can answer "sum from index `i` to `j`" instantly later.

Used for: range-sum queries, subarray sum equals K.

### Pattern D: Hash map for instant lookup

Use a `Map` or `Set` so checking "have I seen this before?" is O(1) instead of O(n).

Used for: Two Sum, longest consecutive sequence, "does any pair / triplet meet this condition?"

**Deep dive:** [`10-Hash-Tables`](../10-Hash-Tables/)

### Pattern E: Kadane's algorithm

A specific clever loop to find the maximum-sum contiguous subarray in O(n).

Used for: max subarray sum, max product subarray, lots of "best run" questions.

> 💡 **You don't have to master these now.** Right now, just **recognize the names** so when you see "this is a sliding window problem", a small bell goes off in your head. We'll come back to each pattern with full depth.

---

<a id="lesson-17"></a>
## Lesson 17 — Quick reference (now it'll make sense)

Here's the cheat sheet you can come back to. Everything below is stuff we've already discussed.

### Complexity table

| Operation | Big-O | Why |
|-----------|-------|-----|
| `arr[i]` (read or write) | O(1) | Direct jump |
| `arr.push(x)` | O(1) | Drop at the end |
| `arr.pop()` | O(1) | Pluck from the end |
| `arr.shift()` | O(n) | Everything slides left |
| `arr.unshift(x)` | O(n) | Everything slides right |
| `arr.splice(i, c, ...)` | O(n) | Everything to the right of `i` shifts |
| `arr.slice(a, b)` | O(b - a) | Allocates a new copy |
| `arr.indexOf(x)` / `includes(x)` | O(n) | Linear scan |
| `arr.find(fn)` / `findIndex(fn)` | O(n) | Linear scan |
| `[...a, ...b]` / `a.concat(b)` | O(n + m) | New combined array |
| `arr.sort(cmp)` | O(n log n) | Smart sort |
| `arr.reverse()` | O(n) | Swap pairs |
| `arr.map / filter / forEach / reduce` | O(n) | One pass |

### Mutating vs non-mutating

| Mutating | Non-mutating |
|---|---|
| `push, pop, shift, unshift` | `slice, concat, [...arr]` |
| `splice, sort, reverse, fill` | `map, filter, reduce` |
| `copyWithin` | `flat, flatMap, join` |
|  | `find, findIndex, includes, indexOf` |
|  | `some, every, at` |
|  | `toSorted, toReversed, toSpliced` |

### A few templates you'll use again and again

**Loop with index:**
```js
for (let i = 0; i < arr.length; i++) {
  // arr[i]
}
```

**Loop just over values:**
```js
for (const item of arr) {
  // item
}
```

**Swap two elements:**
```js
[arr[i], arr[j]] = [arr[j], arr[i]];
```

**Build a 2D matrix (m rows × n cols):**
```js
const matrix = Array.from({ length: m }, () => new Array(n).fill(0));
```

**Find the last element:**
```js
arr[arr.length - 1];
// or
arr.at(-1);
```

---

<a id="lesson-18"></a>
## Lesson 18 — 🔬 Going deeper: how JavaScript stores arrays internally (optional)

> This lesson is for the curious. **You can skip it entirely** and still solve every problem in this topic.

In most "older" programming languages (like C or Java), an array is a fixed-size block of identical things. "An array of exactly 100 integers, period." Trying to make it bigger requires allocating a new, larger block and copying everything over.

JavaScript is friendlier on the surface: arrays grow and shrink whenever you want, and they can hold any mix of types. But under the hood, **the engine has to fake this**.

The engine that runs JavaScript in Chrome and Node.js is called **V8**. V8 secretly tags every array with an internal "shape" — sort of like a label that says "this array is all-small-integers" or "this array is mixed-types" or "this array has gaps".

The shapes (in order from fastest to slowest):

- **All small integers, no gaps** → fastest
- **All numbers (some non-integer), no gaps** → fast
- **Mixed types (string, object, etc.), no gaps** → slower
- **Has gaps (missing slots)** → slower still
- **Treated like a regular object** (very large and sparse arrays) → slowest

Once V8 "downgrades" your array to a slower shape, **it doesn't upgrade back**. So habits that keep arrays fast:

- Don't `delete arr[i]` — creates a gap.
- Don't write at huge indexes like `arr[99999] = x` when the array was tiny — creates many gaps.
- Don't mix types if you don't need to — `[1, 2, 3]` is faster than `[1, 'two', 3]`.
- Use `new Array(n).fill(0)`, not `new Array(n)`.

In interview problems, this rarely matters — the arrays are small. In **production performance-critical code**, it can. But you don't need to think about it yet.

> 🎯 **Key takeaway**
> JavaScript arrays are smart but lazy: keep them homogeneous (same kind of thing) and dense (no holes) and they're as fast as anything else.

---

<a id="lesson-19"></a>
## Lesson 19 — You did it. Now what?

Take a breath. That was a lot. **You don't have to remember it all right now.**

What you should walk away with:

1. **You understand what an array is** — a numbered row of slots.
2. **You know reading/writing is fast and front-operations are slow** — and you know *why*.
3. **You've met Big-O** — at least the basic shapes.
4. **You know the difference between mutating and non-mutating methods** — the #1 source of array bugs.
5. **You've heard of the main array patterns** — even if you can't apply them yet.

That's enough to start.

### What to do next

1. Open [`questions/01-reverse-array.md`](./questions/01-reverse-array.md).
2. Read the problem. Try to solve it in your head or on paper first.
3. Open [`solutions/01-reverse-array.js`](./solutions/01-reverse-array.js) and write the code.
4. **If you get stuck**, come back here and re-read the relevant lesson. THEN peek at the hints.
5. After solving, add a comment at the top of your solution: `// O(n) time, O(1) space` (or whatever applies).
6. Tick the box in [`README.md`](./README.md). Celebrate. Move on.

### Pacing

- **Don't try to do all 28 problems in one day.** Two or three a day, for a week or two, is much better.
- **The easy ones are not "too easy."** They build the reflexes you need for the hard ones.
- **If you struggle on a problem, that's the point.** Take a break, come back. Productive struggle is how you learn.

You're not behind. You're not slow. You're learning a skill that takes many repetitions to internalize. **Stick with it.**

See you in [Q1](./questions/01-reverse-array.md). 💪
