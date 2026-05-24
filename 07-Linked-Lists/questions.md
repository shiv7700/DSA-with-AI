# Linked Lists

> Pointer manipulation is a muscle. Build it here, and trees/graphs will feel easy.

## Concept Check

1. Array vs Linked List — when do you pick which?
2. Singly vs Doubly vs Circular Linked List — pros & cons.
3. Why is insertion at head O(1) for LL but O(n) for array?
4. Why is random access O(n) in LL?
5. Why doesn't JS have a built-in LinkedList? How would you implement a Node class?
6. What is a "dummy node" / "sentinel" and why do we use it?
7. Difference between iterative and recursive list traversal — space cost?

## Implement First

Before solving problems, build:
```js
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  // push, pop, shift, unshift, get(i), insert(i, val), remove(i), reverse, toArray
}
```

## Easy

1. Insert at head, tail, and at index `i`.
2. Delete at head, tail, and at index `i`.
3. Search for a value — return the node (or null).
4. Get the length of the list (iterative and recursive).
5. Print the list (iterative and recursive).
6. Convert an array to a linked list and back.
7. Find the middle node — single pass (slow/fast pointers).
8. Find the nth node from the end — single pass.
9. Delete a node given **only access to that node** (not the head).
10. Check if a linked list is empty.

## Medium

11. **Reverse a Linked List** — iterative and recursive.
12. **Detect a Cycle** — Floyd's Tortoise & Hare.
13. **Find the Start of a Cycle**.
14. **Merge Two Sorted Lists**.
15. **Remove Nth Node From End** — single pass.
16. **Remove Duplicates from Sorted List**.
17. **Remove Duplicates from Unsorted List** — with and without extra space.
18. **Palindrome Linked List** — O(n) time, O(1) space.
19. **Intersection of Two Linked Lists** — find the merging node.
20. **Add Two Numbers** — digits stored in reverse order in two lists.
21. **Add Two Numbers II** — digits stored in forward order.
22. **Odd Even Linked List** — group odd-indexed then even-indexed nodes.
23. **Swap Nodes in Pairs**.
24. **Rotate Linked List** by `k` places.
25. **Partition List** — around value `x`.

## Hard

26. **Reverse Nodes in k-Group**.
27. **Merge k Sorted Lists** — using a min-heap (O(N log k)).
28. **Copy List with Random Pointer**.
29. **LRU Cache** — using doubly linked list + hash map (O(1) get/put).
30. **Flatten a Multilevel Doubly Linked List**.
31. **Reverse a Doubly Linked List**.
32. **Sort a Linked List** — using merge sort, O(n log n).

## Doubly Linked List Drills

33. Implement a DLL class with `addFront`, `addBack`, `removeFront`, `removeBack`.
34. Convert a singly linked list to a doubly linked list.

## Circular Linked List Drills

35. Detect if a circular linked list is actually circular.
36. Insert into a sorted circular linked list.
37. Josephus problem — last person standing.
