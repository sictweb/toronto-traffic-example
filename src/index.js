// Given a camera Object, return a menu item <div> for it
function buildMenuItem(camera) {
  let menuItem = document.createElement('div');
  // <div id="8001" class="menu-item" title="...">name....</div>
  menuItem.id = camera.number;
  menuItem.className = 'menu-item';
  menuItem.title = camera.name;
  menuItem.innerText = camera.name;
  return menuItem;
}

// Create all of our camera menu items, and register a click handler
function buildMenu() {
  let nav = document.querySelector('nav');

  trafficCameras.forEach(function(camera) {
    let cameraMenuItem = buildMenuItem(camera);
    nav.appendChild(cameraMenuItem);
  });

  // Add a click handler on the <nav> once for all menu item <div>s
  nav.addEventListener('click', function(event) {
    // Figure out which camera id was actually clicked
    let cameraNumber = event.target.id;
    // Find this camera Object based on the id (e.g., 8002 -> Camera)
    let camera = trafficCameras.find(function(camera) {
      return camera.number === cameraNumber;
    });

    // Update our image list and map based on the camera data clicked
    updateImages(camera);
    updateMap(camera.lat, camera.lng);
  });
}

function updateImages(camera) {
  // Set camera URL for #camera-image <img> element
  let cameraImage = document.querySelector('#camera-image');
  // Get the URL from our camera via its prototype method
  cameraImage.src = camera.getImageUrl();

  // Do the same for all the direction image URLs
  // Build a new <img> for each direction and place in the
  // directions container
  let directionsDiv = document.querySelector('#directions');
  // Remove any existing content so we can add new data
  directionsDiv.innerHTML = '';
  camera.getDirectionImages().forEach(function(directionImage) {
    // First, create a wrapper <div> to hold everything
    let wrapper = document.createElement('div');
    wrapper.className = 'direction-camera';

    // Create and put an <img> inside the wrapper <div>
    let img = document.createElement('img');
    img.src = directionImage.url;
    wrapper.appendChild(img);

    // Next, create and add a <span> with the direction, add to <div>
    let span = document.createElement('span');
    span.innerText = directionImage.direction.toUpperCase();
    wrapper.appendChild(span);

    // Put our wrapper <div> into the container <div> of directions
    directionsDiv.appendChild(wrapper);
  });

  // Remove .hidden class from our images div (if present)
  let imagesDiv = document.querySelector('#images');
  imagesDiv.classList.remove('hidden');
}

// Keep references to our map and marker, so we can move/update them
let map;
let marker

function updateMap(lat, lng) {
  // Move or Create a marker to this intersection
  if(marker) {
    marker.setLatLng({ lat, lng });
  } else {
    marker = L.marker([lat, lng]).addTo(map);
  }

  // Update the map's location
  map.setView([lat, lng]);
}

function buildMap() {
  // Define a location for Seneca's Newnham building
  let senecaCoords = [43.7952, -79.3497];

  // Create a map pointed to Seneca's coords, zoomed in a bit
  map = L.map('map').setView(senecaCoords, 16);

  // Load map tiles to show and add to the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
}

// Wait for the page to load, then setup the map and menu
window.onload = function() {
  buildMenu();
  buildMap();
};
