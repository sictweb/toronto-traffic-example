# CSS Example: Toronto Traffic Example

## Introduction

This project is meant to expose WEB222 students to a number of common web
programming tasks and techniques, from HTML to CSS to JavaScript.  It uses
live data to create a usable web app.

The goal of the project is to create a web based viewer of all Toronto
traffic cameras.  The city of Toronto provides a free and open dataset of this
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

This will install all necessary dependencies in the `node_modules` directory.

## Step 2: Running the Server

After you have installed the dependencies, you can run a web server to
view all the files in the `src` directory:

```
npm start
> lite-server --baseDir="src"

Did not detect a `bs-config.json` or `bs-config.js` override file. Using lite-server defaults...
** browser-sync config **
{
  injectChanges: false,
  files: [ './**/*.{html,htm,css,js}' ],
  watchOptions: { ignored: 'node_modules' },
  server: { baseDir: 'src', middleware: [ [Function], [Function] ] }
}
[Browsersync] Access URLs:
 --------------------------------------
       Local: http://localhost:3000
    External: http://192.168.1.110:3000
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://localhost:3001
 --------------------------------------
[Browsersync] Serving files from: src
[Browsersync] Watching files...
20.03.17 12:54:56 200 GET /index.html
20.03.17 12:54:56 404 GET /favicon.ico
[Browsersync] Reloading Browsers...
```

You can now open your web browser to `http://localhost:3000`.

## Step 3: Developing the Code

A complete [walkthrough of the code is available on YouTube](https://www.youtube.com/watch?v=XjCaS2eXpkQ&list=PLJgO3yLojCBMeqeGhwE9Flrl49Z8wObpF&index=2&t=0s).

Try following along with the walkthrough, and building the code yourself to practice.

## Step 4: Possible Solution

When you're finished, you can find one possible solution in the [possible-solution branch](https://github.com/sictweb/toronto-traffic-example/tree/possible-solution).

You can also try an online version at [https://sictweb.github.io/toronto-traffic-example/](https://sictweb.github.io/toronto-traffic-example/).
