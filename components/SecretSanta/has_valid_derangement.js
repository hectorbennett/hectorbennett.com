function swap(arr, index1, index2) {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    swap(array, i, j);
  }
}

function is_valid(arr1, arr2, invalid_pairs) {
  for (let i in arr1) {
    // if any is matched with themselves
    if (arr1[i] === arr2[i]) {
      return false;
    }
    for (let j in invalid_pairs) {
      if (invalid_pairs[j].includes(arr1[i]) && invalid_pairs[j].includes(arr2[i])) {
        return false;
      }
    }
  }
  return true;
}

export function has_valid_derangement(array, invalid_pairs = []) {
  // const originalArray = [...array];
  var newArray = [...array];
  var attempts = 200;
  while (attempts >= 0) {
    attempts -= 1;
    shuffleArray(newArray);
    if (is_valid(array, newArray, invalid_pairs)) {
      return true;
    }
  }
  return null;
}
