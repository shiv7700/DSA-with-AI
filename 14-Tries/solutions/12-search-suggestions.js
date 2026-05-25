/**
 * Q12 — Search Suggestions System
 * Difficulty: Medium
 * Expected:   O(N × L) build · O(L²) query · O(N × L) space
 * Problem:    ../questions/12-search-suggestions.md
 */

function suggestedProducts(products, searchWord) {
  // TODO: return list of lists — top 3 lex-smallest matches per prefix
}

// ── quick tests ──────────────────────────────────────────────
console.log(suggestedProducts(
  ["mobile","mouse","moneypot","monitor","mousepad"], "mouse"
));
// [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],
//  ["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]

module.exports = { suggestedProducts };
