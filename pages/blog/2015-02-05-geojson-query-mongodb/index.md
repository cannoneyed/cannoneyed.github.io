---
title: GeoJSON Queries in MongoDB
date: 02/05/2015
description: "Location based querying across dimensions"
---


MongoDB has gained a lot of momentum over the last few years by presenting itself as a more versatile and free form database alternative to the highly structured, schema-based standards like mySQL. However mongo offers a number of incredibly powerful query abilities that rely on setting up a more rigid set of indices, including robust geographic search capabilities based on geoJSON.

GeoJSON is a format for encoding a variety of geographic features in a specific way.

```javascript
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-122.409046, 37.783748]
  },
  "properties": {
    "name": "Hack Reactor"
  }
}
```

The first thing to note is that geoJSON encodes the coordinates of a feature as an array pair of [longitude, latitude], which is the opposite of many popular georgraphic services (like the Google Maps API) which returns latitude / longitude pairs. The second point of interest is that a geoJSON object can contain a variety of geometries. This example represents a single point, but any polygon or shape can be represented.

In order to query mongoDB based on geoJSON objects, the data in the database must be indexed geographically. This allows mongo to look up geographic data by a geographic query very efficiently. It's as simple as setting up an index, which can be done using mongoose:

```javascript
var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
  location : {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  }
});

LocationSchema.index({ location : '2dsphere' });

Location = mongoose.model('Location', LocationSchema);
```

This sets up a simple schema of a location object encoded in geoJSON based format. By indexing the location object to type '2dsphere', mongo can very efficiently query this set of data based on passed in geoJSON queries.

```javascript
query.location = {
  $near : {
    $geometry : {
      type : "Point",
      coordinates : [-122.409046, 37.783748]
    },
    $maxDistance : 1000
  }
}

Location.find(query);
```

One of the most powerful features that the geoJSON querying format allows for is using complex geometries to query the database. The example above simply searches for all points within a radius of 1000 meters, but by using a complex polygonal geometry as the query geometry, mongo can search within any imaginable bounding object, for instance all of the points within a few blocks of a given route.
