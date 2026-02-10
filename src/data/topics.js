export const topics = [
  {
    id: 'arrays',
    title: 'Arrays',
    category: 'Data Structures',
    description: `An Array is a collection of items stored at contiguous memory locations. It is one of the simplest and most widely used data structures.
    
**Analogy:** Imagine a row of numbered lockers. If you know the locker number (index), you can instantly open it and see what's inside!

**Key Concepts:**
- **Traversal:** Visiting every element.
- **Two Pointers:** Using two indices (e.g., start and end) to solve problems like reversing an array.
- **Sliding Window:** Maintaining a sub-array that satisfies specific conditions to optimize nested loops.`,
    timeComplexity: 'O(1) Access, O(n) Search/Insert/Delete',
    spaceComplexity: 'O(n)',
    defaultCode: `// Example: Reverse an Array using Two Pointers
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
  return arr;
}

console.log(reverseArray([1, 2, 3, 4, 5]));`,
    visualizerType: 'arrays',
  },
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    category: 'Algorithms',
    description: `Sorting is the process of arranging data in a particular format, usually in ascending or descending order.

**Analogy:** Think about organizing a deck of cards or putting your books in alphabetical order.

**Key Algorithms:**
- **Bubble Sort:** Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.
- **Merge Sort:** Divides the array in half, sorts each half, and then merges them back together.
- **Quick Sort:** Picks a 'pivot' element and partitions the array around the pivot.`,
    timeComplexity: 'O(n log n) [Merge/Quick], O(n^2) [Bubble/Insertion/Selection]',
    spaceComplexity: 'O(1) to O(n)',
    defaultCode: `// Example: Merge Sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let result = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));`,
    visualizerType: 'sorting',
  },
  {
    id: 'searching',
    title: 'Searching Algorithms',
    category: 'Algorithms',
    description: `Searching algorithms are designed to check for an element or retrieve an element from any data structure where it is stored.

**Analogy:** Looking for a word in a dictionary. You don't read every word (Linear Search), you open to the middle, see if you've gone too far, and split the book again (Binary Search).

**Key Algorithms:**
- **Linear Search:** Scans every element sequentially.
- **Binary Search:** Only works on sorted arrays. Repeatedly divides the search interval in half.`,
    timeComplexity: 'O(n) [Linear], O(log n) [Binary]',
    spaceComplexity: 'O(1)',
    defaultCode: `// Example: Binary Search
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

const sortedArray = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.log("Found at index:", binarySearch(sortedArray, 23));`,
    visualizerType: 'searching',
  },
  {
    id: 'trees',
    title: 'Trees (Binary & BST)',
    category: 'Data Structures',
    description: `A Tree is a hierarchical data structure consisting of nodes connected by edges. A Binary Tree restricts nodes to having at most two children.

**Analogy:** Like a family tree or a corporate organizational chart, where there is one head (root) and everyone else branches out beneath.

**Key Concepts:**
- **Traversals:** Inorder (Left, Root, Right), Preorder (Root, Left, Right), Postorder (Left, Right, Root).
- **BST (Binary Search Tree):** Left child is always less than parent, right child is always greater.`,
    timeComplexity: 'O(log n) for balanced BST operations',
    spaceComplexity: 'O(n)',
    defaultCode: `// Example: Inorder Traversal of a Binary Tree
class Node {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

function inorder(root) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }
  traverse(root);
  return result;
}

const root = new Node(10);
root.left = new Node(5);
root.right = new Node(15);
console.log(inorder(root));`,
    visualizerType: 'tree',
  },
  {
    id: 'graphs',
    title: 'Graph Traversal',
    category: 'Data Structures',
    description: `A Graph is a non-linear data structure consisting of nodes (vertices) and edges. They can be directed or undirected, weighted or unweighted.

**Analogy:** Think of a map of cities connected by highways. The cities are nodes, and the highways are edges. Finding the shortest route between two cities is a classic graph problem (Dijkstra).

**Key Algorithms:**
- **BFS (Breadth-First Search):** Explores neighbors level by level. (Uses Queue).
- **DFS (Depth-First Search):** Goes as deep as possible before backtracking. (Uses Stack/Recursion).
- **Dijkstra's Algorithm:** Finds the shortest path in a weighted graph.`,
    timeComplexity: 'O(V + E) for BFS/DFS',
    spaceComplexity: 'O(V)',
    defaultCode: `// Example: Breadth-First Search (BFS)
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];
  
  visited.add(start);
  
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return result;
}

const graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E']
};
console.log(bfs(graph, 'A'));`,
    visualizerType: 'graph',
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    category: 'Algorithms',
    description: `Dynamic Programming is mainly an optimization over plain recursion. Wherever we see a recursive solution that has repeated calls for same inputs, we can optimize it using DP.

**Analogy:** If I ask you what 1+1+1+1+1+1+1+1 is, you count and say 8. If I add another +1 at the end, you instantly say 9. You didn't recount all over again; you just added 1 to your remembered answer!

**Techniques:**
- **Memoization:** Top-down approach (Caching recursive results).
- **Tabulation:** Bottom-up approach (Building a table iteratively).`,
    timeComplexity: 'Often reduces O(2^n) to O(n) or O(n^2)',
    spaceComplexity: 'O(n) or O(n^2) for memo table',
    defaultCode: `// Example: Fibonacci with Memoization
function fib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

console.log(fib(50)); // Very fast due to DP!`,
    visualizerType: 'none',
  }
];
