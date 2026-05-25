# Q13 — Restore IP Addresses

**Difficulty:** Medium
**Pattern:** Backtracking — partition a string into exactly 4 valid segments
**Expected:** O(1) time · O(1) space — the input is bounded to length 12

## Problem

A valid IP address consists of exactly four integers separated by single dots. Each integer is between `0` and `255` (inclusive) and cannot have leading zeros.

Given a string `s` containing only digits, return all possible valid IP addresses that can be formed by inserting dots into `s`. You are **not** allowed to reorder or remove any digits in `s`. You may return the valid IP addresses in any order.

## Examples

### Example 1
```
Input:  s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]
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

## Constraints
- `1 <= s.length <= 20`
- `s` consists of digits only.

## Hints

<details>
<summary>Hint 1 — 4 segments, backtrack by choosing segment length</summary>

At each step, choose how many characters form the next segment (1, 2, or 3 characters). After placing 4 segments, check if you've consumed the entire string.
</details>

<details>
<summary>Hint 2 — validation rules for each segment</summary>

A segment is valid if: (1) it consists of 1–3 characters, (2) its integer value is between 0 and 255, and (3) it has no leading zeros — i.e., `"01"` and `"00"` are invalid; `"0"` alone is fine.
</details>

<details>
<summary>Hint 3 — pruning</summary>

If you have placed `k` segments and the remaining string is too short (< `4 - k` characters) or too long (> `3 * (4 - k)` characters), no valid completion is possible — prune this branch immediately.
</details>

## Write your solution
→ [`../solutions/13-restore-ip-addresses.js`](../solutions/13-restore-ip-addresses.js)

## Follow-ups
- **IP to CIDR** — generate CIDR blocks from an IP address and a range.
- **Validate IP Address** — given a string, determine if it is a valid IPv4 or IPv6 address.
- Extend the approach to restore valid IPv6 addresses.
