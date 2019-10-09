/**
 * Loader for our CSV data.  This uses Parcel's builtin support for reading
 * text files, see https://en.parceljs.org/javascript.html#javascript
 */
const fs = require('fs');

/**
 * Attempts to load and return the csv (comma separated values) `String`
 * stored in the file `toronto-intersection-cameras.csv`.  If the file
 * can't be read, it logs an error and returns `null`.
 */
function loadCSVData() {
  try {
    return fs.readFileSync('./toronto-intersection-cameras.csv', 'utf8');
  } catch(err) {
    console.error('Unable to read `toronto-intersection-cameras.csv`', err);
    return null;
  }
}

module.exports.loadCSVData = loadCSVData;
