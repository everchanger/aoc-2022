function runCPU (input, callback) {
  const instructions = input.split('\n').map(row => { const entry = row.split(' '); const res = [entry[0]]; if (entry[1]) { res.push(parseInt(entry[1])) } return res })

  const instructionCycles = {
    noop: 1,
    addx: 2
  }

  let register = 1
  let cycles = 0
  const current = {
    index: 0,
    instruction: undefined,
    cycles: undefined,
    value: undefined
  }

  while (current.index <= instructions.length - 1) {
    cycles++
    if (current.index === 0 || current.cycles === instructionCycles[current.instruction]) {
      if (current.value) {
        register += current.value
      }

      const [instruction, value] = instructions[current.index]
      current.instruction = instruction
      current.value = value
      current.cycles = 0
      current.index++
    }
    current.cycles++

    callback(cycles, register)
  }
}

async function taskA (input) {
  const checkRegister = 20
  const checkRegisterOffset = 40
  let checkRegisterCount = 0

  let signalStrength = 0

  runCPU(input, (cycles, register) => {
    if (cycles === checkRegister + checkRegisterOffset * checkRegisterCount) {
      signalStrength += cycles * register
      checkRegisterCount++
    }
  })

  return signalStrength
}

async function taskB (input) {
  let line = ''
  const display = []
  const width = 40

  runCPU(input, (_, register) => {
    const position = line.length
    line += position >= register - 1 && position <= register + 1 ? '#' : '.'

    if (line.length === width) {
      display.push(line)
      line = ''
    }
  })

  return '\n' + display.join('\n')
}

export { taskA, taskB }
