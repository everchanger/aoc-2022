async function taskA (input) {
  let priority = 0
  const rows = input.split('\n')
  for (const row of rows) {
    const half = row.length / 2
    const compartments = [row.slice(0, half), row.slice(half)]

    const collection = new Set()
    for (const char of compartments[0]) {
      if (compartments[1].search(char) !== -1) {
        collection.add(char)
      }
    }

    for (const value of collection) {
      priority += calcPriority(value.charCodeAt(0))
    }
  }

  return priority
}

async function taskB (input) {
  let priority = 0
  const rows = input.split('\n')
  for (let i = 0; i < rows.length; i += 3) {
    let badge
    for (const char of rows[i]) {
      if (rows[i + 1].search(char) === -1 || rows[i + 2].search(char) === -1) {
        continue
      }
      badge = char
      break
    }
    priority += calcPriority(badge.charCodeAt(0))
  }
  return priority
}

function calcPriority (charcode) {
  return charcode - (charcode >= 97 ? 96 : 38)
}

export { taskA, taskB }
