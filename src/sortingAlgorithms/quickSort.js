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

function swap(items, leftIndex, rightIndex, animations) {
  //to change color
  animations.push([leftIndex, rightIndex, items[leftIndex], items[rightIndex]]);
  //to change position
  animations.push([leftIndex, rightIndex, items[leftIndex], items[rightIndex]]);
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}
