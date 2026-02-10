export const generateSearchingSteps = (array, target, algorithm) => {
  const steps = [];
  
  if (algorithm === 'Linear Search') {
    linearSearch(array, target, steps);
  } else if (algorithm === 'Binary Search') {
    binarySearch(array, target, steps);
  }
  
  return steps;
};

const linearSearch = (arr, target, steps) => {
  let found = false;
  
  for (let i = 0; i < arr.length; i++) {
    steps.push({
      array: [...arr],
      currentIndex: i,
      left: null,
      right: null,
      mid: null,
      foundIndex: null,
      target: target,
      action: `Checking index ${i} (value: ${arr[i]})`
    });
    
    if (arr[i] === target) {
      found = true;
      steps.push({
        array: [...arr],
        currentIndex: i,
        left: null,
        right: null,
        mid: null,
        foundIndex: i,
        target: target,
        action: `Target ${target} found at index ${i}!`
      });
      break;
    }
  }
  
  if (!found) {
    steps.push({
      array: [...arr],
      currentIndex: null,
      left: null,
      right: null,
      mid: null,
      foundIndex: -1,
      target: target,
      action: `Target ${target} not found in array.`
    });
  }
};

const binarySearch = (arr, target, steps) => {
  let left = 0;
  let right = arr.length - 1;
  let found = false;
  
  steps.push({
    array: [...arr],
    currentIndex: null,
    left,
    right,
    mid: null,
    foundIndex: null,
    target: target,
    action: `Initial bounds: Left=${left}, Right=${right}`
  });

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    steps.push({
      array: [...arr],
      currentIndex: null,
      left,
      right,
      mid,
      foundIndex: null,
      target: target,
      action: `Calculating Midpoint: Mid=${mid} (value: ${arr[mid]})`
    });
    
    if (arr[mid] === target) {
      found = true;
      steps.push({
        array: [...arr],
        currentIndex: null,
        left,
        right,
        mid,
        foundIndex: mid,
        target: target,
        action: `Target ${target} found at index ${mid}!`
      });
      break;
    } else if (arr[mid] < target) {
      left = mid + 1;
      steps.push({
        array: [...arr],
        currentIndex: null,
        left,
        right,
        mid,
        foundIndex: null,
        target: target,
        action: `${arr[mid]} < ${target}. Move Left bound to ${left}`
      });
    } else {
      right = mid - 1;
      steps.push({
        array: [...arr],
        currentIndex: null,
        left,
        right,
        mid,
        foundIndex: null,
        target: target,
        action: `${arr[mid]} > ${target}. Move Right bound to ${right}`
      });
    }
  }
  
  if (!found) {
    steps.push({
      array: [...arr],
      currentIndex: null,
      left: null,
      right: null,
      mid: null,
      foundIndex: -1,
      target: target,
      action: `Target ${target} not found in array.`
    });
  }
};
