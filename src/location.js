/**
 * Location Constructor function.  A Location represents a point on earth by its
 * latitude and longitude.
 * 
 * @param {Number|String} lat - the location's latitude, for example: `43.643079`
 * @param {Number|String} lng - the location's longitude, for example: `-79.381407`
 */
function Location(lat, lng) {
  // TODO: make sure both `lat` and `lng` are Numbers
  this.lat = parseFloat(lat);
  this.lng = parseFloat(lng);
}

/**
 * Returns a `String` representation of a location, with its `lat` and `lng`
 * information. For example:
 * 
 * `(43.643079, -79.381407)`
 */
Location.prototype.toString = function() {
  return `(${this.lat}, ${this.lng})`;
};

/**
 * Returns an `Array` representation of a location, with its `lat` and `lng`
 * information. For example:
 * 
 * `[43.643079, -79.381407]`
 */
Location.prototype.toArray = function() {
  return [this.lat, this.lng];
};

/**
 * Compare two location objects, returning `true` if they have the same
 * `lat` and `lng` values, otherwise false.
 */
Location.compare = function(location1, location2) {
  return location1.lat === location2.lat && location1.lng === location2.lng;
};

module.exports = Location;
