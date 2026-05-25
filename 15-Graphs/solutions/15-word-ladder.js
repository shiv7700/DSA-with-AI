/**
 * Q15 — Word Ladder
 * Difficulty: Medium
 * Expected:   O(m² × n) time · O(m² × n) space
 * Problem:    ../questions/15-word-ladder.md
 */

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @returns {number} length of shortest transformation sequence, or 0
 */
function ladderLength(beginWord, endWord, wordList) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(ladderLength('hit', 'cog', ['hot','dot','dog','lot','log','cog'])); // 5
console.log(ladderLength('hit', 'cog', ['hot','dot','dog','lot','log']));       // 0
console.log(ladderLength('a', 'c', ['a','b','c']));                             // 2

module.exports = { ladderLength };
