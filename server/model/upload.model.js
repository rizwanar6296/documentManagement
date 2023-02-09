const mongoose = require("mongoose");
const { Schema } = mongoose;

const UploadSchema = new Schema({
  fileName:{
    type:String
  },
  orginalName:{
    type:String
  },
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Upload = mongoose.model("upload", UploadSchema);
module.exports = Upload;
