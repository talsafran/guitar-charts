NUMBER_OF_CHARTS = 1

config = {
  frets: 14,
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

const startingString = 6
const startingPosition = 3

function drawChart() {
  const charts = document.querySelectorAll('.chart')

  for (let chartElement of charts) {
    let chart = new svguitar.SVGuitarChord(chartElement)

    let fingerOptions = generateFingerings()
    let chordOptions = {...defaultChordOptions, ...fingerOptions}

    // debugger

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
      if (currentPosition >= config.position) {
        fingerings.push([stringNumber, currentPosition, currentScaleDegree.toString()])
      }

      // debugger

      const nextPosition = currentPosition + majorScaleIntervals[currentScaleDegree]
      if (nextPosition > config.frets) break

      currentPosition = nextPosition

      if (currentScaleDegree === 7) {
        currentScaleDegree = 1
      } else {
        currentScaleDegree++
      }
    }
    // console.log('string, interval', stringNumber, interval)
  }

  return { fingers: fingerings }
}

(function() {
  drawChart()
})()
