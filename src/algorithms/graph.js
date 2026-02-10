export const generateGraph = (numNodes, numEdges) => {
  const nodes = [];
  for (let i = 0; i < numNodes; i++) {
    // Distribute nodes in a circle for better visualization
    const angle = (i / numNodes) * 2 * Math.PI;
    const radius = 150;
    const x = 300 + radius * Math.cos(angle);
    const y = 200 + radius * Math.sin(angle);
    nodes.push({ id: i, value: i, x, y });
  }

  const edges = [];
  const adjacencyList = Array.from({ length: numNodes }, () => []);
  
  // Keep track of added edges to avoid duplicates
  const added = new Set();
  
  let edgeCount = 0;
  // Make sure it's connected first (simple path 0 -> 1 -> ... -> n-1)
  for (let i = 0; i < numNodes - 1; i++) {
    const weight = Math.floor(Math.random() * 10) + 1;
    edges.push({ source: i, target: i + 1, weight });
    adjacencyList[i].push({ node: i + 1, weight });
    adjacencyList[i + 1].push({ node: i, weight });
    added.add(`${i}-${i+1}`);
    added.add(`${i+1}-${i}`);
    edgeCount++;
  }
  
  // Add random edges
  while (edgeCount < numEdges) {
    const u = Math.floor(Math.random() * numNodes);
    const v = Math.floor(Math.random() * numNodes);
    
    if (u !== v && !added.has(`${u}-${v}`)) {
      const weight = Math.floor(Math.random() * 10) + 1;
      edges.push({ source: u, target: v, weight });
      adjacencyList[u].push({ node: v, weight });
      adjacencyList[v].push({ node: u, weight });
      added.add(`${u}-${v}`);
      added.add(`${v}-${u}`);
      edgeCount++;
    }
  }

  return { nodes, edges, adjacencyList };
};

export const generateGraphTraversalSteps = (graph, algorithm, startNode = 0) => {
  if (!graph || !graph.adjacencyList) return [];
  
  if (algorithm === 'BFS') {
    return bfs(graph, startNode);
  } else if (algorithm === 'DFS') {
    return dfs(graph, startNode);
  } else if (algorithm === 'Dijkstra') {
    return dijkstra(graph, startNode);
  }
  
  return [];
};

const bfs = (graph, startNode) => {
  const steps = [];
  const visited = new Set([startNode]);
  const queue = [startNode];
  const processedEdges = [];
  
  steps.push({
    currentNode: startNode,
    visited: Array.from(visited),
    queue: [...queue],
    processedEdges: [...processedEdges],
    description: `Start BFS from node ${startNode}`
  });

  while (queue.length > 0) {
    const current = queue.shift();
    
    steps.push({
      currentNode: current,
      visited: Array.from(visited),
      queue: [...queue],
      processedEdges: [...processedEdges],
      description: `Dequeued node ${current}, processing neighbors`
    });

    for (const neighbor of graph.adjacencyList[current]) {
      processedEdges.push({ source: current, target: neighbor.node });
      
      steps.push({
        currentNode: current,
        visitingNeighbor: neighbor.node,
        visited: Array.from(visited),
        queue: [...queue],
        processedEdges: [...processedEdges],
        description: `Checking neighbor ${neighbor.node} of node ${current}`
      });

      if (!visited.has(neighbor.node)) {
        visited.add(neighbor.node);
        queue.push(neighbor.node);
        
        steps.push({
          currentNode: neighbor.node,
          visited: Array.from(visited),
          queue: [...queue],
          processedEdges: [...processedEdges],
          description: `Node ${neighbor.node} not visited. Enqueue and mark visited.`
        });
      }
    }
  }
  
  steps.push({
    currentNode: null,
    visited: Array.from(visited),
    queue: [],
    processedEdges: [...processedEdges],
    description: `BFS completed`
  });
  
  return steps;
};

