# Trees (Binary Trees)

> Recursion's natural home. Master the 3 traversals and most tree problems become a one-liner of "recurse left, recurse right, do something with current".

## Concept Check

1. Define: root, leaf, internal node, parent, child, sibling, ancestor, descendant.
2. Define: depth, height, level, degree.
3. Full vs Complete vs Perfect vs Balanced vs Degenerate binary tree.
4. Why do trees often have O(log n) operations? When can they degenerate to O(n)?
5. Difference between **DFS** (pre/in/post-order) and **BFS** (level-order).
6. When do you choose iterative traversal over recursive?

## Implement First

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```

## Traversals (recursive AND iterative)

1. Preorder traversal.
2. Inorder traversal.
3. Postorder traversal.
4. Level-order traversal (BFS).
5. Reverse level-order traversal.
6. Zigzag / spiral level-order traversal.
7. Morris Traversal — O(1) space inorder.

## Easy

8. Count total nodes.
9. Count leaf nodes.
10. Find height / max depth.
11. Find minimum depth.
12. Sum of all nodes.
13. Find the maximum value in a binary tree.
14. Mirror / invert a binary tree.
15. Check if two trees are identical.
16. Check if a tree is a subtree of another.
17. Check if a tree is symmetric.
18. Print all root-to-leaf paths.
19. Find the diameter of a tree (longest path between any two nodes).

## Medium

20. **Lowest Common Ancestor** of a binary tree.
21. **Path Sum** — does any root-to-leaf path equal `targetSum`?
22. **Path Sum II** — return all such paths.
23. **Path Sum III** — count paths (not necessarily root-to-leaf) summing to target.
24. **Binary Tree Right Side View**.
25. **Boundary Traversal** of a binary tree.
26. **Vertical Order Traversal**.
27. **Top View / Bottom View / Left View / Right View**.
28. **Construct Binary Tree from Preorder & Inorder**.
29. **Construct Binary Tree from Postorder & Inorder**.
30. **Serialize and Deserialize Binary Tree**.
31. **Flatten Binary Tree to Linked List**.
32. **Populating Next Right Pointers in Each Node** (I and II).
33. **Count Good Nodes**.
34. **Sum of Left Leaves**.
35. **Maximum Width of Binary Tree**.
36. **All Nodes Distance K in Binary Tree**.
37. **Lowest Common Ancestor of Deepest Leaves**.
38. **Smallest Subtree with All Deepest Nodes**.
39. **Check if a Binary Tree is Balanced** (height-balanced).
40. **Children Sum Property** — convert tree to satisfy it.

## Hard

41. **Binary Tree Maximum Path Sum** — any node to any node.
42. **Recover a Binary Search Tree** — two nodes were swapped.
43. **Vertical Order Traversal** with tie-breaking by value.
44. **Burning Tree** — minimum time to burn the whole tree from a target node.
45. **Sum Root to Leaf Numbers** — paths represent numbers.
46. **Binary Tree Cameras** — minimum cameras to cover all nodes.
47. **House Robber III** — on a binary tree.

## N-ary Tree

48. Preorder / Postorder / Level-order on an N-ary tree.
49. Maximum depth of N-ary tree.
50. Serialize / Deserialize N-ary tree.
