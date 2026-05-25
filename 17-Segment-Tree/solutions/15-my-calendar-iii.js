/**
 * Q15 — My Calendar III
 * Difficulty: Medium
 * Expected:   O(log n) per booking · O(n) space
 * Problem:    ../questions/15-my-calendar-iii.md
 */

class MyCalendarThree {
  constructor() {
    // TODO: initialise dynamic segment tree
  }

  book(startTime, endTime) {
    // TODO: range add +1 to [startTime, endTime), return global max
  }
}

// ── quick tests ──────────────────────────────────────────────
const cal = new MyCalendarThree();
console.log(cal.book(10, 20)); // 1
console.log(cal.book(50, 60)); // 1
console.log(cal.book(10, 40)); // 2

module.exports = { MyCalendarThree };
