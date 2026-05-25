# Q20 — Encode and Decode Strings

**Difficulty:** Medium
**Pattern:** Custom serialization · length-prefix encoding
**Expected:** O(n) time · O(n) space  (n = total characters across all strings)

## Problem

Design an algorithm to encode a **list of strings** into a single string for transmission over a network, and decode it back to the original list.

Implement two functions:
- **`encode(strs)`** — takes an array of strings and returns a single encoded string.
- **`decode(s)`** — takes an encoded string and returns the original array of strings.

Requirements:
- The encoding must be **lossless** — you must be able to recover the exact original strings, even if they contain any characters (spaces, slashes, special characters, even the delimiter you choose).
- The strings can be empty.
- The array can be empty.

> **Why this problem?** Naive delimiter-based encoding (e.g., join with `','`) breaks when strings contain the delimiter. This problem teaches you **length-prefix encoding** — a fundamental technique used in network protocols and file formats.

## Examples

### Example 1
```
Input:  ['Hello', 'World']
encode → '5#Hello5#World'   (or any encoding of your choice)
decode → ['Hello', 'World']
```

### Example 2
```
Input:  ['Hello', 'World#with#hashes']
encode → '5#Hello18#World#with#hashes'
decode → ['Hello', 'World#with#hashes']
```

### Example 3 (edge cases)
```
Input:  ['']             →  encode → '0#'           →  decode → ['']
Input:  []               →  encode → ''             →  decode → []
Input:  ['a', '', 'b']   →  encode → '1#a0#1#b'     →  decode → ['a', '', 'b']
```

## Constraints
- `0 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` contains any possible characters — you cannot assume a "safe" delimiter.

## Hints

<details>
<summary>Hint 1 — why simple delimiters fail</summary>

If you encode `['a', 'b']` as `'a,b'` and decode by splitting on `','`, that works.

But `['a,b', 'c']` would encode to `'a,b,c'`, and decoding gives `['a', 'b', 'c']` — wrong!

You need an encoding where the decoder can always tell exactly where one string ends and the next begins, regardless of the string contents.
</details>

<details>
<summary>Hint 2 — length-prefix encoding</summary>

Prefix each string with its length and a separator character (like `#`) that signals "the number before me is a length":

```
'Hello'  →  '5#Hello'
'World'  →  '5#World'
['Hello', 'World']  →  '5#Hello5#World'
```

To decode: read characters until you find `'#'`. Parse the characters before it as the length `len`. Then read the next `len` characters as the string content. Repeat.

This is unambiguous because the separator `#` only appears right after the length number.
</details>

<details>
<summary>Hint 3 — decoding implementation</summary>

```js
function decode(s) {
  const result = [];
  let i = 0;
  while (i < s.length) {
    let j = i;
    while (s[j] !== '#') j++;           // find the '#' separator
    const len = parseInt(s.slice(i, j)); // parse the length
    result.push(s.slice(j + 1, j + 1 + len)); // extract the string
    i = j + 1 + len;                    // advance past this entry
  }
  return result;
}
```
</details>

## Write your solution
→ [`../solutions/20-encode-decode-strings.js`](../solutions/20-encode-decode-strings.js)

## Follow-ups
- What if the strings could contain any Unicode characters (not just ASCII)? Does `s.length` still correctly represent the byte count?
- How do real serialization formats (JSON, Protocol Buffers, MessagePack) handle encoding arrays of strings?
- Implement encoding for a **map** (object with string keys and string values) instead of a plain array.
- What is the overhead of your encoding format in bytes, as a fraction of the total data size?
