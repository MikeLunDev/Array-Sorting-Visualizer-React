export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

export function getBubbleSortAnimations(array, animations = []) {
  var arrayToOrder = array.slice();
  let len = arrayToOrder.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (arrayToOrder[j] > arrayToOrder[j + 1]) {
        //to change color
        animations.push([j, j + 1, arrayToOrder[j], arrayToOrder[j + 1]]);
        //to change position
        animations.push([j, j + 1, arrayToOrder[j], arrayToOrder[j + 1]]);
        let tmp = arrayToOrder[j];
        arrayToOrder[j] = arrayToOrder[j + 1];
        arrayToOrder[j + 1] = tmp;
      }
    }
  }
  return animations;
}

export function getQuickSortAnimations(items, left, right, animations = []) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right, animations); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      getQuickSortAnimations(items, left, index - 1, animations);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      getQuickSortAnimations(items, index, right, animations);
    }
  }
  return animations;
}

function swap(items, leftIndex, rightIndex, animations) {
  //to change color
  animations.push([leftIndex, rightIndex, items[leftIndex], items[rightIndex]]);
  //to change position
  animations.push([leftIndex, rightIndex, items[leftIndex], items[rightIndex]]);
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

function partition(items, left, right, animations) {
  var pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j, animations); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

export function getHeapSortAnimations(input, animations = []) {
  var array_length = input.length;

  for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
    heap_root(input, i, array_length, animations);
  }

  for (i = input.length - 1; i > 0; i--) {
    swapHeap(input, 0, i, animations);
    array_length--;

    heap_root(input, 0, array_length, animations);
  }
  return animations;
}

function heap_root(input, i, array_length, animations) {
  var left = 2 * i + 1;
  var right = 2 * i + 2;
  var max = i;

  if (left < array_length && input[left] > input[max]) {
    max = left;
  }

  if (right < array_length && input[right] > input[max]) {
    max = right;
  }

  if (max !== i) {
    swapHeap(input, i, max, animations);
    heap_root(input, max, array_length, animations);
  }
}

function swapHeap(input, index_A, index_B, animations) {
  //to change color
  animations.push([index_A, index_B, input[index_A], input[index_B]]);
  //to change position
  animations.push([index_A, index_B, input[index_A], input[index_B]]);
  var temp = input[index_A];
  input[index_A] = input[index_B];
  input[index_B] = temp;
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
