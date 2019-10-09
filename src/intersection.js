/**
 * Intersection Constructor function.
 *  
 * @param {Number} id - the intersection's id, for example: `8034` 
 * @param {Location} location - the intersection's lat/lng location as a `Location` object 
 * @param {String} mainRoad - the intersection's main road 
 * @param {String} crossRoad - the intersection's cross road (cross the main road)
 * @param {String} trafficUrl - a URL to the live image of the intersection's camera 
 * @param {CameraView} cameraViews - the various views of the intersection as a `CameraView` object
 */
function Intersection(id, location, mainRoad, crossRoad, trafficUrl, cameraViews) {
  // TODO
}

/**
 * Returns a `String` representation of an intersection, with an intersection's
 * `mainRoad`, `crossRoad`, and `location` information. For example:
 * 
 * `YORK ST / BREMNER BLVD (43.643079, -79.381407)`
 */
Intersection.prototype.toString = function() {
  // TODO
}

module.exports = Intersection;
