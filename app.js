const express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose'); 
const router = express.Router()
const home=require('./routes/home')


mongoose.connect('mongodb://127.0.0.1:27017/buyume')
  .then(() => console.log('Connected!'));
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.text({ type: 'text/html' }))
 

app.use('/home', home)
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
// One can include body parsers, and other validators and helpful packages here
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})