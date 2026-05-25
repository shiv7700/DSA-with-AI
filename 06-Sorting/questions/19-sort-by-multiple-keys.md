# Q19 — Sort Objects by Multiple Keys

**Difficulty:** Easy
**Pattern:** Custom comparator, multi-key sort
**Expected:** O(n log n) time · O(1) extra space

## Problem

You are given an array of employee objects, each with a `department` (string), `salary` (number), and `name` (string).

Sort the employees with these priorities (most important first):

1. By `department` alphabetically (ascending).
2. Within the same department, by `salary` descending (higher salary first).
3. Within the same department and salary, by `name` alphabetically (ascending).

Return the sorted array (you may sort in place).

## Examples

### Example 1
```
Input:
[
  { name: 'Alice',   department: 'Eng',     salary: 90000 },
  { name: 'Bob',     department: 'HR',      salary: 70000 },
  { name: 'Carol',   department: 'Eng',     salary: 95000 },
  { name: 'Diana',   department: 'HR',      salary: 70000 },
  { name: 'Eduardo', department: 'Eng',     salary: 90000 },
  { name: 'Frank',   department: 'Finance', salary: 80000 },
]

Output:
[
  { name: 'Frank',   department: 'Finance', salary: 80000 },
  { name: 'Carol',   department: 'Eng',     salary: 95000 },
  { name: 'Alice',   department: 'Eng',     salary: 90000 },
  { name: 'Eduardo', department: 'Eng',     salary: 90000 },
  { name: 'Bob',     department: 'HR',      salary: 70000 },
  { name: 'Diana',   department: 'HR',      salary: 70000 },
]
```

Explanation:
- Finance < Eng? No — "Finance" > "Eng" alphabetically, so Eng comes first. Wait: 'E' < 'F' < 'H'. So: Eng, Finance, HR.
- Within Eng: Carol (95k) first, then Alice and Eduardo (both 90k) alphabetically.
- Within HR: Bob and Diana (both 70k) alphabetically.

## Constraints
- `1 <= employees.length <= 10^4`
- All fields are present and non-null.
- Sort may be in place.

## Hints

<details>
<summary>Hint 1 — chained comparator</summary>

```js
employees.sort((a, b) => {
  // 1. department (ascending alphabetical)
  const deptCmp = a.department.localeCompare(b.department);
  if (deptCmp !== 0) return deptCmp;

  // 2. salary (descending)
  if (a.salary !== b.salary) return b.salary - a.salary;

  // 3. name (ascending alphabetical)
  return a.name.localeCompare(b.name);
});
```
</details>

<details>
<summary>Hint 2 — building a generic multi-key sorter</summary>

For reusability, you can build a general-purpose multi-key sort function:

```js
function sortByKeys(arr, keys) {
  return arr.sort((a, b) => {
    for (const { key, order, type } of keys) {
      let cmp;
      if (type === 'string') cmp = a[key].localeCompare(b[key]);
      else cmp = a[key] - b[key];

      if (order === 'desc') cmp = -cmp;
      if (cmp !== 0) return cmp;
    }
    return 0;
  });
}
```
</details>

<details>
<summary>Hint 3 — verifying alphabetical order</summary>

`'Eng'.localeCompare('Finance')` returns a negative number (E < F), meaning 'Eng' comes first. `'Finance'.localeCompare('HR')` returns negative (F < H). So the alphabetical order is: Eng, Finance, HR.
</details>

## Write your solution
→ [`../solutions/19-sort-by-multiple-keys.js`](../solutions/19-sort-by-multiple-keys.js)

## Follow-ups
- Build a generic `sortByKeys(arr, keys)` function where `keys` is an array of `{ key, order }` descriptors.
- How would you handle `null` or `undefined` values in a field gracefully (sort nulls last)?
