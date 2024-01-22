import { config } from "dotenv";
config();
import express, { response } from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";
import S3Router from "./router.mjs";

import schema from "./schema/schema.mjs";

const app = express();
app.use(cors());

const mongoDB = process.env.CONNECTION_URL_TO_MONGODB_DATABASE;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected to the database successfully");
}

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);


app.use("/image",S3Router)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Now listening at port ${PORT}`);
  });
