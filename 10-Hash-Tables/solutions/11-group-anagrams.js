/**
 * Q11 — Group Anagrams
 * Difficulty: Medium
 * Expected:   O(n · k log k) time · O(n · k) space
 * Problem:    ../questions/11-group-anagrams.md
 */

function groupAnagrams(strs) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// [['bat'], ['nat','tan'], ['ate','eat','tea']]  (any order)

console.log(groupAnagrams(['']));    // [['']]
console.log(groupAnagrams(['a']));   // [['a']]

module.exports = { groupAnagrams };
