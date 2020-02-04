export function getBubbleSortAnimations(array, animations = []) {
  const arrayToOrder = array.slice();
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
