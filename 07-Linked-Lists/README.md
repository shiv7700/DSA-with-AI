# 07 — Linked Lists

> Pointer manipulation is a muscle. Build it here, and trees, graphs, and every other pointer-chasing structure will feel intuitive. Master the **node-and-pointer model**, then move on to the canonical patterns: slow/fast pointers, dummy nodes, reversal, cycle detection, merge.

## Learn Path

1. **Read [`notes.md`](./notes.md) first** — what a linked list is, how nodes work, ASCII diagrams of every major operation, the slow/fast pointer pattern, reversal step-by-step, singly vs doubly vs circular, and complexity trade-offs vs arrays.
2. Implement the `ListNode` and `LinkedList` classes (Q1 and Q2) before touching any other problem.
3. Solve questions in order. Each lives in `questions/<NN>-<slug>.md`.
4. Write your solution in the matching `solutions/<NN>-<slug>.js`.
5. Tick off the checklist below as you finish.

## Progress

### Implement First
- [ ] [01 — Implement ListNode Class](./questions/01-implement-listnode.md)
- [ ] [02 — Implement LinkedList Class](./questions/02-implement-linkedlist.md)

### Easy (warm-up)
- [ ] [03 — Insert at Head, Tail, and Index](./questions/03-insert-positions.md)
- [ ] [04 — Delete at Head, Tail, and Index](./questions/04-delete-positions.md)
- [ ] [05 — Search for a Value](./questions/05-search-value.md)
- [ ] [06 — Get the Length](./questions/06-get-length.md)
- [ ] [07 — Print the List](./questions/07-print-list.md)
- [ ] [08 — Array to Linked List and Back](./questions/08-array-conversion.md)
- [ ] [09 — Find the Middle Node](./questions/09-find-middle.md)
- [ ] [10 — Nth Node From the End](./questions/10-nth-from-end.md)
- [ ] [11 — Delete a Node (No Head Access)](./questions/11-delete-node-no-head.md)
- [ ] [12 — Check if List is Empty](./questions/12-is-empty.md)

### Medium
- [ ] [13 — Reverse a Linked List](./questions/13-reverse-list.md)
- [ ] [14 — Detect a Cycle](./questions/14-detect-cycle.md)
- [ ] [15 — Find the Start of a Cycle](./questions/15-cycle-start.md)
- [ ] [16 — Merge Two Sorted Lists](./questions/16-merge-sorted-lists.md)
- [ ] [17 — Remove Nth Node From End](./questions/17-remove-nth-from-end.md)
- [ ] [18 — Remove Duplicates from Sorted List](./questions/18-remove-duplicates-sorted.md)
- [ ] [19 — Remove Duplicates from Unsorted List](./questions/19-remove-duplicates-unsorted.md)
- [ ] [20 — Palindrome Linked List](./questions/20-palindrome-list.md)
- [ ] [21 — Intersection of Two Linked Lists](./questions/21-intersection.md)
- [ ] [22 — Add Two Numbers](./questions/22-add-two-numbers.md)
- [ ] [23 — Add Two Numbers II](./questions/23-add-two-numbers-ii.md)
- [ ] [24 — Odd Even Linked List](./questions/24-odd-even-list.md)
- [ ] [25 — Swap Nodes in Pairs](./questions/25-swap-pairs.md)
- [ ] [26 — Rotate Linked List](./questions/26-rotate-list.md)
- [ ] [27 — Partition List](./questions/27-partition-list.md)

### Hard
- [ ] [28 — Reverse Nodes in k-Group](./questions/28-reverse-k-group.md)
- [ ] [29 — Merge k Sorted Lists](./questions/29-merge-k-sorted-lists.md)
- [ ] [30 — Copy List with Random Pointer](./questions/30-copy-random-list.md)
- [ ] [31 — LRU Cache](./questions/31-lru-cache.md)
- [ ] [32 — Flatten a Multilevel Doubly Linked List](./questions/32-flatten-multilevel-dll.md)
- [ ] [33 — Reverse a Doubly Linked List](./questions/33-reverse-dll.md)
- [ ] [34 — Sort a Linked List](./questions/34-sort-list.md)

### Doubly Linked List Drills
- [ ] [35 — Implement a Doubly Linked List Class](./questions/35-implement-dll.md)
- [ ] [36 — Convert Singly to Doubly Linked List](./questions/36-singly-to-doubly.md)

### Circular Linked List Drills
- [ ] [37 — Detect a Circular Linked List](./questions/37-detect-circular.md)
- [ ] [38 — Insert into Sorted Circular List](./questions/38-insert-circular-sorted.md)
- [ ] [39 — Josephus Problem](./questions/39-josephus.md)

## Related Topics

- [02 — Arrays](../02-Arrays/) — the contrast: random access vs pointer chasing.
- [08 — Stacks](../08-Stacks/) — can be implemented with a linked list.
- [09 — Queues](../09-Queues/) — the linked-list queue is the canonical O(1) enqueue/dequeue.
- [15 — Trees](../15-Trees/) — every tree node is a linked node with multiple `next` pointers.
- [19 — Two Pointers](../19-Two-Pointers/) — slow/fast pointer pattern lives here.
