const Intersection = require('../src/intersection');
const Location = require('../src/location');
const CameraViews = require('../src/camera-views');
const { expect } = require('chai');

describe('Intersection Tests', function() {

  const id = 8001;
  const location = new Location(43.1234, -79.1234);
  const mainRoad = 'Main Road';
  const crossRoad = 'Cross Road';
  const trafficUrl = 'http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages/loc8001.jpg';
  
  const north = 'http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001n.jpg';
  const east = 'http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001e.jpg';
  const south = 'http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001s.jpg';
  const west = 'http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001w.jpg';
  const cameraViews = new CameraViews(north, east, south, west);
  
  function createIntersection() {
    const intersection = new Intersection(id, location, mainRoad, crossRoad, trafficUrl, cameraViews);
    return intersection;
  }
  
  it('should be a function', function() {
    expect(Intersection).to.be.a('function');
  });

  it('should create an intersection instance from arguments', function() {
    const intersection = createIntersection();

    expect(intersection.id).to.equal(id);
    expect(Location.compare(location, intersection.location)).to.be.true;
    expect(intersection.mainRoad).to.equal(mainRoad);
    expect(intersection.crossRoad).to.equal(crossRoad);
    expect(intersection.trafficUrl).to.equal(trafficUrl);
    expect(intersection.cameraViews.north).to.equal(north);
    expect(intersection.cameraViews.east).to.equal(east);
    expect(intersection.cameraViews.south).to.equal(south);
    expect(intersection.cameraViews.west).to.equal(west);
  });

  it('should return the correct data when calling toString()', function() {
    const intersection = createIntersection();
    expect(intersection.toString()).to.equal('Main Road / Cross Road (43.1234, -79.1234)');
  });

});
