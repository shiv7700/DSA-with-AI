/**
 * Q17 — Top K Frequent Words
 * Difficulty: Medium
 * Expected:   O(n log k) time · O(n) space
 * Problem:    ../questions/17-top-k-frequent-words.md
 */

function topKFrequentWords(words, k) {
  // TODO: build a frequency map
  // Use a min-heap of size k with a custom comparator:
  //   - lower frequency → evicted first
  //   - same frequency + later alphabetically → evicted first
  // Collect heap contents, reverse to get descending-frequency order
}

// ── quick tests ──────────────────────────────────────────────
console.log(topKFrequentWords(["i","love","leetcode","i","love","coding"], 2));
// ["i","love"]
console.log(topKFrequentWords(["the","day","is","sunny","the","the","the","sunny","is","is"], 4));
// ["the","is","sunny","day"]

module.exports = { topKFrequentWords };
