# Backtracking — Lessons from Zero

> 👋 Hey. If recursion still feels a little magical and scary, you're in the right place. Backtracking is just recursion with one extra rule: **when you reach a dead end, you undo your last step and try something else.** That's it. We're going to build that idea from the ground up, slowly.
>
> Total reading time at a relaxed pace: about 90 minutes with breaks. **You do not have to read it all in one sitting.**

---

## Table of Lessons

1. [The core idea: try, recurse, undo](#lesson-1)
2. [How this differs from ordinary recursion (pruning)](#lesson-2)
3. [The canonical backtracking template](#lesson-3)
4. [Visualizing the decision tree](#lesson-4)
5. [Walkthrough: Subsets step by step](#lesson-5)
6. [Walkthrough: Permutations step by step](#lesson-6)
7. [Why `[...state]` matters — the cloning rule](#lesson-7)
8. [Why undoing matters — the mutation rule](#lesson-8)
9. [Walkthrough: N-Queens with pruning](#lesson-9)
10. [Estimating backtracking complexity](#lesson-10)
11. [Common pruning techniques](#lesson-11)
12. [When to memoize: turning BT into DP](#lesson-12)
13. [Common mistakes beginners make](#lesson-13)
14. [Quick reference and templates](#lesson-14)
15. [You did it — what to do next](#lesson-15)

---

<a id="lesson-1"></a>
## Lesson 1 — The core idea: try, recurse, undo

Imagine you're navigating a maze. You start at the entrance and you want to reach the exit.

At every fork, you pick a direction and walk down it. If you hit a dead end — a wall, a room with no exits — you **turn around and go back to the last fork**. Then you try the other direction.

```
Start
  │
  ├── Left ──► Dead end 🚫
  │
  ├── Right ──► Fork
  │              │
  │              ├── North ──► Dead end 🚫
  │              │
  │              └── South ──► EXIT ✅
```

That's backtracking in a sentence: **try a path; if it fails, go back and try the next one.**

### Another analogy: a combination lock

Imagine you're trying to crack a 3-digit combination lock (digits 0–9). You don't know the code.

1. You try `0-0-0`. Wrong.
2. You try `0-0-1`. Wrong.
3. You keep going until `6-2-4` — the lock opens!

But notice: you don't just randomly guess. You work **systematically**: fix the first digit, try all second digits for it, and for each second digit, try all third digits. When you finish all options for the current first digit, you **advance to the next first digit**.

The key rhythm is: **choose → explore → unchoose.**

```
First digit = 6
  ├── Second digit = 0 → Third: 0,1,2,...9 (all wrong)
  ├── Second digit = 1 → Third: 0,1,2,...9 (all wrong)
  ├── Second digit = 2 → Third: 0,1,2,...3  → 4 ✅ Found it!
```

Every time you set a digit and it doesn't pan out, you **put that digit back to zero** (conceptually reset it) and try the next. That "resetting" step is the backtrack.

> 🎯 **Key takeaway**
> Backtracking = try a choice, recurse deeper to explore what follows, then undo the choice so you can try the next one. It's systematic, exhaustive search that undoes its steps.

---

<a id="lesson-2"></a>
## Lesson 2 — How this differs from ordinary recursion (pruning)

Plain recursion — like computing Fibonacci or summing an array — just dives straight to a single answer. It doesn't make choices, it doesn't undo anything.

Backtracking is for problems where:
- There are **multiple choices** at each step.
- You want to find one or all valid **combinations** of those choices.
- Some partial choices are **invalid early** — you can stop exploring them before going deeper.

That last point is the big one. It's called **pruning**.

### The tree of all possibilities

When you make choices recursively, you implicitly build a **decision tree**. Every node represents a state. Every edge is a choice. Leaves are either valid solutions or dead ends.

**Brute force** visits every leaf of the tree. **Backtracking with pruning** cuts off branches the moment it knows nothing good can come from them.

### A concrete example: can we form sum 9 from [2, 3, 7]?

**Without pruning:** explore all subsets — {} {2} {3} {7} {2,3} {2,7} {3,7} {2,3,7} — and check their sums.

**With pruning:** the target is 9. If our current partial sum already exceeds 9, there's no point adding more numbers (assuming all are positive). We can **prune** the entire subtree under this node.

```
target = 9, candidates sorted = [2, 3, 7]

[] sum=0
├── [2] sum=2
│    ├── [2,3] sum=5
│    │    ├── [2,3,7] sum=12 ✂ prune (>9)
│    ├── [2,7] sum=9 ✅
├── [3] sum=3
│    ├── [3,7] sum=10 ✂ prune (>9)
└── [7] sum=7
     └── [7,?] nothing left ✂
```

We explored far fewer nodes. With large inputs, pruning can be the difference between a solution that finishes in milliseconds and one that runs for hours.

> 🎯 **Key takeaway**
> Backtracking = brute-force recursion + pruning. Pruning cuts branches of the decision tree early, turning an otherwise impossibly slow search into something practical. It's the most important optimization in backtracking.

---

<a id="lesson-3"></a>
## Lesson 3 — The canonical backtracking template

Every backtracking problem, no matter how different it looks on the surface, maps onto this same skeleton. Learn this pattern and you've learned 80% of backtracking.

```js
function backtrack(state, choices, result) {
  // Base case: we've reached a valid complete solution
  if (isGoal(state)) {
    result.push([...state]);   // ← clone before pushing! (more on this in Lesson 7)
    return;
  }

  for (const choice of choices) {
    // Pruning: skip invalid or redundant choices
    if (!isValid(state, choice)) continue;

    // 1. CHOOSE — add this choice to our current state
    state.push(choice);

    // 2. EXPLORE — recurse deeper with the updated state
    backtrack(state, nextChoices(choices, choice), result);

    // 3. UNCHOOSE — remove the choice so we can try the next one
    state.pop();
  }
}
```

The three steps — **choose, explore, unchoose** — are the heartbeat of every backtracking solution.

Let's name the pieces:

| Piece | What it does |
|---|---|
| `state` | The partial solution being built. Often an array. |
| `choices` | What you're allowed to add next. Shrinks as you descend. |
| `result` | Collects finished solutions. Passed by reference. |
| `isGoal` | Detects when `state` is a complete, valid solution. |
| `isValid` | Pruning check. "Is this choice worth exploring?" |
| `nextChoices` | What choices remain available after making this choice. |

> 💡 **Tip:** you don't always need a separate `nextChoices` function. Often you just pass a `start` index, or a `used` set, or shrink the choices array. The template adapts.

### The three-line rhythm

The most important thing to internalize is the **choose / explore / unchoose** rhythm. Every time you write a backtracking function, you should be able to point to exactly those three lines. If "unchoose" is missing, you have a bug.

```js
state.push(choice);        // choose
backtrack(/* ... */);      // explore
state.pop();               // unchoose  ← the backtracking step
```

> 🎯 **Key takeaway**
> Memorize the three-step rhythm: choose → explore → unchoose. "Unchoose" is the backtrack. Without it, your state gets corrupted and you'll get wrong answers in mysterious ways.

---

<a id="lesson-4"></a>
## Lesson 4 — Visualizing the decision tree

When you're stuck on a backtracking problem, **draw the tree**. It takes two minutes and almost always unlocks the solution.

Here's how to read a decision tree:

- **Root node** = the empty state (no choices made yet).
- **Each level** = one more choice made.
- **Each edge** = the specific choice taken.
- **Leaf nodes** = states where no more choices can be made (either a solution or a dead end).

### Example: subsets of [1, 2, 3]

```
                     [ ]
                    / | \
                  /   |   \
               [1]   [2]   [3]
              /  \     \
           [1,2] [1,3] [2,3]
            /
         [1,2,3]
```

Every node in this tree is a valid subset. There are 2³ = 8 subsets (including empty), and they all appear as nodes.

### The "include / exclude" version

Another way to draw the same tree, making choices explicit:

```
                     [ ]
                   /       \
           include 1      exclude 1
              [1]               [ ]
            /     \           /     \
      incl 2    excl 2    incl 2   excl 2
       [1,2]    [1]        [2]      []
       /   \    / \        / \      / \
    +3  -3  +3 -3 +3 -3   +3 -3  +3 -3
  [1,2,3][1,2][1,3][1][2,3][2][3]  []
```

When you visualize it this way, you immediately see the branching factor (2 — include or exclude), and the depth (3 — one level per element).

**Total nodes ≈ 2^depth.** For depth = 20, that's about a million. For depth = 40, that's a trillion — too slow. Pruning is how you cut this down.

> ✋ **Pause and try**
> Draw the decision tree for permutations of [A, B, C]. How many leaves are there? What's the branching factor at each level?
>
> <details>
> <summary>Show answer</summary>
>
> ```
> Level 0:      [ ]
> Level 1:    [A]  [B]  [C]          ← 3 choices
> Level 2:  [AB][AC] [BA][BC] [CA][CB]  ← 2 remaining choices each
> Level 3:  [ABC][ACB][BAC][BCA][CAB][CBA]  ← 1 remaining choice each
> ```
> 6 leaves. 3! = 6 permutations. Branching factor: 3, then 2, then 1 (factorial).
> </details>

> 🎯 **Key takeaway**
> Before writing code, sketch the decision tree: what does each level represent? What are the choices at each level? What is a valid leaf? This alone solves most backtracking design problems.

---

<a id="lesson-5"></a>
## Lesson 5 — Walkthrough: Subsets step by step

**Problem:** given `nums = [1, 2, 3]`, return every possible subset (the power set). Include the empty subset.

Expected output (order doesn't matter):
```
[[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]
```

### The design

At every point in our recursion, we decide: "do we include `nums[start]` or not?"

- `state` = the subset we're building so far.
- `start` = the index we're currently considering including.
- Every time we enter the function, `state` is a valid subset — add it to results.

### The code

```js
function subsets(nums) {
  const result = [];

  function backtrack(start, current) {
    result.push([...current]);   // every state is a valid subset

    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);          // choose
      backtrack(i + 1, current);      // explore (only elements after i)
      current.pop();                  // unchoose
    }
  }

  backtrack(0, []);
  return result;
}
```

### Tracing through it

Let's trace `subsets([1, 2, 3])` step by step.

```
backtrack(0, [])
  → push [] to result         result = [[]]
  i=0: current=[1]
    backtrack(1, [1])
      → push [1] to result    result = [[], [1]]
      i=1: current=[1,2]
        backtrack(2, [1,2])
          → push [1,2]        result = [[], [1], [1,2]]
          i=2: current=[1,2,3]
            backtrack(3, [1,2,3])
              → push [1,2,3]  result = [[], [1], [1,2], [1,2,3]]
              (loop: i=3, but 3 >= nums.length, so no iterations)
            current=[1,2]  (popped 3)
      i=2: current=[1,3]
        backtrack(3, [1,3])
          → push [1,3]        result = [..., [1,3]]
        current=[1]  (popped 3)
      current=[1]  (... but wait)
    current=[]  (popped 1)
  i=1: current=[2]
    backtrack(2, [2])
      → push [2]
      i=2: current=[2,3]
        backtrack(3, [2,3]) → push [2,3]
        current=[2]
      current=[]
    current=[]  (popped 2)
  i=2: current=[3]
    backtrack(3, [3]) → push [3]
    current=[]  (popped 3)
```

Final result: `[[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]`

Eight subsets. Exactly right.

> ⚠️ **Notice:** we use `i + 1` as the new `start` when we recurse — not `start + 1`. This is because we want elements **after `nums[i]`**, not elements after `start`. If you mistakenly write `start + 1`, the loop variable `i` and the recursion variable `start` will diverge and you'll get wrong results.

> 🎯 **Key takeaway**
> For subset generation, add every state to results (not just at the base case), and recurse with `start = i + 1` to only look at elements ahead of the one you just chose.

---

<a id="lesson-6"></a>
## Lesson 6 — Walkthrough: Permutations step by step

**Problem:** given `nums = [1, 2, 3]`, return all permutations. Every element must appear exactly once in each permutation.

Expected output:
```
[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

### The difference from Subsets

In Subsets, we only looked forward (using `start`). In Permutations, order matters — `[1,2,3]` and `[2,1,3]` are different — so we need to be able to pick **any unused element** at each position.

We track which elements are already in our current permutation with a `used` boolean array (or a `Set`).

### The code

```js
function permute(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  function backtrack(current) {
    if (current.length === nums.length) {
      result.push([...current]);   // full permutation — record it
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;   // pruning: already in current path

      used[i] = true;           // choose
      current.push(nums[i]);
      backtrack(current);       // explore
      current.pop();            // unchoose
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}
```

### Tracing through it (abbreviated)

```
backtrack([])
  i=0: used[0]=true, current=[1]
    backtrack([1])
      i=0: skip (used)
      i=1: used[1]=true, current=[1,2]
        backtrack([1,2])
          i=0: skip, i=1: skip
          i=2: used[2]=true, current=[1,2,3]
            backtrack([1,2,3])
              length==3 → push [1,2,3] ✅
            current=[1,2], used[2]=false
        current=[1], used[1]=false
      i=2: used[2]=true, current=[1,3]
        backtrack([1,3])
          i=2: skip
          i=1: used[1]=true, current=[1,3,2]
            backtrack([1,3,2]) → push [1,3,2] ✅
          ...
        current=[1], used[2]=false
    current=[], used[0]=false
  i=1: ... (gives [2,1,3] and [2,3,1])
  i=2: ... (gives [3,1,2] and [3,2,1])
```

### The `used` array trick

Notice the symmetric pair:

```js
used[i] = true;   // mark before recursing
// ... recurse ...
used[i] = false;  // unmark after recursing
```

This is the choose / unchoose applied to a side-data-structure. You're "using" `used[i]` the same way you "use" `current.push()` and `current.pop()`. You always have to undo both.

> 💡 **Tip:** for permutations, another clean approach is to **swap** elements instead of using a `used` array. Swap `nums[i]` with `nums[start]`, recurse, then swap back. The `nums` array itself becomes the state.

> 🎯 **Key takeaway**
> For permutations, you need to mark-and-unmark used elements. Whether you use a `used[]` boolean array or a `Set`, always undo the marking on the way back up.

---

<a id="lesson-7"></a>
## Lesson 7 — Why `[...state]` matters — the cloning rule

This is one of the most common bugs for beginners. Let's feel the pain first, then fix it.

### What goes wrong without cloning

```js
function subsets(nums) {
  const result = [];

  function backtrack(start, current) {
    result.push(current);   // ← NO CLONE. Bug!
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return result;
}

console.log(subsets([1, 2, 3]));
```

You might expect `[[], [1], [1,2], ...]`. What you actually get is something like:
```
[[], [], [], [], [], [], [], []]
```
Eight empty arrays! Or sometimes all the same array with the same contents.

**Why?** Because `result.push(current)` pushes **a reference** to the `current` array, not a copy of it. Every entry in `result` points to the same `current` object. By the time the function finishes, `current` has been pushed and popped so many times that it ends up empty — and every entry in `result` reflects that final empty state.

### The fix: always clone when pushing

```js
result.push([...current]);   // ← spread creates a new array with the same values
```

Or equivalently:
```js
result.push(current.slice());
```

### The rule

> ⚠️ **Whenever you push a mutable state (array, object) into your results array, you MUST clone it first.**

This applies every time. Arrays in JavaScript are passed and stored by reference. If you store the reference and then mutate the array (via push/pop), the stored reference also changes.

### Visualizing the bug

```
Step 1: current = [1, 2]
result = [ <ref to current> ]

Step 2: current.pop() → current = [1]
result = [ <ref to current> ]  ← same reference, now points to [1]

Step 3: current.pop() → current = []
result = [ <ref to current> ]  ← still same reference, now points to []
```

Versus with cloning:
```
Step 1: current = [1, 2]
result = [ [1, 2] ]  ← independent copy, frozen at this moment

Step 2: current.pop() → current = [1]
result = [ [1, 2] ]  ← unaffected ✅
```

> 🎯 **Key takeaway**
> `result.push(current)` stores a reference. `result.push([...current])` stores a snapshot. Always use the snapshot form when collecting backtracking results.

---

<a id="lesson-8"></a>
## Lesson 8 — Why undoing matters — the mutation rule

We already saw *that* you must undo your state changes after recursing. Now let's really understand *why*, so you never forget.

### The shared state problem

In backtracking, `state` (or `current`) is a **single mutable object** that travels down and back up the call stack. It is **shared across all branches** of the recursion tree.

If you don't undo your mutations, the state you leave behind poisons the next branch.

### A debugging scenario

You're solving Permutations with `current` as your state array.

```
You're at: current = [1, 2]
           About to recurse to add 3 → current = [1, 2, 3]
           Push result: [1, 2, 3] ✅

After returning from recursion (but WITHOUT pop):
           current = [1, 2, 3]  ← should be [1, 2]!

Next iteration tries to add 3 to [1, 2, 3] → gets [1, 2, 3, 3]!
```

Without the `pop()`, every subsequent step in the loop starts from the wrong base, and you get nonsense results like `[1, 2, 3, 3]` or arrays that keep growing and never reset.

### The fix: symmetric undo

The code around your recursive call should be **symmetric**: whatever you do before the call, you undo after.

```js
current.push(nums[i]);    // ┐ do
backtrack(/* ... */);     // │ recurse
current.pop();            // ┘ undo — symmetric!
```

```js
used[i] = true;           // ┐ do
backtrack(/* ... */);     // │ recurse
used[i] = false;          // ┘ undo — symmetric!
```

```js
grid[row][col] = '#';     // ┐ do
backtrack(/* ... */);     // │ recurse
grid[row][col] = '.';     // ┘ undo — symmetric!
```

Every mutation has a matching undo. If you see an asymmetric pair, that's your bug.

> 💡 **Tip:** treat each backtracking function like a **responsible houseguest**. When you leave, put everything back exactly where you found it. The next branch of recursion needs to find the room in the same state you entered it.

> 🎯 **Key takeaway**
> State in backtracking is shared across all recursion branches. Always undo every mutation after recursing — and always in the reverse order you applied them.

---

<a id="lesson-9"></a>
## Lesson 9 — Walkthrough: N-Queens with pruning

N-Queens is the classic demonstration of backtracking with powerful pruning. Let's walk through it.

**Problem:** place N queens on an N×N chessboard so that no two queens attack each other. Queens attack along rows, columns, and diagonals.

### Design

- We place queens **row by row** (one per row, so no two queens share a row — that's free).
- At each row, we try every column and check if it's safe.
- A column is safe if no previously placed queen is in the same column, the same main diagonal, or the same anti-diagonal.

```
For an N=4 board:
Row 0: try col 0,1,2,3
  Col 0: place queen, move to row 1
    Row 1: try col 0 (col clash ✂), col 1 (diagonal clash ✂), col 2 (safe!), ...
      Col 2: place, move to row 2
        Row 2: all columns clash → backtrack
      Col 3: place, move to row 2
        ...
```

### The pruning conditions

```
Two queens clash if they share:
  same column: col_i === col_j
  same main diagonal: col_i - row_i === col_j - row_j
  same anti-diagonal: col_i + row_i === col_j + row_j
```

We track these with three sets.

### The code

```js
function solveNQueens(n) {
  const result = [];
  const cols = new Set();
  const diag1 = new Set();   // (row - col) for main diagonal
  const diag2 = new Set();   // (row + col) for anti-diagonal
  const board = Array.from({ length: n }, () => Array(n).fill('.'));

  function backtrack(row) {
    if (row === n) {
      result.push(board.map(r => r.join('')));  // clone the board state
      return;
    }

    for (let col = 0; col < n; col++) {
      if (cols.has(col)) continue;
      if (diag1.has(row - col)) continue;
      if (diag2.has(row + col)) continue;

      // choose
      board[row][col] = 'Q';
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);

      // explore
      backtrack(row + 1);

      // unchoose
      board[row][col] = '.';
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  backtrack(0);
  return result;
}
```

### Why this is much faster than brute force

Brute force would try all n^n queen placements. For n=8, that's 8^8 = 16 million.

With our column/diagonal pruning, we eliminate entire subtrees instantly. The actual number of nodes explored for n=8 is only about 2,000 — a reduction of 99.99%.

### The four-sided undo

Notice we have four things to undo after recursing:
```js
board[row][col] = '.';   // undo board change
cols.delete(col);         // undo cols change
diag1.delete(row - col); // undo diag1 change
diag2.delete(row + col); // undo diag2 change
```

Every `add` and assignment on the way in has a matching `delete` and reset on the way out. Symmetric, as always.

> 🔬 **Going deeper (optional)**
> For N-Queens, we can store queen positions as a single array `queens[row] = col` instead of a full 2D board, which uses O(n) space instead of O(n²). The result is the same, but reconstructing the board for output requires one extra pass. The solutions file shows this alternate approach.

> 🎯 **Key takeaway**
> N-Queens is the poster child for pruning: checking three simple conditions (column, two diagonals) eliminates 99%+ of the search space. Always look for what makes a partial state invalid and prune it early.

---

<a id="lesson-10"></a>
## Lesson 10 — Estimating backtracking complexity

Backtracking is almost always **exponential or factorial** in the worst case. But "worst case" varies a lot. Here's how to estimate it.

### The general formula

```
Total nodes ≈ (branching factor) ^ (depth of tree)
```

At each level of the recursion, you make a choice. If there are `b` choices at each level and the tree has `d` levels, you visit at most `b^d` nodes.

### Common shapes

| Problem | Branching | Depth | Total |
|---------|-----------|-------|-------|
| Subsets of n items | 2 (include/exclude) | n | 2^n |
| Permutations of n items | n, n-1, n-2, ... | n | n! |
| Combinations C(n,k) | ≤ n | k | C(n,k) = n! / (k! × (n-k)!) |
| N-Queens (no pruning) | n (columns) | n | n^n |
| N-Queens (with pruning) | much less | n | roughly n! / pruning factor |

### A mental benchmark

```
n = 20 → 2^20 ≈ 1 million         (Subsets: fine)
n = 20 → 20!  ≈ 2.4 quintillion   (Permutations: way too slow)
n = 12 → 12! ≈ 479 million        (might be ok with fast operations)
n = 8  → 8!  = 40,320             (fine)
```

If your backtracking is generating permutations of n > ~12, you need memoization or a completely different approach.

> 💡 **Tip:** when a problem has n ≤ 20 or n ≤ 25, exponential solutions often work (2^20 ≈ 10^6). When n > 25, look for DP or a smarter approach. When n ≤ 10, factorial solutions often work.

> 🎯 **Key takeaway**
> Estimate complexity as (branching factor)^depth. Subsets → 2^n. Permutations → n!. Combinations → C(n,k). Exponential and factorial grow fast — always check whether n is small enough.

---

<a id="lesson-11"></a>
## Lesson 11 — Common pruning techniques

Pruning is what separates "runs in 10ms" from "runs in 10 hours". Here are the most common pruning strategies you'll use.

### Technique 1: Check validity before recursing

Don't recurse if the current choice is already invalid. Check first, recurse only if safe.

```js
for (let i = start; i < nums.length; i++) {
  if (currentSum + nums[i] > target) break;  // ← prune BEFORE pushing
  current.push(nums[i]);
  backtrack(i + 1, current, currentSum + nums[i]);
  current.pop();
}
```

> ⚠️ **This only works if `nums` is sorted.** Once `nums[i]` already exceeds the remaining budget, all elements after it (being larger) will too — so we can `break` the loop entirely.

### Technique 2: Skip duplicates at the same level

This prevents generating duplicate subsets/combinations when the input has repeated elements.

```js
nums.sort();   // sort first!

for (let i = start; i < nums.length; i++) {
  if (i > start && nums[i] === nums[i - 1]) continue;  // skip dup at same depth
  // ...
}
```

The condition `i > start` is crucial — it says "only skip if we're NOT the first choice at this level". Without it, you'd accidentally skip the element everywhere, including valid uses.

### Technique 3: Early termination with goal check

In some problems, you can determine early that the goal is already achieved or already impossible.

```js
if (currentLength === targetLength) {
  result.push([...current]);
  return;   // ← don't keep recursing, we're done with this branch
}
if (remaining < 0) return;   // ← impossible, stop
```

### Technique 4: Bounds check for grids

When backtracking on a 2D grid, always check boundaries and visited status before moving:

```js
function dfs(row, col) {
  if (row < 0 || row >= m || col < 0 || col >= n) return;
  if (visited[row][col]) return;
  if (grid[row][col] !== target) return;
  // ... proceed
}
```

All three of those guard conditions are pruning. They cut off exploration before it begins.

### Technique 5: Use sets for O(1) validity checks

Instead of scanning an array to check "have I used this?", use a `Set` or bitset for O(1) lookup.

```js
const usedCols = new Set();
// check: usedCols.has(col)  → O(1)
// mark:  usedCols.add(col)
// unmark: usedCols.delete(col)
```

> 🎯 **Key takeaway**
> The five main pruning techniques: (1) check validity before recursing, (2) skip duplicates at the same level with sorted input, (3) terminate early on impossible/complete states, (4) bounds-check grids upfront, (5) use sets for O(1) checks.

---

<a id="lesson-12"></a>
## Lesson 12 — When to memoize: turning BT into DP

Some backtracking problems have **overlapping subproblems**: you end up solving the same sub-state multiple times from different starting points.

When that happens, you can add **memoization** — cache the result the first time you solve each sub-state, and just look it up if you see it again.

### When do subproblems overlap in backtracking?

The key signal: if the recursion's "state" can be reached via **multiple different paths**, the subproblems overlap.

Subsets and Permutations have no overlapping subproblems — each path through the tree is unique. But problems like **Word Break** do:

```
s = "catsanddog", wordDict = ["cats", "cat", "sand", "and", "dog"]

Starting from index 0:
  Path 1: "cat" → index 3 → "s..." (stuck)
  Path 2: "cats" → index 4 → "and" → index 7 → "dog" ✅

Starting from index 4 can be reached from multiple earlier slices.
Each time we solve "what suffixes of s[4:] work?", we're doing the same work.
```

### How to memoize a backtracking solution

```js
function wordBreak(s, wordDict) {
  const memo = new Map();
  const wordSet = new Set(wordDict);

  function backtrack(start) {
    if (start === s.length) return [[]];       // one valid solution: empty remainder
    if (memo.has(start)) return memo.get(start); // ← cache hit!

    const results = [];
    for (let end = start + 1; end <= s.length; end++) {
      const word = s.slice(start, end);
      if (!wordSet.has(word)) continue;
      const rest = backtrack(end);
      for (const sentence of rest) {
        results.push([word, ...sentence]);
      }
    }

    memo.set(start, results);   // ← cache result before returning
    return results;
  }

  return backtrack(0).map(words => words.join(' '));
}
```

The memoized key is `start` — the index into the string. Everything about the sub-problem is determined by `start`.

### The transformation rule

> 💡 **If you can describe the backtracking state as a small, hashable key (e.g., a single index, a bitmask, a position), memoization is likely applicable.**

When memoization converts a recursive solution to a "table" (array/map indexed by state), we call it **dynamic programming (DP)**. Backtracking with memoization IS a form of top-down DP.

The difference is conceptual, not mechanical:
- **Backtracking (no memo):** explores every path, potentially revisiting states.
- **BT + memoization (top-down DP):** explores each unique state exactly once.
- **Bottom-up DP:** builds the table from smallest sub-problems to largest without recursion.

> 🎯 **Key takeaway**
> If your backtracking re-computes the same state from different parent branches, add memoization. Cache the result keyed by the defining state variables. This converts exponential BT into polynomial DP.

---

<a id="lesson-13"></a>
## Lesson 13 — Common mistakes beginners make

Here's a hit list. Every single one of these has burned real engineers at some point.

### Mistake 1: Forgetting to clone when pushing to results

```js
result.push(current);       // ❌ stores a reference — bug!
result.push([...current]);  // ✅ stores a copy
```

We covered this in Lesson 7, but it's so common it deserves to be in the mistakes list too.

### Mistake 2: Forgetting to undo state

```js
current.push(nums[i]);
backtrack(i + 1, current);
// ← forgot current.pop()!   Bug: current grows forever
```

The fix: **always write the three lines together.** Push → recurse → pop. Never leave the push and pop separated by other logic.

### Mistake 3: Using `i > 0` instead of `i > start` for duplicate skipping

```js
// Wrong:
if (i > 0 && nums[i] === nums[i - 1]) continue;  // ← skips too aggressively

// Right (for combinations/subsets starting at 'start'):
if (i > start && nums[i] === nums[i - 1]) continue;  // ← only skips at same level
```

`i > 0` would skip an element even when it's the **first** choice at the current recursion depth, which incorrectly removes valid results.

### Mistake 4: Not sorting when duplicate-skipping

Duplicate-skipping relies on comparing adjacent elements (`nums[i] === nums[i-1]`). This only works if equal elements are **next to each other** — which requires sorting first.

```js
function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);   // ← essential! Without this, de-dup logic breaks
  // ...
}
```

### Mistake 5: Mutating the choices array mid-loop

If `choices` is an array that you modify during the loop (e.g., with `splice`), indices shift and you skip or double-count choices.

```js
// ❌ Problematic: splice shifts indices
for (let i = 0; i < choices.length; i++) {
  choices.splice(i, 1);     // remove choice i
  backtrack(choices);
  choices.splice(i, 0, x);  // put it back — index i is now different!
}

// ✅ Cleaner: use a separate 'used' boolean array
```

### Mistake 6: Terminating recursion too late

Always put your base case / goal check **before** the loop. If you do the check after making a choice, you miss solutions or go one level too deep.

```js
function backtrack(depth, state) {
  if (depth === target) {          // ← check FIRST
    result.push([...state]);
    return;
  }
  for (const choice of choices) { // ← loop comes AFTER base case
    // ...
  }
}
```

### Mistake 7: Using a global variable for `current` without resetting

If `current` is declared outside `backtrack` and you forget to reset it between test cases (in a test suite), results from one call contaminate the next.

Always initialize `current = []` inside `backtrack` or ensure it's properly scoped.

> 🎯 **Key takeaway**
> The top backtracking bugs: (1) no clone on push, (2) no undo, (3) wrong duplicate-skip condition, (4) forgot to sort, (5) mutating choices mid-loop, (6) base-case too late, (7) shared state between calls.

---

<a id="lesson-14"></a>
## Lesson 14 — Quick reference and templates

Everything below is from the lessons above. Come back here as a cheat sheet.

### The core template

```js
function backtrack(state, choices, result) {
  if (isGoal(state)) {
    result.push([...state]);   // always clone!
    return;
  }
  for (const choice of choices) {
    if (!isValid(state, choice)) continue;   // prune
    state.push(choice);                       // choose
    backtrack(state, nextChoices(choices, choice), result);  // explore
    state.pop();                              // unchoose
  }
}
```

### Subsets template

```js
function backtrack(start, current) {
  result.push([...current]);   // every state is a valid subset
  for (let i = start; i < nums.length; i++) {
    current.push(nums[i]);
    backtrack(i + 1, current);
    current.pop();
  }
}
backtrack(0, []);
```

### Permutations template

```js
function backtrack(current) {
  if (current.length === nums.length) {
    result.push([...current]);
    return;
  }
  for (let i = 0; i < nums.length; i++) {
    if (used[i]) continue;
    used[i] = true;
    current.push(nums[i]);
    backtrack(current);
    current.pop();
    used[i] = false;
  }
}
backtrack([]);
```

### Combination sum template

```js
function backtrack(start, current, remaining) {
  if (remaining === 0) { result.push([...current]); return; }
  if (remaining < 0) return;
  for (let i = start; i < candidates.length; i++) {
    current.push(candidates[i]);
    backtrack(i, current, remaining - candidates[i]);  // i (not i+1) → reuse allowed
    current.pop();
  }
}
```

### Grid DFS template

```js
function dfs(row, col) {
  if (outOfBounds(row, col)) return;
  if (visited[row][col]) return;
  if (!isTarget(grid[row][col])) return;

  visited[row][col] = true;   // choose
  for (const [dr, dc] of [[0,1],[0,-1],[1,0],[-1,0]]) {
    dfs(row + dr, col + dc);  // explore
  }
  visited[row][col] = false;  // unchoose (only if you want all paths, not just reachability)
}
```

### Duplicate-skipping pattern

```js
nums.sort((a, b) => a - b);   // sort first!
for (let i = start; i < nums.length; i++) {
  if (i > start && nums[i] === nums[i - 1]) continue;   // skip dup at same level
  // ...
}
```

### Complexity reference

| Problem type | Time | Space |
|---|---|---|
| Subsets (n items) | O(n · 2^n) | O(n) stack + O(2^n) results |
| Permutations (n items) | O(n · n!) | O(n) stack + O(n!) results |
| Combinations C(n,k) | O(k · C(n,k)) | O(k) stack |
| N-Queens | O(n!) with pruning | O(n²) board + O(n) stack |
| BT + memoization | depends on # unique states | O(# states) |

---

<a id="lesson-15"></a>
## Lesson 15 — You did it. Now what?

Take a breath. Backtracking is one of the hardest concepts for beginners to internalize, and you've just read through the whole thing.

What you should walk away with:

1. **The core rhythm: choose → explore → unchoose.** If you remember nothing else, remember this.
2. **Always clone when pushing to results.** `[...current]`, not `current`.
3. **Always undo your mutations.** Every `push` has a `pop`. Every `mark` has an `unmark`.
4. **Draw the decision tree before you code.** Two minutes of drawing saves twenty minutes of debugging.
5. **Pruning is the whole game.** Ask: "can I tell this branch is useless before going deeper?"
6. **Memoize when subproblems overlap.** If the same state appears via different paths, cache it.

### What to do next

1. Open [`questions/01-subsets.md`](./questions/01-subsets.md).
2. Before coding, draw the decision tree for `[1, 2, 3]` by hand.
3. Write the solution in [`solutions/01-subsets.js`](./solutions/01-subsets.js).
4. If you get stuck, re-read Lesson 5 (the step-by-step trace) and try again.
5. Tick the box in [`README.md`](./README.md). Move on.

### Pacing

- **Do Subsets and Permutations back-to-back.** They're the foundation. Everything else builds on them.
- **N-Queens is not as hard as it looks.** Once you have the template, it's mostly translating "what makes a placement invalid?" into code.
- **The grid problems feel different.** They are — but the template is the same. Mark the cell, recurse, unmark the cell.
- **Partition problems are the hardest category here.** Save them for after you're comfortable with the rest.

You're not behind. You're not slow. The concepts here took the best computer scientists years to formalize. You're learning them in a day. **Stick with it.**

See you in [Q1](./questions/01-subsets.md). 💪
