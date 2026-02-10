export const generateSortingSteps = (array, algorithm) => {
  const steps = [];
  const tempArray = [...array];
  
  if (algorithm === 'Bubble Sort') {
    bubbleSort(tempArray, steps);
  } else if (algorithm === 'Merge Sort') {
    mergeSort(tempArray, steps);
  } else if (algorithm === 'Quick Sort') {
    quickSort(tempArray, steps);
  } else if (algorithm === 'Selection Sort') {
    selectionSort(tempArray, steps);
  } else if (algorithm === 'Insertion Sort') {
    insertionSort(tempArray, steps);
  }
  
  // Final step to ensure everything is marked as sorted
  const finalSorted = Array.from({ length: array.length }, (_, i) => i);
  steps.push({
    array: [...tempArray],
    comparing: [],
    swapping: [],
    sorted: finalSorted
  });
  
  return steps;
};

const selectionSort = (arr, steps) => {
  let n = arr.length;
  let sortedIndices = [];
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparing: [minIdx, j],
        swapping: [],
        sorted: [...sortedIndices]
      });
      
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      let temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sortedIndices]
      });
    }
    sortedIndices.push(i);
  }
  sortedIndices.push(n - 1);
};

const insertionSort = (arr, steps) => {
  let n = arr.length;
  let sortedIndices = [0];
  
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    
    steps.push({
      array: [...arr],
      comparing: [i, j],
      swapping: [],
      sorted: [...sortedIndices]
    });

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [j, j + 1],
        sorted: [...sortedIndices]
      });
      j = j - 1;
      
      if (j >= 0) {
        steps.push({
          array: [...arr],
          comparing: [j + 1, j],
          swapping: [],
          sorted: [...sortedIndices]
        });
      }
    }
    arr[j + 1] = key;
    sortedIndices.push(i);
  }
};

const bubbleSort = (arr, steps) => {
  let n = arr.length;
  let sortedIndices = [];
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sortedIndices]
      });
      
      if (arr[j] > arr[j + 1]) {
        // Swap
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
        
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sortedIndices]
        });
      }
    }
    sortedIndices.push(n - i - 1);
    if (!swapped) {
      // If no two elements were swapped, it's sorted
      for(let k = 0; k < n - i - 1; k++) {
        sortedIndices.push(k);
      }
      break;
    }
  }
  sortedIndices.push(0);
};

const mergeSort = (arr, steps) => {
  const sortedIndices = [];
  mergeSortHelper(arr, 0, arr.length - 1, steps, sortedIndices);
};

const mergeSortHelper = (arr, left, right, steps, sortedIndices) => {
  if (left >= right) return;
  const mid = Math.floor((left + right) / 2);
  mergeSortHelper(arr, left, mid, steps, sortedIndices);
  mergeSortHelper(arr, mid + 1, right, steps, sortedIndices);
  merge(arr, left, mid, right, steps, sortedIndices);
};

const merge = (arr, left, mid, right, steps, sortedIndices) => {
  const temp = [];
  let i = left;
  let j = mid + 1;
  
  while (i <= mid && j <= right) {
    steps.push({
      array: [...arr],
      comparing: [i, j],
      swapping: [],
      sorted: [...sortedIndices]
    });
    
    if (arr[i] <= arr[j]) {
      temp.push(arr[i]);
      i++;
    } else {
      temp.push(arr[j]);
      j++;
    }
  }
  
  while (i <= mid) {
    temp.push(arr[i]);
    i++;
  }
  
  while (j <= right) {
    temp.push(arr[j]);
    j++;
  }
  
  for (let k = left; k <= right; k++) {
    arr[k] = temp[k - left];
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [k], // highlight the overwritten index
      sorted: [...sortedIndices]
    });
  }
};

const quickSort = (arr, steps) => {
  const sortedIndices = [];
  quickSortHelper(arr, 0, arr.length - 1, steps, sortedIndices);
};

const quickSortHelper = (arr, low, high, steps, sortedIndices) => {
  if (low < high) {
    const pi = partition(arr, low, high, steps, sortedIndices);
    sortedIndices.push(pi);
    quickSortHelper(arr, low, pi - 1, steps, sortedIndices);
    quickSortHelper(arr, pi + 1, high, steps, sortedIndices);
  } else if (low === high) {
    sortedIndices.push(low);
  }
};

const partition = (arr, low, high, steps, sortedIndices) => {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    steps.push({
      array: [...arr],
      comparing: [j, high], // comparing with pivot
      swapping: [],
      sorted: [...sortedIndices]
    });
    
    if (arr[j] < pivot) {
      i++;
      // Swap arr[i] and arr[j]
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, j],
        sorted: [...sortedIndices]
      });
    }
  }
  
  // Swap arr[i+1] and arr[high] (pivot)
  let temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [i + 1, high],
    sorted: [...sortedIndices]
  });
  
  return i + 1;
};
