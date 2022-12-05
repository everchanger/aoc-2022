function getTopCrates (input, move) {
  const output = input.split('\n').reduce((data, row, index, rows) => {
    if (row[0] === '[' || row.startsWith('  ')) {
      for (let i = 0, col = 1; i < row.length; i += 4, col++) {
        if (!data.stacks[col]) data.stacks[col] = []
        if (row[i + 1] !== ' ') data.stacks[col].unshift(row[i + 1])
      }
    } else if (row[0] === 'm') {
      const [_, count, from, to] = row.match(/move (\d+) from (\d+) to (\d+)/)
      move(data.stacks, from, to, count)
    }

    if (index === rows.length - 1) data.result = Object.values(data.stacks).reduce((concat, stack) => concat + stack.pop(), '')

    return data
  }, { stacks: {}, result: '' })
  return output.result
}

async function taskA (input) {
  return getTopCrates(input, (stacks, from, to, count) => {
    for (let i = 0; i < count; ++i) {
      stacks[to].push(stacks[from].pop())
    }
  })
}

async function taskB (input) {
  return getTopCrates(input, (stacks, from, to, count) => stacks[to].push(...stacks[from].splice(-parseInt(count))))
}

export { taskA, taskB }
