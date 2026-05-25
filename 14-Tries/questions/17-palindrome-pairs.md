# Q17 — Palindrome Pairs

**Difficulty:** Hard
**Pattern:** Trie on reversed words + palindrome check
**Expected:** O(N × L²) time · O(N × L) space

## Problem

Given a list of **unique** strings `words`, find all pairs `[i, j]` such that `words[i] + words[j]` is a palindrome. Return all such pairs as a list. The order of pairs does not matter.

> A **palindrome** reads the same forwards and backwards (e.g., "racecar", "abba", "a").

## Examples

### Example 1
```
Input:  words = ["abcd","dcba","lls","s","sssll"]
Output: [[0,1],[1,0],[3,2],[2,4]]
```
- "abcd" + "dcba" = "abcddcba" → palindrome → [0,1]
- "dcba" + "abcd" = "dcbaabcd" → palindrome → [1,0]
- "s" + "lls" = "slls" → palindrome → [3,2]
- "lls" + "sssll" = "llssssll" → palindrome → [2,4]

### Example 2
```
Input:  words = ["bat","tab","cat"]
Output: [[0,1],[1,0]]
```
- "bat" + "tab" = "battab" → palindrome
- "tab" + "bat" = "tabbat" → palindrome

### Example 3 (empty string)
```
Input:  words = ["a",""]
Output: [[0,1],[1,0]]
```
"a" + "" = "a" and "" + "a" = "a" — both palindromes.

## Constraints
- `1 <= words.length <= 5000`
- `0 <= words[i].length <= 300`
- `words[i]` consists of lowercase English letters.
- All words are unique.

## Hints

<details>
<summary>Hint 1 — brute force and why it's too slow</summary>

Check every pair `(i, j)` — O(N²) pairs, and palindrome check is O(L). Total: O(N² × L). With N=5000 and L=300, that's 750 million operations. Too slow.
</details>

<details>
<summary>Hint 2 — the trie approach with reversed words</summary>

Insert all words (reversed) into a trie. For each word `w = words[i]`, walk the trie character by character. At each position `k`:

**Case 1:** `w[0..k-1]` matches a full reversed word `rev(words[j])`, AND `w[k..]` is a palindrome. Then `words[i] + words[j]` is a palindrome.

**Case 2:** We've fully matched `w` in the trie, but the trie path continues. If the remaining trie path spells a palindrome, then `words[j] + words[i]` is a palindrome (where `j` is the word whose reversed prefix remains).

This is subtle. Working out these two cases carefully and implementing the palindrome check sub-function is the main challenge.
</details>

<details>
<summary>Hint 3 — palindrome check helper</summary>

```js
function isPalin(s, lo, hi) {
  while (lo < hi) {
    if (s[lo] !== s[hi]) return false;
    lo++; hi--;
  }
  return true;
}
```

Use this to check substrings without allocating new strings.
</details>

## Write your solution
→ [`../solutions/17-palindrome-pairs.js`](../solutions/17-palindrome-pairs.js)

## Follow-ups
- LeetCode 336 — this exact problem.
- The hash map approach: for each word, enumerate all split points and check if the prefix or suffix is a palindrome and the reverse of the other half is in the set. Compare complexity with the trie approach.
- What if words could be repeated (not unique)?
