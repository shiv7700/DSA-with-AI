# Q9 — Accounts Merge

**Difficulty:** Medium
**Pattern:** DSU — merge sets by shared elements, reconstruct groups
**Expected:** O(n · k · α(n · k)) time · O(n · k) space   (n accounts, k average emails per account)

## Problem

You are given a list `accounts` where `accounts[i] = [name, email1, email2, ...]`. The first element is the account owner's name; the rest are email addresses.

Two accounts belong to the **same person** if they share at least one email address. Merge all accounts that belong to the same person.

Return the merged accounts as a list where each account is `[name, email1, email2, ...]` with emails sorted in lexicographic order. The order of the returned accounts does not matter.

> **Real-world analogy:** you're building a contacts app. The same person signed up twice with different emails but one email in common. You need to merge their profiles.

## Examples

### Example 1

```
Input:
  accounts = [
    ["John","johnsmith@mail.com","john_newyork@mail.com"],
    ["John","johnsmith@mail.com","john00@mail.com"],
    ["Mary","mary@mail.com"],
    ["John","johnnybravo@mail.com"]
  ]

Output:
  [
    ["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],
    ["Mary","mary@mail.com"],
    ["John","johnnybravo@mail.com"]
  ]
```

Account 0 and Account 1 both have `johnsmith@mail.com` → they're the same person. Merged emails: john00, john_newyork, johnsmith.

Account 3 has `johnnybravo` only → a separate John.

### Example 2

```
Input:
  accounts = [
    ["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],
    ["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],
    ["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],
    ["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],
    ["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]
  ]

Output: (each account separate, emails sorted)
  [["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],
   ["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],
   ["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],
   ["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"],
   ["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"]]
```

## Constraints

- `1 <= accounts.length <= 1000`
- `2 <= accounts[i].length <= 10`
- `1 <= accounts[i][j].length <= 30`
- All email addresses contain exactly one `@` symbol.

## Hints

<details>
<summary>Hint 1 — how DSU applies here</summary>

Elements to unite: emails (not account indices). If two accounts share an email, they belong to the same person — union all emails in those accounts together.

For each account, union every email with the first email in that account. (Pick any representative — the first is convenient.)

After all unions, emails with the same root belong to the same person.
</details>

<details>
<summary>Hint 2 — mapping emails to DSU indices</summary>

DSU works on integer indices. You need to map email strings to integers. Use a `Map<string, number>` called `emailIndex`. As you see new emails, assign them the next available integer.

Also maintain `emailToOwner: Map<string, string>` so you can look up the account name from any email.
</details>

<details>
<summary>Hint 3 — reconstructing the result</summary>

After all unions:
1. Build a `Map<root_index, email[]>` — group all emails by their `find()` root.
2. For each group: look up the owner's name from any email in the group, sort the emails, prepend the name.
3. Collect all groups into the result array.
</details>

## Write your solution

→ [`../solutions/09-accounts-merge.js`](../solutions/09-accounts-merge.js)

## Follow-ups

- Why do we union emails rather than account indices?
- **Q14 — Smallest String With Swaps**: a similar "union positions, reconstruct groups" pattern.
- What if the same email appears under two different names? (The problem guarantees this won't happen, but what would you do?)
