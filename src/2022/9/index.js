async function taskA (input) {
  const positions = new Set()
  const currentPosition = { x: 0, y: 0 }
  const tailPosition = { x: 0, y: 0 }
  const directions = input.split('\n').map(row => { const values = row.split(' '); values[1] = parseInt(values[1]); return values })

  addTailPosition(positions, tailPosition)

  for (const row of directions) {
    let x = currentPosition.x
    let y = currentPosition.y

    let horizontal = true
    switch (row[0]) {
      case 'U':
        y += row[1]
        horizontal = false
        break
      case 'D':
        y -= row[1]
        horizontal = false
        break
      case 'R':
        x += row[1]
        break
      case 'L':
        x -= row[1]
        break
    }

    console.log('move to', x, y)

    if (horizontal) {
      const positive = x > currentPosition.x
      const start = positive ? currentPosition.x + 1 : currentPosition.x - 1
      for (let i = start; positive ? i < (x + 1) : i > (x - 1); positive ? ++i : --i) {
        console.log('new horizontal pos x', i, y)
        moveTail({ x: i, y: y }, tailPosition)
        addTailPosition(positions, tailPosition)
      }
    } else {
      const positive = y > currentPosition.y
      const start = positive ? currentPosition.y + 1 : currentPosition.y - 1
      for (let i = start; positive ? i < (y + 1) : i > (y - 1); positive ? ++i : --i) {
        console.log('new vertical pos y', x, i)
        moveTail({ x: x, y: i }, tailPosition)
        addTailPosition(positions, tailPosition)
      }
    }

    currentPosition.x = x
    currentPosition.y = y

    console.log('current postion', currentPosition)
    console.log('--------')
  }

  console.log('positions', positions)

  return positions.size
}

function moveTail (headPosition, tailPosition, index) {
  // Rules, tail must always touch, tail moves towards head
  const diffX = headPosition.x - tailPosition.x
  const diffY = headPosition.y - tailPosition.y
  if (Math.abs(diffX) > 1) {
    console.log(index, 'move x')
    tailPosition.x += diffX > 0 ? 1 : -1

    // Correct diagonals
    if (Math.abs(diffY) >= 1) {
      console.log('correcting y', headPosition.y, tailPosition.y)
      tailPosition.y += diffY > 0 ? 1 : -1
    }
    console.log(index, 'tail position', tailPosition)
  } else if (Math.abs(diffY) > 1) {
    console.log(index, 'move y')
    tailPosition.y += diffY > 0 ? 1 : -1

    // Correct diagonals
    if (Math.abs(diffX) >= 1) {
      console.log('correcting x')
      tailPosition.x += diffX > 0 ? 1 : -1
    }
    console.log(index, 'tail position', tailPosition)
  }
}

function addTailPosition (positions, tailPosition) {
  positions.add(`${tailPosition.x}-${tailPosition.y}`)
}

async function taskB (input) {
  const positions = new Set()
  const currentPosition = { x: 0, y: 0 }
  const tailPositions = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
  const directions = input.split('\n').map(row => { const values = row.split(' '); values[1] = parseInt(values[1]); return values })

  addTailPosition(positions, tailPositions[0])

  for (const row of directions) {
    let x = currentPosition.x
    let y = currentPosition.y

    let horizontal = true
    switch (row[0]) {
      case 'U':
        y += row[1]
        horizontal = false
        break
      case 'D':
        y -= row[1]
        horizontal = false
        break
      case 'R':
        x += row[1]
        break
      case 'L':
        x -= row[1]
        break
    }

    console.log('move to', x, y)

    if (horizontal) {
      const positive = x > currentPosition.x
      const start = positive ? currentPosition.x + 1 : currentPosition.x - 1
      for (let i = start; positive ? i < (x + 1) : i > (x - 1); positive ? ++i : --i) {
        console.log('new horizontal pos x', i, y)
        for (let j = 0; j < tailPositions.length; ++j) {
          const head = j === 0 ? { x: i, y: y } : tailPositions[j - 1]
          moveTail(head, tailPositions[j], j + 1)
        }
        addTailPosition(positions, tailPositions[tailPositions.length - 1])
      }
    } else {
      const positive = y > currentPosition.y
      const start = positive ? currentPosition.y + 1 : currentPosition.y - 1
      for (let i = start; positive ? i < (y + 1) : i > (y - 1); positive ? ++i : --i) {
        console.log('new vertical pos y', x, i)
        for (let j = 0; j < tailPositions.length; ++j) {
          const head = j === 0 ? { x: x, y: i } : tailPositions[j - 1]
          moveTail(head, tailPositions[j], j + 1)
        }
        addTailPosition(positions, tailPositions[tailPositions.length - 1])
      }
    }

    currentPosition.x = x
    currentPosition.y = y

    console.log('current postion', currentPosition, tailPositions)
    console.log('--------')
  }

  console.log('positions', positions)

  return positions.size
}

export { taskA, taskB }
