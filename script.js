// Global Variables
const number = process.argv[2] || 6; // customize this!
const numberSquared = number ** 2; // square of user number

// Script
const spiral = clockwiseSpiral(number);
printSpiral(spiral, numberSquared)

function clockwiseSpiral(number) {
  let i, j; // looping
  let count = 1; // current number
  let currentSideCount = number; // number of additions added per side (decrements)

  const sides = ['t', 'r', 'b', 'l']; // list of sides on a square
  const spiral = createBlankArray(); // holds the grid
  let currentSideIndex = 0; // tells us which side we're currently on
  let spiralLayer = -1; // current layer of depth (actually starts at 0)

  // this object will add numbers to the grid depending on which side we want
  const addNumbers = {
    toTop: () => {
      spiralLayer++;
      for (i = spiralLayer; i < spiralLayer + currentSideCount; i++) {
        spiral[spiralLayer][i] = count;
        count++
      }
    },
    toRight: () => {
      currentSideCount--
      for (i = spiralLayer + 1; i <= number - 1 - spiralLayer; i++) {
        spiral[i][number - 1 - spiralLayer] = count;
        count++
      }
    },
    toBottom: () => {
      for (i = number - 2 - spiralLayer; i >= 0 + spiralLayer; i--) {
        spiral[number - 1 - spiralLayer][i] = count;
        count++
      }
    },
    toLeft: () => {
      currentSideCount--
      for (i = number - 2 - spiralLayer; i >= 1 + spiralLayer; i--) {
        spiral[i][spiralLayer] = count;
        count++
      }
    }
  };

  // keep adding smaller and smaller sides to the inside of the grid
  while (count <= numberSquared) {
    makeSideOfSpiral(sides[currentSideIndex])

    // get ready for the next side
    currentSideIndex++
    if (currentSideIndex === sides.length) currentSideIndex = 0;
  }

  // determine which side to add to based on current side
  function makeSideOfSpiral(side) {
    if (side === 't') addNumbers.toTop()
    else if (side === 'r') addNumbers.toRight()
    else if (side === 'b') addNumbers.toBottom()
    else if (side === 'l') addNumbers.toLeft()
  }

  // create an n by n array grid of zero's
  function createBlankArray() {
    const iArray = [];
    for (i = 0; i < number; i++) {
      const jArray = [];
      for (j = 0; j < number; j++) {
        jArray.push(0)
      }
      iArray.push(jArray)
    }
    return iArray;
  }
  return spiral;
}

function printSpiral(spiral) {
  // use the number of digits to space nums evenly
  const numOfDigits = (num) => String(num).length;
  const maxDigits = numOfDigits(numberSquared);

  let str = '';
  spiral.forEach((row) => {
    row.forEach((num) => {
      const digits = numOfDigits(num);
      for (i = 0; i < maxDigits - digits; i++) {
        str += ' ';
      }
      // adding at least 1 space to all nums
      str += ' ' + num
    })
    // adding a new line character
    str += '\n'
  })
  console.log(str)
}
