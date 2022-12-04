async function taskA (input) {
  const contains = (a, b) => (a[0] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[1] <= a[1])
  const count = input.split('\n').map(row => row.split(',')).reduce((total, stringPair) => {
    const pair = stringPair.map(entry => entry.split('-').map(Number))
    return total + contains(pair[0], pair[1])
  }, 0)
  return count
}

async function taskB (input) {
  const overlap = (a, b) => (a[1] >= b[0] && a[0] <= b[1])
  const count = input.split('\n').map(row => row.split(',')).reduce((total, stringPair) => {
    const pair = stringPair.map(entry => entry.split('-').map(Number))
    return total + overlap(pair[0], pair[1])
  }, 0)
  return count
}

export { taskA, taskB }
