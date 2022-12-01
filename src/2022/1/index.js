async function taskA (input) {
  const kcals = input.split('\n')
  let biggest = 0
  let sum = 0
  for (const kcal of kcals) {
    if (kcal === '') {
      if (sum > biggest) {
        biggest = sum
      }
      sum = 0
      continue
    }
    sum += parseInt(kcal)
  }
  return biggest
}

async function taskB (input) {
  const kcals = input.split('\n')
  let result = []
  let sum = 0
  for (const kcal of kcals) {
    if (kcal === '') {
      result.push(sum)
      sum = 0
      continue
    }
    sum += parseInt(kcal)
  }
  result = result.sort((a, b) => b - a)
  return result.slice(0, 3).reduce((a, b) => a + b, 0)
}

export { taskA, taskB }
