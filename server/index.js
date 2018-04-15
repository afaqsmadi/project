var express = require('express');
var bodyParser = require('body-parser');

 var items = require('../database-mongo');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));



app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/items', function (req, res) {
	var t = req.body.book
	items.save(t)
	res.send(t)
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

