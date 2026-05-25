# Disjoint Set Union — Lessons from Zero

> 👋 Hey. This topic is different from most. DSU (also called Union-Find) is one of those data structures you can implement in 30 lines but spend months fully appreciating. We're going to build it from scratch, starting from a problem you can picture in your head. No prior graph knowledge needed.
>
> Total reading time at a relaxed pace: about 60–70 minutes. You don't have to read it all at once.

---

## Table of Lessons

1. [The problem DSU solves](#lesson-1)
2. [Attempt 1: just use a label array](#lesson-2)
3. [The parent array — the key insight](#lesson-3)
4. [`find(x)` — how to find the root](#lesson-4)
5. [`union(x, y)` — merging two groups](#lesson-5)
6. [A full naive example walk-through](#lesson-6)
7. [Why naive DSU can be O(n) per operation](#lesson-7)
8. [Fix 1: Path Compression](#lesson-8)
9. [Fix 2: Union by Rank (or Size)](#lesson-9)
10. [With both fixes: nearly O(1)](#lesson-10)
11. [The `size` array — tracking group sizes](#lesson-11)
12. [Counting connected components with DSU](#lesson-12)
13. [MST preview — how Kruskal's uses DSU](#lesson-13)
14. [DSU and directed graphs — careful!](#lesson-14)
15. [The one thing DSU does not support well: deletion](#lesson-15)
16. [Quick reference](#lesson-16)
17. [🔬 Going deeper: Inverse Ackermann function (optional)](#lesson-17)
18. [You did it — what to do next](#lesson-18)

---

<a id="lesson-1"></a>
## Lesson 1 — The problem DSU solves

Imagine the first week of school. Everyone arrives not knowing each other. Each student is their own friend group: a group of one.

```
Day 0:
  Alice   Bob   Carol   Dave   Eve   Frank

  Each student is their own island.
```

Then people start meeting. Alice and Bob become friends. Now they're in the same group. Later, Carol, Dave, and Eve all end up at the same lunch table — same group. Frank still hasn't met anyone.

```
Day 3:
  ┌─────────┐   ┌───────────────────┐   ┌───────┐
  │ Alice   │   │ Carol  Dave  Eve  │   │ Frank │
  │ Bob     │   └───────────────────┘   └───────┘
  └─────────┘
```

Now someone asks: **"Are Alice and Carol in the same group?"** No. **"Are Carol and Dave?"** Yes.

Then Alice's group meets Carol's group (through Eve). Now everyone except Frank is together.

```
Day 5:
  ┌────────────────────────────────────┐   ┌───────┐
  │ Alice  Bob  Carol  Dave  Eve       │   │ Frank │
  └────────────────────────────────────┘   └───────┘
```

Two operations, over and over:

1. **`union(x, y)`** — merge the group that contains `x` with the group that contains `y`.
2. **`find(x)`** — tell me which group `x` belongs to.

And one derived operation:

- **`connected(x, y)`** — are `x` and `y` in the same group? (Just check if `find(x) === find(y)`.)

That's the whole purpose of Disjoint Set Union. It tracks a collection of **disjoint** (non-overlapping) **sets** that can only merge — never split.

> 🎯 **Key takeaway**
> DSU manages groups of elements. You can merge two groups. You can ask if two elements are in the same group. Groups can only grow — never split.

---

<a id="lesson-2"></a>
## Lesson 2 — Attempt 1: just use a label array

Let's think about how you'd implement this naively.

Suppose we have students numbered 0 through 5. The simplest thing: assign each student a "group label". If two people are in the same group, they have the same label.

```js
let label = [0, 1, 2, 3, 4, 5];
//           ↑  ↑  ↑  ↑  ↑  ↑
// student:  0  1  2  3  4  5
// (each is its own group — labels match the student)
```

`find(x)` is instant: just return `label[x]`.

`union(x, y)` — merge x's group into y's group. That means: find everyone with `label[x]` and relabel them to `label[y]`.

```js
function union(x, y) {
  const oldLabel = label[x];
  const newLabel = label[y];
  for (let i = 0; i < label.length; i++) {
    if (label[i] === oldLabel) label[i] = newLabel;
  }
}
```

This works. But notice: every `union` call scans the **entire array**. With `n` students, that's O(n) per merge. If you process 10 000 friend events, that's 10 000 × n operations. Slow.

Can we do better? Yes — and the insight is surprisingly simple.

> 💡 **Tip**
> The label array approach works but **relabeling is too expensive**. We need a smarter way to represent "which group am I in?" without touching everyone in the group when two groups merge.

---

<a id="lesson-3"></a>
## Lesson 3 — The parent array — the key insight

Here's the big idea: instead of every element pointing to a group label, **each element points to a "parent"**.

Think of it like a family tree — except each person points **up** to their parent, and the person at the top (who points to themselves) is the **root** of the group.

```
parent[i] = i   means "i has no parent — i is the root of its own group"
parent[i] = j   means "i's parent is j — walk up to j to find the root"
```

Initially, every element is its own root:

```js
const parent = [0, 1, 2, 3, 4, 5];
//             ↑  ↑  ↑  ↑  ↑  ↑
// parent[0]=0, parent[1]=1, ...  (each is its own root)
```

In ASCII, that looks like five separate trees, each just one node:

```
  0   1   2   3   4   5
  (each points to itself)
```

Now let's say we `union(0, 1)`. We make 0's root point to 1's root. Since both are roots of themselves, we just set `parent[0] = 1`.

```
  1   2   3   4   5
  ↑
  0
```

The root of element 0 is now 1 (walk up: 0 → 1, and 1 points to itself, so 1 is the root).

Now `union(1, 2)`. Make 1's root point to 2's root. `parent[1] = 2`.

```
  2   3   4   5
  ↑
  1
  ↑
  0
```

To find the group of element 0: walk up the chain — `0 → 1 → 2`. Root is 2.

This "walking up the chain" is the `find` operation.

> 🎯 **Key takeaway**
> Every element has a `parent`. The root is the element whose parent is itself. To identify which group something belongs to, walk up to the root. **The root is the group's representative.**

---

<a id="lesson-4"></a>
## Lesson 4 — `find(x)` — how to find the root

`find(x)` answers: "who is the root of x's group?"

The algorithm: keep following `parent[x]` until you reach a node that points to itself.

```js
function find(x) {
  if (parent[x] === x) return x;      // base case: x is the root
  return find(parent[x]);             // keep walking up
}
```

Or iteratively:

```js
function find(x) {
  while (parent[x] !== x) {
    x = parent[x];
  }
  return x;
}
```

Let's trace it on our example where `parent = [1, 2, 2, 3, 4, 5]`:

```
find(0):
  parent[0] = 1  → not a root
  parent[1] = 2  → not a root
  parent[2] = 2  → root! return 2 ✅
```

**Group of element 0 is: 2.**

Now `connected(0, 1)` just asks: `find(0) === find(1)`?
- `find(0)` = 2
- `find(1)` = 2
- Yes — same root → same group. ✅

> ✋ **Pause and try**
> Given `parent = [0, 0, 1, 2, 3]`, what is `find(4)`?
>
> <details>
> <summary>Show answer</summary>
>
> Trace: `4 → 3 → 2 → 1 → 0 → 0` (root, since `parent[0] = 0`).
> `find(4) = 0`
> </details>

---

<a id="lesson-5"></a>
## Lesson 5 — `union(x, y)` — merging two groups

`union(x, y)` merges the group containing `x` with the group containing `y`.

The algorithm:
1. Find the root of x: `rootX = find(x)`
2. Find the root of y: `rootY = find(y)`
3. If they're the same root, they're already in the same group — nothing to do.
4. Otherwise, point one root to the other: `parent[rootX] = rootY`

```js
function union(x, y) {
  const rootX = find(x);
  const rootY = find(y);
  if (rootX === rootY) return;   // already connected
  parent[rootX] = rootY;         // merge: make rootX a child of rootY
}
```

Example — merging groups rooted at 2 and 5:

```
Before:          After:
  2   3   4   5    2   3   4
  ↑                ↑         ↑
  1                1         5
  ↑                ↑
  0                0
                 parent[2] = 5 ←
```

Now to find the root of element 0: `0 → 1 → 2 → 5`. Root is 5.

> 🎯 **Key takeaway**
> `union(x, y)` finds the root of each element, then points one root to the other. Two groups become one in a single assignment.

---

<a id="lesson-6"></a>
## Lesson 6 — A full naive example walk-through

Let's process a sequence of `union` calls on 6 elements (0–5) and watch the forest evolve.

Starting state: `parent = [0, 1, 2, 3, 4, 5]`

```
  0   1   2   3   4   5
 (six separate trees, each a single node)
```

**Step 1: union(0, 1)**
- `find(0) = 0`, `find(1) = 1` → different roots
- `parent[0] = 1`

```
  1   2   3   4   5
  ↑
  0
```

**Step 2: union(2, 3)**
- `find(2) = 2`, `find(3) = 3` → different roots
- `parent[2] = 3`

```
  1   3   4   5
  ↑   ↑
  0   2
```

**Step 3: union(0, 2)**
- `find(0)` = walk `0 → 1`, root = 1
- `find(2)` = walk `2 → 3`, root = 3
- Different roots → `parent[1] = 3`

```
  3   4   5
  ↑
  1   2
  ↑   ↑
  0   (2 already points to 3)
```

Wait, let me be more precise:

```
parent = [1, 3, 3, 3, 4, 5]

Tree rooted at 3:
    3
   / \
  1   2
  |
  0
```

**Step 4: union(4, 5)**
- `find(4) = 4`, `find(5) = 5` → `parent[4] = 5`

```
    3       5
   / \      |
  1   2     4
  |
  0
```

**Step 5: union(3, 5)**
- `find(3) = 3`, `find(5) = 5` → `parent[3] = 5`

```
        5
        |
    3   4
   / \
  1   2
  |
  0
```

Now `find(0)` traces: `0 → 1 → 3 → 5`. All elements are in one group rooted at 5. ✅

> 💡 **Tip**
> At any point, two elements are in the same group if and only if their `find()` returns the same root. The shape of the tree doesn't matter to the answer — only the root does.

---

<a id="lesson-7"></a>
## Lesson 7 — Why naive DSU can be O(n) per operation

Look at what happened in the walk-through. After a few unlucky `union` calls, we ended up with a chain:

```
0 → 1 → 3 → 5
```

To `find(0)`, we had to follow 3 links. With a longer chain of n elements:

```
0 → 1 → 2 → 3 → 4 → ... → n-1
```

`find(0)` would take **n steps**. That's O(n) per find.

How do you create such a bad chain? Consistently union the root of a large group under the root of a small group:

```
union(0, 1): parent[0] = 1      depth of 0 is now 1
union(1, 2): parent[1] = 2      depth of 0 is now 2
union(2, 3): parent[2] = 3      depth of 0 is now 3
...
union(n-2, n-1): parent[n-2] = n-1   depth of 0 is now n-1
```

After `n - 1` union calls, asking `find(0)` walks the entire chain. If you then query `find(0)` repeatedly, each one takes O(n).

On a sequence of `m` operations on `n` elements:
- Worst case naive: **O(m × n)**
- With optimizations (next two lessons): **O(m × α(n))** — effectively O(m)

> ⚠️ **Watch out**
> Any time you unconditionally write `parent[rootX] = rootY` without thinking about tree height, you risk creating chains. The two fixes below prevent this.

---

<a id="lesson-8"></a>
## Lesson 8 — Fix 1: Path Compression

Here's the insight. When you call `find(0)` and trace `0 → 1 → 3 → 5`, you discover that the root is 5. You're going to return 5. So right now — before you return — why not **shortcut every node you visited directly to 5**?

```
Before find(0):          After find(0) with path compression:
    5                              5
    |                           /  |  \  \
    3                          0   1   3   4
   / \
  1   2
  |
  0
```

Every element on the path gets re-pointed directly to the root. Future calls to `find` on any of these elements will take just **one step**.

In code, the recursive version is elegant:

```js
find(x) {
  if (this.parent[x] === x) return x;
  this.parent[x] = this.find(this.parent[x]);  // ← compress on the way back up
  return this.parent[x];
}
```

The key line is `this.parent[x] = this.find(this.parent[x])`. Instead of pointing to your old parent, you point to the root that the recursive call found. By the time every level unwinds, every node on the path points directly to the root.

Let's trace `find(0)` with path compression on `parent = [1, 3, 3, 3, 4, 5]`:

```
find(0):
  parent[0] = 1, not root → recurse find(1)
    find(1):
      parent[1] = 3, not root → recurse find(3)
        find(3):
          parent[3] = 5, not root → recurse find(5)
            find(5):
              parent[5] = 5 → ROOT, return 5
          parent[3] = 5  (no change here, already pointing to root)
          return 5
      parent[1] = 5  ← COMPRESSED
      return 5
  parent[0] = 5  ← COMPRESSED
  return 5

After: parent = [5, 5, 3, 5, 4, 5]
```

0 and 1 now point directly to 5. Next time we call `find(0)`, it's a single step. 🎉

> 🎯 **Key takeaway**
> Path compression makes trees flat over time. After a few operations, most elements point directly to the root. This dramatically speeds up future `find` calls.

---

<a id="lesson-9"></a>
## Lesson 9 — Fix 2: Union by Rank (or Size)

Path compression helps `find` but doesn't prevent chains from forming in the first place. The second fix addresses `union`.

The problem: when we merge two trees, we naively put one under the other. If we always attach the larger tree under the smaller one, we make the chain worse:

```
Bad (attaching large tree under small):
  After union(bigRoot, smallRoot):
    smallRoot
        ↑
    bigRoot (and all its children)

  Finding elements deep in bigRoot's subtree now costs more.
```

**The fix:** always attach the **smaller** tree under the **larger** one. The larger tree stays as root.

```
Good (attaching small tree under large):
  After union(bigRoot, smallRoot):
    bigRoot
        ↑
    smallRoot (and its children)

  The maximum depth increases only when both trees are the same size.
```

#### Two equivalent approaches

**Union by Rank:** keep a `rank` array. Rank loosely represents the tree's height (an upper bound). When merging, attach the lower-rank root under the higher-rank root. Only increase rank when both are equal.

```js
union(x, y) {
  const rootX = this.find(x);
  const rootY = this.find(y);
  if (rootX === rootY) return;

  if (this.rank[rootX] < this.rank[rootY]) {
    this.parent[rootX] = rootY;
  } else if (this.rank[rootX] > this.rank[rootY]) {
    this.parent[rootY] = rootX;
  } else {
    // same rank — either way, but increase the new root's rank
    this.parent[rootY] = rootX;
    this.rank[rootX]++;
  }
}
```

**Union by Size:** keep a `size` array. Size is the exact number of elements in the tree. Attach the smaller-size tree under the larger-size tree.

```js
union(x, y) {
  const rootX = this.find(x);
  const rootY = this.find(y);
  if (rootX === rootY) return;

  if (this.size[rootX] < this.size[rootY]) {
    this.parent[rootX] = rootY;
    this.size[rootY] += this.size[rootX];
  } else {
    this.parent[rootY] = rootX;
    this.size[rootX] += this.size[rootY];
  }
}
```

Both approaches give the same asymptotic complexity. Union by size is slightly more intuitive and gives you the exact group size for free.

#### Why union by rank guarantees O(log n) depth (without path compression)

Claim: with union by rank, a tree of rank `r` has at least `2^r` nodes.

Proof by induction:
- Base case: a single node has rank 0. It has 2^0 = 1 node. ✅
- Inductive step: rank increases only when merging two trees of equal rank `r`. Each has ≥ 2^r nodes. Combined: ≥ 2^(r+1) nodes. ✅

So if a tree has `n` nodes, its rank is at most `log₂(n)`. That means the depth is at most `log₂(n)`. **`find` is O(log n) without path compression, just from union by rank.**

> 💡 **Tip**
> With path compression alone, amortized O(log n). With union by rank alone, worst-case O(log n). With both: O(α(n)) — better than either individually.

---

<a id="lesson-10"></a>
## Lesson 10 — With both fixes: nearly O(1)

Let's put the two optimizations together and look at what they do to each other.

```
Union by rank prevents deep trees from forming in the first place.
Path compression flattens trees on every find call.
Together: even the shallow trees from union by rank get flattened further.
```

After a long sequence of operations on a real workload, most nodes end up pointing directly to their root. The average path length approaches 1.

The formal complexity with both optimizations: **O(α(n)) per operation, amortized**, where α(n) is the inverse Ackermann function.

You don't need to know what inverse Ackermann means right now (there's a lesson below for the curious). The practical summary:

```
n (number of elements)   α(n)
─────────────────────    ─────
4                          1
16                         2
65536                      3
2^65536                    4
... (astronomically large) 5
```

For any `n` you'll ever encounter in a real program — even a billion elements — α(n) ≤ 5. **It's effectively constant.** You can write O(1) on your analysis and you won't be wrong in any practical sense.

> 🎯 **Key takeaway**
> With path compression + union by rank/size, DSU operations are effectively O(1) for any realistic input size. This is why DSU is so powerful — millions of union/find calls in near-constant total time.

---

<a id="lesson-11"></a>
## Lesson 11 — The `size` array — tracking group sizes

One very common DSU enhancement: track how many elements are in each group.

```js
class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank   = new Array(n).fill(0);
    this.size   = new Array(n).fill(1);       // ← each group starts with 1
    this.components = n;                       // ← number of separate groups
  }

  find(x) {
    if (this.parent[x] === x) return x;
    this.parent[x] = this.find(this.parent[x]);  // path compression
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return false;           // already connected

    // union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
      this.size[rootY] += this.size[rootX];
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
      this.size[rootX] += this.size[rootY];
    } else {
      this.parent[rootY] = rootX;
      this.size[rootX] += this.size[rootY];
      this.rank[rootX]++;
    }

    this.components--;   // two groups became one
    return true;         // signal that a merge actually happened
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }

  getSize(x) {
    return this.size[this.find(x)];   // always query via root
  }
}
```

Important: `size[i]` is only meaningful when `i` is a root. After merging, only the new root has the correct count. That's why `getSize` calls `find(x)` first.

Also note that `union` returns `false` if the two elements were already connected (useful for detecting cycles) and `true` if a real merge happened.

> ⚠️ **Watch out**
> Never read `this.size[x]` directly if `x` might not be a root. Always use `this.size[this.find(x)]`.

---

<a id="lesson-12"></a>
## Lesson 12 — Counting connected components with DSU

A "connected component" is a maximal group of nodes that are all reachable from each other.

DSU tracks this automatically:
- Start: `n` components (each node is its own).
- Each successful `union` (where the two elements had different roots): decrement by 1.
- At any point: `dsu.components` gives you the current count.

Example — building a graph with 6 nodes:

```
Start: components = 6

union(0, 1): merge → components = 5
union(2, 3): merge → components = 4
union(0, 2): merge → components = 3
union(4, 5): merge → components = 2
union(3, 5): merge → components = 1

Final: one connected component (everyone's in the same group)
```

This pattern shows up in:
- "How many islands?" (Q21)
- "How many provinces?" (Q03)
- "When does the network become fully connected?" (Q06)

> 🎯 **Key takeaway**
> Initialize `components = n`. Decrement by 1 each time `union` merges two previously separate groups. The final count is your number of connected components.

---

<a id="lesson-13"></a>
## Lesson 13 — MST preview — how Kruskal's uses DSU

A **Minimum Spanning Tree (MST)** of a weighted graph is a subset of edges that:
1. Connects all vertices
2. Has no cycles
3. Has the minimum possible total edge weight

**Kruskal's algorithm** builds the MST greedily:

```
1. Sort all edges by weight (ascending).
2. For each edge (u, v, weight) in sorted order:
   a. If u and v are in DIFFERENT components: add this edge to the MST.
      union(u, v)
   b. If u and v are in the SAME component: skip (adding it would create a cycle).
3. Stop when MST has n-1 edges.
```

DSU is what makes step 2a and 2b fast. Without DSU, checking "are these two nodes connected?" requires a DFS or BFS — O(n + e) per check. With DSU, it's O(α(n)) ≈ O(1).

Example — 4 nodes, edges sorted by weight:

```
Edges (sorted): (0-1, w=1), (1-2, w=2), (0-2, w=3), (2-3, w=4), (1-3, w=5)

Process (0-1, w=1): find(0)=0, find(1)=1, different → ADD. union(0,1).
  MST edges: [(0,1)]  components: 3

Process (1-2, w=2): find(1)=root of {0,1}, find(2)=2, different → ADD. union(1,2).
  MST edges: [(0,1),(1,2)]  components: 2

Process (0-2, w=3): find(0) = find(2) = same root → SKIP (cycle!).

Process (2-3, w=4): find(2) and find(3) differ → ADD. union(2,3).
  MST edges: [(0,1),(1,2),(2,3)]  components: 1

n-1 = 3 edges collected. Done. ✅
MST total weight: 1 + 2 + 4 = 7.
```

DSU makes each "should I add this edge?" question O(α(n)). The bottleneck becomes sorting the edges: O(e log e). Total Kruskal's complexity: **O(e log e)**.

> 💡 **Tip**
> You'll implement Kruskal's in Q19 (Kruskal's MST) and Q20 (Minimum Cost to Connect All Points). Both are great practice for this pattern.

---

<a id="lesson-14"></a>
## Lesson 14 — DSU and directed graphs — careful!

Standard DSU assumes **undirected** edges. When you call `union(x, y)`, the relationship is symmetric: x can reach y AND y can reach x.

In a **directed** graph, edges have direction: `x → y` doesn't mean `y → x`. DSU doesn't model this naturally.

What happens if you naively apply DSU to a directed graph?

```
Edges: 0 → 1, 2 → 1 (both pointing into 1)

DSU with union(0,1) and union(2,1):
  All of {0, 1, 2} end up in the same component.

But in the directed graph:
  0 cannot reach 2 and 2 cannot reach 0.
  DSU gives you "they're connected", which is wrong.
```

Some problems sneak DSU into directed-graph settings using tricks:
- **Redundant Connection II** (Q08) works by processing in-degrees separately.
- **Evaluate Division** (Q28) adds weighted edges that encode ratios — the "direction" is captured in the weight.

The rule: when you see a directed graph, stop and think carefully before reaching for DSU. It often doesn't apply directly.

> ⚠️ **Watch out**
> DSU models undirected, symmetric connectivity. For directed problems, ask "is this actually asking about undirected components?" If yes, DSU works. If no, look for another approach.

---

<a id="lesson-15"></a>
## Lesson 15 — The one thing DSU does not support well: deletion

DSU is excellent at **adding** connections. It's terrible at **removing** them.

Suppose you've merged groups A and B. Now you want to "disconnect" them. There's no clean way — the parent pointers would need major surgery, and path compression has already erased the history of how nodes merged.

This is a known limitation. When a problem says something like "bricks are being removed" or "connections are being deleted," DSU usually can't solve it directly.

The classic trick: **reverse time**.

Instead of removing bricks one by one, start with the final state (no bricks) and **add** them back one by one in reverse order. Now it's a union problem again.

This is exactly how **Q22 — Bricks Falling When Hit** works. Instead of simulating bricks falling (DSU doesn't support removal), you simulate adding bricks in reverse order and track which new additions connect the roof.

> 🎯 **Key takeaway**
> DSU supports merge but not split. For deletion problems, try reversing the timeline so it becomes an addition problem.

---

<a id="lesson-16"></a>
## Lesson 16 — Quick reference

### The full DSU class (copy-paste template)

```js
class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank   = new Array(n).fill(0);
    this.size   = new Array(n).fill(1);
    this.components = n;
  }

  find(x) {
    if (this.parent[x] === x) return x;
    this.parent[x] = this.find(this.parent[x]);   // path compression
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return false;

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
      this.size[rootY] += this.size[rootX];
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
      this.size[rootX] += this.size[rootY];
    } else {
      this.parent[rootY] = rootX;
      this.size[rootX] += this.size[rootY];
      this.rank[rootX]++;
    }

    this.components--;
    return true;
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }

  getSize(x) {
    return this.size[this.find(x)];
  }
}
```

### Complexity table

| Operation | Naive DSU | With path compression only | With union by rank only | With both |
|-----------|-----------|---------------------------|------------------------|-----------|
| `find(x)` | O(n) worst | O(log n) amortized | O(log n) worst | O(α(n)) |
| `union(x, y)` | O(n) worst | O(log n) amortized | O(log n) worst | O(α(n)) |
| `connected(x, y)` | O(n) worst | O(log n) amortized | O(log n) worst | O(α(n)) |
| Space | O(n) | O(n) | O(n) | O(n) |

α(n) ≤ 4 for all practical values of n. Write it as O(1) in interviews.

### When to reach for DSU

- "Are these two nodes in the same connected component?"
- "Count the number of connected components."
- "Detect if adding this edge creates a cycle." (Union returns false when already connected.)
- "When does the graph become fully connected?"
- "Merge these groups, query this group's size."
- Any problem involving an edge stream where you process edges one by one (online connectivity).

### When NOT to use DSU

- You need directed connectivity (unless you can reduce it to undirected).
- You need to delete connections.
- You need to find shortest paths (use Dijkstra / BFS instead).
- You need to find all nodes in a component (DSU can't enumerate — only answer yes/no).

---

<a id="lesson-17"></a>
## Lesson 17 — 🔬 Going deeper: Inverse Ackermann function (optional)

> This lesson is for the curious. **You can skip it entirely** and still solve every DSU problem.

The Ackermann function A(m, n) grows insanely fast — faster than exponential, factorial, or anything you'd normally encounter. It's defined recursively:

```
A(0, n) = n + 1
A(m, 0) = A(m-1, 1)
A(m, n) = A(m-1, A(m, n-1))
```

Some values:
```
A(1, 1) = 3
A(2, 2) = 7
A(3, 3) = 61
A(4, 4) = 2^65536 - 3    (a number with about 20,000 digits)
A(5, 5) = incomprehensibly large
```

The **inverse Ackermann function** α(n) answers: "what is the smallest m such that A(m, m) ≥ n?"

Because A grows so fast, α(n) grows incredibly slowly:
- α(n) ≤ 4 for all n ≤ 2^65536 (more atoms than in the observable universe)
- α(n) ≤ 5 for all n that could possibly fit in a computer

This is why the official bound for DSU with both optimizations is O(α(n)): while it's technically not O(1), it's so close to constant that no practical difference exists.

The formal proof (by Tarjan, 1975) shows that the amortized cost of a sequence of `m` union and `find` operations on `n` elements is O(m × α(n)). The proof is beautiful but takes several pages — if you're interested, search for "Tarjan DSU analysis" or read CLRS Chapter 21.

> 🎯 **Key takeaway**
> α(n) is the inverse Ackermann function. It's ≤ 4 for all practical n. DSU with both optimizations is O(α(n)) per operation — effectively O(1). This is about as good as it gets.

---

<a id="lesson-18"></a>
## Lesson 18 — You did it. Now what?

Let's recap what you can do now:

1. **You understand the core problem** — tracking merging groups and answering "same group?" queries.
2. **You know the parent array representation** — each element points to a parent; roots point to themselves.
3. **You can implement `find` and `union`** — the two core operations.
4. **You know the two optimizations** — path compression (flatten on find) and union by rank/size (always attach smaller tree under larger).
5. **You understand the complexity** — O(α(n)) ≈ O(1) per operation with both optimizations.
6. **You've seen where DSU shines** — cycle detection, counting components, MST (Kruskal's), online connectivity.
7. **You know its limit** — DSU doesn't support deletion natively.

### What to do next

1. Open [`questions/01-implement-dsu.md`](./questions/01-implement-dsu.md).
2. Implement the DSU class from scratch without looking at any reference. It's about 30 lines. This is the most important exercise in this whole topic.
3. Work through the Easy questions. They're short but build the muscle memory.
4. Tackle Medium questions — many are classic LeetCode problems that come up in interviews.
5. Tick boxes as you go. Celebrate the small wins.

### Pacing

- **The Foundation question (Q01) is essential.** Don't skip it or half-ass it. If you can implement DSU from memory, every problem after it becomes "just use DSU and then..."
- **Two or three problems a day** is a healthy pace. Don't burn through them all at once.
- **The Hard problems are genuinely hard.** It's expected. Try for 30–45 minutes before looking at hints.

You've learned one of the most elegant data structures in all of computer science. It's 30 lines of code and decades of CS research packed into it. Go build it.

See you in [Q1](./questions/01-implement-dsu.md). 💪
