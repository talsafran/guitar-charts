const CHART_ELEMENT_SELECTOR = '.chart'

const COLORS = {
  root: '#000',
  important: '#333',
  others: '#ccc',
}

const CONFIG = {
  frets: 12,
  position: 1,
  title: 'Gmaj7',
  titleFontSize: 36,
}

const DEFAULT_CHORD_OPTIONS = {
  fingers: [],
  barres: [],
  position: 1,
}

const STRING_INTERVALS = [
  [6, 0],
  [5, 5],
  [4, 5],
  [3, 5],
  [2, 4],
  [1, 5],
]

const MAJOR_SCALE_INTERVALS = {
  1: 2,
  2: 2,
  3: 1,
  4: 2,
  5: 2,
  6: 2,
  7: 1,
}

const DEGREES_TO_DRAW = [1, 3, 5, 7]

const STARTING_STRING = 6
const STARTING_POSITION = 3

function drawChart() {
  const charts = document.querySelectorAll(CHART_ELEMENT_SELECTOR)

  for (let chartElement of charts) {
    let chart = new svguitar.SVGuitarChord(chartElement)

    let fingerOptions = generateFingerings()
    let chordOptions = {...DEFAULT_CHORD_OPTIONS, ...fingerOptions}

    chart.chord(chordOptions)
    chart.configure(CONFIG)
    chart.draw()
  }
}

function generateFingerings() {
  let fingerings = []
  let currentPosition = STARTING_POSITION
  let currentScaleDegree = 1

  for (const [string, interval] of STRING_INTERVALS) {
    const stringNumber = parseInt(string)

    currentPosition = currentPosition - interval - 12

    while (currentPosition <= CONFIG.frets) {
      const currentPositionIsVisible = currentPosition >= CONFIG.position
      const shouldDraw = currentPositionIsVisible && DEGREES_TO_DRAW.includes(currentScaleDegree)

      if (shouldDraw) {
        const styling = stylingForScaleDegree(currentScaleDegree)

        fingerings.push([stringNumber, currentPosition, styling])
      }

      const nextPosition = currentPosition + MAJOR_SCALE_INTERVALS[currentScaleDegree]
      if (nextPosition > CONFIG.frets) break

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
