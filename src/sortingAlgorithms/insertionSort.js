export function getInsertionSortAnimations(items, animations = []) {
  for (var i = 0; i < items.length; i++) {
    let value = items[i];

    for (var j = i - 1; j > -1 && items[j] > value; j--) {
      //to change color
      animations.push([j, j + 1, items[j + 1], items[j]]);
      //to change position
      animations.push([j, j + 1, items[j + 1], items[j]]);
      items[j + 1] = items[j];
    }

    items[j + 1] = value;
  }

  return animations;
}
