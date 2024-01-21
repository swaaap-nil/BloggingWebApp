import { config } from "dotenv";
config();
import express, { response } from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";
import fetchFromS3Bucket from "./download-from-s3.mjs";

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

app.use("/image/:imageKey", async (req, res) => {
  try {
    const s3Response = await fetchFromS3Bucket(req.params.imageKey);
     if (Buffer.isBuffer(s3Response.Body)) {
        // Set appropriate headers based on your S3 object
        res.setHeader("Content-Type", s3Response.ContentType || "application/octet-stream");
        res.setHeader("Content-Length", s3Response.ContentLength || 0);
        res.end(s3Response.Body);
      } else {
        res.status(500).json({
          message: "Invalid S3 response format",
        });
      }

  } catch (error) {
    res.status(500).send({
      message: "AWS fetch failed",
    });
  }
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Now listening at port ${PORT}`);
  });
