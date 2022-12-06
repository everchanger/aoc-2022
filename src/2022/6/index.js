function parse (input, sequenceLength) {
  const chars = []
  for (let i = 0; i < input.length; ++i) {
    chars.push(input[i])
    if (chars.length > sequenceLength) {
      chars.shift()
    }

    if (chars.length === sequenceLength) {
      if (chars.every(c => chars.indexOf(c) === chars.lastIndexOf(c))) {
        return i + 1
      }
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
