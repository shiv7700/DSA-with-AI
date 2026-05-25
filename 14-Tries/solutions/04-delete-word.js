/**
 * Q4 — Delete a Word From a Trie
 * Difficulty: Easy (but subtle)
 * Expected:   O(L) time · O(L) space (call stack)
 * Problem:    ../questions/04-delete-word.md
 */

class Trie {
  constructor() {
    // TODO
  }
  insert(word)   { /* TODO */ }
  search(word)   { /* TODO: return boolean */ }
  delete(word)   { /* TODO: remove word, prune if safe */ }
}

// ── quick tests ──────────────────────────────────────────────
const trie = new Trie();
trie.insert("cat");
trie.insert("car");
trie.delete("cat");
console.log(trie.search("cat")); // false
console.log(trie.search("car")); // true

module.exports = { Trie };
