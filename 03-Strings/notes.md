# Strings — Lessons from Zero

> 👋 Hey. If you just finished the Arrays chapter, you're in good shape. Strings feel familiar — they're sequences, just like arrays — but they have one major twist that changes how you solve almost every problem. We're going to unpack that twist carefully.
>
> If this is your first chapter: no worries. We'll go slow. Each lesson teaches **one small idea**. Don't skip. Don't rush. A small win at the end of each lesson is the whole point.
>
> Total reading time at a relaxed pace: about 90 minutes. **You don't have to read it all at once.**

---

## Table of Lessons

1. [What is a string? (the ticker-tape idea)](#lesson-1)
2. [Indexing and length](#lesson-2)
3. [Strings vs arrays — similarities and key differences](#lesson-3)
4. [The big twist: immutability](#lesson-4)
5. [Why immutability matters for performance](#lesson-5)
6. [Concatenation — and why `+=` in a loop is slow](#lesson-6)
7. [Comparing strings — `==`, `===`, and `localeCompare`](#lesson-7)
8. [The most useful string methods](#lesson-8)
9. [Splitting a string into an array (and back)](#lesson-9)
10. [Two-pointer technique on strings](#lesson-10)
11. [Frequency maps — the Swiss Army knife of string problems](#lesson-11)
12. [Palindromes — what they are and how to detect them](#lesson-12)
13. [Anagrams — recognizing them instantly](#lesson-13)
14. [Sliding window on strings](#lesson-14)
15. [JavaScript gotchas unique to strings](#lesson-15)
16. [Unicode and emojis — the surrogate-pair trap](#lesson-16)
17. [Building strings efficiently — array + join pattern](#lesson-17)
18. [Quick reference: methods, complexity, templates](#lesson-18)
19. [🔬 Going deeper: how V8 stores strings internally (optional)](#lesson-19)
20. [You did it — what to do next](#lesson-20)

---

<a id="lesson-1"></a>
## Lesson 1 — What is a string? (the ticker-tape idea)

Imagine a ticker tape — the kind that prints text one character at a time, left to right.

```
┌───┬───┬───┬───┬───┬───┐
│ h │ e │ l │ l │ o │ ! │
└───┴───┴───┴───┴───┴───┘
  0   1   2   3   4   5
```

A **string** is exactly that: a sequence of characters laid out in order, each with a position number (called an index).

In JavaScript:

```js
const greeting = 'hello!';
```

Every character has an index starting at 0. The `'h'` is at position 0, `'e'` at position 1, `'!'` at position 5.

Strings hold text — chat messages, names, URLs, passwords, email addresses, code itself. If you've done anything with a web page, you've used strings constantly, even if you didn't think about it.

> 🎯 **Key takeaway**
> A string is a sequence of characters, each at a numbered position starting from 0. Think: ticker tape.

---

<a id="lesson-2"></a>
## Lesson 2 — Indexing and length

Reading a character by index looks exactly like reading from an array:

```js
const name = 'Alice';

console.log(name[0]);   // 'A'
console.log(name[3]);   // 'c'
console.log(name[9]);   // undefined  (no character there)
```

And the length works the same way too:

```js
console.log(name.length);    // 5
console.log(name[name.length - 1]);  // 'e'  (last character)
```

The modern way to grab the last character:

```js
console.log(name.at(-1));    // 'e'
```

`at(-1)` counts backwards from the end. `-1` means last, `-2` means second-to-last, and so on.

> ✋ **Pause and try**
> If `url = 'https://example.com'`, what is `url[0]` and `url.at(-1)`?
>
> <details>
> <summary>Show answer</summary>
>
> - `url[0]` → `'h'`
> - `url.at(-1)` → `'m'`  (the last character of `'.com'`)
> </details>

> 🎯 **Key takeaway**
> String indexing works just like array indexing: `str[i]` gives you the character at position `i`. Out-of-bounds returns `undefined`. Last character: `str.at(-1)`.

---

<a id="lesson-3"></a>
## Lesson 3 — Strings vs arrays — similarities and key differences

Strings and arrays are close cousins. Understanding their relationship saves you a lot of confusion.

### Similarities

- Both are **sequences** with numeric indexes starting at 0.
- Both have a `.length` property.
- Both support `for...of` loops:

```js
for (const char of 'hello') {
  console.log(char);
}
// h
// e
// l
// l
// o
```

- Both can use `.includes()`, `.indexOf()`, and `.slice()`.

### Key differences

| Feature | Array | String |
|---|---|---|
| Can modify elements directly | Yes — `arr[0] = 'x'` | **No** — `str[0] = 'x'` silently fails |
| Mutating methods (`push`, `pop`, `sort`) | Yes | No — strings have none |
| Methods return new values | Sometimes | **Always** — strings never change |
| Type of elements | Anything | Only characters (single chars) |

The "No" in that second column is the big thing. **Strings can't be modified in place.** We're going to spend the next two lessons on exactly this.

> 🎯 **Key takeaway**
> Strings look like arrays of characters, but they're **read-only**. You can read any character by index. You cannot overwrite a character.

---

<a id="lesson-4"></a>
## Lesson 4 — The big twist: immutability

Let's make this concrete. Try this in your browser's console:

```js
let msg = 'hello';
msg[0] = 'H';
console.log(msg);   // 'hello'   — nothing changed!
```

We tried to capitalize the first letter. JavaScript didn't throw an error — it just silently **ignored** the assignment. The string is unchanged.

This is what **immutability** means: once a string is created, its characters are locked. You cannot change any of them.

The only way to "change" a string is to create a **brand new** string with the desired change:

```js
let msg = 'hello';
msg = msg[0].toUpperCase() + msg.slice(1);
console.log(msg);   // 'Hello'
```

Or with a template literal:

```js
msg = `${msg[0].toUpperCase()}${msg.slice(1)}`;
```

Either way, the old string `'hello'` still exists in memory (briefly, until the garbage collector cleans it up). We just pointed `msg` at a new string `'Hello'`.

> ⚠️ **Common mistake**
> Writing `str[0] = 'X'` and expecting it to work. It doesn't. In strict mode JavaScript actually throws a `TypeError`. In non-strict mode it silently does nothing. Either way, you don't get what you want. **You must build a new string.**

> 🎯 **Key takeaway**
> Strings are **immutable** in JavaScript. Every "edit" creates a new string. The original is untouched.

---

<a id="lesson-5"></a>
## Lesson 5 — Why immutability matters for performance

"A new string every time" sounds wasteful. And in some cases it is — that's why you need to know about it.

### The simple case: single operations are fine

```js
const upper = 'hello'.toUpperCase();   // 'HELLO'
const trimmed = '  hi  '.trim();       // 'hi'
const replaced = 'cats'.replace('c', 'b');  // 'bats'
```

Each of these creates exactly one new string. That's a constant amount of work. No problem.

### The expensive case: concatenation in a loop

Imagine you're building a long comma-separated list from 1,000 words:

```js
// ❌ slow approach
let result = '';
for (const word of words) {
  result += word + ', ';
}
```

Every time you write `result += ...`, JavaScript must:
1. Read the entire current string `result`.
2. Read the new piece you're appending.
3. Allocate memory for a new, longer string.
4. Copy all the characters from both parts into the new memory.
5. Throw away the old string.

If `result` is 5,000 characters long, **every append copies those 5,000 characters** again. The next append copies 5,001. Then 5,002. This is an O(n²) operation — quadratic.

The fix (covered in depth in Lesson 17):

```js
// ✅ fast approach
const parts = [];
for (const word of words) {
  parts.push(word + ', ');
}
const result = parts.join('');
```

Now we accumulate into an array (O(1) per `push`) and build the final string once with `.join('')` (one pass over all parts). Total: O(n).

> 💡 **Tip**
> If you're only concatenating 2–5 strings, `+` and template literals are perfectly fine. The performance cost only shows up when you're concatenating in a loop with many iterations.

> 🎯 **Key takeaway**
> Single string operations are cheap. Concatenating in a loop is O(n²) because each concatenation copies the whole string so far. Use **array + `.join()`** for building strings in loops.

---

<a id="lesson-6"></a>
## Lesson 6 — Concatenation — and why `+=` in a loop is slow

We previewed this in Lesson 5. Let's solidify it with a real example: building an HTML snippet from a list of names.

```js
const names = ['Alice', 'Bob', 'Chen', 'Diana'];

// ❌ Naive: O(n²) due to repeated copying
let html = '<ul>';
for (const name of names) {
  html += `<li>${name}</li>`;
}
html += '</ul>';
```

For four names this is totally fine. For 10,000 names, the concatenation copies an ever-growing string at each step.

```js
// ✅ Better: O(n) — collect parts, join once
const parts = ['<ul>'];
for (const name of names) {
  parts.push(`<li>${name}</li>`);
}
parts.push('</ul>');
const html = parts.join('');
```

Both produce exactly the same output. The second is just faster when `names` is large.

**Template literals** are perfectly fine for small-scale work:

```js
const greeting = `Hello, ${name}! You have ${count} messages.`;
```

They're syntactic sugar — under the hood, JavaScript still creates a new string. But it's one allocation, not a loop, so there's no problem.

> 💡 **Tip**
> Think of it this way: every `+` or `+=` on strings is like a merge operation that copies everything. One merge: fine. A thousand merges in a row: expensive. Know when you're in a loop.

---

<a id="lesson-7"></a>
## Lesson 7 — Comparing strings — `==`, `===`, and `localeCompare`

String comparison has some subtle traps worth knowing before you hit them in a problem.

### `===` is the right tool for equality

```js
'hello' === 'hello';   // true
'hello' === 'Hello';   // false  (case-sensitive)
'5'    === 5;          // false  (string vs number)
```

Always use `===` for string equality. Never `==`.

### `==` between a string and a number

This is a common gotcha:

```js
'5' == 5;    // true  ← JavaScript coerces the string to a number
'5' === 5;   // false ← no coercion
```

With `==`, JavaScript tries to convert types before comparing. With `===`, it compares types first — if they differ, it's immediately `false`. **Always use `===`.**

### `<` and `>` on strings — lexicographic order

```js
'apple' < 'banana';   // true   (alphabetical)
'cat'   > 'bat';      // true
'Z'     < 'a';        // true   ← uppercase letters come before lowercase!
```

JavaScript compares strings **character by character** using Unicode code points. `'Z'` has a smaller code point than `'a'`, so `'Z' < 'a'` is true even though `Z` comes after `a` in the alphabet visually.

If you're sorting a list of words and you want true dictionary order (case-insensitive, handles accents), use `localeCompare`:

```js
const words = ['banana', 'Apple', 'cherry'];
words.sort((a, b) => a.localeCompare(b));
// ['Apple', 'banana', 'cherry']
```

`localeCompare` is smart about language rules. It returns -1, 0, or 1 (negative, zero, positive) — the exact shape that `Array.sort` expects.

> ⚠️ **Common mistake**
> When you sort strings with `.sort()` and no comparator, it uses Unicode code point order. Numbers stored as strings sort badly: `['10', '2', '1'].sort()` → `['1', '10', '2']`. For words: `['Zebra', 'apple'].sort()` → `['Zebra', 'apple']` (uppercase first). Pass a comparator.

> 🎯 **Key takeaway**
> Use `===` for string equality. Use `localeCompare` for correct alphabetical sorting. Don't use `==` with mixed types.

---

<a id="lesson-8"></a>
## Lesson 8 — The most useful string methods

You'll use these over and over. Learn them once here, recognize them everywhere.

```js
const s = 'Hello, World!';
```

### Reading and searching

```js
s.length          // 13
s[0]              // 'H'
s.at(-1)          // '!'
s.charAt(1)       // 'e'   (same as s[1], but returns '' instead of undefined)

s.indexOf('o')    // 4    (first occurrence)
s.lastIndexOf('o')// 8    (last occurrence)
s.indexOf('xyz')  // -1   (not found)

s.includes('World')   // true
s.startsWith('Hello') // true
s.endsWith('!')        // true
```

### Slicing (extracting a portion)

```js
s.slice(7, 12)       // 'World'   (from index 7 up to but NOT including 12)
s.slice(-6)          // 'orld!'   (last 6 characters)
s.slice(7)           // 'World!'  (from index 7 to the end)
s.substring(7, 12)   // 'World'   (same as slice, but no negative indexes)
```

> 💡 **Tip: `slice` vs `substring`**
> `slice` is usually preferred because it handles negative indexes. `substring` is older and swaps arguments if `start > end`, which can be confusing. **Default to `slice`.**

### Case

```js
s.toLowerCase()   // 'hello, world!'
s.toUpperCase()   // 'HELLO, WORLD!'
```

### Trimming whitespace

```js
'  hello  '.trim()        // 'hello'
'  hello  '.trimStart()   // 'hello  '
'  hello  '.trimEnd()     // '  hello'
```

### Replacing

```js
s.replace('World', 'JS')       // 'Hello, JS!'         (first match only)
s.replaceAll('l', 'L')         // 'HeLLo, WorLd!'      (all matches)
s.replace(/l/g, 'L')           // 'HeLLo, WorLd!'      (regex with /g flag)
```

### Repeating and padding

```js
'ha'.repeat(3)              // 'hahaha'
'7'.padStart(4, '0')        // '0007'   (common for zero-padding numbers)
'7'.padEnd(4, '-')          // '7---'
```

### Splitting (covered in depth next lesson)

```js
s.split(', ')       // ['Hello', 'World!']
s.split('')         // ['H','e','l','l','o',',',' ','W','o','r','l','d','!']
```

> ✋ **Pause and try**
> Using only methods from this lesson, how would you check if the email address `'user@example.com'` contains an `@` sign and ends with `.com`?
>
> <details>
> <summary>Show answer</summary>
>
> ```js
> const email = 'user@example.com';
> const valid = email.includes('@') && email.endsWith('.com');
> // true
> ```
> </details>

> 🎯 **Key takeaway**
> The most-used string methods are: `indexOf`, `includes`, `startsWith`, `endsWith`, `slice`, `toLowerCase`, `toUpperCase`, `trim`, `replace`, `replaceAll`, `split`. Every one of them returns a **new** string (or a new array) — none of them modify the original.

---

<a id="lesson-9"></a>
## Lesson 9 — Splitting a string into an array (and back)

Sometimes the easiest way to work with a string is to convert it to an array, do your work there, then join it back. This is a key pattern for strings.

### Splitting

```js
const sentence = 'the quick brown fox';
const words = sentence.split(' ');
// ['the', 'quick', 'brown', 'fox']

const chars = 'hello'.split('');
// ['h', 'e', 'l', 'l', 'o']
```

`split(delimiter)` takes the string apart at every occurrence of `delimiter`.

- `split(' ')` → split on spaces, giving you words.
- `split('')` → split on nothing, giving you individual characters.
- `split(',')` → split a CSV row.
- `split('\n')` → split a multi-line string into lines.

### Joining back

```js
const chars = ['h', 'e', 'l', 'l', 'o'];
const word = chars.join('');   // 'hello'

const words = ['the', 'quick', 'brown', 'fox'];
const sentence = words.join(' ');   // 'the quick brown fox'
```

`join(glue)` sticks all the array elements together with `glue` between each pair.

### Why this matters for problem-solving

Strings are immutable. Arrays are mutable. So if you need to "modify" a string (say, reverse it, or swap two characters), the standard pattern is:

1. Split the string into an array of characters.
2. Do whatever you need to do on the array.
3. Join the array back into a string.

```js
// Reverse a string using split + reverse + join
function reverseString(s) {
  return s.split('').reverse().join('');
}

reverseString('hello');   // 'olleh'
```

Three methods, one line. This is perfectly valid for most interview problems.

> ⚠️ **Common mistake**
> `split('')` doesn't always give you what you expect with emoji and certain Unicode characters. We'll cover this in Lesson 16. For now: it works fine for plain ASCII text.

> 🎯 **Key takeaway**
> `split('')` → array of chars. `join('')` → string from array. This pair unlocks all the mutable array methods (sort, reverse, splice) for use on strings.

---

<a id="lesson-10"></a>
## Lesson 10 — Two-pointer technique on strings

In the Arrays chapter you saw two pointers used to reverse an array in place. Strings have the same idea — but because strings are immutable, the "in-place" version requires converting to an array first.

### Palindrome check (the core two-pointer string problem)

A **palindrome** is a word or phrase that reads the same forwards and backwards: `'racecar'`, `'level'`, `'noon'`.

Two-pointer approach: put one finger at the start and one at the end. At each step, check if the characters match. If they don't, it's not a palindrome. Move both fingers inward. If they meet without a mismatch, it's a palindrome.

```js
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

isPalindrome('racecar');   // true
isPalindrome('hello');     // false
```

This is O(n) time and O(1) space — no copying, just two index variables.

### In-place reversal (convert-work-join pattern)

If you want to reverse a string with two pointers (in-place style):

```js
function reverseString(s) {
  const arr = s.split('');          // convert to mutable array

  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];  // swap
    left++;
    right--;
  }

  return arr.join('');              // convert back
}
```

> 💡 **Tip**
> For palindrome-check problems, you often need to skip non-alphanumeric characters and ignore case. The pattern is:
> ```js
> function isAlphanumeric(c) {
>   return /[a-zA-Z0-9]/.test(c);
> }
> // then inside your loop: skip chars where !isAlphanumeric(s[left]) or !isAlphanumeric(s[right])
> ```

> 🎯 **Key takeaway**
> Two pointers on strings: left starts at 0, right starts at `length - 1`. Move them inward. When they meet, you've processed the whole string. Time: O(n). Space: O(1) if you work on the string directly by index; O(n) if you need to split into an array first.

---

<a id="lesson-11"></a>
## Lesson 11 — Frequency maps — the Swiss Army knife of string problems

A **frequency map** (also called a **character count** or **histogram**) counts how many times each character appears in a string. It's surprisingly useful for a huge range of problems.

### Building a frequency map

```js
const s = 'hello world';

const freq = {};

for (const char of s) {
  freq[char] = (freq[char] ?? 0) + 1;
}

console.log(freq);
// { h: 1, e: 1, l: 3, o: 2, ' ': 1, w: 1, r: 1, d: 1 }
```

Or with a `Map` (preferred when keys might conflict with built-in object properties):

```js
const freq = new Map();

for (const char of s) {
  freq.set(char, (freq.get(char) ?? 0) + 1);
}
```

`?? 0` is the **nullish coalescing** operator: if `freq[char]` is `undefined` (the character hasn't been seen yet), use `0` as the starting value.

### What can you do with a frequency map?

1. **Anagram check** — two strings are anagrams if they have identical frequency maps (Lesson 13).
2. **First unique character** — iterate through the string; the first character whose frequency is 1 is the answer.
3. **Sliding window** — track how many characters are "in balance" across a window (Lesson 14).
4. **Minimum window substring** — use two frequency maps: one for what you need, one for what you have.

### Example: first non-repeating character

```js
function firstNonRepeating(s) {
  const freq = {};

  for (const char of s) {
    freq[char] = (freq[char] ?? 0) + 1;
  }

  for (const char of s) {
    if (freq[char] === 1) return char;
  }

  return null;   // all characters repeat
}

firstNonRepeating('aabcde');   // 'b'
firstNonRepeating('aabb');     // null
```

Two passes: one to count, one to find. O(n) time, O(k) space where k is the size of the character set (at most 128 for ASCII, or 26 for lowercase letters).

> ✋ **Pause and try**
> How would you count just the vowels in a string using a frequency map and then look up the count of each vowel?
>
> <details>
> <summary>Show answer</summary>
>
> ```js
> const s = 'hello world';
> const freq = {};
> const vowels = new Set('aeiou');
>
> for (const char of s.toLowerCase()) {
>   if (vowels.has(char)) {
>     freq[char] = (freq[char] ?? 0) + 1;
>   }
> }
>
> console.log(freq);  // { e: 1, o: 2 }
> ```
> </details>

> 🎯 **Key takeaway**
> A frequency map is just an object or `Map` that counts characters. Build it in one loop with `count = (count ?? 0) + 1`. Once you have it, you can answer "how many times does X appear?" in O(1).

---

<a id="lesson-12"></a>
## Lesson 12 — Palindromes — what they are and how to detect them

We touched on this in Lesson 10. Let's go deeper because palindrome problems come in several flavors.

### Type 1: exact palindrome

`'racecar'`, `'level'`, `'noon'`, `'a'`, `''` — reads the same forwards and backwards.

The two-pointer approach from Lesson 10 handles this perfectly.

### Type 2: clean-string palindrome (interview standard)

`'A man, a plan, a canal: Panama'` — strip everything except letters and digits, compare case-insensitively.

```js
function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }

  return true;
}
```

The regex `/[^a-z0-9]/g` means "replace anything that is NOT (a lowercase letter or digit) with an empty string". Two pointers then check the cleaned result.

### Type 3: longest palindromic substring

Given `'babad'`, find the longest palindromic substring (`'bab'` or `'aba'`).

The standard technique is **expand-around-center**: for each character (and each pair of adjacent characters), expand outward as long as the characters match.

```
For center 'a' at index 1 in 'racecar':
  r a c e c a r
        ^         ← center
      a   a        ← expand one step: match
    c       c      ← expand again: match
  r           r    ← expand again: match
→ whole string is a palindrome
```

This gives us an O(n²) solution — linear centers times linear expansion. There exists an O(n) algorithm called Manacher's, but expand-around-center is what you need for most interviews.

> 🎯 **Key takeaway**
> Two types of palindrome problems: (1) check if a string is a palindrome → two pointers, O(n) time O(1) space; (2) find the longest palindromic substring → expand-around-center, O(n²) time.

---

<a id="lesson-13"></a>
## Lesson 13 — Anagrams — recognizing them instantly

Two strings are **anagrams** if they contain the exact same characters in the same quantities (but possibly in a different order).

`'listen'` and `'silent'` → anagrams.
`'hello'` and `'world'` → not anagrams.
`'anagram'` and `'nagaram'` → anagrams.

### Method 1: sort and compare

The most intuitive approach:

```js
function isAnagram(s, t) {
  return s.split('').sort().join('') === t.split('').sort().join('');
}
```

If they're anagrams, sorting both gives the same string. Time: O(n log n). Space: O(n).

### Method 2: frequency map (faster)

```js
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const freq = {};

  for (const char of s) {
    freq[char] = (freq[char] ?? 0) + 1;
  }

  for (const char of t) {
    if (!freq[char]) return false;   // char not in s, or already used up
    freq[char]--;
  }

  return true;
}
```

Increment counts for `s`, then decrement for `t`. If at any point a count hits 0 when we still need more, they're not anagrams. Time: O(n). Space: O(k).

### Group anagrams

Given an array of strings, group those that are anagrams of each other.

The key insight: **all anagrams of a word have the same sorted version**. Use sorted words as Map keys.

```js
function groupAnagrams(words) {
  const map = new Map();

  for (const word of words) {
    const key = word.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(word);
  }

  return Array.from(map.values());
}

groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);
// [['eat','tea','ate'], ['tan','nat'], ['bat']]
```

> 🎯 **Key takeaway**
> Anagram check: either sort-and-compare (O(n log n)) or frequency-map (O(n)). Grouping anagrams: use the sorted string as a hash key, group into a Map.

---

<a id="lesson-14"></a>
## Lesson 14 — Sliding window on strings

The **sliding window** pattern maintains a contiguous substring (a "window") and moves it through the string, updating an answer without recomputing from scratch.

### The shape of every sliding window solution

```
left ── window ── right
  ↓               ↓
[ a  b  c  b  a  c  b ]
                         ← slide right one step at a time
```

You expand the right end to grow the window, and shrink the left end when the window becomes invalid.

### Example: longest substring without repeating characters

Given `'abcabcbb'`, find the length of the longest substring where no character repeats. Answer: `3` (`'abc'`).

```js
function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    // shrink from left until s[right] is no longer in the window
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }

    seen.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

**Walk-through for `'abcabc'`:**

```
right = 0: add 'a'. window = 'a',       len = 1
right = 1: add 'b'. window = 'ab',      len = 2
right = 2: add 'c'. window = 'abc',     len = 3
right = 3: 'a' already in window!
           remove 'a' at left(0), left → 1. window = 'bc'
           add 'a'. window = 'bca',     len = 3
right = 4: 'b' already in window!
           remove 'b' at left(1), left → 2. window = 'ca'
           add 'b'. window = 'cab',     len = 3
```

Final answer: 3.

### Window with a Map instead of a Set

For problems where you need the last-seen *index* of each character (to jump directly to the new valid start), use a `Map`:

```js
const lastSeen = new Map();
let left = 0;

for (let right = 0; right < s.length; right++) {
  if (lastSeen.has(s[right])) {
    left = Math.max(left, lastSeen.get(s[right]) + 1);
  }
  lastSeen.set(s[right], right);
  // update maxLen ...
}
```

This avoids the inner `while` loop — O(n) with no inner iterations.

> 🎯 **Key takeaway**
> Sliding window on strings: expand the right pointer until the window becomes invalid, then advance the left pointer until it's valid again. Use a `Set` or `Map` to track window contents. Time: O(n) amortized.

---

<a id="lesson-15"></a>
## Lesson 15 — JavaScript gotchas unique to strings

These are the traps you'll hit. Read them now so you recognize them when you do.

### Gotcha 1: `typeof` a string

```js
typeof 'hello';          // 'string'
typeof new String('hi'); // 'object'   ← never use new String()
```

Always use string literals (`'...'` or `` `...` ``), never the `String` constructor with `new`. The object form behaves weirdly — `new String('hi') === new String('hi')` is `false`, because they're two different objects.

### Gotcha 2: `==` coerces types

```js
'5' == 5;    // true  — dangerous!
'5' === 5;   // false — correct
'0' == false; // true  — very dangerous!
'' == false;  // true  — extremely dangerous!
```

In any serious code: **always `===`**. Never `==` with strings.

### Gotcha 3: sort comparator converts to strings by default

```js
['banana', 'apple', 'Cherry'].sort();
// ['Cherry', 'apple', 'banana']   ← uppercase first!
```

Default `.sort()` compares by Unicode code point. Capital letters (code points 65–90) come before lowercase (97–122). Use `localeCompare` for natural alphabetical sorting.

### Gotcha 4: `Number('')` and `Number(' ')`

```js
Number('');     // 0  ← empty string becomes 0, not NaN
Number(' ');    // 0  ← whitespace string also becomes 0
Number('abc');  // NaN
```

If you're converting user input to a number, use `parseInt` or `Number` but always check for `NaN` afterwards.

### Gotcha 5: string vs number comparison

```js
'10' > '9';    // false  ← lexicographic! '1' < '9'
10   > 9;      // true
```

If you're comparing "numbers" stored as strings (like version numbers `'2.10'` vs `'2.9'`), you must parse them first or use a proper comparator.

### Gotcha 6: `charAt` vs bracket indexing

```js
'hello'[1];          // 'e'
'hello'.charAt(1);   // 'e'

'hello'[999];        // undefined
'hello'.charAt(999); // ''   (empty string, not undefined)
```

Both work, but they differ on out-of-bounds: `str[i]` gives `undefined`, `charAt(i)` gives `''`. In most DSA problems `str[i]` is fine and more concise.

> 🎯 **Key takeaway**
> The big three: (1) always `===` not `==`; (2) sort strings with `localeCompare` when alphabetical order matters; (3) be careful converting strings to numbers — `Number('')` is `0`, not `NaN`.

---

<a id="lesson-16"></a>
## Lesson 16 — Unicode and emojis — the surrogate-pair trap

This lesson is a bit advanced. You won't need it for most problems, but you'll be very confused if you encounter it without knowing.

### The problem

Let's reverse a string the normal way:

```js
'hello'.split('').reverse().join('');   // 'olleh'  ✅
```

Now let's try with an emoji:

```js
'hi 👋'.split('').reverse().join('');   // '??  ih'  ❌ (garbled emoji)
```

What happened?

### How JavaScript stores text

JavaScript strings are stored as sequences of **UTF-16 code units**. Most common characters (all of ASCII, most Latin characters) fit in one code unit. But many emoji and some rare characters require **two** code units to represent — these are called a **surrogate pair**.

`'👋'` is actually stored as two code units internally:

```js
'👋'.length        // 2   ← looks like 2 characters to JS
'👋'.split('')     // ['\uD83D', '\uDC4B']  ← two half-characters
```

When you reverse the array, you swap the two halves. The emoji breaks.

### The fix: use proper Unicode iterators

ES6 introduced the `for...of` loop and the spread operator, which are **Unicode-aware** — they treat surrogate pairs as single characters:

```js
[...'hi 👋']         // ['h', 'i', ' ', '👋']  ← emoji as one unit
[...'hi 👋'].reverse().join('')   // '👋 ih'  ✅
```

Or using `Array.from`:

```js
Array.from('hi 👋')  // ['h', 'i', ' ', '👋']
```

The difference:
- `str.split('')` — splits on **code units** (breaks surrogate pairs)
- `[...str]` or `Array.from(str)` — splits on **code points** (handles emoji correctly)

### When does this matter?

In most coding problems and interviews, the inputs are ASCII letters and digits, and this doesn't matter. But if you're ever working with real-world user text (names, messages, passwords) that might contain emoji, you should use `[...str]` instead of `str.split('')`.

> ⚠️ **Common mistake**
> Using `str.split('').reverse().join('')` to reverse a string containing emoji or other characters outside the Basic Multilingual Plane (BMP). Use `[...str].reverse().join('')` instead.

> 🔬 **Going deeper (optional)**
> For even more Unicode accuracy (handling "grapheme clusters" — where a single visible character is actually multiple code points, like a flag emoji), you'd need the `Intl.Segmenter` API (ES2022) or a library like `grapheme-splitter`. For interviews: `[...str]` is enough.

> 🎯 **Key takeaway**
> `str.split('')` breaks emoji. `[...str]` and `Array.from(str)` handle emoji correctly. In interview problems with plain ASCII input: either works.

---

<a id="lesson-17"></a>
## Lesson 17 — Building strings efficiently — array + join pattern

We covered the performance reason for this in Lesson 5. Now let's look at the *pattern* itself in depth, because you'll use it in many problems.

### The template

```js
// Instead of this:
let result = '';
for (something) {
  result += piece;   // O(n²) total
}

// Do this:
const parts = [];
for (something) {
  parts.push(piece);  // O(1) each
}
const result = parts.join('');   // O(n) once
```

### Real example: string compression

Given `'aabcccccaaa'`, compress it to `'a2b1c5a3'`.

```js
function compress(s) {
  if (s.length === 0) return '';

  const parts = [];
  let count = 1;

  for (let i = 1; i <= s.length; i++) {
    if (i < s.length && s[i] === s[i - 1]) {
      count++;
    } else {
      parts.push(s[i - 1] + count);
      count = 1;
    }
  }

  return parts.join('');
}

compress('aabcccccaaa');   // 'a2b1c5a3'
```

We push each `(char + count)` segment into an array and join once at the end.

### Two-pointer builds

For problems where you need to construct a string from two pointers walking over two different strings (like merging), keep collecting into an array:

```js
const result = [];

while (i < a.length || j < b.length) {
  if (i < a.length && (j >= b.length || a[i] <= b[j])) {
    result.push(a[i++]);
  } else {
    result.push(b[j++]);
  }
}

return result.join('');
```

> 💡 **Tip**
> This pattern is not only about performance. It also makes your code cleaner — you push small pieces and join at the end, instead of tracking a growing string variable.

> 🎯 **Key takeaway**
> Use `const parts = []; ... parts.join('')` whenever you're building a string piece by piece in a loop. Push is O(1); join is O(n). Total: O(n). Concatenation in a loop is O(n²).

---

<a id="lesson-18"></a>
## Lesson 18 — Quick reference: methods, complexity, templates

Here's the cheat sheet. Everything below has been explained in earlier lessons.

### Complexity table

| Operation | Big-O | Notes |
|---|---|---|
| `str[i]` (read by index) | O(1) | Direct access |
| `str.length` | O(1) | Stored property |
| `str.indexOf(sub)` | O(n · m) | n = str length, m = sub length |
| `str.includes(sub)` | O(n · m) | Same as indexOf under the hood |
| `str.slice(a, b)` | O(b - a) | Allocates a new string |
| `str.split(delim)` | O(n) | Creates an array |
| `arr.join(glue)` | O(n) | Creates a string |
| `str + str2` | O(n + m) | New string; bad in a loop |
| `str.replace(a, b)` | O(n) | First occurrence only |
| `str.replaceAll(a, b)` | O(n) | All occurrences |
| `str.toLowerCase()` / `.toUpperCase()` | O(n) | New string |
| `str.trim()` | O(n) | New string |
| `[...str]` | O(n) | Unicode-safe char array |
| `str.split('').sort().join('')` | O(n log n) | Common for anagram check |

### Key templates

**Reverse a string (basic):**
```js
s.split('').reverse().join('');
```

**Reverse a string (Unicode-safe):**
```js
[...s].reverse().join('');
```

**Two-pointer palindrome check:**
```js
let left = 0, right = s.length - 1;
while (left < right) {
  if (s[left] !== s[right]) return false;
  left++; right--;
}
return true;
```

**Frequency map:**
```js
const freq = {};
for (const char of s) {
  freq[char] = (freq[char] ?? 0) + 1;
}
```

**Sliding window (longest valid):**
```js
const seen = new Set();
let left = 0, maxLen = 0;
for (let right = 0; right < s.length; right++) {
  while (seen.has(s[right])) { seen.delete(s[left]); left++; }
  seen.add(s[right]);
  maxLen = Math.max(maxLen, right - left + 1);
}
```

**Build string efficiently:**
```js
const parts = [];
for (...) parts.push(piece);
return parts.join('');
```

**Sort strings correctly:**
```js
words.sort((a, b) => a.localeCompare(b));
```

**Check anagram (frequency map):**
```js
if (s.length !== t.length) return false;
const freq = {};
for (const c of s) freq[c] = (freq[c] ?? 0) + 1;
for (const c of t) { if (!freq[c]) return false; freq[c]--; }
return true;
```

**Expand-around-center palindrome:**
```js
function expand(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--; right++;
  }
  return s.slice(left + 1, right);
}
// call for odd-length: expand(s, i, i)
// call for even-length: expand(s, i, i+1)
```

### Mutating vs non-mutating reminder

String methods are **all non-mutating** — they always return a new value. There are no mutating string methods in JavaScript. You can reassign the variable, but the original string object is untouched.

---

<a id="lesson-19"></a>
## Lesson 19 — 🔬 Going deeper: how V8 stores strings internally (optional)

> This lesson is purely optional. **You can skip it entirely** and still solve every problem in this topic.

### String representations inside V8

V8 (the JavaScript engine in Chrome and Node.js) doesn't store all strings the same way. It picks a representation based on what's fastest:

**SeqOneByteString** — a flat array of one-byte characters. Used for strings that only contain ASCII characters. Very fast to index and copy.

**SeqTwoByteString** — a flat array of two-byte code units. Used when the string contains non-ASCII characters (like emoji, accented letters, Chinese characters).

**ConsString** — a "cons cell" or tree of string fragments. When you write `a + b`, V8 may not immediately flatten the two strings into one — it creates a lazy node pointing to both. The actual flattening happens when you need to index into it. This is why single concatenations are fast, but deep chains can cause unexpected work.

**SlicedString** — used by `slice`/`substring`. Instead of copying, V8 stores a reference to the parent string plus an offset and length. This makes slicing very cheap (O(1) allocation). The parent string stays alive as long as any slice references it.

**InternalizedString** — short strings that look like identifiers (e.g., object property names) get "interned" — deduplicated so there's only one copy in memory. This is why `'hello' === 'hello'` works even though they're technically different expressions.

### What this means for you

- **`slice` is often O(1)** in V8 (lazy, no copy). But if V8 decides to flatten it (e.g., when you pass it to a native function), it can be O(n). For correctness analysis, treat it as O(n).
- **String concatenation is lazy.** But deeply nested ConsStrings eventually have to be flattened, which costs O(n). For very long chains, you still want the array + join pattern.
- **`indexOf` on a SeqOneByteString is SIMD-optimized.** V8 can search multiple bytes at once using CPU vector instructions. It's fast — faster than a naive character-by-character loop.

Again: none of this affects your interview answers. Just good to know when you wonder "why is my production code fast or slow?"

> 🎯 **Key takeaway**
> V8 has multiple string representations (flat, cons, slice, interned). Slicing is cheap. Concatenation is lazy but eventually linear. For production code at scale, still use array + join for loop builds.

---

<a id="lesson-20"></a>
## Lesson 20 — You did it. Now what?

Take a breath. That was a lot of ground to cover. **You don't have to memorize all of it right now.**

What you should walk away with:

1. **Strings are immutable.** Every "edit" produces a new string. This is the defining fact of JavaScript strings.
2. **Concatenation in a loop is O(n²).** Use `array.push(...).join('')` instead.
3. **`===` always, never `==`** for string comparisons.
4. **`split` → work → `join`** is the standard way to use mutable array operations on a string.
5. **Frequency maps** unlock a huge class of string problems in O(n) time.
6. **Two pointers** handle palindromes and reversal efficiently.
7. **Sliding window** handles substring problems (longest, shortest, count-matching).
8. **`[...str]`** instead of `str.split('')` if your input might contain emoji.

That's the toolkit. Now go use it.

### What to do next

1. Open [`questions/01-reverse-string.md`](./questions/01-reverse-string.md).
2. Read the problem. Try to solve it in your head or on paper.
3. Open [`solutions/01-reverse-string.js`](./solutions/01-reverse-string.js) and write the code.
4. **If you get stuck**, come back here and re-read the relevant lesson. THEN peek at the hints in the question file.
5. After solving, note the time and space complexity at the top of your solution.
6. Tick the box in [`README.md`](./README.md). Celebrate. Move on.

### Pacing

- **Don't try to do all 26 problems in one sitting.** Two or three a day, for a week or two, is better.
- **The easy ones build the reflexes.** Don't skip them because they feel simple.
- **When you struggle**, that's the learning. Take a walk, come back.

You've got this. See you in [Q1](./questions/01-reverse-string.md). 💪
