async function taskA (input) {
  const rows = input.split('\n')
  let stacks = {}
  // Find the rows containing the labels first, then build the stacks and parse the move instructions
  for (const index in rows) {
    const row = rows[index]
    if (row[1] === '1') {
      stacks = parseStacks(rows, index)
    }

    if (row[0] === 'm') {
      // Parse a move instruction
      const [_, count, from, to] = row.match(/move (\d+) from (\d+) to (\d+)/)

      for (let i = 0; i < count; ++i) {
        stacks[to].push(stacks[from].pop())
      }
    }
  }

  const tops = Object.values(stacks).flatMap(stack => stack[stack.length - 1][1]).join('')

  return tops
}

async function taskB (input) {
  const rows = input.split('\n')
  let stacks = {}
  // Find the rows containing the labels first, then build the stacks and parse the move instructions
  for (const index in rows) {
    const row = rows[index]
    if (row[1] === '1') {
      stacks = parseStacks(rows, index)
    }

    if (row[0] === 'm') {
      // Parse a move instruction
      const [_, count, from, to] = row.match(/move (\d+) from (\d+) to (\d+)/)
      stacks[to].push(...stacks[from].splice(-parseInt(count)))
    }
  }

  const tops = Object.values(stacks).flatMap(stack => stack[stack.length - 1][1]).join('')

  return tops
}

function parseStacks (rows, labelIndex) {
  const stacks = {}
  const colDist = 4
  const row = rows[labelIndex]
  for (let col = 0; col < row.length; col += colDist) {
    // Offset with one to find the value of the label, this only works for single digit columns
    const colLabel = row[col + 1]
    stacks[colLabel] = []
    // Found stack numbers, all previous lines are stacks, create the stacks
    for (let i = 0; i < labelIndex; ++i) {
      stacks[colLabel].push(rows[i].slice(col, col + colDist))
    }

    // Remove whitespace and reverse
    stacks[colLabel] = stacks[colLabel].filter(entry => entry.trim()).reverse()
  }
  return stacks
}

export { taskA, taskB }
