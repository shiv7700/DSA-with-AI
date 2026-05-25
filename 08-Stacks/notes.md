# Stacks — Lessons from Zero

> 👋 Hey. If you made it here from the Arrays chapter, you already know the hardest part — how memory works. This chapter is about a *pattern* of usage on top of that. A stack is one of the simplest and most powerful ideas in all of computer science. Brace yourself: you'll start recognizing stacks everywhere.
>
> Total reading time at a relaxed pace: about 60–80 minutes with breaks. **You do not have to read it all in one sitting.**

---

## Table of Lessons

1. [What's a stack? (the plate pile)](#lesson-1)
2. [LIFO — Last In, First Out](#lesson-2)
3. [The four core operations](#lesson-3)
4. [Real-world stacks you use every day](#lesson-4)
5. [Implementing a stack with an array](#lesson-5)
6. [Implementing a stack with a linked list](#lesson-6)
7. [The call stack — a stack you've been using all along](#lesson-7)
8. [Why "balanced parentheses" needs a stack](#lesson-8)
9. [The monotonic stack idea](#lesson-9)
10. [Expression evaluation — postfix (RPN) calculator](#lesson-10)
11. [Infix to postfix conversion](#lesson-11)
12. [Quick reference & complexity table](#lesson-12)
13. [You did it — what to do next](#lesson-13)

---

<a id="lesson-1"></a>
## Lesson 1 — What's a stack? (the plate pile)

Imagine you're in a cafeteria. There's a spring-loaded dispenser with a stack of trays. You can:

- **Put a new tray on top.**
- **Take the top tray off.**

That's it. You can't grab the bottom tray. You can't grab the third one from the top. The only tray you can touch is always **the one on top**.

```
    ┌────────────┐
    │  Tray  #3  │  ← you can only take this one (it's on top)
    ├────────────┤
    │  Tray  #2  │
    ├────────────┤
    │  Tray  #1  │  ← this was put on first; it'll come out last
    └────────────┘
       (dispenser)
```

In code, a stack is a collection where you can only add and remove from **one end — the "top"**.

That's the whole mental model. Everything else is a consequence of this one constraint.

> 🎯 **Key takeaway**
> A stack is a collection where **you only ever interact with the top**. Add to the top. Remove from the top. That's it.

---

<a id="lesson-2"></a>
## Lesson 2 — LIFO — Last In, First Out

The cafeteria tray rule has a formal name: **LIFO**.

**L**ast **I**n, **F**irst **O**ut.

The most recently added item is the first one to come back out.

Compare this with a queue (line at a coffee shop): the first person who joined the line is the first to be served — FIFO. That's the opposite.

Let's trace adding three items to a stack and then removing them:

```
Action          Stack state (top is right)      Result
──────────────────────────────────────────────────────
push(10)        [ 10 ]
push(20)        [ 10, 20 ]
push(30)        [ 10, 20, 30 ]
pop()           [ 10, 20 ]                      returns 30
pop()           [ 10 ]                          returns 20
pop()           [ ]                             returns 10
```

Notice: we pushed 10 first, but it came out last. We pushed 30 last, but it came out first. That's LIFO.

> ✋ **Pause and try**
> If you `push(A)`, `push(B)`, `push(C)`, then `pop()`, `pop()`, what two values come out? In what order?
>
> <details>
> <summary>Show answer</summary>
>
> `C` comes out first, then `B`. The order is reversed from how they went in.
> </details>

> 🎯 **Key takeaway**
> LIFO = Last In, First Out. The most recently added item is always the next to leave.

---

<a id="lesson-3"></a>
## Lesson 3 — The four core operations

Every stack implementation provides these four operations. Memorize them — they'll come up in every problem:

| Operation | What it does | Big-O |
|-----------|--------------|-------|
| `push(x)` | Add `x` to the top of the stack | O(1) |
| `pop()` | Remove and return the top item | O(1) |
| `peek()` | Return (but don't remove) the top item | O(1) |
| `isEmpty()` | Return `true` if the stack has no items | O(1) |

All four are **O(1)** — constant time. That's the beautiful thing about stacks. You never need to scan through anything.

### What about `pop()` on an empty stack?

That's an error. Depending on implementation, it might:

- Return `undefined` (if backed by a JavaScript array)
- Throw an exception

You should always check `isEmpty()` before popping when you're not certain the stack has something in it.

```js
if (!stack.isEmpty()) {
  const top = stack.pop();
}
```

### Visualizing the operations

Let's watch a stack go through several operations:

```
Start:  [ ]          (empty stack)

push(5)
        ┌─────┐
        │  5  │  ← top
        └─────┘

push(3)
        ┌─────┐
        │  3  │  ← top
        ├─────┤
        │  5  │
        └─────┘

push(8)
        ┌─────┐
        │  8  │  ← top
        ├─────┤
        │  3  │
        ├─────┤
        │  5  │
        └─────┘

peek()  → 8  (stack unchanged)

pop()   → 8
        ┌─────┐
        │  3  │  ← top
        ├─────┤
        │  5  │
        └─────┘

pop()   → 3
        ┌─────┐
        │  5  │  ← top
        └─────┘

isEmpty() → false

pop()   → 5
        [ ]  (empty again)

isEmpty() → true
```

> 🎯 **Key takeaway**
> `push`, `pop`, `peek`, `isEmpty` — all O(1). Know them cold. These four are the vocabulary of every stack problem.

---

<a id="lesson-4"></a>
## Lesson 4 — Real-world stacks you use every day

Here's the part where it clicks. You've already been using stacks your whole digital life.

### 1. Browser back button

Every time you visit a page, the browser pushes it onto a "history stack". When you hit Back, it pops the current page and returns the one underneath.

```
You visit:    google.com → github.com → stackoverflow.com

History stack (bottom to top):
  ┌──────────────────────┐
  │  stackoverflow.com   │  ← current page (top)
  ├──────────────────────┤
  │  github.com          │
  ├──────────────────────┤
  │  google.com          │
  └──────────────────────┘

You click Back:
  pop() → "stackoverflow.com" is gone
  ┌──────────────────────┐
  │  github.com          │  ← now you're here
  ├──────────────────────┤
  │  google.com          │
  └──────────────────────┘
```

### 2. Undo / Redo in any editor

Every action you take (type a character, delete a word, paste text) gets pushed onto an undo stack. When you hit Cmd+Z, the latest action is popped off and reversed.

```
You type: "Hello" → delete 'o' → type 'p'

Undo stack:
  ┌──────────────────┐
  │  type 'p'        │  ← most recent action (top)
  ├──────────────────┤
  │  delete 'o'      │
  ├──────────────────┤
  │  type "Hello"    │
  └──────────────────┘

Cmd+Z (undo):
  pop() → reverse "type 'p'" → text goes back to "Hell"
```

### 3. Text editor's function call tracking

When you open a file in an IDE and click "Go to definition", then "Go to definition" again, the editor keeps a stack of where you were. Hitting a "Go back" button pops you to the previous location.

### 4. Matching brackets in code

When a compiler reads your code, it uses a stack to match opening brackets with closing brackets. Open bracket? Push. Close bracket? Pop and check it matches.

```
   ( a + [ b * { c + d } ] )
   ↑
   push '('

         ↑
         push '['

               ↑
               push '{'

                       ↑
                       pop '{' — matches '}'  ✅

                           ↑
                           pop '[' — matches ']'  ✅

                             ↑
                             pop '(' — matches ')'  ✅
   Stack is empty → all brackets balanced  ✅
```

### 5. The call stack (more in Lesson 7)

Every function call you make in JavaScript gets pushed onto the call stack. When it returns, it gets popped. This is so fundamental that we'll give it its own lesson.

> 💡 **Tip**
> Whenever you see a problem involving "matching", "nesting", "undo", or "nearest previous/next something", your first instinct should be: **can I use a stack here?**

---

<a id="lesson-5"></a>
## Lesson 5 — Implementing a stack with an array

Here's the first big realization: **you don't need to build anything fancy**. A JavaScript array with `push` and `pop` already IS a stack.

```js
class Stack {
  constructor() {
    this.items = [];
  }

  push(x) {
    this.items.push(x);         // O(1) — add to end of array
  }

  pop() {
    return this.items.pop();    // O(1) — remove from end of array
  }

  peek() {
    return this.items[this.items.length - 1];   // O(1) — look at end
  }

  isEmpty() {
    return this.items.length === 0;   // O(1)
  }

  size() {
    return this.items.length;         // O(1)
  }
}
```

That's it. Five methods, each one-liner.

Notice what we're doing: the **back of the array** is the "top of the stack". Why the back and not the front?

Because `push` and `pop` at the back of an array are **O(1)** (no shifting required), while `unshift` and `shift` at the front are **O(n)**. (If you need a reminder of why, re-read Arrays/Lesson 8.)

### Let's use it

```js
const s = new Stack();

s.push(1);
s.push(2);
s.push(3);

console.log(s.peek());     // 3
console.log(s.pop());      // 3
console.log(s.pop());      // 2
console.log(s.isEmpty());  // false
console.log(s.pop());      // 1
console.log(s.isEmpty());  // true
console.log(s.pop());      // undefined  ← empty stack!
```

### Visualizing the array-backed stack

The array `[1, 2, 3]` represents a stack where `3` is on top:

```
Array representation:   [ 1,  2,  3 ]
                          ↑        ↑
                         bottom   top (most recently pushed)

Stack mental model:
  ┌─────┐
  │  3  │  ← top
  ├─────┤
  │  2  │
  ├─────┤
  │  1  │
  └─────┘
```

> ⚠️ **One common mistake**
> Some people implement a stack using `unshift` (add to front) and `shift` (remove from front). This also works logically, but it's O(n) for every push and pop — **terrible** performance. Always use the back of the array.

> 🎯 **Key takeaway**
> The simplest and most practical stack implementation: an array where `push` adds to the back and `pop` removes from the back. All operations are O(1).

---

<a id="lesson-6"></a>
## Lesson 6 — Implementing a stack with a linked list

If you've done the Linked Lists chapter, you know that a linked list is a chain of nodes — each node holds a value and a pointer to the next node.

Why would you implement a stack with a linked list instead of an array?

- In some languages (C, C++), you can't resize arrays dynamically. A linked list gives you truly elastic storage with no reallocation cost.
- In JavaScript, arrays already resize, so the practical difference is small. But the exercise is valuable — it cements how both data structures work.

The trick: treat the **head** of the linked list as the **top of the stack**. Then `push` means "prepend a new node at the head", and `pop` means "remove the head node".

```js
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class StackLL {
  constructor() {
    this.head = null;   // the "top" of the stack
    this._size = 0;
  }

  push(x) {
    const node = new ListNode(x);
    node.next = this.head;   // new node points to old top
    this.head = node;        // new node IS the new top
    this._size++;
  }

  pop() {
    if (this.isEmpty()) return undefined;
    const val = this.head.val;
    this.head = this.head.next;   // advance head to next node
    this._size--;
    return val;
  }

  peek() {
    return this.head ? this.head.val : undefined;
  }

  isEmpty() {
    return this.head === null;
  }

  size() {
    return this._size;
  }
}
```

### Visualizing a push

```
Before push(5):   head → [ 3 | → ] → [ 1 | null ]

push(5):
  new node: [ 5 | ? ]
  point new node's next at old head: [ 5 | → ] → [ 3 | → ] → [ 1 | null ]
  move head to new node

After push(5):    head → [ 5 | → ] → [ 3 | → ] → [ 1 | null ]
                             ↑
                          new top
```

### Visualizing a pop

```
Before pop():   head → [ 5 | → ] → [ 3 | → ] → [ 1 | null ]

pop():
  save head.val (5)
  move head to head.next

After pop():    head → [ 3 | → ] → [ 1 | null ]
returns 5
```

Both implementations (array and linked list) give you the same O(1) operations. In JavaScript interviews, the array version is almost always preferred for its simplicity. Use the linked-list version to prove you understand the underlying mechanics.

> 🎯 **Key takeaway**
> Linked-list stack: head = top. `push` prepends a new head. `pop` removes the head. Still O(1) for all four operations.

---

<a id="lesson-7"></a>
## Lesson 7 — The call stack — a stack you've been using all along

This is my favorite lesson in this whole chapter. I want you to realize: **the most important stack in your programs already exists, and JavaScript manages it for you automatically.** It's called the **call stack**.

Every time your code calls a function, JavaScript does three things:

1. **Pushes** the current context (function name, local variables, where to return to) onto the call stack.
2. **Runs** the new function.
3. When the function **returns**, **pops** that context off the call stack and resumes where it left off.

### Watching the call stack grow

```js
function greet(name) {
  return 'Hello, ' + shout(name);
}

function shout(name) {
  return name.toUpperCase() + '!';
}

greet('Aisha');
```

Step by step:

```
1. Call greet('Aisha')
   Call stack:
     ┌──────────────────┐
     │  greet('Aisha')  │  ← top
     └──────────────────┘

2. greet calls shout('Aisha')
   Call stack:
     ┌──────────────────┐
     │  shout('Aisha')  │  ← top
     ├──────────────────┤
     │  greet('Aisha')  │
     └──────────────────┘

3. shout returns 'AISHA!'
   Call stack:
     ┌──────────────────┐
     │  greet('Aisha')  │  ← top  (resumes here)
     └──────────────────┘

4. greet returns 'Hello, AISHA!'
   Call stack:
     [ ]  (empty — back to top-level code)
```

### Stack overflow — a literal stack error

You've probably heard "stack overflow" (it's even a famous website). Now you know exactly what it means.

If a function calls itself without ever stopping (infinite recursion), the call stack keeps growing forever:

```js
function countdown(n) {
  return countdown(n - 1);   // never stops!
}
countdown(100000);
// RangeError: Maximum call stack size exceeded
```

The JavaScript engine has a limit on how deep the call stack can grow. When you hit that limit: **stack overflow**. The program crashes.

This is why every recursive function needs a **base case** — a condition where it stops calling itself and just returns.

```js
function countdown(n) {
  if (n <= 0) return;     // ← base case: stop here
  console.log(n);
  countdown(n - 1);
}
```

### Recursion = implicit stack

Here's a profound insight: **recursion is just a stack in disguise**. Any recursive algorithm can be rewritten using an explicit stack. The recursive version uses the call stack automatically; the iterative version manages its own stack manually.

You'll sometimes see problems solved both ways in this chapter. The recursive version is often shorter. The iterative version is sometimes more efficient (no function-call overhead) and avoids stack overflow on very large inputs.

> 🔬 **Going deeper**
> Next time you get a `RangeError: Maximum call stack size exceeded`, you now know exactly what's happening: you've pushed too many frames onto the call stack without popping any. The fix is usually to add a proper base case, or to rewrite the recursion iteratively with an explicit stack.

> 🎯 **Key takeaway**
> The call stack is a real stack managed by JavaScript. Every function call pushes a frame; every return pops one. "Stack overflow" literally means the stack ran out of space. Recursion = using the call stack as your stack.

---

<a id="lesson-8"></a>
## Lesson 8 — Why "balanced parentheses" needs a stack

This is the **gateway problem** for stacks. Once you solve it, you'll start seeing its pattern everywhere.

**The problem:** Given a string of brackets like `"([{}])"`, determine if every opening bracket has a matching closing bracket in the right order.

Valid: `"()"`, `"()[]{}"`, `"([{}])"`
Invalid: `"(]"`, `"([)]"`, `"{"`, `"}}"`

### Why can't we just count?

You might think: count the opens, count the closes, if they're equal we're good. But that fails:

```
"([)]"
  opens:  ( [      → 2
  closes: ) ]      → 2   ← counts match!
  But is it balanced? NO — ( is closed by ), but [ is not closed by ] properly.
```

The issue is that brackets must be matched **in order, innermost first**. That's a nesting problem — and nesting is exactly what stacks are built for.

### The algorithm

Walk through the string character by character:

- If you see an **opening bracket** (`(`, `[`, `{`): **push** it onto the stack.
- If you see a **closing bracket** (`)`, `]`, `}`):
  - If the stack is empty → **invalid** (nothing to match against).
  - **Pop** the top of the stack. If the popped bracket doesn't match the current closing bracket → **invalid**.
- After processing all characters: if the stack is **empty**, it's valid. If anything is left → invalid.

### Tracing through `"([{}])"`

```
Char    Action              Stack (bottom → top)
────────────────────────────────────────────────
'('     push                [ '(' ]
'['     push                [ '(', '[' ]
'{'     push                [ '(', '[', '{' ]
'}'     pop '{', matches?   [ '(', '[' ]         ✅  '{' matches '}'
']'     pop '[', matches?   [ '(' ]              ✅  '[' matches ']'
')'     pop '(', matches?   [ ]                  ✅  '(' matches ')'
Done.   Stack empty?        yes  →  VALID ✅
```

### Tracing through `"([)]"` (invalid)

```
Char    Action              Stack (bottom → top)
────────────────────────────────────────────────
'('     push                [ '(' ]
'['     push                [ '(', '[' ]
')'     pop '[', matches?   —                    ❌  '[' does NOT match ')'
→ INVALID
```

### Code sketch

```js
function isBalanced(s) {
  const stack = [];
  const match = { ')': '(', ']': '[', '}': '{' };

  for (const ch of s) {
    if ('([{'.includes(ch)) {
      stack.push(ch);
    } else if (')]}'.includes(ch)) {
      if (stack.length === 0 || stack[stack.length - 1] !== match[ch]) {
        return false;
      }
      stack.pop();
    }
  }

  return stack.length === 0;
}
```

This pattern — **push opens, pop and match closes** — appears in dozens of problems: HTML tag matching, expression parsing, undo history, recursive descent parsers. Learn it well.

> ✋ **Pause and try**
> Trace through `"({[]})"` by hand. What's on the stack at each step? Is the result valid?
>
> <details>
> <summary>Show answer</summary>
>
> ```
> '(' → stack: ['(']
> '{' → stack: ['(', '{']
> '[' → stack: ['(', '{', '[']
> ']' → pop '[', matches ']' ✅  stack: ['(', '{']
> '}' → pop '{', matches '}' ✅  stack: ['(']
> ')' → pop '(', matches ')' ✅  stack: []
> Stack empty → VALID ✅
> ```
> </details>

> 🎯 **Key takeaway**
> Bracket matching uses a stack because brackets nest — the most recently opened one must close first. Push opens, pop and compare closes.

---

<a id="lesson-9"></a>
## Lesson 9 — The monotonic stack idea

This is where stacks get genuinely clever. Fair warning: it takes a little more mental effort than the previous lessons. Read it slowly.

### The question this solves

"For each element in an array, find the **next element that is greater** (or smaller) than it."

Example: given `[2, 1, 5, 3, 6]`, the next greater element for each is:
- `2` → `5` (the next value to the right that is larger)
- `1` → `5`
- `5` → `6`
- `3` → `6`
- `6` → `-1` (no greater element to the right)

Brute force: for each element, scan the rest of the array until you find something bigger. That's O(n²).

Stack approach: **O(n)**.

### The idea

We maintain a stack of elements we haven't found an answer for yet — elements waiting to find their "next greater". We process the array left to right.

**Key rule:** the stack is always in **decreasing order from bottom to top** (that's what "monotonic" means — values only go one direction). When a new element is large enough to "beat" the top of the stack, we pop those losers and record their answer.

Let's trace `[2, 1, 5, 3, 6]`:

```
Process 2:
  Stack is empty. Push 2.
  Stack: [2]

Process 1:
  1 ≤ top of stack (2). Just push. Stack: [2, 1]

Process 5:
  5 > top of stack (1). Pop 1 → answer for 1 is 5.
  5 > new top (2). Pop 2 → answer for 2 is 5.
  Stack is empty. Push 5.
  Stack: [5]

Process 3:
  3 ≤ top (5). Just push. Stack: [5, 3]

Process 6:
  6 > top (3). Pop 3 → answer for 3 is 6.
  6 > new top (5). Pop 5 → answer for 5 is 6.
  Stack is empty. Push 6.
  Stack: [6]

End of array. Anything still in stack has no next greater. Answer for 6 → -1.

Results: 2→5, 1→5, 5→6, 3→6, 6→-1  ✅
```

### Why is this O(n)?

Every element is pushed **once** and popped **at most once**. Total operations: O(2n) = O(n). Even though there are nested-looking steps (popping multiple elements), each element only participates in one pop across the entire run.

### The pattern

```
result = new Array(n).fill(-1);
stack = [];

for each index i from 0 to n-1:
  while stack is not empty AND arr[stack[top]] < arr[i]:
    idx = stack.pop()
    result[idx] = arr[i]    // arr[i] is the "next greater" for arr[idx]
  stack.push(i)
```

Note: we push **indexes** (not values) so we can fill in `result[idx]` when we find the answer.

### Variants you'll encounter

| Problem | Monotonic stack direction |
|---------|--------------------------|
| Next Greater Element | Decreasing stack (pop when current > top) |
| Next Smaller Element | Increasing stack (pop when current < top) |
| Previous Greater Element | Decreasing stack, process the same way but store left-side answers |
| Largest Rectangle in Histogram | Increasing stack, pops signal a rectangle closing |

> 💡 **Tip — the mnemonic**
> "The stack holds the **losers** — elements still waiting for something to beat them. When a big enough winner arrives, the losers get resolved."

> 🎯 **Key takeaway**
> A monotonic stack processes an array in O(n) to answer "next/previous greater/smaller" questions. Elements are pushed once and popped once. The stack stays monotone (always increasing or always decreasing).

---

<a id="lesson-10"></a>
## Lesson 10 — Expression evaluation — postfix (RPN) calculator

You've been writing expressions like `3 + 4 * 2` your whole life. That's called **infix** notation — the operator sits between the operands.

There's another notation called **postfix** (or **Reverse Polish Notation, RPN**) where the operator comes **after** the operands:

```
Infix:   3 + 4 * 2
Postfix: 3 4 2 * +
```

Postfix looks weird at first, but it has a huge advantage: **it doesn't need parentheses**, and evaluating it with a stack is trivially simple.

### Why does postfix not need parentheses?

Compare:
- `(3 + 4) * 2` in postfix: `3 4 + 2 *`
- `3 + (4 * 2)` in postfix: `3 4 2 * +`

The order of operations is encoded directly in the token order — no ambiguity.

### The evaluation algorithm

Walk through the tokens left to right:

- If the token is a **number**: **push** it onto the stack.
- If the token is an **operator** (`+`, `-`, `*`, `/`): **pop two numbers** from the stack, apply the operator, **push the result**.

At the end, the single value left on the stack is the answer.

### Tracing `3 4 2 * +`

This represents `3 + (4 * 2)` = 11.

```
Token   Action               Stack
─────────────────────────────────────────
3       push 3               [ 3 ]
4       push 4               [ 3, 4 ]
2       push 2               [ 3, 4, 2 ]
*       pop 2 and 4          [ 3 ]
        push 4*2 = 8         [ 3, 8 ]
+       pop 8 and 3          [ ]
        push 3+8 = 11        [ 11 ]
Done.   result = 11  ✅
```

### Tracing `3 4 + 2 *`

This represents `(3 + 4) * 2` = 14.

```
Token   Action               Stack
─────────────────────────────────────────
3       push 3               [ 3 ]
4       push 4               [ 3, 4 ]
+       pop 4 and 3          [ ]
        push 3+4 = 7         [ 7 ]
2       push 2               [ 7, 2 ]
*       pop 2 and 7          [ ]
        push 7*2 = 14        [ 14 ]
Done.   result = 14  ✅
```

### Code sketch

```js
function evalRPN(tokens) {
  const stack = [];

  for (const token of tokens) {
    if (['+', '-', '*', '/'].includes(token)) {
      const b = stack.pop();   // second operand
      const a = stack.pop();   // first operand
      if (token === '+') stack.push(a + b);
      else if (token === '-') stack.push(a - b);
      else if (token === '*') stack.push(a * b);
      else stack.push(Math.trunc(a / b));  // integer division
    } else {
      stack.push(Number(token));
    }
  }

  return stack.pop();
}
```

Notice the order: `b` is popped first (it was pushed last), then `a`. For addition and multiplication this doesn't matter, but for subtraction (`a - b`) and division (`a / b`) it does.

> 🎯 **Key takeaway**
> Postfix evaluation is a stack's natural home: numbers go on, operators pull off two numbers, compute, push result. One pass, O(n) time, O(n) space.

---

<a id="lesson-11"></a>
## Lesson 11 — Infix to postfix conversion

Now the other direction: given `3 + 4 * 2`, how do we produce `3 4 2 * +` automatically?

This is called the **shunting-yard algorithm**, invented by Edsger Dijkstra. It uses a stack to handle operator precedence and parentheses.

### Operator precedence reminder

- `*` and `/` have higher precedence than `+` and `-`
- `(` and `)` override precedence

### The algorithm

We maintain:
- An **output list** (builds the postfix expression)
- An **operator stack** (holds operators waiting to be placed)

For each token:

| Token type | Action |
|---|---|
| Number | Append directly to output |
| `(` | Push to operator stack |
| `)` | Pop operators to output until you hit `(`, then discard the `(` |
| Operator (`+`, `-`, `*`, `/`) | While the stack's top operator has **equal or higher precedence** (and is not `(`), pop it to output. Then push the current operator. |

After all tokens: pop remaining operators from stack to output.

### Tracing `3 + 4 * 2`

```
Token   Output           Op Stack       Notes
─────────────────────────────────────────────────────
3       [3]              []             number → output
+       [3]              [+]            + pushed
4       [3, 4]           [+]            number → output
*       [3, 4]           [+, *]         * has higher precedence than +, push it
2       [3, 4, 2]        [+, *]         number → output
End     [3, 4, 2, *, +]  []             drain stack to output
```

Result: `3 4 2 * +` ✅

### Tracing `(3 + 4) * 2`

```
Token   Output           Op Stack       Notes
───────────────────────────────────────────────────────
(       []               [(]            push (
3       [3]              [(]            number → output
+       [3]              [(, +]         push +
4       [3, 4]           [(, +]         number → output
)       [3, 4, +]        []             pop to output until (, discard (
*       [3, 4, +]        [*]            push *
2       [3, 4, +, 2]     [*]            number → output
End     [3, 4, +, 2, *]  []             drain
```

Result: `3 4 + 2 *` ✅

This is the algorithm that every calculator app, compiler, and spreadsheet uses internally when it evaluates your expressions.

> 💡 **Tip**
> You don't need to memorize the algorithm name "shunting-yard" for interviews. But you need to understand the mechanics: numbers go straight to output; operators get sorted onto a stack based on precedence; parentheses flush the stack.

> 🎯 **Key takeaway**
> Infix → postfix conversion uses a stack to buffer operators until their operands have been emitted. Precedence and parentheses are handled by the stack's ordering rules.

---

<a id="lesson-12"></a>
## Lesson 12 — Quick reference & complexity table

Here's everything in one place. Come back to this when you're solving problems.

### Complexity

| Operation | Array-backed stack | Linked-list-backed stack |
|-----------|--------------------|--------------------------|
| `push(x)` | O(1) amortized | O(1) |
| `pop()` | O(1) amortized | O(1) |
| `peek()` | O(1) | O(1) |
| `isEmpty()` | O(1) | O(1) |
| `size()` | O(1) | O(1) |
| Space | O(n) | O(n) |

*"Amortized O(1)"* for array push: occasionally the backing array needs to resize (doubling in size), but averaged across all operations, each push costs O(1). You'll never pay more than O(n) total for n pushes.

### When to reach for a stack

| If the problem involves… | Think stack |
|---|---|
| Matching / balancing brackets or tags | ✅ push opens, pop closes |
| Undo / redo / back button | ✅ LIFO history |
| "Next/previous greater/smaller element" | ✅ monotonic stack |
| Evaluating expressions | ✅ postfix calculator or shunting-yard |
| Parsing nested structures (JSON, XML, math) | ✅ push on open, pop on close |
| DFS (depth-first search) iteratively | ✅ explicit stack instead of recursion |
| Function call tracing (the call stack) | ✅ already a stack |

### Stack vs Queue — the quick test

Ask: "does the most recently added item come out first, or the oldest?"

- Most recent first → **Stack** (LIFO)
- Oldest first → **Queue** (FIFO)

### Common JavaScript idioms for quick stacks

You don't always need to wrap a class. For interview problems, a bare array works:

```js
const stack = [];

// push
stack.push(x);

// pop
const top = stack.pop();

// peek
const top = stack[stack.length - 1];

// isEmpty
if (stack.length === 0) { … }

// size
stack.length
```

### Templates you'll use again and again

**Bracket matching:**
```js
const stack = [];
const pairs = { ')': '(', ']': '[', '}': '{' };
for (const ch of s) {
  if ('([{'.includes(ch)) stack.push(ch);
  else if (')]}'.includes(ch)) {
    if (!stack.length || stack[stack.length - 1] !== pairs[ch]) return false;
    stack.pop();
  }
}
return stack.length === 0;
```

**Monotonic stack (next greater element):**
```js
const result = new Array(n).fill(-1);
const stack = [];   // stores indexes
for (let i = 0; i < n; i++) {
  while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
    result[stack.pop()] = arr[i];
  }
  stack.push(i);
}
```

**Postfix evaluation:**
```js
const stack = [];
for (const token of tokens) {
  if (!isNaN(token)) {
    stack.push(Number(token));
  } else {
    const b = stack.pop(), a = stack.pop();
    if (token === '+') stack.push(a + b);
    else if (token === '-') stack.push(a - b);
    else if (token === '*') stack.push(a * b);
    else stack.push(Math.trunc(a / b));
  }
}
return stack.pop();
```

---

<a id="lesson-13"></a>
## Lesson 13 — You did it. Now what?

Take a breath. If you've read through to here, you now:

1. **Know what a stack is** and why LIFO is the defining constraint.
2. **Can implement a stack** two ways: with an array and with a linked list.
3. **Recognize the call stack** — the stack that's been running your programs all along.
4. **Understand bracket matching** — the gateway stack pattern.
5. **Have a first mental model of monotonic stacks** — for "next/previous greater/smaller" questions.
6. **Can evaluate postfix expressions** and convert from infix.

That's enough to tackle every problem in this chapter.

### What to do next

1. Open [`questions/00-implement-stack.md`](./questions/00-implement-stack.md).
2. Implement both versions (array and linked list) from scratch — no peeking.
3. Move through Easy problems 01–07. They're practice runs; don't skip them.
4. Medium problems 08–23 introduce new patterns. Slow down when you hit one you haven't seen.
5. Hard problems 24–30 combine patterns. If you've done the mediums, you have the tools.

### Pacing

- **Don't rush.** Stacks are deceptively simple. The tricky part is recognizing *when* to use one.
- **The easy problems build muscle memory.** Do them even if they feel trivial.
- **When you're stuck**, re-read the relevant lesson. Most stack problems reduce to one of the four patterns: bracket matching, monotonic stack, expression evaluation, or "simulate the call stack".

You're doing great. See you in [Q0](./questions/00-implement-stack.md). 💪
