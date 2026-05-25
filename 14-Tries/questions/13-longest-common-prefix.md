# Q13 — Longest Common Prefix of an Array of Strings

**Difficulty:** Medium
**Pattern:** Trie — single-child chain detection
**Expected:** O(N × L) time · O(N × L) space

## Problem

Given an array of strings `strs`, find the **longest common prefix** shared by all strings. If there is no common prefix, return an empty string `""`.

> **Why use a trie?** A trie makes the structure of shared prefixes explicit. The longest common prefix is the longest path from the root where every node has exactly one child (no branching) and is not marked as the end of any shorter string.

## Examples

### Example 1
```
Input:  strs = ["flower", "flow", "flight"]
Output: "fl"
```
All three share "fl". "flow" only shares "fl" with "flight" (third char differs: 'o' vs 'i').

### Example 2
```
Input:  strs = ["dog", "racecar", "car"]
Output: ""
```
No common prefix — first characters differ.

### Example 3
```
Input:  strs = ["interview", "interact", "intermediate"]
Output: "inter"
```

### Example 4 (edge cases)
```
Input:  strs = ["a"]            → "a"
Input:  strs = ["ab", "a"]      → "a"
Input:  strs = []               → ""
```

## Constraints
- `0 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` consists of lowercase English letters only.

## Hints

<details>
<summary>Hint 1 — the vertical scan approach (no trie needed)</summary>

Compare all strings column by column. Take the first string as the reference. For each character at position `i`:
- If any other string has a different character at position `i`, return the prefix built so far.
- If any string is shorter than `i + 1`, return the prefix so far.

If you finish iterating, return the whole first string.

This is O(N × L) and doesn't need a trie. It's the simplest solution.
</details>

<details>
<summary>Hint 2 — the trie approach</summary>

Insert all strings into a trie. Then walk from the root, following the path as long as:
1. The current node has **exactly one child**, AND
2. The current node does **not** have `isEnd = true`.

Stop as soon as either condition fails. The path built so far is the longest common prefix.

Why condition 2? If some string ends here (e.g., `"flow"` while `"flower"` is also in the trie), the LCP is at most `"flow"`.
</details>

<details>
<summary>Hint 3 — when to stop walking</summary>

- **More than one child:** the strings diverge here (different characters), so the LCP ends.
- **`isEnd = true`:** one of the strings ends at this node, so the LCP is at most this prefix.
- **No children:** you've walked through the entire shortest string (it IS the LCP).
</details>

## Write your solution
→ [`../solutions/13-longest-common-prefix.js`](../solutions/13-longest-common-prefix.js)

## Follow-ups
- LeetCode 14 — this exact problem (though the expected trie solution is overkill; vertical scan is preferred there).
- Find the longest common **suffix** of all strings.
- Find the longest common prefix among any two strings in the array (not necessarily all of them).
