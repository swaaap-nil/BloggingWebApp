import AWS from "aws-sdk"

//see how to setup process env
AWS.config.update({
  accessKeyId: 'AKIAYI6QFDKBDI56EGRJ',
  secretAccessKey: '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',
});

const s3 = new AWS.S3();

export default function getUploadPromiseFor(fileTobeUploaded: any, keyNameFortheFile : string , fileType : string){

    console.log("uploadToS3 called")
    const params = {
        // Bucket: process.env.S3_BUCKET_NAME,
        Bucket: 'bucket-for-wasseypur-journals',
        Key: keyNameFortheFile,
        Body: fileTobeUploaded,
        ContentType: fileType,
      };

      return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
          if (err) {
            console.error("error while uploading: " + err);
            reject(""); // Reject the promise with the error
          } else {
            console.log(`Image uploaded successfully. URL: ${data.Location}`);
            resolve(`${data.Location}`); // Resolve the promise with the URL
          }
        });
      });
      
      
}
