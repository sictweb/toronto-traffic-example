const Location = require('../src/location');
const { expect } = require('chai');

describe('Location Tests', function() {
  it('should be a function', function() {
    expect(Location).to.be.a('function');
  });

  it('should create a location instance from lng, lat values', function() {
    const lat = 43.12;
    const lng = -79.93;
    const location = new Location(lat, lng);
    expect(location).to.be.instanceOf(Location);
    expect(location.lat).to.equal(lat);
    expect(location.lng).to.equal(lng);
  });

  it('should properly format a String version using toString()', function() {
    const location = new Location(43.12, -79.93);
    expect(location.toString()).to.equal('(43.12, -79.93)');
  });

  it('should allow getting the location as an array of [lat, lng]', function() {
    const location = new Location(43.12, -79.93);
    const arr = location.toArray();
    expect(arr).to.be.an('array');
    expect(arr).to.deep.equal([43.12, -79.93]);
  });

  it('should expose a compare() function', function() {
    expect(Location.compare).to.be.a('function');
  });

  it('should return false from compare() if two locations are different', function() {
    const location1 = new Location(43.12, -79.93);
    const location2 = new Location(43.13, -79.93);
    expect(Location.compare(location1, location2)).to.be.false;
  });

  it('should return true from compare() if two locations are same', function() {
    const location1 = new Location(43.12, -79.93);
    const location2 = new Location(43.12, -79.93);
    expect(Location.compare(location1, location2)).to.be.true;
  });

  it('should not be fooled by trailing zeros when comparing', function() {
    const location1 = new Location(43.12000000, -79.93);
    const location2 = new Location(43.12, -79.9300000);
    expect(Location.compare(location1, location2)).to.be.true;
  });

});
