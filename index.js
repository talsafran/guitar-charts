NUMBER_OF_CHARTS = 1

config = {
  frets: 4
}

const chordOptions = {
  fingers: [
    [1, 2],
    [2, 3],
    [3, 3],
  ],
  barres: [],
  position: 2,
}

const stringIntervals = [5, 5, 5, 4, 5, null]

function drawChart() {
  const charts = document.querySelectorAll('.chart')
  for (let c of charts) {
    let chart = new svguitar.SVGuitarChord(c)

    chart.chord(chordOptions)
    chart.configure(config)
    chart.draw()
  }
}

(function() {
  drawChart()
})()
