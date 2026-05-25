# Q14 — Stream of Characters

**Difficulty:** Medium
**Pattern:** Trie on reversed words — suffix matching in stream
**Expected:** O(N × L) build · O(L × 26) per query · O(N × L) space

## Problem

You are given a list of `words`. Design a system that, when queried with a character from a live stream, returns `true` if any word in the list is a **suffix** of the characters queried so far.

- `StreamChecker(words)` — builds the structure from a word list.
- `query(letter)` — processes the next character from the stream. Returns `true` if any word in `words` is a suffix of all characters processed so far.

> **Example:** words = `["cd", "f", "kl"]`, stream = `[a, b, c, d, e, f, g]`
> - After `a`: `["a"]` — no word is a suffix → false
> - After `d`: `["a","b","c","d"]` — "cd" is a suffix → true
> - After `f`: `["a","b","c","d","e","f"]` — "f" is a suffix → true

## Examples

### Example 1
```
const sc = new StreamChecker(["cd", "f", "kl"]);
sc.query('a');   // false
sc.query('b');   // false
sc.query('c');   // false
sc.query('d');   // true  — "cd" is a suffix of "abcd"
sc.query('e');   // false
sc.query('f');   // true  — "f" is a suffix of "abcdef"
sc.query('g');   // false
sc.query('h');   // false
sc.query('i');   // false
sc.query('j');   // false
sc.query('k');   // false
sc.query('l');   // true  — "kl" is a suffix of "abcdefghijkl"
```

## Constraints
- `1 <= words.length <= 2000`
- `1 <= words[i].length <= 200`
- `words[i]` consists of lowercase English letters.
- `letter` is a lowercase English letter.
- At most `4 × 10^4` calls to `query`.

## Hints

<details>
<summary>Hint 1 — why suffix matching is hard with a regular trie</summary>

A standard trie is great for prefix matching: does the stream so far **start with** some word? But we need **suffix** matching: does the stream so far **end with** some word?

Naively, you'd need to check whether any stored word matches any suffix of the stream — which means checking many different tail substrings.
</details>

<details>
<summary>Hint 2 — the key trick: reverse the words and the stream</summary>

Insert all words into a trie — but **reversed**. So `"cd"` is inserted as `"dc"`, `"kl"` as `"lk"`.

As characters arrive in the stream, maintain a **reversed buffer** (or just the characters in reverse-arrival order). For each new character, it becomes the new "first" character of the reversed stream.

Now the question "does any word end the stream so far?" becomes "does any (reversed) word start the (reversed stream prefix)?" — which IS a standard prefix query.
</details>

<details>
<summary>Hint 3 — implementation approach</summary>

Keep a list of "active trie nodes" — nodes that are currently being tracked as potential matches.

On each `query(letter)`:
1. Start a new tracking at the root (each query starts a fresh possible match).
2. Advance all currently active nodes by one step following `letter`.
3. Remove any nodes that can't follow `letter`.
4. If any active node has `isEnd = true`, return `true`.

Because we reversed the words, `letter` is the first character of the reversed word. Each subsequent query extends the match one character to the left (in the original stream).
</details>

## Write your solution
→ [`../solutions/14-stream-of-characters.js`](../solutions/14-stream-of-characters.js)

## Follow-ups
- LeetCode 1032 — this exact problem.
- What if you wanted to find **which** words matched, not just whether any word matched?
- How would you handle a streaming scenario where millions of characters arrive per second?
