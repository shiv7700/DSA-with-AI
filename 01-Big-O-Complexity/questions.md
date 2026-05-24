# Big-O & Complexity Analysis

> Goal: Be able to look at any JS snippet and tell its time & space complexity instantly.

## Concept Check (Write answers as comments)

1. What is Big-O notation? Explain in your own words.
2. Difference between Big-O, Big-Theta (Θ), and Big-Omega (Ω).
3. Why do we drop constants and lower-order terms?
4. What is amortized complexity? Give a JS example (hint: `Array.push`).
5. Difference between time complexity and space complexity.

## Identify the Complexity

For each snippet below, write the time **and** space complexity.

### Q1
```js
function printItems(arr) {
  for (let i = 0; i < arr.length; i++) console.log(arr[i]);
}
```

### Q2
```js
function printPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) console.log(arr[i], arr[j]);
  }
}
```

### Q3
```js
function printFirstTen(arr) {
  for (let i = 0; i < 10 && i < arr.length; i++) console.log(arr[i]);
}
```

### Q4
```js
function logHalf(n) {
  for (let i = n; i > 0; i = Math.floor(i / 2)) console.log(i);
}
```

### Q5
```js
function mystery(n) {
  if (n <= 1) return 1;
  return mystery(n - 1) + mystery(n - 1);
}
```

### Q6
```js
function buildMatrix(n) {
  const matrix = [];
  for (let i = 0; i < n; i++) {
    matrix.push(new Array(n).fill(0));
  }
  return matrix;
}
```

### Q7
```js
function nestedLog(n) {
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) console.log(i, j);
  }
}
```

### Q8
```js
function twoLoops(arr1, arr2) {
  for (const a of arr1) console.log(a);
  for (const b of arr2) console.log(b);
}
```

## Practical Questions

9. Compare `O(log n)` vs `O(n)` vs `O(n log n)` — at what `n` does it matter?
10. Why is `arr.includes(x)` O(n) but `set.has(x)` O(1)?
11. Is `Array.prototype.sort()` in V8 O(n log n)? Look it up — what algorithm does it use?
12. What's the complexity of `arr.unshift(x)`? Why?
13. What's the complexity of spreading: `[...arr1, ...arr2]`?
14. How does `Object.keys(obj)` compare to iterating a `Map`?

## Optimization Drill

For each, suggest a faster approach and state the new complexity.

15. Find if any two numbers in `arr` sum to `target` (naive is O(n²)).
16. Find the most frequent element in an array (naive is O(n²)).
17. Check if a string has all unique characters (naive is O(n²)).
