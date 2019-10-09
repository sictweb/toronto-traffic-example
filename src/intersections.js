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
  const data = this.data = [];

  if(csv) {
    csv = csv.split(/\r?\n/);

    for(let record of csv) {
      record = record.split(',');

      let id = Number(record[0].replace('Camera', ''));
      let location = new Location(record[1], record[2]);
      let mainRoad = record[3];
      let crossRoad = record[4];
      let trafficImage = record[5];
      let cameraViews = new CameraViews(record[6], record[7], record[8], record[9])

      let intersection = new Intersection(id, location, mainRoad, crossRoad, trafficImage, cameraViews);
      data.push(intersection);
    }
  }
};

/**
 * Returns an `Array`, which is a copy of the `data` array holding all parsed Intersections
 */
Intersections.prototype.all = function() {
  return this.data.slice();
}

/**
 * Returns a `Number`, which is the number of Intersections in the `data` array
 */
Intersections.prototype.count = function () {
  return this.data.length;
}

/**
 * Allows adding a new `Intersection` object to the `data` array.
 */
Intersections.prototype.add = function(intersection) {
  this.data.push(intersection);
};

/**
 * Allows removing the given `Intersection` object from the `data` array.
 */
Intersections.prototype.remove = function(intersection) {
  const idx = this.data.indexOf(intersection);
  if(idx > -1) {
    this.data.splice(idx, 1);
  }
};

/**
 * Gets an `Intersection` object by its `Location`.  That is, looks for an
 * `Intersection` object in the `data` array that matches the given `location`
 * information (`lat` and `lng`).
 */
Intersections.prototype.getByLocation = function(location) {
  return this.data.find(intersection =>
    Location.compare(location, intersection.location)
  );
};

/**
 * Gets an `Intersection` object by its `id`.  That is, looks for an
 * `Intersection` object in the `data` array that matches the given `id`.
 */
Intersections.prototype.getById = function(id) {
  return this.data.find(intersection => intersection.id === id);
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
  if(exactMatch) {
    return this.data.filter(intersection =>
      intersection.mainRoad === search ||
      intersection.crossRoad === search
    );  
  } else {
    search = search.toLowerCase();
    return this.data.filter(intersection =>
      intersection.mainRoad.toLowerCase().includes(search) ||
      intersection.crossRoad.toLowerCase().includes(search)
    );  
  }
}

/**
 * Gets an `Array` of all street names from `mainRoad` and `crossRoad` fields.
 * The `Array` should have no duplicates, and should be sorted.
 */
Intersections.prototype.streets = function() {
  const uniqStreets = new Set();
  this.data.forEach(intersection => {
    uniqStreets.add(intersection.mainRoad);
    uniqStreets.add(intersection.crossRoad);
  });

  return Array.from(uniqStreets).sort();
};

module.exports = Intersections;
