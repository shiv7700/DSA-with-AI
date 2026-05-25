# Q13 — Counting Sort

**Difficulty:** Easy (Implement from scratch)
**Pattern:** Non-comparison sort, integer keys
**Expected:** O(n + k) time · O(n + k) space

## Problem

Implement **Counting Sort** for an array of non-negative integers.

Counting sort works by counting the number of times each value appears, then using those counts to place elements directly into their correct positions — no comparisons needed.

Because it never compares elements to each other, it can sort faster than the O(n log n) lower bound that applies to comparison sorts.

**The algorithm:**
1. Find the maximum value `k` in the array.
2. Create a `count` array of size `k + 1`, initialized to zeros.
3. For each element in the input, increment `count[element]`.
4. Convert the count array into a prefix sum array: `count[i] += count[i-1]`. Now `count[v]` tells you how many elements are ≤ v.
5. Walk the input array **right-to-left** (for stability), placing each element using `count`:
   - Element `v` goes to index `count[v] - 1`.
   - Decrement `count[v]`.
6. Return the output array.

**Properties:**
- **Stable**: Yes (with the right-to-left pass in step 5)
- **In-place**: No (requires an output array of size n)
- **Time**: O(n + k) where k is the maximum value
- **Space**: O(n + k)

**Limitation**: Only works on non-negative integers. Only efficient when k is comparable to n.

## Examples

### Example 1
```
Input:  [4, 2, 2, 8, 3, 3, 1]
k = 8

Step 1 — Count:
  count = [0, 1, 2, 2, 1, 0, 0, 0, 1]
           idx: 0  1  2  3  4  5  6  7  8

Step 2 — Prefix sums:
  count = [0, 1, 3, 5, 6, 6, 6, 6, 7]

Step 3 — Place (right to left):
  element 1: goes to index count[1]-1=0, count[1]-- → output[0]=1
  element 3: goes to index count[3]-1=4, count[3]-- → output[4]=3
  element 3: goes to index count[3]-1=3, count[3]-- → output[3]=3
  element 8: goes to index count[8]-1=6, count[8]-- → output[6]=8
  element 2: goes to index count[2]-1=2, count[2]-- → output[2]=2
  element 2: goes to index count[2]-1=1, count[2]-- → output[1]=2
  element 4: goes to index count[4]-1=5, count[4]-- → output[5]=4

Output: [1, 2, 2, 3, 3, 4, 8]
```

### Example 2
```
Input:  [0, 0, 0]
Output: [0, 0, 0]
```

### Example 3
```
Input:  [1]
Output: [1]

Input:  []
Output: []
```

## Constraints
- `0 <= arr.length <= 10^5`
- `0 <= arr[i] <= 10^4` (values are non-negative integers in a bounded range)
- Return a new sorted array.

## Hints

<details>
<summary>Hint 1 — finding k and building the count array</summary>

```js
const k = Math.max(...arr);       // or use a for loop for very large arrays
const count = new Array(k + 1).fill(0);
for (const val of arr) {
  count[val]++;
}
```
</details>

<details>
<summary>Hint 2 — building the prefix sum</summary>

```js
for (let i = 1; i <= k; i++) {
  count[i] += count[i - 1];
}
```

After this step, `count[v]` equals "how many input elements are ≤ v". So the last element with value `v` in sorted order should go to index `count[v] - 1`.
</details>

<details>
<summary>Hint 3 — why right-to-left for stability</summary>

If you process elements left-to-right, equal elements get placed in reverse order (the one you process first gets placed last). By processing right-to-left and decrementing after each placement, the last occurrence in the original array gets the highest position among equal elements — preserving original relative order (stability).
</details>

## Write your solution
→ [`../solutions/13-counting-sort.js`](../solutions/13-counting-sort.js)

## Follow-ups
- Modify counting sort to handle an array with negative integers (e.g., values in range [-5, 10]).
- Sort an array of lowercase letters using counting sort (a=0, b=1, …, z=25).
- When n = 10 and k = 10^9, why would counting sort be a terrible choice?
