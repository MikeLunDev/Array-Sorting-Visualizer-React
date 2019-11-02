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
