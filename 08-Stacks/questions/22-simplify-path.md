# Q22 — Simplify Path

**Difficulty:** Medium
**Pattern:** Stack — path normalization
**Expected:** O(n) time · O(n) space

## Problem

Given a string `path` representing an absolute Unix-style file path, convert it to the **simplified canonical path**.

Rules for Unix paths:
- A single period `.` refers to the current directory.
- A double period `..` refers to the parent directory (go up one level).
- Multiple consecutive slashes `//` are treated as a single slash `/`.
- Any other name is a valid directory name.
- The simplified path must start with a `/` and must not end with `/` (unless it's the root).

## Examples

### Example 1
```
Input:  "/home/"
Output: "/home"
```

### Example 2
```
Input:  "/../"
Output: "/"
```
Going above root stays at root.

### Example 3
```
Input:  "/home//foo/"
Output: "/home/foo"
```
Double slashes become single.

### Example 4
```
Input:  "/a/./b/../../c/"
Output: "/c"
```
- `/a` → stack: [a]
- `.` → stay, stack: [a]
- `b` → stack: [a, b]
- `..` → pop, stack: [a]
- `..` → pop, stack: []
- `c` → stack: [c]
- Result: `/c`

### Example 5
```
Input:  "/a/../../b/../c//.//"
Output: "/c"
```

## Constraints
- `1 <= path.length <= 3000`
- `path` is a valid absolute Unix path.

## Hints

<details>
<summary>Hint 1 — split on slashes</summary>

Split the path by `/`. This gives you tokens. Many tokens will be empty strings (from double slashes or leading/trailing slashes) — ignore them.

```js
const parts = path.split('/');
```
</details>

<details>
<summary>Hint 2 — process each token</summary>

For each non-empty token:
- `'.'` → do nothing (stay in current directory).
- `'..'` → pop from the stack (go up one level), if the stack is non-empty.
- Any other string → push it (go into that directory).

At the end: `'/' + stack.join('/')` is the result. If the stack is empty, return `'/'`.
</details>

## Write your solution
→ [`../solutions/22-simplify-path.js`](../solutions/22-simplify-path.js)

## Follow-ups
- What if the path could be relative (not starting with `/`)? How would you handle that?
- What if `...` (three dots) was a valid directory name? Make sure your code doesn't treat it as a special case.
- Implement `cd` — given a current path and a new path (relative or absolute), return the resulting path.
