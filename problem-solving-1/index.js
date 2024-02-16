// Problem Solving Basic 1

const minMaxSum = (array) => {
  const sums = [];
  let maxNumber = 0;
  let minNumber = 0;

  for (let i = 0; i < array.length; i++) {
    let sum = 0;
    for (let j = 0; j < array.length; j++) {
      if (j !== i) {
        sum += array[j];
      }
    }
    sums.push(sum);
  }

  maxNumber = Math.max(...sums);
  minNumber = Math.min(...sums);

  if (maxNumber <= 0 || minNumber <= 0) {
    return 0
  }

  return [minNumber, maxNumber];
}

const array = [1, 2, 3, 4, 5];
const sumsArray = minMaxSum(array);
console.log(sumsArray);
