const printGrid = (grid) => console.log(grid.map(row => row.join('')).join('\n'), '\n')

const simulate = (grid, sandPoint) => {
  const height = grid.length
  const width = grid[0].length
  const atRest = []
  let activeSand = { x: sandPoint.x, y: sandPoint.y }
  while (1) {
    // Check if we can fall down
    if (activeSand.y + 1 >= height) {
      // Out of bounds
      console.log('out of bounds y')
      break
    } else if (grid[activeSand.y + 1][activeSand.x] === '.') {
      // can move, lets move!
      activeSand.y += 1
    } else {
      // something is stopping us from moving down, check down left
      if (activeSand.x - 1 < 0) {
        // out of bounds
        console.log('out of bounds x, left')
        break
      } else if (grid[activeSand.y + 1][activeSand.x - 1] === '.') {
        // can move, lets move diag!
        activeSand.y += 1
        activeSand.x -= 1
      } else {
        // crap, cant move down or down left, try down right!
        if (activeSand.x + 1 >= width) {
          // out of bounds
          console.log('out of bounds x, right')
          break
        } else if (grid[activeSand.y + 1][activeSand.x + 1] === '.') {
          // can move, lets move diag!
          activeSand.y += 1
          activeSand.x += 1
        } else {
          // nowhere to move!
          atRest.push({ x: activeSand.x, y: activeSand.y })
          grid[activeSand.y][activeSand.x] = 'o'
          activeSand = { x: sandPoint.x, y: sandPoint.y }

          console.log('no where to move', atRest.length)
          printGrid(grid)
        }
      }
    }
  }
  return atRest.length
}

async function taskA (input) {
  const sandPoint = { x: 500, y: 0 }
  let [minX, minY, maxX, maxY] = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]
  const rows = input.split('\n').map(row => row.split(' -> ').map(pair => pair.split(',').map((str, index) => {
    const coord = +str
    if (index === 0) {
      minX = Math.min(minX, coord)
      maxX = Math.max(maxX, coord)
    } else {
      minY = Math.min(minY, coord)
      maxY = Math.max(maxY, coord)
    }
    return coord
  })))

  minY = Math.min(minY, sandPoint.y)

  // Create a grid where we fill the paths, grid must be of size (maxX - minX) x (maxY - minY)
  // We subtract the minX value from all values to get a "normalized" grid starting at 0
  const width = (maxX - minX) + 1
  const heigth = (maxY - minY) + 1
  const normalizedSandPoint = { x: sandPoint.x - minX, y: sandPoint.y }

  const grid = []
  for (let y = 0; y < heigth; ++y) {
    grid[y] = []
    for (let x = 0; x < width; ++x) {
      grid[y][x] = '.'
      if (y === normalizedSandPoint.y && x === normalizedSandPoint.x) {
        grid[y][x] = '+'
      }
    }
  }

  printGrid(grid)

  for (const row of rows) {
    let startX
    let startY
    for (let i = 0; i < row.length; ++i) {
      let [x, y] = row[i]
      x -= minX

      if (startX === undefined) {
        startX = x
        startY = y
      } else {
        // Loop from startX to x and startY to y
        let start = Math.min(startX, x)
        let end = Math.max(x + 1, startX)
        for (let fillX = start; fillX < end; ++fillX) {
          grid[startY][fillX] = '#'
        }
        start = Math.min(startY, y)
        end = Math.max(y + 1, startY)
        for (let fillY = startY; fillY < y + 1; ++fillY) {
          grid[fillY][startX] = '#'
        }

        startX = x
        startY = y
      }
    }
  }

  printGrid(grid)

  const result = simulate(grid, normalizedSandPoint)

  return result
}

async function taskB (input) {
  return ''
}

export { taskA, taskB }
