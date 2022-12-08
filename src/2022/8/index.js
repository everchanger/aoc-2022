async function taskA (input) {
  const grid = input.toString().split('\n')
  const rowLength = grid[0].length
  let count = (grid.length - 1) * 2 + (rowLength - 1) * 2
  for (let y = 1; y < grid.length - 1; ++y) {
    for (let x = 1; x < rowLength - 1; ++x) {
      if (checkCoord(grid, x, y)) {
        count++
      }
    }
  }
  return count
}

function checkCoord (grid, cX, cY) {
  const value = grid[cY][cX]

  let visable = true

  // Check up
  for (let y = cY - 1; y >= 0; --y) {
    const check = grid[y][cX]
    if (check >= value) {
      visable = false
      break
    }
  }

  if (visable) {
    return true
  }
  visable = true

  // Check down
  for (let y = cY + 1; y < grid.length; ++y) {
    const check = grid[y][cX]
    if (check >= value) {
      visable = false
      break
    }
  }

  if (visable) {
    return true
  }
  visable = true

  // Check left
  for (let x = cX - 1; x >= 0; --x) {
    const check = grid[cY][x]
    if (check >= value) {
      visable = false
      break
    }
  }

  if (visable) {
    return true
  }
  visable = true

  // Check right
  for (let x = cX + 1; x < grid[0].length; ++x) {
    const check = grid[cY][x]
    if (check >= value) {
      visable = false
      break
    }
  }

  if (visable) {
    return true
  }

  return false
}

async function taskB (input) {
  const grid = input.toString().split('\n')
  const rowLength = grid[0].length
  let highScore = 0
  for (let y = 1; y < grid.length - 1; ++y) {
    for (let x = 1; x < rowLength - 1; ++x) {
      highScore = Math.max(checkCoordB(grid, x, y), highScore)
    }
  }
  return highScore
}

function checkCoordB (grid, cX, cY) {
  const value = grid[cY][cX]

  let up = 0
  let down = 0
  let left = 0
  let right = 0

  // Check up
  for (let y = cY - 1; y >= 0; --y) {
    up++
    const check = grid[y][cX]
    if (check >= value) {
      break
    }
  }

  // Check down
  for (let y = cY + 1; y < grid.length; ++y) {
    down++
    const check = grid[y][cX]
    if (check >= value) {
      break
    }
  }

  // Check left
  for (let x = cX - 1; x >= 0; --x) {
    left++
    const check = grid[cY][x]
    if (check >= value) {
      break
    }
  }

  // Check right
  for (let x = cX + 1; x < grid[0].length; ++x) {
    right++
    const check = grid[cY][x]
    if (check >= value) {
      break
    }
  }

  return up * down * left * right
}

export { taskA, taskB }
