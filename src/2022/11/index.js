function monkeyBusiness (input, relief, rounds) {
  const rawMonkies = input.split('Monkey').filter(monkey => monkey)
  const monkies = []

  for (let i = 0; i < rawMonkies.length; ++i) {
    const values = rawMonkies[i].split('\n')
    const worries = values[1].slice('  Starting items: '.length).split(', ').map(str => parseInt(str))
    const operation = values[2].slice('  Operation: '.length).split('new = ')[1].split(' ').map((val, index) => {
      if (val === 'old') {
        return undefined
      } else if (index !== 1) {
        return parseInt(val)
      }
      return val
    })
    const test = parseInt(values[3].slice('  Test: divisible by '.length))
    const truthy = parseInt(values[4].slice('    If true: throw to monkey '.length))
    const falsey = parseInt(values[5].slice('    If false: throw to monkey '.length))

    monkies.push({ worries, operation, test, truthy, falsey, count: 0 })
  }

  const mod = monkies.reduce((tot, curr) => tot * curr.test, 1)

  for (let i = 0; i < rounds; ++i) {
    for (let j = 0; j < monkies.length; ++j) {
      const monkey = monkies[j]
      for (let k = 0; k < monkey.worries.length; ++k) {
        const a = monkey.operation[0] || monkey.worries[k]
        const b = monkey.operation[2] || monkey.worries[k]
        let worry = monkey.operation[1] === '+' ? a + b : a * b

        worry = relief ? relief(worry) : worry % mod

        let target = monkey.falsey
        if (worry % monkey.test === 0) {
          target = monkey.truthy
        }

        monkies[target].worries.push(worry)
      }
      monkey.count += monkey.worries.length
      monkey.worries = []
    }
  }
  const sortedMonkies = monkies.sort((a, b) => b.count - a.count)

  return sortedMonkies[0].count * sortedMonkies[1].count
}

async function taskA (input) {
  return monkeyBusiness(input, (worry) => Math.floor(worry / 3), 20)
}

async function taskB (input) {
  return monkeyBusiness(input, undefined, 10000)
}

export { taskA, taskB }
