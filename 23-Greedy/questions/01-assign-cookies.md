# Q1 — Assign Cookies

**Difficulty:** Easy
**Pattern:** Greedy · Two Pointers on Sorted Arrays
**Expected:** O(n log n) time · O(1) space

## Problem

You are a kind parent trying to give cookies to your children. Each child `i` has a **greed factor** `g[i]` — the minimum cookie size that will make them content. Each cookie `j` has a size `s[j]`. A child is content if they receive a cookie of size **at least** `g[i]`. Each child can receive **at most one cookie**.

Return the **maximum number of content children**.

## Examples

### Example 1
```
Input:  g = [1, 2, 3],  s = [1, 1]
Output: 1
```
You have two size-1 cookies, but children need sizes 1, 2, and 3. You can only satisfy the child with greed factor 1.

### Example 2
```
Input:  g = [1, 2],  s = [1, 2, 3]
Output: 2
```
Both children can be satisfied: child 0 (greed 1) gets cookie size 1, child 1 (greed 2) gets cookie size 2. (Cookie size 3 is left over.)

### Example 3
```
Input:  g = [10, 9, 8, 7],  s = [5, 6, 7, 8]
Output: 2
```

### Example 4
```
Input:  g = [1],  s = []
Output: 0
```

## Constraints
- `1 <= g.length <= 3 * 10^4`
- `0 <= s.length <= 3 * 10^4`
- `1 <= g[i], s[j] <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — what's the greedy rule?</summary>

Try to satisfy the **least greedy child first** using the **smallest cookie that can satisfy them**. Why? Because a large cookie used on an easy-to-please child is wasted — that large cookie might have been the only one capable of satisfying a harder-to-please child.

Try to satisfy children in order of increasing greed, and match them to the smallest sufficient cookie.
</details>

<details>
<summary>Hint 2 — why does it work for this problem?</summary>

Formal argument: suppose an optimal solution skips a small cookie and uses a large cookie on an easy child. We can swap the large cookie for the smallest sufficient cookie for that child — and the large cookie is now free to potentially satisfy one more difficult child. The swap never makes things worse, so always using the smallest sufficient cookie is optimal.

Sorting both arrays and walking with two pointers implements this in O(n log n).
</details>

<details>
<summary>Hint 3 — implementation sketch</summary>

```js
g.sort((a, b) => a - b);
s.sort((a, b) => a - b);

let child = 0, cookie = 0;
while (child < g.length && cookie < s.length) {
  if (s[cookie] >= g[child]) child++;  // this cookie satisfies this child
  cookie++;  // move to next cookie regardless
}
return child;
```
</details>

## Write your solution
→ [`../solutions/01-assign-cookies.js`](../solutions/01-assign-cookies.js)

## Follow-ups
- What if each child can receive multiple cookies as long as the total size meets their greed factor?
- What if you want to maximize the **total happiness** (each satisfied child contributes `g[i]` points) rather than the count?
