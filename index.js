NUMBER_OF_CHARTS = 1

config = {
  frets: 12
}

const legacyChordOptions = {
  fingers: [
    [1, 0],
    [2, 1],
    [3, 2],
    [4, 2],
    [5, 0],
  ],
  barres: [],
  position: 0,
}

const stringIntervals = {
  6: 5,
  5: 5,
  4: 5,
  3: 4,
  2: 5,
}

const startingString = 5

const startingFret = 2
const endingFret = 14

function chordOptions() {
  const defaultOptions = { barres: [] }
}

function drawChart() {
  const charts = document.querySelectorAll('.chart')
  for (let chartElement of charts) {
    let chart = new svguitar.SVGuitarChord(chartElement)

    chart.chord(legacyChordOptions)
    chart.configure(config)
    chart.draw()
  }
}

(function() {
  drawChart()
})()
