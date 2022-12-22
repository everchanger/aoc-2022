const runOps = (data, key) => {
  const value = data[key]
  if (typeof value === 'number') {
    return value
  }
  const [a, op, b] = value
  const aVal = runOps(data, a)
  const bVal = runOps(data, b)
  switch (op) {
    case '-': return aVal - bVal
    case '+': return aVal + bVal
    case '*': return aVal * bVal
    case '/': return aVal / bVal
  }
}

async function taskA (input) {
  const rows = input.split('\n').reduce((rows, row) => {
    let [key, value] = row.split(': ')
    const num = parseInt(value)
    if (!isNaN(num)) {
      value = num
    } else {
      value = value.split(' ')
    }
    rows[key] = value
    return rows
  }, {})

  return runOps(rows, 'root')
}

async function taskB (input) {
  return ''
}

export { taskA, taskB }
