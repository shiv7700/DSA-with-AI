# Q5 — Character Frequency Map

**Difficulty:** Easy
**Pattern:** Frequency map (hash map)
**Expected:** O(n) time · O(k) space (k = number of distinct characters)

## Problem

Given a string `s`, return an object (or `Map`) that maps each character to the number of times it appears in `s`.

Then answer two bonus questions using the map you built:
1. Which character appears the **most**?
2. Which characters appear **exactly once**?

## Examples

### Example 1
```
Input:  'hello world'
Output: { h: 1, e: 1, l: 3, o: 2, ' ': 1, w: 1, r: 1, d: 1 }

Most frequent: 'l' (3 times)
Appear once:   ['h', 'e', ' ', 'w', 'r', 'd']
```

### Example 2
```
Input:  'aabbcc'
Output: { a: 2, b: 2, c: 2 }

Most frequent: 'a', 'b', or 'c' (tied at 2)
Appear once:   []
```

### Example 3
```
Input:  ''
Output: {}

Most frequent: null
Appear once:   []
```

## Constraints
- `0 <= s.length <= 10^5`
- `s` can contain any printable ASCII characters (letters, digits, spaces, punctuation).

## Hints

<details>
<summary>Hint 1 — building the map</summary>

Iterate over every character and increment its count. The `?? 0` (nullish coalescing) trick gives a default of `0` for unseen characters:

```js
const freq = {};
for (const char of s) {
  freq[char] = (freq[char] ?? 0) + 1;
}
```
</details>

<details>
<summary>Hint 2 — finding the most frequent character</summary>

After building the map, iterate over its entries and keep track of the character with the highest count:

```js
let maxChar = null;
let maxCount = 0;
for (const [char, count] of Object.entries(freq)) {
  if (count > maxCount) {
    maxCount = count;
    maxChar = char;
  }
}
```
</details>

<details>
<summary>Hint 3 — finding characters that appear exactly once</summary>

Filter the entries of the map where the count equals 1:

```js
const uniques = Object.entries(freq)
  .filter(([, count]) => count === 1)
  .map(([char]) => char);
```

`Object.entries(obj)` returns `[key, value]` pairs. You destructure the pair and keep only what you need.
</details>

## Write your solution
→ [`../solutions/05-character-frequency-map.js`](../solutions/05-character-frequency-map.js)

## Follow-ups
- Return the top-k most frequent characters (sorted by frequency descending).
- Given two strings, return the characters that appear in **both** strings (intersection), using their frequency maps.
- Given a string, remove the character that appears most frequently and return the result.
- How would you handle this problem if the string were extremely large (say, 1 GB)? (Hint: streaming, chunked processing.)
