import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

var document = sketch.getSelectedDocument()
var UI = require('sketch/ui')
var selectedLayers = document.selectedLayers
var selectedCount = selectedLayers.length

// Using JSTalk clipboard handling snippet from https://gist.github.com/uhunkler/5465857 by Urs Hunkler
var clipboard = {
  // store the pasetboard object
  pasteBoard : null,

  // save the pasteboard object
  init : function()
  {
    this.pasteBoard = NSPasteboard.generalPasteboard();
  },
  // set the clipboard to the given text
  set : function( text )
  {
    if( typeof text === 'undefined' ) return null;

    if( !this.pasteBoard )
      this.init();

    this.pasteBoard.declareTypes_owner( [ NSPasteboardTypeString ], null );
    this.pasteBoard.setString_forType( text, NSPasteboardTypeString );

    return true;
  },
  // get text from the clipbaoard
  get : function()
  {
    if( !this.pasteBoard )
      this.init();

    var text = this.pasteBoard.stringForType( NSPasteboardTypeString );

    return text.toString();
  }
};

if (selectedCount === 0) {
  context.document.showMessage('No layers are selected.')
} else {
  let totalSurfaceArea = 0;
  selectedLayers.forEach(function (layer) {
    totalSurfaceArea += layer.frame.width * layer.frame.height;
  })
  if (totalSurfaceArea != "") {
    context.document.showMessage("Area: " + totalSurfaceArea + "px² 📐 Copied to Clipboard!");
    clipboard.set("" + totalSurfaceArea);
  } else {
    context.document.showMessage("No Area to Copy :(");
  }
}
