# Q20 — Integer to English Words

**Difficulty:** Medium
**Pattern:** Chunked grouping (thousands, millions, billions)
**Expected:** O(log n) time · O(1) space (constant-size lookup tables)

## Problem

Convert a non-negative integer `num` to its English words representation.

## Examples

### Example 1
```
Input:  123
Output: "One Hundred Twenty Three"
```

### Example 2
```
Input:  12345
Output: "Twelve Thousand Three Hundred Forty Five"
```

### Example 3
```
Input:  1000010
Output: "One Million Ten"
```

### Example 4
```
Input:  0
Output: "Zero"
```

### Example 5
```
Input:  1000000000
Output: "One Billion"
```

## Constraints
- `0 <= num <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — split into chunks of 1000</summary>

English numbers are naturally grouped in threes: millions, thousands, hundreds. Process the number in chunks: `num % 1000` gives the last three digits; `Math.floor(num / 1000)` gives the rest.

Apply scale words: `['', 'Thousand', 'Million', 'Billion']`.
</details>

<details>
<summary>Hint 2 — handle the tricky teens</summary>

Numbers 11–19 are irregular in English ("eleven" not "one-teen"). Build lookup tables:

```js
const ones = ['', 'One', 'Two', …, 'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', …, 'Ninety'];
```

For a 3-digit chunk: handle hundreds place, then handle the tens+ones using the tables.
</details>

<details>
<summary>Hint 3 — watch for extra spaces</summary>

When concatenating parts, extra spaces are easy to introduce. Use `[…].filter(Boolean).join(' ')` to safely join non-empty parts.
</details>

## Write your solution
→ [`../solutions/20-integer-to-english-words.js`](../solutions/20-integer-to-english-words.js)

## Follow-ups
- Extend to handle up to `10^15` (Quadrillion).
- Write the reverse: English words to integer.
