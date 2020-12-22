NUMBER_OF_CHARTS = 1

config = {
  frets: 4
}

const chordOptions = {
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

const stringIntervals = [5, 5, 5, 4, 5, null]

function drawChart() {
  const charts = document.querySelectorAll('.chart')
  for (let chartElement of charts) {
    let chart = new svguitar.SVGuitarChord(chartElement)

    chart.chord(chordOptions)
    chart.configure(config)
    chart.draw()
  }
}

(function() {
  drawChart()
})()
