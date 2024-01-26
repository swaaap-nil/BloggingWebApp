import express from "express";
const S3Router = express.Router();
import {fetchFromS3,uploadToS3 as uploadToS3} from "./aws.mjs";
import multer from 'multer';

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

S3Router.get(`/get/:imageKey`,async (req, res) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000))
      const s3Response = await fetchFromS3(req.params.imageKey);
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
  })

  S3Router.post('/post/:imageKey', upload.single('image'), async (req, res) => {
    try {
      const file = req.file.buffer;
      const fileType = req.file.mimetype;
      const imageKey = req.params.imageKey;
  
      const s3Response = await uploadToS3(file, imageKey, fileType);
      // console.log('S3 Response:', s3Response);
      res.status(200).send(imageKey).end();
    } catch (error) {
      console.error(error); 
      res.sendStatus(500).end();
    }
  });
  export default S3Router;