# Q25 — Restore IP Addresses

**Difficulty:** Hard
**Pattern:** Backtracking — segment a string into exactly 4 valid parts
**Expected:** O(1) time (bounded by constant — at most 3^4 = 81 valid IPs) · O(1) space

## Problem

Given a string `s` containing only digits, return all possible valid IP addresses that can be formed by inserting exactly three dots into `s`.

A valid IP address has the form `A.B.C.D` where:
- There are exactly **four** parts (octets).
- Each part is an integer between `0` and `255`.
- Each part has **no leading zeros** (except `"0"` itself).

Return the IP addresses in any order.

> **Why this problem?** Restore IP Addresses is a clean backtracking problem with strict validity constraints. You'll practice "try all splits, prune invalid ones" — a pattern that appears in parsing problems, interval problems, and string segmentation generally.

## Examples

### Example 1
```
Input:  s = "25525511135"
Output: ["255.255.11.135", "255.255.111.35"]
```

### Example 2
```
Input:  s = "0000"
Output: ["0.0.0.0"]
```

### Example 3
```
Input:  s = "101023"
Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
```

### Example 4
```
Input:  s = "1111111111111111"  (16 ones)
Output: []   (no valid IP — each octet can be at most 3 digits, 4×3=12 max)
```

## Constraints
- `1 <= s.length <= 20`
- `s` consists of digits only.

## Hints

<details>
<summary>Hint 1 — early termination: prune impossible strings</summary>

A valid IP has 4 octets, each 1–3 digits. So the total string length must be between 4 and 12.

If `s.length < 4` or `s.length > 12`, return `[]` immediately.
</details>

<details>
<summary>Hint 2 — the backtracking approach</summary>

Build the IP address part by part. At each step, decide where to cut the next segment — it can be 1, 2, or 3 characters long.

```
State: (start index in s, parts so far)
Base case: 4 parts built AND used all of s → valid IP
Pruning:
  - Segment > "255"
  - Segment has a leading zero but length > 1 (e.g., "01" is invalid)
  - Remaining characters can't fill the remaining parts
```
</details>

<details>
<summary>Hint 3 — the skeleton</summary>

```js
function restoreIpAddresses(s) {
  const result = [];

  function backtrack(start, parts) {
    if (parts.length === 4 && start === s.length) {
      result.push(parts.join('.'));
      return;
    }
    if (parts.length === 4 || start === s.length) return;  // early exit

    for (let len = 1; len <= 3; len++) {
      if (start + len > s.length) break;
      const segment = s.substring(start, start + len);
      if (segment.length > 1 && segment[0] === '0') break;  // leading zero
      if (parseInt(segment) > 255) break;
      parts.push(segment);
      backtrack(start + len, parts);
      parts.pop();  // ← backtrack
    }
  }

  backtrack(0, []);
  return result;
}
```
</details>

<details>
<summary>Hint 4 — additional pruning: remaining characters</summary>

After building `parts.length` segments starting at `start`, the remaining string has `s.length - start` characters. These must fill `4 - parts.length` more segments, each 1–3 digits. So:

```
remaining = s.length - start;
partsLeft = 4 - parts.length;
if (remaining < partsLeft || remaining > partsLeft * 3) return;
```

This prevents going down branches that are obviously impossible.
</details>

## Write your solution
→ [`../solutions/25-restore-ip-addresses.js`](../solutions/25-restore-ip-addresses.js)

## Follow-ups
- LeetCode 93: **Restore IP Addresses** — exact same problem.
- What if instead of IP addresses, you needed to restore valid dates (`YYYY-MM-DD`)? How would the validity constraints change?
- Count the number of valid IPs without generating them.
