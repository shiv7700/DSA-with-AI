# Q12 — First Unique Character in a Stream

**Difficulty:** Medium
**Pattern:** Queue + frequency map — maintain order of candidates
**Expected:** O(1) amortized per character · O(1) space (fixed 26-letter alphabet)

## Problem

You are reading characters from a data stream one at a time. After each new character arrives, report the **first non-repeating character** seen so far. If there is no such character, report `'#'`.

**Signature:**
```js
class FirstUnique {
  constructor() { ... }
  add(char) { ... }       // add a character from the stream
  firstUnique() { ... }   // return the first unique char, or '#'
}
```

Alternatively, implement as a function:
```js
function processStream(stream) { ... }
// stream: string of lowercase letters
// Returns: string[] where result[i] is the answer after reading stream[i]
```

## Examples

### Example 1
```
Stream:  "aabcbd"

After 'a': unique chars = [a]     → 'a'
After 'a': 'a' repeats, gone      → '#'
After 'b': unique chars = [b]     → 'b'
After 'c': unique chars = [b, c]  → 'b'   (b came before c)
After 'b': 'b' repeats, gone      → 'c'
After 'd': unique chars = [c, d]  → 'c'

Output: ['a', '#', 'b', 'b', 'c', 'c']
```

### Example 2
```
Stream:  "zz"
Output:  ['z', '#']
```

## Constraints
- Characters are lowercase English letters (`a`–`z`).
- Stream length `<= 10^4`.

## Hints

<details>
<summary>Hint 1 — tracking order AND uniqueness</summary>

You need two things:
1. **A frequency map** (object or Map) to know how many times each character has appeared.
2. **A queue** to remember the order characters first appeared, so you can answer "which unique character came *first*?"
</details>

<details>
<summary>Hint 2 — processing a new character</summary>

When character `c` arrives:
1. Increment `freq[c]`.
2. If `freq[c] === 1` (first time seen): enqueue `c`.
3. To answer `firstUnique()`: peek at the front of the queue. If `freq[front] > 1`, dequeue it (it's no longer unique) and peek again. Repeat until the front is unique (`freq[front] === 1`) or the queue is empty.
</details>

<details>
<summary>Hint 3 — lazy cleanup</summary>

Notice you don't eagerly remove duplicates from the queue when they repeat. You leave them in and skip them lazily when answering `firstUnique()`. This is the "lazy" or "amortized" cleanup pattern — each character is enqueued and dequeued at most once.
</details>

## Write your solution
→ [`../solutions/12-first-unique-character-stream.js`](../solutions/12-first-unique-character-stream.js)

## Follow-ups
- What is the time complexity per query? Per character added?
- Modify the solution to handle all Unicode characters, not just the 26 lowercase letters.
- What if you also need to support a `remove(char)` operation that removes a character from the stream?
