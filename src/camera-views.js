/**
 * A CameraViews object contains URLs to camera images facing north, east, south,
 * and west.  Each of these URLs is optional (i.e., some intersections won't
 * have camera views in all directions).
 * 
 * @param {String} north - optional URL to camera image 
 * @param {String} east  - optional URL to camera image
 * @param {String} south - optional URL to camera image
 * @param {String} west  - optional URL to camera image
 */
function CameraViews(north, east, south, west) {
  // TODO: deal with each argument being null/undefined/empty string and
  // only set the property on the object if the value exists.
  north = north && north.trim();
  east = east && east.trim();
  south = south && south.trim();
  west = west && west.trim();

  if(north && north.length) {
    this.north = north;
  }

  if(east && east.length) {
    this.east = east;
  }

  if(south && south.length) {
    this.south = south;
  }

  if(west && west.length) {
    this.west = west;
  }
}

/**
 * BONUS: try to avoid storing the URLs as strings, but write a function to
 * generate them.  Modify CameraViews to take a `cameraNumber` and use it
 * to dynamically build the URLs:
 * 
 * The various North, East, South, and West views also use the Camera Number,
 * and take the following format:
 * 
 * http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc<cameraNumber><direction>.jpg
 *
 * where `direction` is one of 'n', 'e', 's', or 'w'.
 * 
 * For example:
 * 
 * http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8034n.jpg
 */

module.exports = CameraViews;
