# Q28 — Encode and Decode TinyURL

**Difficulty:** Medium
**Pattern:** HashMap as a bidirectional store
**Expected:** O(1) per encode/decode · O(n) space total

## Problem

Design a URL shortening service — a simplified TinyURL.

Implement two functions:
- `encode(longUrl)` — returns a shortened URL.
- `decode(shortUrl)` — returns the original long URL.

There is no restriction on how your encoded URL looks. It just must be decodable back to the original.

## Examples

```
encode('https://leetcode.com/problems/design-tinyurl')
→ 'http://tinyurl.com/4e9iAk'   (or any short form you choose)

decode('http://tinyurl.com/4e9iAk')
→ 'https://leetcode.com/problems/design-tinyurl'
```

## Constraints
- The number of `encode`/`decode` calls will be at most `10^4`.
- Any two different long URLs should map to different short codes.
- `decode(encode(url))` must return `url`.

## Hints

<details>
<summary>Hint 1 — two Maps, two directions</summary>

Use two maps:
- `longToShort`: `longUrl → shortCode`
- `shortToLong`: `shortCode → longUrl`

For `encode`: if the long URL is already in `longToShort`, return the existing short URL. Otherwise, generate a new code, store both mappings, and return the short URL.

For `decode`: look up the short URL in `shortToLong` and return the long URL.
</details>

<details>
<summary>Hint 2 — generating a short code</summary>

Simple approach: use a counter. `shortUrl = 'http://tinyurl.com/' + (++counter)`. Or use a random string of 6 alphanumeric characters (and retry if there's a collision — rare).
</details>

## Write your solution
→ [`../solutions/28-encode-decode-tinyurl.js`](../solutions/28-encode-decode-tinyurl.js)

## Follow-ups
- What if users try to decode a short URL that was never encoded? How should you handle that?
- How would you handle collisions if you use random codes?
- In a real system, what other concerns come up? (expiry, analytics, custom slugs)
