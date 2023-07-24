    var { GraphQLObjectType ,GraphQLInputObjectType} = require("graphql")
    var { GraphQLList, GraphQLSchema, GraphQLString,GraphQLID,GraphQLInt ,GraphQLJson} = require( "graphql") // ES6
    var script = require("lodash") // script for searching thru arrays
    const Post = require("../models/postModel")

    const PostKeAndarKaContentFieldKaType = new GraphQLObjectType({
        name: 'ContentSubType',
        fields: {
        subheading: { type: GraphQLString },
        image: { type: GraphQLString },
        content: { type: GraphQLString },
        },
    });   

    // Define the ContentSubTypeInput as an Input Type
    const ContentSubTypeInput = new GraphQLInputObjectType({
        name: 'ContentSubTypeInput',
        fields: {
        subheading: { type: GraphQLString },
        image: { type: GraphQLString },
        content: { type: GraphQLString },
    },
  });

    // Post Object is defined with its field
    const PostType = new GraphQLObjectType({
        name : "Post",
        fields :()=>({
            id : {type : GraphQLID},
            title :  {type : GraphQLString},
            date :  {type : GraphQLString},
            categories : {type : new GraphQLList (GraphQLString)},
            author :  {type : GraphQLString},
            headImage : {type: GraphQLString},
            description :  {type : GraphQLString},
            thumbnail : {type : GraphQLString},
            image :  {type : GraphQLString},
            upvotes : {type : GraphQLString},
            introduction : {type : GraphQLString},
            content :{type : new GraphQLList (PostKeAndarKaContentFieldKaType)}
        })
    })

    

    //GraphQl object containing all the posssible queires
    const entryPointToRunQueries = new GraphQLObjectType({
        name : "AllPossibleQueries",
        fields: {
            
            // Query to search posts by id
            getPostByID : {
                type : PostType,
                args : { id : { type : GraphQLID }},
                resolve(parent,args){
                    // TODO write what should be returned when a post{id} query is made
                    //console.log(typeof(script.find(PostsArray,{id: args.id})));
                    //return script.find(PostsArray,{id: args.id}) ;
                    return Post.findById(args.id)
                }
            },

            // Query to search posts by title
            getPostByTitle : {
                type : PostType,
                args : { title: { type : GraphQLString }},
                resolve(parent,args){
                    // TODO write what should be returned when a post{id} query is made
                    //console.log(typeof(script.find(PostsArray,{id: args.id})));
                    //return script.find(PostsArray,{id: args.id}) ;
                    return Post.findOne({title : args.title})    
                }
            },

            // query to retrieve all posts at once
            getPosts : {
                type : new GraphQLList(PostType),
                args : {},
                resolve(parent,args){
                    //return all the posts that should be present on the argument page number
                    return Post.find({})
                }
            },

            //query to get posts for a given page number
            getPostsByPage: {
                type: new GraphQLList(PostType),
                args: {
                page: { type: GraphQLInt }
                },
                resolve(parent, { page }) {
                const perPage = 9; // Number of posts per page
                const skip = (page - 1) * perPage; // Calculate the number of posts to skip based on the page number
            
                // Fetch posts for the specified page
                return Post.find({}).skip(skip).limit(perPage);
                }
            }
            
        }
    })



    //GraphQl object containing all the posssible mutations
    const entryPointToRunMutations = new GraphQLObjectType({
        name : "AllPossibleMutations",
        fields : {

            //mutation to add post to the database
            addPost : {
                type : PostType,
                args : {
                    title :  {type : GraphQLString},
                    date :  {type : GraphQLString},
                    categories : {type : new GraphQLList (GraphQLString)},
                    author :  {type : GraphQLString},
                    description :  {type : GraphQLString},
                    introduction : {type : GraphQLString},
                    headImage : {type : GraphQLString},
                    thumbnail : {type : GraphQLString},
                    content : {type :new GraphQLList ( ContentSubTypeInput) }
                }, 
                    resolve(parent,args){
                        console.log("reached resolve function with " + JSON.stringify(args))
                        const { title, date, categories, author, description, introduction, content,headImage,thumbnail } = args;
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
                        });
                        return post.save()
                    }
                }
            }
    })

 
    // merging the object of both the above and creating then exporting the schema
     module.exports = new GraphQLSchema({
        query : entryPointToRunQueries,
        mutation : entryPointToRunMutations
    })