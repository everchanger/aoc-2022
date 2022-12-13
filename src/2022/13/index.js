async function taskA (input) {
  const pairs = input.split('\n\n').map(pair => pair.split('\n'))

  let totalIndex = 0

  for (const key in pairs) {
    const left = pairs[key][0]
    const right = pairs[key][1]

    const length = left.length > right.length ? left.length : right.length

    console.log(left, right)

    let leftOffset = 0
    let rightOffset = 0

    let correct = true
    for (let i = 0; i < length && correct; ++i) {
      const leftChar = left[i + leftOffset]
      const rightChar = right[i + rightOffset]

      // console.log('checking', leftChar, rightChar)

      if (leftChar === '[' && rightChar === '[') {
        // Start of list
      } else if ((leftChar === '[' && rightChar !== '[')) {
        console.log('found start of left list, not right')
        // left is list, right is not
        leftOffset += 1

        // reset i to current value
        i--
      } else if (leftChar !== '[' && rightChar === '[') {
        // right is list, left is not
        console.log('found start of right list, not left')
        rightOffset += 1

        // reset i to current value
        i--
      } else {
        // If left integer is larger, return false
        let a = parseInt(leftChar)
        let b = parseInt(rightChar)

        const aIsNan = Number.isNaN(a)
        const bIsNan = Number.isNaN(b)

        if (aIsNan && !bIsNan) {
          // left side ran out of numbers! Correct!
          console.log('left ran out of items')
          break
        } else if (!aIsNan && bIsNan) {
          // right side ran out of numbers! Incorrect!
          correct = false
          console.log('right ran out of items')
          break
        }

        if (aIsNan || bIsNan) {
          console.log('trying compare strings', leftChar, rightChar)

          if (leftChar === undefined) {
            console.log('------left ran out')
            break
          }

          if (rightChar === undefined) {
            correct = false
            console.log('------right ran out')
            break
          }
        } else {
          // there is a possibility that there are two digits....... if we get a 1, check if we have a 0 at the next index.
          const ar = parseInt(left[i + leftOffset + 1])
          const br = parseInt(right[i + rightOffset + 1])

          if (!Number.isNaN(ar)) {
            leftOffset += 1
            a = parseInt(`${a}${ar}`)
            console.log('FOUND ', ar, a)
          }
          if (!Number.isNaN(br)) {
            rightOffset += 1
            b = parseInt(`${b}${br}`)
            console.log('FOUND ', br, b)
          }

          console.log('compare', a, b)

          if (a > b) {
            // Incorrect signal
            correct = false
          } else if (a < b) {
            break
          }
        }
        // console.log(leftChar, rightChar)
      }
    }

    console.log(1 + parseInt(key), 'pair', left, right, 'is', correct, '\n')

    if (correct) { totalIndex += parseInt(key) + 1 }
  }

  return totalIndex
}

async function taskB (input) {
  return ''
}

export { taskA, taskB }
