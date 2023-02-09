const mongoose = require("mongoose");

module.exports.connect = (done) => {
  mongoose.connect("mongodb://localhost/extractText", { useNewUrlParser: true}, (error) => {
    if (error) done(error);
    else done();
  });
};
