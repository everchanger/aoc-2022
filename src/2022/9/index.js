function simulate (input, tails) {
  const positions = new Set()
  const head = { x: 0, y: 0 }
  const directions = input.split('\n').map(row => { const values = row.split(' '); values[1] = parseInt(values[1]); return values })

  const last = tails.length - 1
  positions.add(`${tails[last].x}-${tails[last].y}`)

  for (const row of directions) {
    const position = { x: head.x, y: head.y }
    let direction = 'x'
    let offset = 1

    switch (row[0]) {
      case 'U':
        position.y += row[1]
        direction = 'y'
        break
      case 'D':
        position.y -= row[1]
        offset = -1
        direction = 'y'
        break
      case 'R':
        position.x += row[1]
        break
      case 'L':
        position.x -= row[1]
        offset = -1
        break
    }

    const positive = position[direction] > head[direction]
    const start = head[direction] + (1 * offset)
    const target = position[direction] + (1 * offset)
    for (let i = start; positive ? i < target : i > target; i += (1 * offset)) {
      for (let j = 0; j < tails.length; ++j) {
        const parent = j === 0 ? { ...position, [direction]: i } : tails[j - 1]
        simulateTail(parent, tails[j])
      }
      positions.add(`${tails[last].x}-${tails[last].y}`)
    }

    head.x = position.x
    head.y = position.y
  }

  return positions.size
}

function simulateTail (headPosition, tailPosition) {
  // Rules, tail must always touch, tail moves towards head
  const diffX = headPosition.x - tailPosition.x
  const diffY = headPosition.y - tailPosition.y
  if (Math.abs(diffX) > 1) {
    tailPosition.x += diffX > 0 ? 1 : -1

    // Correct diagonals
    if (Math.abs(diffY) >= 1) {
      tailPosition.y += diffY > 0 ? 1 : -1
    }
  } else if (Math.abs(diffY) > 1) {
    tailPosition.y += diffY > 0 ? 1 : -1

    // Correct diagonals
    if (Math.abs(diffX) >= 1) {
      tailPosition.x += diffX > 0 ? 1 : -1
    }
  }
}

async function taskA (input) {
  const tailPositions = [{ x: 0, y: 0 }]
  return simulate(input, tailPositions)
}

async function taskB (input) {
  const tailPositions = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
  return simulate(input, tailPositions)
}

export { taskA, taskB }
