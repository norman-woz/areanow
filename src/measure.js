import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

var document = sketch.getSelectedDocument()
var UI = require('sketch/ui')
var selectedLayers = document.selectedLayers
var selectedCount = selectedLayers.length

if (selectedCount === 0) {
  context.document.showMessage('No layers are selected.')
} else {
  let totalSurfaceArea = 0;
  selectedLayers.forEach(function (layer) {
    totalSurfaceArea += layer.frame.width * layer.frame.height;
  })
  context.document.showMessage('Total Surface Area: ' + totalSurfaceArea + " square pixels 💥");
} 