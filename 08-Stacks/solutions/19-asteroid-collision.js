/**
 * Q19 — Asteroid Collision
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/19-asteroid-collision.md
 */

function asteroidCollision(asteroids) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(asteroidCollision([5, 10, -5]));    // [5, 10]
console.log(asteroidCollision([8, -8]));        // []
console.log(asteroidCollision([10, 2, -5]));    // [10]
console.log(asteroidCollision([-2, -1, 1, 2])); // [-2, -1, 1, 2]

module.exports = { asteroidCollision };
