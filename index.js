const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive')
require('dotenv').config();
const controller = require('./controller')
const app = express();
app.use( bodyParser.json() );
app.use( cors() );

massive(process.env.CONNECTION_STRING)
.then(dbInstance => {
    // dbInstance.create_table().then(c => console.log(c)); // table created here  ////
// dbInstance.new_planes()
    app.set('db', dbInstance);

})
.catch(console.log)

app.get('/api/airplanes/:id', (req, res) => { ///takes in an id parameter
    const db = req.app.get('db')
    db
    .get_planes([req.params.id]) // to reference the ID give above
    .then(response => {
        return res.status(200).json(response);
    })
    .catch(err => {
        console.log(err)
    })
})


app.get('/api/planes', controller.getPlanes)

const port = process.env.PORT || 3000
app.listen( port , () => { console.log(`Server listening on port ${port}`); } );

