function parse (input, sequenceLength) {
  for (let i = 0; i < input.length; ++i) {
    // a b c d d e j e k l

    if ([...input.slice(i, i + sequenceLength)].every((c, _, a) => {
      const first = a.indexOf(c)
      const last = a.lastIndexOf(c)
      if (first !== last) {
        // Skip ahead in the sequence since we know that there is a duplicate at start index
        i = i + first
      }
      return first === last
    })) {
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
