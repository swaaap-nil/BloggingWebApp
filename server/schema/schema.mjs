import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
  } from 'graphql';
  import script from 'lodash';
  import Post from '../models/postModel.mjs';
  
  const ContentSubType = new GraphQLObjectType({
    name: 'ContentSubType',
    fields: {
      subheading: { type: GraphQLString },
      image: { type: GraphQLString },
      content: { type: GraphQLString },
    },
  });
  
  const ContentSubTypeInput = new GraphQLInputObjectType({
    name: 'ContentSubTypeInput',
    fields: {
      subheading: { type: GraphQLString },
      image: { type: GraphQLString },
      content: { type: GraphQLString },
    },
  });
  
  const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      date: { type: GraphQLString },
      categories: { type: new GraphQLList(GraphQLString) },
      author: { type: GraphQLString },
      headImage: { type: GraphQLString },
      description: { type: GraphQLString },
      thumbnail: { type: GraphQLString },
      image: { type: GraphQLString },
      upvotes: { type: GraphQLString },
      verified: { type: GraphQLBoolean },
      introduction: { type: GraphQLString },
      content: { type: new GraphQLList(ContentSubType) },
    }),
  });
  
  const entryPointToRunQueries = new GraphQLObjectType({
    name: 'AllPossibleQueries',
    fields: {
      getPostByID: {
        type: PostType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return Post.findById(args.id);
        },
      },
      getPostByTitle: {
        type: PostType,
        args: { title: { type: GraphQLString } },
        resolve(parent, args) {
          return Post.findOne({ title: args.title });
        },
      },
      getPosts: {
        type: new GraphQLList(PostType),
        args: {},
        resolve(parent, args) {
          return Post.find({ verified: true });
        },
      },
      getPostsByPage: {
        type: new GraphQLList(PostType),
        args: {
          page: { type: GraphQLInt },
        },
        resolve(parent, { page }) {
          const perPage = 9;
          const skip = (page - 1) * perPage;
          return Post.find({}).skip(skip).limit(perPage);
        },
      },
    },
  });
  
  const entryPointToRunMutations = new GraphQLObjectType({
    name: 'AllPossibleMutations',
    fields: {
      addPost: {
        type: PostType,
        args: {
          title: { type: GraphQLString },
          date: { type: GraphQLString },
          categories: { type: new GraphQLList(GraphQLString) },
          author: { type: GraphQLString },
          description: { type: GraphQLString },
          introduction: { type: GraphQLString },
          headImage: { type: GraphQLString },
          thumbnail: { type: GraphQLString },
          content: { type: new GraphQLList(ContentSubTypeInput) },
        },
        resolve(parent, args) {
          const { title, date, categories, author, description, introduction, content, headImage, thumbnail } = args;
          let post = new Post({
            title,
            date,
            categories,
            author,
            description,
            introduction,
            content,
            headImage,
            thumbnail,
            verified: false,
          });
          return post.save();
        },
      },
    },
  });
  
  export default new GraphQLSchema({
    query: entryPointToRunQueries,
    mutation: entryPointToRunMutations,
  });