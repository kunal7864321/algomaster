export const generateTree = (numNodes) => {
  if (numNodes === 0) return null;
  
  // Create a random balanced-ish binary tree
  const nodes = [];
  for (let i = 1; i <= numNodes; i++) {
    nodes.push({ id: i, value: Math.floor(Math.random() * 90) + 10, left: null, right: null });
  }
  
  // Assign children randomly but keep it as a tree
  const root = nodes[0];
  const queue = [root];
  let i = 1;
  
  while (queue.length > 0 && i < nodes.length) {
    const current = queue.shift();
    
    // Assign left
    if (i < nodes.length) {
      current.left = nodes[i];
      queue.push(nodes[i]);
      i++;
    }
    
    // Assign right
    if (i < nodes.length) {
      current.right = nodes[i];
      queue.push(nodes[i]);
      i++;
    }
  }
  
  return root;
};

export const generateTreeTraversalSteps = (root, algorithm) => {
  const steps = [];
  const visited = [];
  
  if (!root) return steps;

  if (algorithm === 'Inorder') {
    inorder(root, steps, visited);
  } else if (algorithm === 'Preorder') {
    preorder(root, steps, visited);
  } else if (algorithm === 'Postorder') {
    postorder(root, steps, visited);
  } else if (algorithm === 'Level Order') {
    levelOrder(root, steps, visited);
  }
  
  return steps;
};

const levelOrder = (root, steps, visited) => {
  if (!root) return;
  
  const queue = [root];
  
  while(queue.length > 0) {
    const node = queue.shift();
    
    visited.push(node.id);
    steps.push({ currentNode: node.id, visited: [...visited], action: 'processing node' });
    
    if (node.left) {
      steps.push({ currentNode: node.left.id, visited: [...visited], action: 'enqueueing left' });
      queue.push(node.left);
    }
    
    if (node.right) {
      steps.push({ currentNode: node.right.id, visited: [...visited], action: 'enqueueing right' });
      queue.push(node.right);
    }
  }
};

const inorder = (node, steps, visited) => {
  if (!node) return;
  
  steps.push({ currentNode: node.id, visited: [...visited], action: 'visiting left' });
  inorder(node.left, steps, visited);
  
  visited.push(node.id);
  steps.push({ currentNode: node.id, visited: [...visited], action: 'processing node' });
  
  steps.push({ currentNode: node.id, visited: [...visited], action: 'visiting right' });
  inorder(node.right, steps, visited);
};

const preorder = (node, steps, visited) => {
  if (!node) return;
  
  visited.push(node.id);
  steps.push({ currentNode: node.id, visited: [...visited], action: 'processing node' });
  
  steps.push({ currentNode: node.id, visited: [...visited], action: 'visiting left' });
  preorder(node.left, steps, visited);
  
  steps.push({ currentNode: node.id, visited: [...visited], action: 'visiting right' });
  preorder(node.right, steps, visited);
};

const postorder = (node, steps, visited) => {
  if (!node) return;
  
  steps.push({ currentNode: node.id, visited: [...visited], action: 'visiting left' });
  postorder(node.left, steps, visited);
  
  steps.push({ currentNode: node.id, visited: [...visited], action: 'visiting right' });
  postorder(node.right, steps, visited);
  
  visited.push(node.id);
  steps.push({ currentNode: node.id, visited: [...visited], action: 'processing node' });
};

// Helper for positioning nodes for visualization
export const calculateTreePositions = (root, containerWidth, containerHeight) => {
  if (!root) return [];
  
  const nodes = [];
  const edges = [];
  
  const getDepth = (node) => {
    if (!node) return 0;
    return 1 + Math.max(getDepth(node.left), getDepth(node.right));
  };
  
  const maxDepth = getDepth(root);
  const verticalSpacing = containerHeight / (maxDepth + 1);
  
  const traverse = (node, depth, leftBoundary, rightBoundary, parent) => {
    if (!node) return;
    
    const x = (leftBoundary + rightBoundary) / 2;
    const y = depth * verticalSpacing;
    
    nodes.push({ ...node, x, y });
    
    if (parent) {
      edges.push({ from: parent.id, to: node.id, x1: parent.x, y1: parent.y, x2: x, y2: y });
    }
    
    traverse(node.left, depth + 1, leftBoundary, x, {id: node.id, x, y});
    traverse(node.right, depth + 1, x, rightBoundary, {id: node.id, x, y});
  };
  
  traverse(root, 1, 0, containerWidth, null);
  
  return { nodes, edges };
};
