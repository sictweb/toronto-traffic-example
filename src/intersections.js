const Location = require('./location');
const Intersection = require('./intersection');
const CameraViews = require('./camera-views');

/**
 * Constructor Function for Intersections. Intersections holds all Intersection
 * objects, and allows working with the data.
 * 
 * @param {String} csv - csv (comma separated values) data of intersections to be
 * parsed into Intersection objects. See `toronto-intersection-cameras.csv`. 
 */
function Intersections(csv) {
  // TODO: create an array to hold all the intersection `data`. Split the `csv`
  // string into rows and columns, and turn this data into Intersection, Location,
  // and CameraView objects.  Store each parsed Intersection in your `data` array.

};

/**
 * Returns an `Array`, which is a copy of the `data` array holding all parsed Intersections
 */
Intersections.prototype.all = function() {
  // TODO
}

/**
 * Returns a `Number`, which is the number of Intersections in the `data` array
 */
Intersections.prototype.count = function () {
  // TODO
}

/**
 * Allows adding a new `Intersection` object to the `data` array.
 */
Intersections.prototype.add = function(intersection) {
  // TODO
};

/**
 * Allows removing the given `Intersection` object from the `data` array.
 */
Intersections.prototype.remove = function(intersection) {
  // TODO
};

/**
 * Gets an `Intersection` object by its `Location`.  That is, looks for an
 * `Intersection` object in the `data` array that matches the given `location`
 * information (`lat` and `lng`).
 */
Intersections.prototype.getByLocation = function(location) {
  // TODO
};

/**
 * Gets an `Intersection` object by its `id`.  That is, looks for an
 * `Intersection` object in the `data` array that matches the given `id`.
 */
Intersections.prototype.getById = function(id) {
  // TODO
};

/**
 * Searches for `Intersection` objects in the `data` array and looks for
 * any that have a matching `mainRoad` or `crossRoad` with the given `search`
 * text `String`.  If `exactMatch` is `true`, the `search` value must match
 * 100% (same case, same text).  If it's `false` or `undefined`, the match
 * can be "fuzzy" (case doesn't need to match, and the `search` string can
 * be a partial match).
 */
Intersections.prototype.searchByStreet = function(search, exactMatch) {
  // TODO
}

/**
 * Gets an `Array` of all street names from `mainRoad` and `crossRoad` fields.
 * The `Array` should have no duplicates, and should be sorted.
 */
Intersections.prototype.streets = function() {
  // TODO
};

module.exports = Intersections;
