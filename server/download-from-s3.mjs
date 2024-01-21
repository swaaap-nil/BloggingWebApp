import AWS from "aws-sdk"
import { config } from "dotenv";
config();
//see how to setup process env

const awsConfig = {
  accessKeyId: process.env.AWS_accessKeyId,
  secretAccessKey: process.env.AWS_secretAccessKey,
}
console.log(awsConfig)
AWS.config.update(awsConfig);

// interface recivedDataFromS3Type{
//   LastModified :string
//   ContentLength :string
//   ContentType :string
//   Metadata : any
//   Body : {
//     type : string
//     data : number[]
//   }
// }

const s3 = new AWS.S3();

export default async function fetchFromS3Bucket(keyNameFortheFile ){

    console.log("Downloading from S3 for key value: " +keyNameFortheFile)
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
            console.log("fetch successfull");
            resolve(data); // Resolve the promise with the URL
          }
        });
      });
      
      
}
