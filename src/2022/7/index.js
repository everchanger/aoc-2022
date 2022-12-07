function parse (input) {
  const filestructure = {
  }

  const logs = input.split('\n')
  let currentDirectory = []
  let currentPointer
  let isReadingLs = false

  for (const log of logs) {
    if (log[0] === '$') {
      if (isReadingLs) {
        // Ready to parse next command
        isReadingLs = false
      }

      const [_, command, directory] = log.split(' ')
      if (command === 'cd') {
        if (directory === '..') {
          currentDirectory.pop()
        } else if (directory === '/') {
          currentDirectory = ['/']
        } else {
          currentDirectory.push(directory)
        }

        currentPointer = filestructure
        for (const dir of currentDirectory) {
          if (!currentPointer[dir]) {
            currentPointer[dir] = {}
          }
          currentPointer = currentPointer[dir]
        }
      } else if (command === 'ls') {
        isReadingLs = true
      }
    } else if (isReadingLs) {
      const [filesize, filename] = log.split(' ')
      if (filesize === 'dir') {
        continue
      }
      currentPointer[filename] = parseInt(filesize)
    }
  }

  const totals = []
  count(filestructure, totals)

  return totals
}

function count (data, result) {
  let total = 0
  for (const key of Object.keys(data)) {
    if (typeof data[key] === 'object') {
      total += count(data[key], result)
    } else {
      total += data[key]
    }
  }
  result.push(total)
  return total
}

async function taskA (input) {
  const totals = parse(input)

  let answer = 0
  const limit = 100000
  for (const total of totals) {
    if (total <= limit) {
      answer += total
    }
  }

  return answer
}

async function taskB (input) {
  const totals = parse(input)
  const sorted = totals.sort((a, b) => b - a)

  const totalSpace = 70000000
  const requiredSpace = 30000000
  const usedSpace = totalSpace - sorted[0]
  const requiredDeletion = requiredSpace - usedSpace

  const filtered = sorted.filter(entry => entry >= requiredDeletion)
  return filtered[filtered.length - 1]
}

export { taskA, taskB }
