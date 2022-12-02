const calculateScore = (a, b) => {
  const translate = {
    A: 'R',
    B: 'P',
    C: 'S',
    X: 'R',
    Y: 'P',
    Z: 'S'
  }

  const scoreTranslate = {
    R: 1,
    P: 2,
    S: 3
  }

  const loseScenarios = [
    'RS',
    'SP',
    'PR'
  ]

  const aT = translate[a]
  const bT = translate[b]

  let score = scoreTranslate[bT]

  if (aT === bT) {
    score += 3
  } else if (!loseScenarios.includes(aT + bT)) {
    score += 6
  }
  return score
}

async function taskA (input) {
  /*
    A = Rock
    B = Paper
    C = Scissors

    X = Rock      1
    Y = Paper     2
    Z = Scissors  3

    Score
    Lost 0
    Draw 3
    Win  6
  */

  const total = input.split('\n').reduce((acc, curr) => {
    const [a, b] = curr.split(' ')
    const score = calculateScore(a, b)
    return acc + score
  }, 0)

  return total
}

const calculateScoreB = (a, b) => {
  const translate = {
    A: 'R',
    B: 'P',
    C: 'S'
  }

  /*
    target
    X lose
    Y draw
    Z win
  */

  const scoreTranslate = {
    R: 1,
    P: 2,
    S: 3
  }

  const loseMapping = {
    R: 'S',
    S: 'P',
    P: 'R'
  }

  const winMapping = {
    R: 'P',
    S: 'R',
    P: 'S'
  }

  const loseScenarios = [
    'RS',
    'SP',
    'PR'
  ]

  const aT = translate[a]
  let bT

  if (b === 'Y') {
    bT = aT
  } else if (b === 'X') {
    bT = loseMapping[aT]
  } else {
    bT = winMapping[aT]
  }

  let score = scoreTranslate[bT]

  if (aT === bT) {
    score += 3
  } else if (!loseScenarios.includes(aT + bT)) {
    score += 6
  }
  return score
}

async function taskB (input) {
  const total = input.split('\n').reduce((acc, curr) => {
    const [a, b] = curr.split(' ')
    const score = calculateScoreB(a, b)
    return acc + score
  }, 0)

  return total
}

export { taskA, taskB }
