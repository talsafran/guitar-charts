NUMBER_OF_CHARTS = 4

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

function drawChart() {
  for(index = 1; index <= NUMBER_OF_CHARTS; index++) {
    let selector = `#chart-${index + 1}`
    let chart = new svguitar.SVGuitarChord(selector)

    chart.chord(chordOptions)
    chart.configure(config)
    chart.draw()
  }
}

(function() {
  drawChart()
})()
