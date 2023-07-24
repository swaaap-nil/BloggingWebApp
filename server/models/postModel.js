  var mongoose = require("mongoose")

  var postSchema = new mongoose.Schema({
      title: String,
      date: String,
      categories: [String],
      author: String,
      description: String,
      headImage: String,
      upvotes: String,
      introduction : String,
      thumbnail : String,
      content: [
        {
          subheading: String,
          image: String,
          content: String,
        },
      ],
    });

  //Created Post Model
  module.exports = mongoose.model("Post",postSchema);
  // mongoose.model("Posts", postSchema);
  // module.exports =  await mongoose.model('Posts').findOne();