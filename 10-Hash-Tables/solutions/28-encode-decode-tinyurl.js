/**
 * Q28 — Encode and Decode TinyURL
 * Difficulty: Medium
 * Expected:   O(1) per call · O(n) space
 * Problem:    ../questions/28-encode-decode-tinyurl.md
 */

class TinyURL {
  constructor() {
    // TODO: initialize your storage
  }

  encode(longUrl) {
    // TODO: return a shortened URL string
  }

  decode(shortUrl) {
    // TODO: return the original long URL string
  }
}

// ── quick tests ──────────────────────────────────────────────
const tinyurl = new TinyURL();
const short = tinyurl.encode('https://leetcode.com/problems/design-tinyurl');
console.log(short);                  // some short URL
console.log(tinyurl.decode(short)); // 'https://leetcode.com/problems/design-tinyurl'

module.exports = { TinyURL };
