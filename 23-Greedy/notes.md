# Greedy Algorithms — Lessons from Zero

> 👋 Hey. This file is for someone who has never formally studied algorithm design. We're going to build up the greedy mindset from scratch, using real-world analogies, worked examples, and honest discussion of when the technique fails. Each lesson teaches **one core idea**.
>
> Total reading time at a relaxed pace: about 90–100 minutes, with breaks. **You don't have to read it all in one go.**

---

## Table of Lessons

1. [The core idea — always grab the best thing in front of you](#lesson-1)
2. [When "best right now" actually works](#lesson-2)
3. [Greedy choice property and optimal substructure](#lesson-3)
4. [When greedy FAILS — the 0/1 Knapsack trap](#lesson-4)
5. [Activity selection — the poster-child greedy problem](#lesson-5)
6. [Why "earliest finish time" wins — the exchange argument](#lesson-6)
7. [Stay-ahead argument — another way to see correctness](#lesson-7)
8. [Interval scheduling intuition — a mental picture that unlocks many problems](#lesson-8)
9. [Making change — the coin-change greedy and when it breaks](#lesson-9)
10. [Fractional knapsack vs 0/1 knapsack — the dividing line](#lesson-10)
11. [Greedy on sorted data — sort by some key, then iterate](#lesson-11)
12. [Heap + greedy — always picking the next best](#lesson-12)
13. [Recognizing greedy problems in interviews](#lesson-13)
14. [Common greedy patterns (cheat sheet)](#lesson-14)
15. [Quick complexity reference](#lesson-15)
16. [You did it — what to do next](#lesson-16)

---

<a id="lesson-1"></a>
## Lesson 1 — The core idea: always grab the best thing in front of you

Picture this: you're getting coins back as change at a cash register. The cashier owes you 67 cents. She doesn't sit down and calculate every possible combination of coins. She just picks up the **largest coin that doesn't overshoot** the remaining amount, puts it down, and repeats.

```
Need: 67¢
  1. Grab a 50¢ coin. Remaining: 17¢.
  2. Grab a 10¢ coin. Remaining: 7¢.
  3. Grab a 5¢ coin.  Remaining: 2¢.
  4. Grab two 1¢ coins. Remaining: 0¢.
  Done. Used 5 coins.
```

That's greedy. At every step you make the **locally optimal choice** — the one that looks best right now — without backtracking or reconsidering earlier decisions.

The word "greedy" is a bit harsh. Think of it as **decisive** instead: you never change your mind.

### Another analogy: movie night

You have 4 hours to watch movies. You have a list of movies with their run times. You want to watch **as many movies as possible** (not the longest ones — just the most).

A greedy strategy: always pick the **shortest unwatched movie that fits in your remaining time**. Why? Because shorter movies free up more time for additional movies later.

This is exactly the activity-selection pattern we'll see in Lesson 5. But first — let's understand why this sometimes works and sometimes doesn't.

> 🎯 **Key takeaway**
> Greedy = make the best-looking local choice at each step, never look back. Fast (usually O(n log n) or O(n)), but only correct when the problem has special structure.

---

<a id="lesson-2"></a>
## Lesson 2 — When "best right now" actually works

Let's think about when your local choices add up correctly.

### The commute analogy

You're driving to work and there are several possible routes. At every intersection, you take the road that seems shortest. Does this always get you there fastest?

**No.** You might take a short side road that leads into a dead end, forcing a U-turn that costs more time than a slightly longer initial turn would have.

### The vending machine analogy

Now you're at a vending machine that only has quarters (25¢), dimes (10¢), and pennies (1¢). You need to make 30¢ change. Greedy: grab a quarter, then five pennies. That's 6 coins.

But wait — if the machine had a nickel (5¢), you'd pick a quarter, then a nickel, then nothing. 2 coins. The greedy strategy gave a worse answer than what was possible *if you had a nickel available*.

The **composition of coins available** determines whether greedy works here.

### So what makes it work?

Two things need to be true — we'll name them properly in Lesson 3, but intuitively:

1. **Choosing the local best never "poisons" future choices.** Your greedy grab should not prevent you from solving the rest optimally.
2. **The subproblem you're left with after a greedy choice is smaller and similar in shape.** You can keep applying the same rule.

When both hold: greedy gives the optimal answer. When either fails: greedy gives something suboptimal.

> 💡 **Tip**
> When you first suspect a problem is greedy, try to sketch a small counterexample. Can you find any input where the greedy rule gives a wrong answer? If you can't (and the reasoning seems solid), it might be greedy. If you can, you need dynamic programming instead.

---

<a id="lesson-3"></a>
## Lesson 3 — Greedy choice property and optimal substructure

These are the two formal properties that justify using greedy. They sound academic but they capture something genuinely useful.

### Property 1: Greedy choice property

> A globally optimal solution **can always be constructed** by making locally optimal (greedy) choices.

In plain English: there exists an optimal solution that includes the greedy choice at the first step. You won't lose by being greedy.

**What this means in practice:** you need to be able to argue "suppose I make the greedy choice. I can show that no other choice leads to a strictly better overall answer."

### Property 2: Optimal substructure

> After you make a greedy choice, the remaining problem has the same structure as the original. And the optimal solution to the **remaining** problem, combined with your greedy choice, gives the optimal solution to the **whole** problem.

In other words: once you make a decision, you can safely forget what you decided and focus on what's left.

### A worked example: Jump Game

You're on a number line. Each position has a value telling you the **maximum** jump length from that position. Can you reach the last index from index 0?

```
positions:  [2, 3, 1, 1, 4]
indexes:     0  1  2  3  4
```

Greedy rule: keep track of the **furthest index you can reach so far**. At each position `i` (as long as `i ≤ furthest`), update: `furthest = max(furthest, i + jumps[i])`.

```
Start: furthest = 0
i=0: within reach. furthest = max(0, 0+2) = 2
i=1: within reach. furthest = max(2, 1+3) = 4
i=2: within reach. furthest = max(4, 2+1) = 4
i=3: within reach. furthest = max(4, 3+1) = 4
i=4: within reach. We reached the last index. ✅
```

**Greedy choice property:** at each step, extending our reach as far as possible never hurts us. Any solution that doesn't extend maximally could have been improved.

**Optimal substructure:** once we know we can reach index 4, the "remaining problem" (nothing) is trivially solved.

> 🎯 **Key takeaway**
> If you can show these two properties hold, you're allowed to use greedy. Both can sometimes be proven rigorously (see Lessons 6–7) or argued informally. For interviews, an informal argument is usually enough.

---

<a id="lesson-4"></a>
## Lesson 4 — When greedy FAILS: the 0/1 Knapsack trap

Understanding when greedy breaks is just as important as knowing when it works.

### The knapsack setup

You have a backpack that holds a total weight of 10 kg. There are three items to choose from:

| Item | Weight | Value |
|------|--------|-------|
| A    | 6 kg   | $30   |
| B    | 5 kg   | $25   |
| C    | 5 kg   | $25   |

You can only take **whole items** (no slicing — this is called the 0/1 Knapsack, because each item is either in or out).

**Greedy by value-per-kg:**
- A: $30/6kg = $5.00/kg ← best ratio, grab it
- After grabbing A (6 kg), only 4 kg left
- Neither B nor C fits. Total value: **$30**

**But the optimal answer is:**
- Take B + C: 5+5 = 10 kg, value = **$50** ← much better!

The greedy approach chose the item with the best "value per kilo" but it was wrong. By grabbing A, we wasted 4 kg of capacity.

### Why did greedy fail here?

When we took item A, we "committed" to a subproblem (4 kg remaining) where the optimal solution happened to be empty. The greedy choice poisoned the remaining subproblem.

**The key insight:** for 0/1 Knapsack, the greedy choice property does NOT hold. The greedy choice (highest value-per-weight) is not always part of the globally optimal solution.

### What about the fractional knapsack?

If you could take *fractions* of items (like sand or grain), then greedy works perfectly. You take as much of the highest-ratio item as possible, then the next-highest, and so on. We'll revisit this in Lesson 10.

> ⚠️ **Critical distinction**
> - **0/1 Knapsack** (whole items only) → greedy fails → use dynamic programming.
> - **Fractional Knapsack** (you can take any fraction) → greedy works.
>
> The moment you see "you can only take whole items" and "maximize total value with a capacity constraint," start thinking DP, not greedy.

---

<a id="lesson-5"></a>
## Lesson 5 — Activity selection: the poster-child greedy problem

This is the most important greedy problem to understand deeply. Once you get this one, many others click into place.

### The setup

You have a single room. Several meetings want to use it. Each meeting has a start time and an end time. You want to **schedule as many meetings as possible** (not the most important ones — just the most).

```
Meeting  Start  End
  A        1     4
  B        3     5
  C        0     6
  D        5     7
  E        3     8
  F        5     9
  G        6    10
  H        8    11
  I        8    12
  J        2    13
  K       12    14
```

You can only have one meeting in the room at a time. Two meetings conflict if one starts before the other ends.

### Three intuitive strategies to try

**Strategy 1: Earliest start time first**
Take the meeting that starts first. But meeting J starts at 2 and ends at 13 — it blocks almost the whole day. Bad idea.

**Strategy 2: Shortest duration first**
Take the shortest meeting. This sounds reasonable, but consider:
```
|--A--|     |--C--|
    |--B--|
```
If A runs 1–3, B runs 2–4, C runs 5–7, then "shortest duration" picks A (or B — they're tied). If we pick B, A and C both conflict with it — we only get 2 meetings. If we pick A instead, then B conflicts, then C fits — 2 meetings either way. But in some cases, shortest-duration is suboptimal.

**Strategy 3: Earliest finish time first** ← THE WINNER

Sort meetings by their end times. Then greedily pick the next meeting that starts **at or after the current meeting ends**.

```
Sorted by end time:
A: 1–4
B: 3–5
C: 0–6
D: 5–7
E: 3–8
...
```

Greedy walk:
1. Pick A (ends at 4). Last end = 4.
2. B starts at 3 < 4. Skip.
3. C starts at 0 < 4. Skip.
4. D starts at 5 ≥ 4. Pick D. Last end = 7.
5. E starts at 3 < 7. Skip.
6. F starts at 5 < 7. Skip.
7. G starts at 6 < 7. Skip.
8. H starts at 8 ≥ 7. Pick H. Last end = 11.
9. I starts at 8 < 11. Skip.
10. J starts at 2 < 11. Skip.
11. K starts at 12 ≥ 11. Pick K. Last end = 14.

Selected: {A, D, H, K} — 4 meetings.

You can verify: no set of 5 or more meetings from this list is mutually compatible.

> 🎯 **Key takeaway**
> For "schedule as many non-overlapping activities as possible", the optimal greedy rule is: **always pick the activity that finishes earliest** (among those compatible with your current selection). This minimizes how much of the future you "use up."

---

<a id="lesson-6"></a>
## Lesson 6 — Why "earliest finish time" wins: the exchange argument

The exchange argument is the cleanest way to prove a greedy algorithm is optimal. Let's walk through it for activity selection.

### The argument in plain English

We want to prove: "the greedy selection (earliest finish time first) is at least as good as any other selection."

**Suppose you have an optimal solution** that is different from the greedy solution. The optimal solution makes some different choice at some step. We'll show we can **swap** the greedy choice in without making things worse — "exchange" the non-greedy choice for the greedy one.

**Formal sketch:**

Let `G = {g₁, g₂, ..., gₖ}` be the greedy solution (sorted by finish time).
Let `O = {o₁, o₂, ..., oₘ}` be some optimal solution (also sorted by finish time).

Claim: `k ≥ m` (greedy picks at least as many as optimal).

Step 1: Compare `g₁` and `o₁`.
- Both are compatible with an empty schedule.
- `g₁` finishes at or before `o₁` (by definition — greedy picked the earliest finisher).
- So we can swap `o₁` for `g₁` in the optimal solution. The modified solution is still valid (g₁ finishes no later than o₁, so everything o₂, o₃, … that was compatible with o₁ is still compatible with g₁).

Step 2: Now both solutions start with `g₁`. Compare `g₂` and `o₂`.
- Same logic applies: `g₂` finishes no later than `o₂`, so we can swap.

Step 3: Continue until we run out of elements in one solution.
- If `m > k`, then after we've matched all greedy choices there must be some `oₖ₊₁`. But at step `k+1`, the greedy algorithm would have found something compatible and included it — unless no such activity existed, which means `m ≤ k`. Contradiction.

Therefore `k ≥ m` — greedy is at least as good as any optimal solution, so greedy **is** optimal.

> 💡 **Tip: the exchange argument template**
>
> 1. Take an arbitrary optimal solution.
> 2. Identify the first point where it differs from the greedy solution.
> 3. Show you can swap the non-greedy choice for the greedy one without making things worse (or at most making them equal).
> 4. Repeat until the modified optimal solution matches the greedy solution.
> 5. Conclude: greedy is optimal.
>
> This template works for many greedy proofs. Memorize the shape of the argument.

---

<a id="lesson-7"></a>
## Lesson 7 — Stay-ahead argument: another way to see correctness

The exchange argument works from an optimal solution inward. The **stay-ahead argument** works outward from the greedy algorithm itself.

### The idea

We show that at every step, the greedy solution is "at least as good" as any other solution on some measurable quantity.

### Applied to activity selection

Define: after choosing the `k`-th activity, let `f(Gₖ)` = the finish time of the `k`-th greedy activity.

**Claim:** For every `k`, `f(Gₖ) ≤ f(Oₖ)` for any valid solution O.

**Proof by induction:**
- Base case (k=1): Greedy picks the activity with the smallest finish time. By definition, `f(G₁) ≤ f(O₁)` for any solution O.
- Inductive step: Assume `f(Gₖ) ≤ f(Oₖ)`. Since `f(Gₖ) ≤ f(Oₖ)`, the `(k+1)`-th activity in O (which starts after `f(Oₖ)`) also starts after `f(Gₖ)`. So it's compatible with the greedy solution. The greedy algorithm, looking at all compatible activities, picks the one with the smallest finish time — so `f(Gₖ₊₁) ≤ f(Oₖ₊₁)`.

**Conclusion:** Greedy "stays ahead" — its finish times are always ≤ those of any other solution at every matching position. If another solution had more activities, the greedy would have found them too. So no valid solution has more activities than greedy.

> 🔬 **Going deeper (optional)**
> Both exchange argument and stay-ahead argument are valid proof techniques. For interviews you don't need to write formal proofs, but being able to sketch the argument (even verbally) shows you understand why your greedy rule is correct — not just that it is. Interviewers appreciate this.

---

<a id="lesson-8"></a>
## Lesson 8 — Interval scheduling intuition

Many greedy problems involve **intervals** — things with a start and an end. Let's build a mental model.

### Visualizing intervals on a number line

```
A: ├──────┤
B:    ├──────┤
C:          ├──┤
D:   ├─────────────┤
E:                ├──────┤
     0    5   10   15   20
```

Some vocabulary:
- **Overlap:** two intervals overlap if one starts before the other ends (and vice versa).
- **Compatible:** two intervals are compatible if they don't overlap.
- **Merge:** if two intervals overlap, their "merged" version spans from the earlier start to the later end.

### The three classic interval questions

1. **Can I attend all meetings?** — Check if any two intervals overlap. Just sort by start time and scan.

2. **How many meetings can I attend?** — Activity selection (Lesson 5): sort by end time, pick greedily.

3. **How many rooms do I need to hold all meetings?** — At any instant, you need a room for every meeting that's currently running. The answer is the **maximum number of overlapping intervals** at any instant. Solution: event sweep — process all start and end times in order.

4. **How many bullets/arrows does it take to pop all balloons?** — Same as "minimum number of intervals to pierce all intervals." Sort by right endpoint, shoot as far right as possible.

### Why sort by end time (not start time) for so many problems?

When you sort by end time, you're minimizing how much of the "future timeline" the next choice consumes. The currently-running interval will end as soon as possible, giving future choices the most room.

Sorting by start time tells you what's coming but not what's blocking.

> ✋ **Pause and think**
> If you had to pick the meeting to attend (out of conflicts) to leave yourself the most free time afterwards, would you pick the one that starts latest, ends latest, starts earliest, or ends earliest?
>
> <details>
> <summary>Answer</summary>
> Ends earliest. Ending early means all subsequent time is available. The start time doesn't matter once you've committed.
> </details>

---

<a id="lesson-9"></a>
## Lesson 9 — Making change: the coin-change greedy and when it breaks

Making change is the canonical introductory greedy example. It's worth understanding exactly when it works and why.

### US coin denominations: greedy works

US coins: 25¢, 10¢, 5¢, 1¢. To make 41¢:

```
41¢ → grab 25¢ (largest that fits). Remaining: 16¢
16¢ → grab 10¢. Remaining: 6¢
6¢  → grab 5¢.  Remaining: 1¢
1¢  → grab 1¢.  Remaining: 0¢
Total: 4 coins.
```

No combination of these four denominations gives you 41¢ in fewer than 4 coins. Greedy is optimal for standard US denominations.

### Non-standard denominations: greedy can fail

Coins: 12¢, 5¢, 1¢. Make 15¢:

Greedy:
```
15¢ → grab 12¢. Remaining: 3¢
3¢  → grab 1¢ three times. Total: 4 coins.
```

Optimal:
```
15¢ → grab 5¢ three times. Total: 3 coins!
```

Greedy was wrong because grabbing 12¢ left a remainder that the smaller coins handled inefficiently.

### What changed?

With US coins, each denomination is "compatible" with the others in a specific mathematical sense (each larger coin is a multiple or near-multiple of smaller ones). When this property doesn't hold, greedy breaks down.

For the general coin-change problem (arbitrary denominations), you need **dynamic programming**. This is one of the most famous "greedy vs DP" dividing lines.

> 🎯 **Key takeaway**
> Coin-change greedy works for standard, carefully-designed coin sets. For arbitrary denominations, greedy is wrong — use DP. The Coin Change problem on LeetCode uses non-standard denominations precisely to force DP.

---

<a id="lesson-10"></a>
## Lesson 10 — Fractional knapsack vs 0/1 knapsack: the dividing line

We saw in Lesson 4 that greedy fails for 0/1 Knapsack. Now let's see why it works for the fractional version.

### Fractional knapsack

Same setup: bag holds 10 kg, three items:

| Item | Weight | Value | Value/kg |
|------|--------|-------|----------|
| A    | 6 kg   | $30   | $5.00/kg |
| B    | 5 kg   | $25   | $5.00/kg |
| C    | 4 kg   | $16   | $4.00/kg |

Greedy by value-per-kg:
1. A and B are tied at $5/kg. Pick A (6 kg). Bag: 6/10 kg full. Value: $30.
2. Pick B, but only 4 kg fits (we only have 4 kg left). Take 4/5 of B: value = $20. Bag: 10/10 full.
3. Done. Total value: $50.

Why does greedy work now? Because taking a fraction of an item doesn't "waste" capacity. You take exactly as much as fits, so there's no wasted space from the shape-mismatch problem that killed 0/1 greedy.

**Formally:** for fractional knapsack, the greedy choice property holds because any solution that doesn't take the maximum possible amount of the highest-ratio item can be improved by replacing some lower-ratio item-fraction with high-ratio item-fraction, without changing total weight.

### The dividing line

| Problem | Can you slice items? | Greedy? |
|---------|---------------------|---------|
| Fractional Knapsack | Yes | ✅ Sort by value/weight, fill greedily |
| 0/1 Knapsack | No | ❌ Use DP |

This distinction appears in interviews. When you see "fractional" or "you can take any amount of commodity X", think greedy. When you see "each item is taken whole or not at all", think DP.

> 💡 **A bridge to Huffman coding**
> Huffman coding (optimal prefix codes) also uses a greedy algorithm — always combine the two lowest-frequency symbols first. It's provably optimal via an exchange argument. Connect ropes with minimum cost (Lesson 12) is the same problem structure.

---

<a id="lesson-11"></a>
## Lesson 11 — Greedy on sorted data: sort by some key, then iterate

Many greedy algorithms follow this exact shape:

```
1. Sort input by some key.
2. Walk through in order, making greedy picks.
```

The sorting step is usually O(n log n). The walk is O(n). Total: O(n log n). This is the dominant greedy runtime.

The interesting question is always: **what key do you sort by?**

### Examples of sort keys

| Problem | Sort by |
|---------|---------|
| Activity selection | End time ↑ |
| Minimum arrows (burst balloons) | Right endpoint ↑ |
| Non-overlapping intervals | End time ↑ |
| Two city scheduling | Cost difference (A_cost − B_cost) ↑ |
| Largest number (concatenation) | Custom comparator: which order gives larger concatenation |
| Assign cookies | Both children's greed and cookie sizes ↑ |
| Queue reconstruction by height | Height ↓, then position in queue ↑ |
| Merge intervals | Start time ↑ |

### Worked example: Two City Scheduling

You need to send `2n` people to two cities (n each). Each person has a cost to fly to city A and a cost to fly to city B. Minimize total cost.

Greedy insight: think about the "cost of routing someone to A vs B." Define the **difference** = `(costA - costB)` for each person.
- A large negative difference means: "sending this person to A is much cheaper than sending them to B." They should definitely go to A.
- A large positive difference means: "sending this person to B is much cheaper." They should go to B.

**Algorithm:** sort people by `(costA - costB)`. Send the first `n` (most A-preferring) to city A. Send the last `n` to city B.

```js
function twoCitySchedCost(costs) {
  costs.sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]));
  let total = 0;
  for (let i = 0; i < costs.length; i++) {
    total += i < costs.length / 2 ? costs[i][0] : costs[i][1];
  }
  return total;
}
```

> ✋ **Pause and think**
> For the activity selection problem, why do we sort by **end time** and not by **duration** (end - start)? Can you think of a counterexample for sorting by duration?
>
> <details>
> <summary>Counterexample</summary>
>
> ```
> A: 1–3  (duration 2)
> B: 2–4  (duration 2)
> C: 3–5  (duration 2)
> ```
> All durations are equal. Sorted by duration: A, B, C (any order). Picking A, then C works (2 meetings). Picking B leaves neither A nor C (only 1 meeting). Duration gives no useful ordering here — end time does.
> </details>

---

<a id="lesson-12"></a>
## Lesson 12 — Heap + greedy: always picking the next best

Some greedy problems don't have a fixed sort order. At each step you need to pick the best *currently available* choice, but what's available changes as you go. For these, a **min-heap** or **max-heap** (priority queue) is your tool.

### The intuition

A heap is a data structure that always gives you the smallest (min-heap) or largest (max-heap) element in O(log n) time, while supporting O(log n) insertions. If you think of greedy as "always pick the next best," the heap is the machine that tracks what "best" is at any moment.

### Worked example: Connect Ropes with Minimum Cost

You have `n` ropes. You want to tie them all into one rope. Each time you connect two ropes of lengths `a` and `b`, the cost is `a + b`. Minimize total cost.

**Why greedy?** Every time you tie two ropes, both become part of every future concatenation. A rope involved in more operations contributes its length more times. To minimize total cost, combine the **shortest** available ropes first.

This is exactly the same problem structure as Huffman coding.

**Algorithm:** put all lengths in a min-heap. Repeatedly extract the two smallest, combine them (cost += sum), and insert the sum back.

```js
// With a min-heap (JavaScript doesn't have one built in — use a library or simulate)
function connectRopes(ropes) {
  const heap = new MinHeap(ropes);
  let cost = 0;
  while (heap.size() > 1) {
    const a = heap.extractMin();
    const b = heap.extractMin();
    cost += a + b;
    heap.insert(a + b);
  }
  return cost;
}
```

Time: O(n log n). Each heap operation is O(log n), done n times.

### Worked example: Last Stone Weight

You have a collection of stones with weights. Each round, take the two heaviest stones and smash them together. If equal, both are destroyed. If unequal, the larger remains with weight `heaviest - second`. What's the last stone's weight (or 0 if no stones remain)?

**Algorithm:** max-heap. Always extract the two heaviest, process the collision, insert the result (if nonzero).

> 🎯 **Key takeaway**
> When greedy needs to dynamically track the "current best" as items are added or consumed, use a heap. This pattern appears in interval scheduling with rooms, task scheduling, IPO (maximize capital), and Huffman coding.

---

<a id="lesson-13"></a>
## Lesson 13 — Recognizing greedy problems in interviews

Greedy problems have a distinctive "feel." Here are the signals to look for.

### Signal 1: "maximize/minimize count, meetings, tasks, activities"

If the problem asks for the **maximum number of non-overlapping X** or **minimum number of Y to cover Z**, it's often activity-selection style. Sorting + greedy.

### Signal 2: "always pick the locally biggest/smallest"

If a natural rule like "always give the smallest cookie to the least hungry child" or "always process the shortest job first" is obvious and doesn't seem to cause problems for later steps — try greedy.

### Signal 3: "can you reach / complete / satisfy all"

Problems like "can you reach the last index" (Jump Game), "can you give everyone correct change" (Lemonade Change), or "can you attend all meetings" (Meeting Rooms) are often greedy feasibility checks.

### Signal 4: "sort and then iterate" feels natural

If your first instinct is "sort these objects in a smart order and then make a pass," that's a sign the problem has greedy structure.

### Signal 5: constraints suggest O(n log n) is expected

If `n ≤ 10^5` or `n ≤ 10^6` and the problem asks for something that sounds like "most" or "minimum," O(n log n) from sorting + greedy is the expected target. O(n²) would be too slow.

### What to do when you're not sure: greedy vs DP

Ask yourself: **can an early choice harm a later choice?**

- If you grab item A now, does it prevent you from getting items B and C later (and B+C is worth more)? → Might need DP.
- If you grab item A now, the remaining problem is clearly identical in structure and your choice only "used up" the smallest piece of future time/capacity? → Probably greedy.

> ⚠️ **Don't just guess greedy**
> A common interview mistake is to claim "this is greedy" without being able to say why. Before coding, spend 30 seconds explaining your greedy rule and why it doesn't harm future choices. Even a rough verbal argument shows the interviewer you understand what you're doing.

---

<a id="lesson-14"></a>
## Lesson 14 — Common greedy patterns (cheat sheet)

Here are the patterns you'll encounter in the questions in this chapter, grouped by shape.

### Pattern A: Sort by end time, pick non-overlapping

Used in: Activity Selection, Non-Overlapping Intervals, Minimum Arrows to Burst Balloons, Video Stitching.

```
Sort intervals by end.
last_end = -Infinity
for each interval [s, e]:
  if s >= last_end:
    pick this interval
    last_end = e
```

### Pattern B: Sort by some "efficiency" key

Used in: Fractional Knapsack, Two City Scheduling, Maximum Units on a Truck, Minimum Cost to Hire K Workers.

```
Sort items by value_per_unit descending (or cost_difference ascending).
Walk through in sorted order, picking as long as capacity / budget allows.
```

### Pattern C: Sweep line (event processing)

Used in: Meeting Rooms II (minimum rooms), Car Pooling.

```
For each interval [s, e], add event (s, +1) and (e, -1).
Sort all events by time (break ties: ends before starts).
Sweep through, maintaining a running count.
The maximum running count is the answer.
```

### Pattern D: Two pointers on sorted array

Used in: Assign Cookies, Boats to Save People.

```
Sort both arrays (or sort one array, use two pointers).
i = 0 (pointer for smaller items), j = n-1 (pointer for larger).
Match greedily: pair smallest with largest if they fit, else advance larger.
```

### Pattern E: Greedy with running max/reach

Used in: Jump Game, Jump Game II.

```
max_reach = 0
for i from 0 to n-1:
  if i > max_reach: return false/count
  max_reach = max(max_reach, i + jumps[i])
```

For Jump Game II (minimum jumps):
```
jumps = 0, current_end = 0, furthest = 0
for i from 0 to n-2:
  furthest = max(furthest, i + jumps[i])
  if i == current_end:
    jumps++
    current_end = furthest
```

### Pattern F: Heap for dynamic "current best"

Used in: Last Stone Weight, Connect Ropes, Task Scheduler, IPO, Course Schedule III.

```
Build heap from initial data.
While problem not solved:
  Extract best element(s) from heap.
  Process.
  Insert new element(s) as needed.
```

### Pattern G: Running balance / circular check

Used in: Gas Station, Lemonade Change.

```
For Gas Station: if total gas >= total cost, a solution exists.
The starting point is the first index where running balance never goes negative.
```

### Pattern H: Two-pass greedy

Used in: Candy (distribute with rating constraints).

```
Pass 1 (left to right): ensure right-neighbor constraints.
Pass 2 (right to left): ensure left-neighbor constraints.
Take the max of both passes at each position.
```

> 💡 **Tip**
> The more patterns you internalize, the faster you recognize problems. Don't try to memorize all eight at once — work through the questions, let the patterns emerge naturally, and come back to this list to see where each question fits.

---

<a id="lesson-15"></a>
## Lesson 15 — Quick complexity reference

Most greedy algorithms are dominated by the sort step.

| Operation | Big-O |
|-----------|-------|
| Sort n items | O(n log n) |
| Single pass after sort | O(n) |
| Heap insert / extract | O(log n) |
| n heap operations | O(n log n) |
| Sweep line (sort events, one pass) | O(n log n) |
| Two-pointer walk | O(n) |

**Total for most greedy:** O(n log n) time, O(1) or O(n) extra space.

Compare with dynamic programming: DP on intervals is typically O(n²) time, O(n) space — and that's why greedy (when it applies) is much preferred.

### "Why is greedy usually faster than DP?"

DP considers all possible subsets of decisions. Greedy commits to one decision at each step and never reconsidered — so it does O(1) work per element instead of O(n) work. Multiply by n elements: O(n) vs O(n²).

The tradeoff: DP is always correct for problems with optimal substructure. Greedy is only correct when the greedy choice property also holds.

---

<a id="lesson-16"></a>
## Lesson 16 — You did it. Now what?

Take a breath. The greedy mindset takes time to internalize. Here's what you should carry away from these lessons:

1. **You know what greedy means** — locally optimal choice, no backtracking.
2. **You know when it works** — greedy choice property + optimal substructure.
3. **You know when it fails** — 0/1 knapsack, non-standard coin change, any problem where an early choice can block a better later combination.
4. **You know the two proof techniques** — exchange argument and stay-ahead argument.
5. **You know the main patterns** — sort-then-iterate, sweep line, two pointers, heap-based greedy.
6. **You can recognize greedy in interviews** — keywords, constraint sizes, the "does early choice hurt later?" test.

### What to do next

1. Open [`questions/01-assign-cookies.md`](./questions/01-assign-cookies.md).
2. Before coding, say out loud: "What is the greedy rule here? Why doesn't it hurt future choices?"
3. Write your solution in `solutions/01-assign-cookies.js`.
4. If stuck, re-read the hints, then re-read Lesson 5 or 11.
5. Tick the box in [`README.md`](./README.md).

### Pacing

- **Don't skip the easy ones.** They build the vocabulary you need for the medium and hard ones.
- **Spend time on the proof-drill questions (35–36).** Understanding why a greedy rule is correct is as valuable as coding it. Many interviewers explicitly ask "why does this work?"
- **When you finish an interval problem, ask yourself: which of the three classic interval questions was this?** Build the mental map.

You're not behind. You're building intuition that takes many problems to develop. Stick with it.

See you in [Q1](./questions/01-assign-cookies.md). 💪
