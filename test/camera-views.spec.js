const CameraViews = require('../src/camera-views');
const { expect } = require('chai');

describe('CameraViews Tests', function() {

  // Sample direction image URLs
  const north = 'http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001n.jpg';
  const east = 'http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001e.jpg';
  const south = 'http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001s.jpg';
  const west = 'http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc80012.jpg';

  it('should be a function', function() {
    expect(CameraViews).to.be.a('function');
  });

  it('should create a views instance from 4 image urls', function() {
    const views = new CameraViews(north, east, south, west);
    expect(views).to.be.instanceOf(CameraViews);
    expect(views.north).to.equal(north);
    expect(views.east).to.equal(east);
    expect(views.south).to.equal(south);
    expect(views.west).to.equal(west);
  });

  it('should properly deal with optional, missing direction URLs', function() {
    const views = new CameraViews(north, null, undefined, '    ');
    expect(views).to.be.instanceOf(CameraViews);
    expect(views.north).to.equal(north);
    expect(views.east).to.not.exist;
    expect(views.south).to.not.exist;
    expect(views.west).to.not.exist;
  });
});
