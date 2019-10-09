
# Web Programming Example Project - Toronto Traffic Cameras

This project is meant to expose WEB222 students to a number of common web
programming tasks and techniques, from HTML to CSS to JavaScript.  It uses
live data to create a usable web app.

The goal of the project is to create a web based viewer of all Toronto
traffic cameras.  The city of Toronto provides a free dataset of this
information, as well as live camera feeds, see:

[https://open.toronto.ca/dataset/traffic-cameras/](https://open.toronto.ca/dataset/traffic-cameras/)

> The Traffic Camera dataset contains the location and number for every Traffic camera in the City of Toronto. These datasets will be updated within 2 minutes when cameras are added, changed, or removed.

## Step 1: Setup

Start by [downloading the code for this project as a `.zip` file](https://github.com/sictweb/toronto-traffic-example/archive/master.zip).

Unzip the file and `cd` into the directory, then install all dependencies:

```
cd toronto-traffic-example
npm install
```

## Step 2: Modelling Intersection data in JavaScript

Our first task is to turn the text data in the [toronto-intersection-cameras.csv](toronto-intersection-cameras.csv)
into a set of JavaScript objects we can use.  The dataset is available in a number
of formats, and we'll begin by using the [CSV (comma separated values) version](http://opendata.toronto.ca/transportation/tmc/rescucameraimages/Data/tmcearthcameras.csv). 

### CSV Data Format

The format of the data is Comma Separated Values (CSV), with each line containing
the following data (and data format):

1. Camera Number <String>: the camera number (e.g., `Camera8001`)
1. Latitude <Number>: the camera's location latitude (e.g., `43.643079`)
1. Longitude <Number>: the camera's location longitude (e.g., `-79.381407`)
1. Main Road <String>: name of the intersection's main road (e.g., `Richmond St E`) 
1. Cross Road <String>: name of the intersection's cross road (e.g., `Parliament St`)
1. Traffic Image <String URL>: image URL of the intersection's traffic (e.g., `http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages/loc8001.jpg`)
1. North View Image <String URL>: optional image URL for the intersection's north view (e.g., `http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001n.jpg`)
1. East View Image <String URL>: optional image URL for the intersection's east view (e.g., `http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001e.jpg`)
1. South View Image <String URL>: optional image URL for the intersection's south view (e.g., `http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001s.jpg`)
1. West View Image <String URL>: optional image URL for the intersection's west view (e.g., `http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8001w.jpg`)

### Camera URLs

The Traffic Image camera URLs are based on the intersection's Camera Number, and
take the following format:

http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages/loc{cameraNumber}>.jpg

For example, the camera at Finch and Don Mills is:

[http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages/loc8093.jpg](http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages/loc8093.jpg)

The live image looks like this:

![Example camera image](http://opendata.toronto.ca/transportation/tmc/rescucameraimages/CameraImages/loc8093.jpg)

The various North, East, South, and West views also use the Camera Number, and
take the following format:

http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc{cameraNumber}{direction}.jpg

Where <direction> is one of 'n', 'e', 's', or 'w'.

For example, the view North at Finch and Don Mills is:

[http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8093n.jpg](http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8093n.jpg)

![Example of North view](http://opendata.toronto.ca/transportation/tmc/rescucameraimages/ComparisonImages/loc8093n.jpg)

### JavaScript Objects

1. `Location` represents a geographic location by latitude and longitude
1. `CameraViews` represents a set of `north`, `east`, `south`, and `west` image URLs for different camera views
1. `Intersection` represents an intersection, with the intersection's `id`, `location`, `mainRoad`, `crossRoad`, `trafficUrl`, and `cameraViews`.
1. `Intersections` represents a parsed set of `Intersection` objects

### Implementation and Tests

Each of the Objects above needs to get implemented.  There are files in the `src/`
directory for each of the Objects, as well as some other files that have already been written.

Similarly, there are tests written in `test/` for each of the objects, and all their
methods.

We need to implement all the code in `src/` so that it passes the tests in `test/`.

You can run the tests using:

```
npm test
```

### Important JavaScript Concepts To Research/Use

In order to complete this assignment, you'll need to use a number of techniques
and language features.  Some of these we have covered in class already, others
you will need to research.

Below is a list of things I assume you'll need, and which you should be aware of
as you work on this code:

- Declaring Constructor Functions
- Using `this` in an Object to access its properties
- Defining methods on a Constructor's `prototype` vs. the instance
- Using Constructor functions to create `new` instances
- Using Strings, specifically: `split()`, `toUpperCase()`, `toLowerCase()`,
  `replace()`, string concatenation and/or Template Literals
- Using Arrays, specifically: `length`, `push()`, `splice()`, `forEach()`,
  `filter()`, `find()`, `sort()`, `slice()`
- Working with a `Set`, and converting a `Set` to an `Array` using `Array.from()`
