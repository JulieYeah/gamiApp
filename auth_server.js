var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/test', function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected');
 
});