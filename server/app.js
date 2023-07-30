var express = require("express"); // MODULE TO BUILD THE EXPRESS APP
var { graphqlHTTP } = require("express-graphql") // Module to make express app handle graphiql requests
var dotenv =require("dotenv")
var app = express(); //the express app!!
var schema = require("./schema/schema")

//The database instance
var mongoose = require("mongoose")

dotenv.config()
//to allow cross origin requests
var cors = require("cors")
app.use(cors()) 

// connectToDB();

const mongoDB = process.env.CONNECTION_URL_TO_MONGODB_DATABASE
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("connected to database successfully")
}
/*  
    Whenever request comes at /graphql let graphqlHttp function handle shit
    The graphqlHTTP() function returns a {} object and takes schema,root,and boolean to enable graphiql interface
*/

app.use("/graphql",graphqlHTTP({
    schema : schema,
    graphiql: true
})); 


app.listen(process.env.PORT,()=> {
    console.log('now listening at port '+process.env.PORT)
})  

