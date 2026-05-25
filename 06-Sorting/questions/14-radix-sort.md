# Q14 — Radix Sort

**Difficulty:** Medium (Implement from scratch)
**Pattern:** Non-comparison sort, digit-by-digit
**Expected:** O(d × (n + k)) time · O(n + k) space

## Problem

Implement **Radix Sort (LSD variant)** for an array of non-negative integers.

Radix sort processes integers digit by digit, from the **least significant digit** (ones place) to the **most significant digit**. At each digit position, it uses a **stable** sort (typically counting sort) to sort by that digit only.

Because a stable sort at each step preserves the ordering from previous steps, the result after processing all digits is a fully sorted array.

**The algorithm:**

1. Find the maximum value to determine the number of digit positions (`d`).
2. For each digit position (ones, tens, hundreds, …):
   a. Extract the digit at this position for each element.
   b. Perform a stable counting sort on that digit.

**Properties:**
- **Stable**: Yes
- **In-place**: No (O(n + k) extra space for the counting sort subroutine)
- **Time**: O(d × (n + k)) where d = number of digits, k = base (10 for decimal)
- For 32-bit integers: d ≤ 10, k = 10, so effectively O(n)

## Examples

### Example 1
```
Input:  [170, 45, 75, 90, 802, 24, 2, 66]

Pass 1 — sort by ones digit:
  170→0, 90→0, 802→2, 2→2, 24→4, 45→5, 75→5, 66→6
  After:  [170, 90, 802, 2, 24, 45, 75, 66]

Pass 2 — sort by tens digit:
  802→0, 2→0, 24→2, 45→4, 66→6, 170→7, 75→7, 90→9
  After:  [802, 2, 24, 45, 66, 170, 75, 90]

Pass 3 — sort by hundreds digit:
  2→0, 24→0, 45→0, 66→0, 75→0, 90→0, 170→1, 802→8
  After:  [2, 24, 45, 66, 75, 90, 170, 802]

Output: [2, 24, 45, 66, 75, 90, 170, 802]  ✓
```

### Example 2
```
Input:  [3, 1, 2]
Output: [1, 2, 3]
```

### Example 3
```
Input:  [0]
Output: [0]

Input:  []
Output: []
```

## Constraints
- `0 <= arr.length <= 10^5`
- `0 <= arr[i] <= 10^9`
- Return a new sorted array.

## Hints

<details>
<summary>Hint 1 — extracting a digit</summary>

To get the digit at position `exp` (where `exp` is 1 for ones, 10 for tens, 100 for hundreds):

```js
const digit = Math.floor(value / exp) % 10;
```

For example: `Math.floor(170 / 10) % 10 = 17 % 10 = 7` (the tens digit of 170 is 7).
</details>

<details>
<summary>Hint 2 — counting sort by digit</summary>

At each pass, perform counting sort using only the current digit (0–9):

```js
function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n);
  const count  = new Array(10).fill(0);

  // count occurrences of each digit
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }

  // prefix sums
  for (let i = 1; i < 10; i++) count[i] += count[i - 1];

  // build output right-to-left (for stability)
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[--count[digit]] = arr[i];
  }

  return output;
}
```
</details>

<details>
<summary>Hint 3 — main loop</summary>

```js
function radixSort(arr) {
  if (arr.length === 0) return arr;

  const max = Math.max(...arr);
  let result = [...arr];

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    result = countingSortByDigit(result, exp);
  }

  return result;
}
```

The loop runs once per digit of the maximum value. For max = 802 (3 digits), it runs 3 times.
</details>

## Write your solution
→ [`../solutions/14-radix-sort.js`](../solutions/14-radix-sort.js)

## Follow-ups
- Implement radix sort using base 256 (byte-level) instead of base 10. How does this change the number of passes for a 32-bit integer?
- Can radix sort handle negative integers? How would you extend it?
- Sort an array of strings of equal length using radix sort (MSD variant — most significant digit first).
