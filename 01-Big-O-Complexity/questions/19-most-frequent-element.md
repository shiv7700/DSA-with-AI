# Q19 — Optimization Drill: Most Frequent Element (O(n²) → O(n))

**Difficulty:** Easy–Medium
**Pattern:** Frequency counting with a hash map
**Expected:** O(n) time · O(n) space

## Problem

Given an array of integers, return the element that appears most frequently. If there is a tie, return any one of the tied elements.

The naive brute-force approach is O(n²). Your task:
1. Implement the naive solution and explain why it's O(n²).
2. Implement an O(n) solution using a hash map (frequency counter).
3. State the time and space complexity of your optimized solution.

## Examples

### Example 1
```
Input:  [1, 3, 1, 3, 2, 1]
Output: 1
```
Because 1 appears 3 times (more than 3 appearing twice and 2 appearing once).

### Example 2
```
Input:  [7, 7, 8, 8, 9]
Output: 7  (or 8 — tied at 2 appearances each)
```

### Example 3
```
Input:  [5]
Output: 5
```

### Example 4
```
Input:  ['a', 'b', 'a', 'c', 'b', 'a']
Output: 'a'
```

## Constraints
- `1 <= arr.length <= 10^5`
- Elements can be numbers or strings.
- Return any element in case of a tie.

## Hints

<details>
<summary>Hint 1 — why is naive O(n²)?</summary>

A naive approach: for each element, count how many times it appears in the array. Keep track of the maximum count seen so far.

```js
for (let i = 0; i < arr.length; i++) {
  let count = 0;
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] === arr[i]) count++;
  }
  // update max...
}
```

The inner loop runs n times for each of the n elements: O(n²). For n = 100,000, that's 10 billion comparisons.
</details>

<details>
<summary>Hint 2 — one pass to build a frequency map</summary>

Instead of counting each element from scratch, make a single pass through the array and build a `Map` from element → count:

```
Pass through [1, 3, 1, 3, 2, 1]:
  see 1 → freq = {1: 1}
  see 3 → freq = {1: 1, 3: 1}
  see 1 → freq = {1: 2, 3: 1}
  see 3 → freq = {1: 2, 3: 2}
  see 2 → freq = {1: 2, 3: 2, 2: 1}
  see 1 → freq = {1: 3, 3: 2, 2: 1}
```

Now iterate the map to find the key with the maximum value. Two O(n) passes total: **O(n)**.
</details>

<details>
<summary>Hint 3 — combine into a single pass</summary>

You can even do it in one pass: while building the frequency map, keep track of the current maximum element:

```js
let maxEl = arr[0], maxCount = 0;
const freq = new Map();

for (const x of arr) {
  const count = (freq.get(x) ?? 0) + 1;
  freq.set(x, count);
  if (count > maxCount) {
    maxCount = count;
    maxEl = x;
  }
}
return maxEl;
```

One pass. O(1) per step. Total: O(n) time, O(n) space (the map).
</details>

## Write your solution
→ [`../solutions/19-most-frequent-element.js`](../solutions/19-most-frequent-element.js)

## Follow-ups
- What is the space complexity of your O(n) solution? Can you tighten the bound (is it always O(n), or could it be less)?
- **Top K Frequent Elements** — return the k most frequent elements. What is the best complexity you can achieve?
- If the array were already sorted, how would you find the most frequent element more efficiently? What complexity would that be?
- Solve "most frequent element" using `Array.prototype.reduce` in one expression.
