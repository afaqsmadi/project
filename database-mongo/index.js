var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  name: String
});

var Item = mongoose.model('Item', itemSchema);

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};


let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let book = new Item ({name:data.name}) 
  book.save(function (err, repo) {
    if (err) return console.error(err);
    //fluffy.speak();
    //console.log(data.created_at)
  });

}

module.exports.selectAll = selectAll;
module.exports.save = save;