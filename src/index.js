const Intersections = require('./intersections');
const { loadCSVData } = require('./csv-loader');

// For debugging purposes, all functions are available here...
const Intersection = require('./intersection');
const CameraViews = require('./camera-views');
const Location = require('./location');

// TODO: You can try working with your functions/objects
// here, to make development easier.  Eventually we'll
// write our main program here.

let csvData = loadCSVData();
if(csvData) {
  console.log(csvData);
}
