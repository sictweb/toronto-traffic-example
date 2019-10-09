const Intersections = require('../src/intersections');
const Intersection = require('../src/intersection');
const Location = require('../src/location');
const CameraViews = require('../src/camera-views');
const { expect } = require('chai');

const csv = `Camera8001,43.643079,-79.381407,YORK ST,BREMNER BLVD,http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages/loc8001.jpg,http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001n.jpg,http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001e.jpg,http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001s.jpg,http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001w.jpg
Camera8002,43.64222,-79.384068,BREMNER BLVD,LOWER SIMCOE ST,http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages/loc8002.jpg,http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8002n.jpg,http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8002e.jpg,http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8002s.jpg,http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8002w.jpg`;

// Missing URLs for camera views
const csvWithHoles = `Camera8153,43.739729,-79.421831,AVENUE RD,WILSON AVE,http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages/loc8153.jpg,  ,  ,  ,`;

function createLocation() {
  const location = new Location(43.1234, -79.1234);
  return location;
}

function createIntersection() {
  const id = 8001;
  const location = createLocation();
  const mainRoad = 'Main Road';
  const crossRoad = 'Cross Road';
  const trafficUrl = 'http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages/loc8001.jpg';

  const north = 'http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001n.jpg';
  const east = 'http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001e.jpg';
  const south = 'http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001s.jpg';
  const west = 'http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001w.jpg';
  const cameraViews = new CameraViews(north, east, south, west);

  const intersection = new Intersection(id, location, mainRoad, crossRoad, trafficUrl, cameraViews);
  return intersection;
}

