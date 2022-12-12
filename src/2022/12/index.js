const manhattan = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)

const possibleTargets = (grid, current, destination) => {
  const { x, y, height } = current
  const neighbours = []
  const heightOk = (h) => h <= (height + 1) && h >= height - 1
  // Left
  const left = grid[y][x - 1]
  if (left && heightOk(left.height)) {
    neighbours.push({ ...left, direction: 'l' })
  }

  const right = grid[y][x + 1]
  if (right && heightOk(right.height)) {
    neighbours.push({ ...right, direction: 'r' })
  }

  const up = grid[y - 1]?.[x]
  if (y > 0 && heightOk(up.height)) {
    neighbours.push({ ...up, direction: 'u' })
  }

  const down = grid[y + 1]?.[x]
  if (down && heightOk(down.height)) {
    neighbours.push({ ...down, direction: 'd' })
  }

  for (const neighbour of neighbours) {
    neighbour.distance = manhattan(neighbour, destination)
  }

  return neighbours.sort((a, b) => a.distance - b.distance)
}

async function taskA (input) {
  console.log(input)
  const start = {}
  const end = {}

  const grid = input.split('\n').map((row, y) => row.split('').map((height, x) => {
    const h = height.charCodeAt(0) - 97
    if (h === -14) {
      start.x = x
      start.y = y
      start.height = 0
      return start
    } else if (h === -28) {
      end.x = x
      end.y = y
      end.height = 25
      return end
    }
    return { height: h, x, y }
  }))

  // Pre-calculate neighbours of all nodes
  for (const row of grid) {
    for (const entry of row) {
      grid[entry.y][entry.x].neighbours = possibleTargets(grid, grid[entry.y][entry.x], end)
    }
  }

  const current = start

  console.log('neigh', current.neighbours)

  // path.push()

  // After trying a direction, save the dirs in the array so we know which dir we already tried ['u', 'd', 'l', 'r']
  // while (true) {

  // }

  console.log(start, end, grid)
  return grid
}

async function taskB (input) {
  return ''
}

export { taskA, taskB }
