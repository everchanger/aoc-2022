function parse (input, sequenceLength) {
  for (let i = 0; i < input.length; ++i) {
    let unique = true
    // Check a range of characters of length sequenceLength for uniqueness
    for (let j = i; j < i + sequenceLength; ++j) {
      const first = input.indexOf(input[j], i)
      unique = first === input.lastIndexOf(input[j], i + sequenceLength - 1)
      if (!unique) {
        // Skip ahead in the sequence since we know that there is a duplicate at first index
        i = first
        break
      }
    }
    if (unique) {
      return i + sequenceLength
    }
  }
  return -1
}

async function taskA (input) {
  return parse(input, 4)
}

async function taskB (input) {
  return parse(input, 14)
}

export { taskA, taskB }
