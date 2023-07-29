import AWS from "aws-sdk"

//see how to setup process env
AWS.config.update({
  accessKeyId: 'AKIAYI6QFDKBDI56EGRJ',
  secretAccessKey: '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',
});
interface recivedDataFromS3Type{
  LastModified :string
  ContentLength :string
  ContentType :string
  Metadata : any
  Body : {
    type : string
    data : number[]
  }
}

const s3 = new AWS.S3();

export default function getDownloadPromiseFor(keyNameFortheFile : string): any{

    console.log("Download from s3 called")
    console.log("key name = "+keyNameFortheFile)
    const params = {
  
        // Bucket: process.env.S3_BUCKET_NAME,
        Bucket: 'bucket-for-wasseypur-journals',
        Key: keyNameFortheFile,
      };

      return new Promise((resolve, reject) => {
        s3.getObject(params, (err, data ) => {
          if (err) {
            console.error("error while downloading due to  " + err+"so replied with emmpty string");
            reject(new Error("Couldnt fetch file from AWS S3")) // Reject the promise with the empty URL
          } else {
            // console.log("file from aws server "+ JSON.stringify(data));
          console.log("recieved file from AWS server")
            resolve(data); // Resolve the promise with the URL
          }
        });
      });
      
      
}