const dfs = (graph, startNode) => {
  const steps = [];
  const visited = new Set();
  const processedEdges = [];
  
  const dfsHelper = (node, parent) => {
    visited.add(node);
    
    if (parent !== null) {
      processedEdges.push({ source: parent, target: node });
    }
    
    steps.push({
      currentNode: node,
      visited: Array.from(visited),
      processedEdges: [...processedEdges],
      description: `Visiting node ${node}`
    });

    for (const neighbor of graph.adjacencyList[node]) {
      steps.push({
        currentNode: node,
        visitingNeighbor: neighbor.node,
        visited: Array.from(visited),
        processedEdges: [...processedEdges],
        description: `Checking neighbor ${neighbor.node} of node ${node}`
      });

      if (!visited.has(neighbor.node)) {
        dfsHelper(neighbor.node, node);
      } else {
        steps.push({
          currentNode: node,
          visitingNeighbor: neighbor.node,
          visited: Array.from(visited),
          processedEdges: [...processedEdges],
          description: `Neighbor ${neighbor.node} already visited, backtracking.`
        });
      }
    }
    
    steps.push({
      currentNode: node,
      visited: Array.from(visited),
      processedEdges: [...processedEdges],
      description: `Finished processing node ${node}, backtracking.`
    });
  };

  dfsHelper(startNode, null);
  
  steps.push({
    currentNode: null,
    visited: Array.from(visited),
    processedEdges: [...processedEdges],
    description: `DFS completed`
  });

  return steps;
};

const dijkstra = (graph, startNode) => {
  const steps = [];
  const n = graph.adjacencyList.length;
  const distances = Array(n).fill(Infinity);
  distances[startNode] = 0;
  
  const visited = new Set();
  const processedEdges = [];
  
  // For path reconstruction if needed
  const previous = Array(n).fill(null);

  steps.push({
    currentNode: startNode,
    visited: Array.from(visited),
    distances: [...distances],
    processedEdges: [...processedEdges],
    description: `Initialize Dijkstra from node ${startNode}. Distance to ${startNode} is 0, others Infinity.`
  });

  for (let i = 0; i < n; i++) {
    // Find unvisited node with minimum distance
    let current = -1;
    let minDistance = Infinity;
    
    for (let j = 0; j < n; j++) {
      if (!visited.has(j) && distances[j] < minDistance) {
        minDistance = distances[j];
        current = j;
      }
    }

    if (current === -1) break; // All remaining vertices are inaccessible
    
    visited.add(current);
    
    steps.push({
      currentNode: current,
      visited: Array.from(visited),
      distances: [...distances],
      processedEdges: [...processedEdges],
      description: `Selected unvisited node ${current} with minimum known distance ${distances[current]}`
    });

    for (const neighbor of graph.adjacencyList[current]) {
      const { node: neighborNode, weight } = neighbor;
      
      if (!visited.has(neighborNode)) {
        processedEdges.push({ source: current, target: neighborNode });
        const newDist = distances[current] + weight;
        
        steps.push({
          currentNode: current,
          visitingNeighbor: neighborNode,
          visited: Array.from(visited),
          distances: [...distances],
          processedEdges: [...processedEdges],
          description: `Checking edge ${current} -> ${neighborNode} (weight: ${weight}). Current dist to ${neighborNode}: ${distances[neighborNode]}, New possible dist: ${distances[current]} + ${weight} = ${newDist}`
        });

        if (newDist < distances[neighborNode]) {
          distances[neighborNode] = newDist;
          previous[neighborNode] = current;
          
          steps.push({
            currentNode: current,
            visitingNeighbor: neighborNode,
            visited: Array.from(visited),
            distances: [...distances],
            processedEdges: [...processedEdges],
            description: `Updated distance to node ${neighborNode} to ${newDist}`
          });
        }
      }
    }
  }

  steps.push({
    currentNode: null,
    visited: Array.from(visited),
    distances: [...distances],
    processedEdges: [...processedEdges],
    description: `Dijkstra's Algorithm completed`
  });

  return steps;
};
