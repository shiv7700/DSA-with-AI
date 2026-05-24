# Strings

> Strings are immutable in JS — every "modification" creates a new string. Keep this in mind for complexity.

## Concept Check

1. Why are JS strings immutable? What does that mean for performance?
2. Difference between `==` and `===` on strings.
3. `String.prototype.charAt(i)` vs `str[i]` — any difference?
4. How does `String.prototype.split('')` handle Unicode/emoji? (Hint: surrogate pairs)
5. When should you use a string `+` concat vs an array `.join('')`?
6. What does `localeCompare` do that `<` doesn't?

## Easy

1. Reverse a string (try 3 ways: built-in, loop, recursion).
2. Check if a string is a palindrome (ignore case & non-alphanumeric).
3. Count vowels and consonants.
4. Find the first non-repeating character.
5. Count the occurrences of each character (frequency map).
6. Check if two strings are anagrams.
7. Capitalize the first letter of every word (title case).
8. Convert a string to camelCase / snake_case / kebab-case.
9. Remove all whitespace from a string.
10. Replace all occurrences of a substring without using `.replaceAll`.

## Medium

11. **Longest Substring Without Repeating Characters** — sliding window.
12. **Group Anagrams** — given an array of strings, group anagrams together.
13. **Longest Palindromic Substring** — expand around center.
14. **Valid Parentheses** — `()[]{}` balanced check (stack).
15. **String Compression** — `aabcccccaaa` → `a2b1c5a3`.
16. **Implement `strStr()`** — find substring index (no `indexOf`).
17. **Integer to Roman / Roman to Integer**.
18. **ZigZag Conversion**.
19. **Multiply Strings** — without converting to number.
20. **Encode and Decode Strings** — for sending over network.

## Hard

21. **Minimum Window Substring** — smallest window in `s` containing all chars of `t`.
22. **Regular Expression Matching** — `.` and `*` support.
23. **Edit Distance** (Levenshtein).
24. **Longest Valid Parentheses**.
25. **KMP Pattern Matching** — implement the prefix-function.
26. **Rabin-Karp** — rolling hash substring search.
