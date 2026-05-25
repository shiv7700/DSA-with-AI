# Q12 — Check if List is Empty

**Difficulty:** Easy
**Pattern:** Trivial check / Foundational
**Expected:** O(1) time · O(1) space

## Problem

Given the head of a singly linked list, return `true` if the list is empty (has zero nodes), and `false` otherwise.

## Examples

### Example 1 — empty
```
Input:  null
Output: true
```

### Example 2 — non-empty
```
Input:  1 -> 2 -> 3 -> null
Output: false
```

### Example 3 — single node
```
Input:  42 -> null
Output: false
```

## Constraints
- `head` is either `null` (empty list) or a `ListNode`.

## Hints

<details>
<summary>Hint 1 — it's a one-liner</summary>

An empty linked list is simply represented as `null`. There's no special "empty" object.

```js
return head === null;
```

That's the whole function.
</details>

<details>
<summary>Hint 2 — why practice this?</summary>

You'll write `if (head === null)` as a guard at the top of almost every linked list function. Getting comfortable with "null means empty" is foundational — it's the base case in nearly every recursive solution too.
</details>

## Write your solution
→ [`../solutions/12-is-empty.js`](../solutions/12-is-empty.js)

## Follow-ups
- How would you check if a `LinkedList` class instance (from Q2) is empty? Does it change the approach?
- What is the difference between `head === null`, `head == null`, and `!head` for this purpose? When might they differ?
