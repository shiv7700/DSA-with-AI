/**
 * Q10 — Autocomplete System
 * Difficulty: Medium
 * Expected:   O(N × L) build · O(L + K log K) per character · O(N × L) space
 * Problem:    ../questions/10-autocomplete-system.md
 */

class AutocompleteSystem {
  constructor(sentences, times) {
    // TODO: build structure from sentences + times
  }
  input(c) {
    // TODO: return top 3 by frequency (then lexicographic), reset on '#'
  }
}

// ── quick tests ──────────────────────────────────────────────
const sys = new AutocompleteSystem(
  ["i love you","island","iroman","i love leetcode"], [5,3,2,2]
);
console.log(sys.input("i")); // ["i love you","island","i love leetcode"]

module.exports = { AutocompleteSystem };
