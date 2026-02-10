export const generateArraySteps = (array, algorithm, k = 3) => {
  const steps = [];
  
  if (algorithm === 'Reverse (Two Pointers)') {
    reverseArray(array, steps);
  } else if (algorithm === 'Sliding Window (Sum)') {
    slidingWindowSum(array, k, steps);
  }
  
  return steps;
};

const reverseArray = (arr, steps) => {
  let left = 0;
  let right = arr.length - 1;
  const tempArray = [...arr];

  steps.push({
    array: [...tempArray],
    pointers: [left, right],
    swapping: [],
    window: [],
    description: `Initialize two pointers: left at index ${left}, right at index ${right}.`
  });

  while (left < right) {
    steps.push({
      array: [...tempArray],
      pointers: [left, right],
      swapping: [left, right],
      window: [],
      description: `Swap elements at index ${left} (${tempArray[left]}) and index ${right} (${tempArray[right]}).`
    });

    // Swap
    let temp = tempArray[left];
    tempArray[left] = tempArray[right];
    tempArray[right] = temp;

    steps.push({
      array: [...tempArray],
      pointers: [left, right],
      swapping: [],
      window: [],
      description: `Swapped. Moving pointers inwards.`
    });

    left++;
    right--;

    if (left <= right) {
      steps.push({
        array: [...tempArray],
        pointers: [left, right],
        swapping: [],
        window: [],
        description: `Left is now ${left}, Right is now ${right}.`
      });
    }
  }

  steps.push({
    array: [...tempArray],
    pointers: [],
    swapping: [],
    window: [],
    description: `Pointers met. Array reversal complete!`
  });
};

const slidingWindowSum = (arr, k, steps) => {
  if (arr.length < k) {
    steps.push({
      array: [...arr],
      pointers: [],
      swapping: [],
      window: [],
      description: `Array size is smaller than window size ${k}.`
    });
    return;
  }

  let maxSum = 0;
  let currentSum = 0;

  // Initialize first window
  let windowIndices = [];
  for (let i = 0; i < k; i++) {
    currentSum += arr[i];
    windowIndices.push(i);
  }
  maxSum = currentSum;

  steps.push({
    array: [...arr],
    pointers: [],
    swapping: [],
    window: [...windowIndices],
    description: `Initial window of size ${k}. Current Sum: ${currentSum}. Max Sum: ${maxSum}`
  });

  for (let i = k; i < arr.length; i++) {
    // Slide the window
    let removedIdx = i - k;
    let addedIdx = i;
    
    steps.push({
      array: [...arr],
      pointers: [removedIdx, addedIdx],
      swapping: [],
      window: [...windowIndices],
      description: `Sliding window right. Removing index ${removedIdx} (${arr[removedIdx]}), Adding index ${addedIdx} (${arr[addedIdx]}).`
    });

    currentSum = currentSum - arr[removedIdx] + arr[addedIdx];
    
    // Update window indices
    windowIndices.shift();
    windowIndices.push(addedIdx);

    let isNewMax = currentSum > maxSum;
    if (isNewMax) {
      maxSum = currentSum;
    }

    steps.push({
      array: [...arr],
      pointers: [],
      swapping: [],
      window: [...windowIndices],
      description: `New Window Sum: ${currentSum}. ${isNewMax ? 'New Max Sum Found!' : `Max Sum remains ${maxSum}`}.`
    });
  }

  steps.push({
    array: [...arr],
    pointers: [],
    swapping: [],
    window: [],
    description: `Reached end of array. Final Max Sum for window size ${k} is ${maxSum}.`
  });
};
