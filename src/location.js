/**
 * Location Constructor function.  A Location represents a point on earth by its
 * latitude and longitude.
 * 
 * @param {Number|String} lat - the location's latitude, for example: `43.643079`
 * @param {Number|String} lng - the location's longitude, for example: `-79.381407`
 */
function Location(lat, lng) {
  // TODO: make sure both `lat` and `lng` are Numbers
}

/**
 * Returns a `String` representation of a location, with its `lat` and `lng`
 * information. For example:
 * 
 * `(43.643079, -79.381407)`
 */
Location.prototype.toString = function() {
  // TODO
};

/**
 * Returns an `Array` representation of a location, with its `lat` and `lng`
 * information. For example:
 * 
 * `[43.643079, -79.381407]`
 */
Location.prototype.toArray = function() {
  // TODO
};

/**
 * Compare two location objects, returning `true` if they have the same
 * `lat` and `lng` values, otherwise false.
 */
Location.compare = function(location1, location2) {
  // TODO
};

module.exports = Location;
