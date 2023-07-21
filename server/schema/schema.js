var { GraphQLObjectType } = require("graphql")
var { GraphQLList, GraphQLSchema, GraphQLString,GraphQLID,GraphQLInt ,GraphQLJson} = require( "graphql") // ES6
var script = require("lodash") // script for searching thru arrays
const Post = require("../models/postModel")

const ContentSubType = new GraphQLObjectType({
    name: 'ContentSubType',
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
        description :  {type : GraphQLString},
        thumbnail : {type : GraphQLString},
        image :  {type : GraphQLString},
        upvotes : {type : GraphQLString},
        introduction : {type : GraphQLString},
        content :{type : new GraphQLList (ContentSubType)}
    })
})

/* The GOD root query is defined !!!
    It is the single api backend point which goes like this

    API end point name : RootQueryType (not used most likely,only to specify)
    Possible Queries : post { where expected argument from client is id}
*/
var RootQuery = new GraphQLObjectType({
    name : "RootQuery",
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



//Mutations to be made to the database
var Mutation = new GraphQLObjectType({
    name : "Mutation",
    fields : {
        addPost : {
            type : PostType,
            args : {
                title : {type : GraphQLString },
                categories : {type : new GraphQLList (GraphQLString)},
                author :  {type : GraphQLString},
                description :  {type : GraphQLString},
                image :  {type : GraphQLString}
            }, 
                resolve(parent,args){
                    let post = new Post({
                        title : args.title,
                        categories : args.categories,
                        author : args.author,
                        description : args.description,
                        image : args.image
                    });
                     return post.save()
                }
            }
         }
})

/*Exporting the schema
    It species what are the pssible queries
*/
module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
})



//dummy data. ignore for now 
var PostsArray = [
    { id : "1" , title : "sexy" , date : "25 Jun 2002",
     categories : ["interracial","nsfw"],author :"Swapnil",
     description : "lauda ka lehsun kar dunga" , image : "lauda world.png",
     upvotes : "2"
    },

    { id : "2" , title : "sexy" , date : "65 Jun 2002",
     categories : ["cum eating","milf"],author :"Swapnil",
     description : "laal hai pura tarbuz laal hai" , image : "laal world.png",
     upvotes : "2"
    },

    { id : "3" , title : "sexy" , date : "35 Jun 2002",
     categories : ["money talks","daughter swap"],author :"Swapnil",
     description : "jaldi waha se hato" , image : "jaldi world.png",
     upvotes : "2"
    },


    { id : "4" , title : "sexy" , date : "32 Jun 2002",
     categories : ["exchange","bull"],author :"Swapnil",
     description : "I have too many fetsh for you to fulfill" , 
     image : "fetsh world.png",
     upvotes : "2"
    },


    { id : "5" , title : "sexy" , date : "54 Jun 2002",
     categories : ["teen","asian"],author :"Swapnil",
     description : "I cant go home :(" , image : "home world.png",
     upvotes : "2"
    },

    { id : "6" , title : "sexy" , date : "23 Jun 2002",
     categories : ["incest","taboo"],author :"Swapnil",
     description : "I fucked up big time" , image : "fucked world.png",
     upvotes : "2"
    }
]  