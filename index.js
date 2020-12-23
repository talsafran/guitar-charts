const COLORS = {
  root: '#000',
  important: '#333',
  others: '#ccc',
}

const config = {
  frets: 12,
  position: 1
}

const defaultChordOptions = {
  fingers: [],
  barres: [],
  position: 1,
}

const stringIntervals = [
  [6, 0],
  [5, 5],
  [4, 5],
  [3, 5],
  [2, 4],
  [1, 5]
]

const majorScaleIntervals = {
  1: 2,
  2: 2,
  3: 1,
  4: 2,
  5: 2,
  6: 2,
  7: 1,
}

const degreesToDraw = [1, 3, 5, 7]

const startingString = 6
const startingPosition = 3

function drawChart() {
  const charts = document.querySelectorAll('.chart')

  for (let chartElement of charts) {
    let chart = new svguitar.SVGuitarChord(chartElement)

    let fingerOptions = generateFingerings()
    let chordOptions = {...defaultChordOptions, ...fingerOptions}

    chart.chord(chordOptions)
    chart.configure(config)
    chart.draw()
  }
}

function generateFingerings() {
  let fingerings = []
  let currentPosition = startingPosition
  let currentScaleDegree = 1

  for (const [string, interval] of stringIntervals) {
    const stringNumber = parseInt(string)

    currentPosition = currentPosition - interval - 12

    while (currentPosition <= config.frets) {
      const currentPositionIsVisible = currentPosition >= config.position
      const shouldDraw = currentPosition && degreesToDraw.includes(currentScaleDegree)

      if (shouldDraw) {
        const styling = stylingForScaleDegree(currentScaleDegree)

        fingerings.push([stringNumber, currentPosition, styling])
      }

      const nextPosition = currentPosition + majorScaleIntervals[currentScaleDegree]
      if (nextPosition > config.frets) break

      currentPosition = nextPosition
      currentScaleDegree = nextScaleDegree(currentScaleDegree)
    }
  }

  return { fingers: fingerings }
}

function colorForScaleDegree(scaleDegree) {
  if (scaleDegree === 1) {
    return COLORS.root
  } else if ([3, 5].includes(scaleDegree)) {
    return COLORS.important
  } else {
    return COLORS.others
  }
}

function scaleDegreeLabel(scaleDegree) {
  return scaleDegree.toString()
}

function nextScaleDegree(scaleDegree) {
  if (scaleDegree === 7) {
    return scaleDegree = 1
  } else {
    return scaleDegree + 1
  }
}

function stylingForScaleDegree(scaleDegree) {
  return {
    color: colorForScaleDegree(scaleDegree),
    text: scaleDegreeLabel(scaleDegree),
  }
}

(function() {
  drawChart()
})()
