# Q3 — Comparison vs. Non-comparison Sorts

**Difficulty:** Easy (Concept Check)
**Pattern:** Sorting fundamentals
**Expected:** Understanding, no code required

## Problem

Sorting algorithms fall into two families:

**Comparison sorts** determine the order of elements by comparing them to each other ("is A less than B?"). They make no assumptions about what the values actually are — they work on any data type that can be ordered.

**Non-comparison sorts** use the actual numeric values of elements directly — they look at the digits or use a count array — and never perform direct element-to-element comparisons.

**Your tasks:**

1. Classify each algorithm:

   | Algorithm | Comparison or Non-comparison? |
   |---|---|
   | Bubble Sort | ? |
   | Merge Sort | ? |
   | Quick Sort | ? |
   | Counting Sort | ? |
   | Radix Sort | ? |
   | Bucket Sort | ? |
   | Heap Sort | ? |

2. What is the theoretical lower bound on the worst-case time complexity of any comparison sort? (You'll explore the proof in Q4.)

3. Why can non-comparison sorts be faster than O(n log n)?

4. Give a concrete case where Counting Sort is the right choice. Give a case where it would be a terrible choice.

## Examples

### Example 1 — why Counting Sort cannot sort arbitrary objects

```
Counting Sort needs to know: "what is the range of possible values?"
You'd need an array of size k (the max value).

Sorting names like ['Zara', 'Alice', 'Bob'] → you cannot directly map
strings to an integer range without hashing. Counting Sort doesn't apply.

Sorting ages in a university [18, 25, 21, 19, 18, 22] → values in range
[18, 25], that's k = 8 unique values. Counting Sort is perfect: O(n + 8) = O(n).
```

### Example 2 — Radix Sort on integers

```
Sorting 32-bit integers: at most 10 decimal digits.
n = 1,000,000 numbers, each with at most 10 digits.

Radix Sort: O(10 × (n + 10)) = O(10n) ≈ O(n).
Any comparison sort: O(n log n) = O(n × 20) ≈ O(20n).

Radix Sort is 2× faster in this case.
```

## Constraints

Conceptual question. No code required.

## Hints

<details>
<summary>Hint 1 — the comparison sort lower bound intuition</summary>

With n distinct elements there are n! (n factorial) possible orderings. Each comparison gives you one bit of information: "is A before B?" To distinguish between n! outcomes using yes/no questions, you need at least log₂(n!) questions. By Stirling's approximation, log₂(n!) ≈ n log n. So any comparison sort must make at least n log n comparisons in the worst case.
</details>

<details>
<summary>Hint 2 — how non-comparison sorts bypass the bound</summary>

Non-comparison sorts don't ask "is A before B?". Instead, they compute positions directly from value properties. Counting Sort asks "how many elements equal exactly 3?" and places all 3s directly. This gathers more than one bit of information per operation, which is why it can bypass the log factor.
</details>

<details>
<summary>Hint 3 — when Counting Sort is terrible</summary>

Counting Sort allocates an array of size k (the max value). Sorting `[1, 1000000000]` (just two numbers!) would require a count array of 1 billion entries. That's 4 GB of RAM for a two-element array. Terrible. Use it only when k is comparable to n.
</details>

## Write your solution
→ [`../solutions/03-comparison-vs-noncomparison.js`](../solutions/03-comparison-vs-noncomparison.js)

## Follow-ups
- Counting Sort requires non-negative integers. How would you adapt it to handle negative integers?
- Can you sort floating-point numbers with Radix Sort? What is the challenge?
