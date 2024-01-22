import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  date: String,
  categories: [String],
  author: String,
  description: String,
  headImage: String,
  upvotes: String,
  introduction: String,
  thumbnail: String,
  verified: Boolean,
  content: [
    {
      subheading: String,
      image: String,
      content: String,
    },
  ],
});

// Create Post Model
const Post = mongoose.model('Post', postSchema);

export default Post;
