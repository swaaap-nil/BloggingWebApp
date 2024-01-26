import AWS from "aws-sdk"
import { config } from "dotenv";
config();

const awsConfig = {
  accessKeyId: process.env.AWS_accessKeyId,
  secretAccessKey: process.env.AWS_secretAccessKey,
}
// console.log(awsConfig)
AWS.config.update(awsConfig);

const s3 = new AWS.S3();

export async function fetchFromS3(keyNameFortheFile){

    // console.log("Downloading from S3 for key value: " +keyNameFortheFile)
    const params = {
        Bucket: process.env.S3_BUCKET_NAME || "",
        Key: keyNameFortheFile,
      };

      return new Promise(async (resolve, reject) => {
        s3.getObject(params, (err, data) => {
          if (err) {
            console.error(err.message);
            reject(new Error("Couldnt fetch file from AWS S3")); // Reject the promise with the empty URL
          } else {
            // console.log("file from aws server "+ JSON.stringify(data));
            // console.log("fetch successfull");
            resolve(data); // Resolve the promise with the URL
          }
        });
      });
      
      
}

export function uploadToS3(fileTobeUploaded,keyNameFortheFile,fileType ){

  // console.log("uploadToS3 called")
  const params = {
      Bucket: process.env.S3_BUCKET_NAME || "",
      Key: keyNameFortheFile,
      Body: fileTobeUploaded,
      ContentType: fileType,
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          console.error("error while uploading: " + err);
          reject(""); 
        } else {
          // console.log(`Image uploaded successfully. URL: ${data.Location}`);
          // resolve(`${data.Location}`); // Resolve the promise with the URL
          resolve()
        }
      });
    });
    
    
}
