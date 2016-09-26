const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const app = express();
const mongojs = require( 'mongojs' );
const db = mongojs( 'birds', [ 'sightings' ] );
const ObjectId = mongojs.ObjectId;
app.use( cors() );
app.use( json() );

const port = 3000;

app.post('/api/sighting', function(req, res) {
  db.sightings.insert( req.body, ( err, bird ) => {
      if ( err ) return res.status( err ).json( err );
      else res.json( bird );
  } );
  console.log('POST sighting');
  // res.end();
});

app.get('/api/sighting', function(req, res) {
  db.sightings.find( req.query, ( err, bird ) => {
    if( err ) return res.status( err ).json( err );
    else res.json( bird );
  } );
  console.log('GET sighting');
  // res.end();
});

app.delete('/api/sighting', function(req, res) {
  db.sightings.remove( { _id: ObjectId( req.query.id ) }, ( err, bird ) => {
    if ( err ) return res.status( err ).json( err );
    else res.json( bird );
  } );
  console.log('DELETE sighting');
  // res.end();
});

app.put('/api/sighting', function(req, res) {
  db.sightings.update( { _id: ObjectId( req.query.id ) }, { $set: { order: req.body.order } }, ( err, bird ) => {
    if ( err ) return res.status( err ).json( err );
    else res.json( bird );
  } );
  console.log('PUT sighting');
  // res.end();
});
  
app.listen(port, function() {
  console.log("Started server on port", port);
});