describe('Intersections Tests', function() {
  it('should be a function', function() {
    expect(Intersections).to.be.a('function');
  });

  it('should create an empty intersections object if no csv data is passed', function() {
    const intersections = new Intersections();
    expect(intersections.count()).to.equal(0);
  });

  it('should allow adding a new intersection object', function() {
    const intersections = new Intersections();
    expect(intersections.count()).to.equal(0);

    const intersection = createIntersection();
    intersections.add(intersection);
    expect(intersections.count()).to.equal(1);
  });

  it('should allow removing an intersection object', function() {
    const intersections = new Intersections();
    expect(intersections.count()).to.equal(0);

    const intersection = createIntersection();
    intersections.add(intersection);
    expect(intersections.count()).to.equal(1);

    intersections.remove(intersection);
    expect(intersections.count()).to.equal(0);
  });

  it('should allow finding intersections by location', function() {
    const intersections = new Intersections();
    intersections.add(createIntersection());
    const intersection = intersections.getByLocation(createLocation());
    expect(intersection).to.deep.equal(createIntersection());
  });

  it('should parse csv data and create expected intersection objects', function() {
    const intersections = new Intersections(csv);
    expect(intersections.count()).to.equal(2);

    const location1 = new Location(43.643079, -79.381407);
    const intersection1 = intersections.getByLocation(location1);
    expect(intersection1).to.be.instanceOf(Intersection);
    expect(intersection1.id).to.equal(8001);
    expect(intersection1.location.lat).to.equal(43.643079);
    expect(intersection1.location.lng).to.equal(-79.381407);
    expect(intersection1.mainRoad).to.equal('YORK ST');
    expect(intersection1.crossRoad).to.equal('BREMNER BLVD');
    expect(intersection1.trafficUrl).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages/loc8001.jpg');
    expect(intersection1.cameraViews.north).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001n.jpg');
    expect(intersection1.cameraViews.east).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001e.jpg');
    expect(intersection1.cameraViews.south).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001s.jpg');
    expect(intersection1.cameraViews.west).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001w.jpg');

    const location2 = new Location(43.64222, -79.384068);
    const intersection2 = intersections.getByLocation(location2);
    expect(intersection2).to.be.instanceOf(Intersection);
    expect(intersection2.id).to.equal(8002);
    expect(intersection2.location.lat).to.equal(43.64222);
    expect(intersection2.location.lng).to.equal(-79.384068);
    expect(intersection2.mainRoad).to.equal('BREMNER BLVD');
    expect(intersection2.crossRoad).to.equal('LOWER SIMCOE ST');
    expect(intersection2.trafficUrl).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages/loc8002.jpg');
    expect(intersection2.cameraViews.north).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8002n.jpg');
    expect(intersection2.cameraViews.east).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8002e.jpg');
    expect(intersection2.cameraViews.south).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8002s.jpg');
    expect(intersection2.cameraViews.west).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8002w.jpg');
  });

  it('should parse csv data with missing optional properties', function() {
    const intersections = new Intersections(csvWithHoles);
    expect(intersections.count()).to.equal(1);

    const intersection1 = intersections.getById(8153);
    expect(intersection1).to.be.instanceOf(Intersection);
    expect(intersection1.id).to.equal(8153);
    expect(intersection1.location.lat).to.equal(43.739729);
    expect(intersection1.location.lng).to.equal(-79.421831);
    expect(intersection1.mainRoad).to.equal('AVENUE RD');
    expect(intersection1.crossRoad).to.equal('WILSON AVE');
    expect(intersection1.trafficUrl).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages/loc8153.jpg');
    expect(intersection1.cameraViews.north).not.to.exist;
    expect(intersection1.cameraViews.east).not.to.exist;
    expect(intersection1.cameraViews.south).not.to.exist;
    expect(intersection1.cameraViews.west).not.to.exist;
  });

  it('should be able to get intersections by id', function() {
    const intersections = new Intersections(csv);
    expect(intersections.count()).to.equal(2);

    const intersection1 = intersections.getById(8001);
    expect(intersection1).to.be.instanceOf(Intersection);
    expect(intersection1.id).to.equal(8001);
    expect(intersection1.location.lat).to.equal(43.643079);
    expect(intersection1.location.lng).to.equal(-79.381407);
    expect(intersection1.mainRoad).to.equal('YORK ST');
    expect(intersection1.crossRoad).to.equal('BREMNER BLVD');
    expect(intersection1.trafficUrl).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages/loc8001.jpg');
    expect(intersection1.cameraViews.north).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001n.jpg');
    expect(intersection1.cameraViews.east).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001e.jpg');
    expect(intersection1.cameraViews.south).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001s.jpg');
    expect(intersection1.cameraViews.west).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001w.jpg');

    const intersection2 = intersections.getById(8002);
    expect(intersection2).to.be.instanceOf(Intersection);
    expect(intersection2.id).to.equal(8002);
    expect(intersection2.location.lat).to.equal(43.64222);
    expect(intersection2.location.lng).to.equal(-79.384068);
    expect(intersection2.mainRoad).to.equal('BREMNER BLVD');
    expect(intersection2.crossRoad).to.equal('LOWER SIMCOE ST');
    expect(intersection2.trafficUrl).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages/loc8002.jpg');
    expect(intersection2.cameraViews.north).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8002n.jpg');
    expect(intersection2.cameraViews.east).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8002e.jpg');
    expect(intersection2.cameraViews.south).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8002s.jpg');
    expect(intersection2.cameraViews.west).to.equal('http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8002w.jpg');

    expect(intersections.getById(8003)).not.to.exist;
  });

  it('should allow searching for streets by name', function() {
    const intersections = new Intersections(csv);
    expect(intersections.count()).to.equal(2);

    // Should get 2 back
    const results1 = intersections.searchByStreet('BREMNER');
    expect(results1).to.be.an('array');
    expect(results1.length).to.equal(2);
    results1.forEach(result => expect(result).to.be.instanceOf(Intersection));

    // Should get 1 back
    const results2 = intersections.searchByStreet('SIMCOE');
    expect(results2).to.be.an('array');
    expect(results2.length).to.equal(1);
    results2.forEach(result => expect(result).to.be.instanceOf(Intersection));

    // Should get none back
    const results3 = intersections.searchByStreet('NONE');
    expect(results3).to.be.an('array');
    expect(results3.length).to.equal(0);
  });

  it('should allow searching for streets by name regardless of case, position', function() {
    const intersections = new Intersections(csv);
    expect(intersections.count()).to.equal(2);

    // Should get 2 back
    const results1 = intersections.searchByStreet('BreMNeR');
    expect(results1).to.be.an('array');
    expect(results1.length).to.equal(2);
    results1.forEach(result => expect(result).to.be.instanceOf(Intersection));

    // Should get 1 back
    const results2 = intersections.searchByStreet('simcOe');
    expect(results2).to.be.an('array');
    expect(results2.length).to.equal(1);
    results2.forEach(result => expect(result).to.be.instanceOf(Intersection));

    // Should get 2 back
    const results3 = intersections.searchByStreet('ST');
    expect(results3).to.be.an('array');
    expect(results3.length).to.equal(2);
    results3.forEach(result => expect(result).to.be.instanceOf(Intersection));

    // Should get none back
    const results4 = intersections.searchByStreet('None');
    expect(results4).to.be.an('array');
    expect(results4.length).to.equal(0);
  });

  it('should allow searching by an exact match for street name', function() {
    const intersections = new Intersections(csv);

    // Should get 0 back
    const results1 = intersections.searchByStreet('BreMNeR', true);
    expect(results1).to.be.an('array');
    expect(results1.length).to.equal(0);

    // Should get 2 back
    const results2 = intersections.searchByStreet('BREMNER BLVD', true);
    expect(results2).to.be.an('array');
    expect(results2.length).to.equal(2);
    results2.forEach(result => expect(result).to.be.instanceOf(Intersection));

    // Should get none back
    const results3 = intersections.searchByStreet('BREMNER', true);
    expect(results3).to.be.an('array');
    expect(results3.length).to.equal(0);
  });

  it('should allow getting a list of all streets', function() {
    const intersections = new Intersections(csv);
    const streets = intersections.streets();
    expect(streets).to.be.an('array');
  });

  it('should include street names only once, even if intersections has more', function() {
    const intersections = new Intersections(csv);
    const streets = intersections.streets();

    expect(streets.length).to.equal(3);
    expect(streets).to.include('YORK ST');
    expect(streets).to.include('BREMNER BLVD');
    expect(streets).to.include('LOWER SIMCOE ST');
  });

  it('should return a sorted list of steet names', function() {
    const intersections = new Intersections(csv);
    const streets = intersections.streets();

    expect(streets).to.deep.equal(['BREMNER BLVD', 'LOWER SIMCOE ST', 'YORK ST']);
  });

  it('should allow getting all() intersections as an array', function() {
    const intersections = new Intersections(csv);
    const all = intersections.all();
    expect(all).to.be.an('array');
    expect(all.length).to.equal(2);
    all.forEach(result => expect(result).to.be.instanceOf(Intersection));
  });
});
