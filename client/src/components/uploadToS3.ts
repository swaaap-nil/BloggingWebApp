import AWS from "aws-sdk"

//see how to setup process env
AWS.config.update({
  accessKeyId: 'AKIAYI6QFDKBDI56EGRJ',
  secretAccessKey: '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',
});

const s3 = new AWS.S3();

export default function UploadToS3(imageName : string ,bufferImage: any, contentType : string){

    const params = {
        // Bucket: process.env.S3_BUCKET_NAME,
        Bucket: 'bucket-for-wasseypur-journals',
        Key: 'my-image.png',
        Body: bufferImage,
        ContentType: contentType,
      };

      s3.upload(params, (err :any, data :any) => {
        if (err) {
            //return blank url if upload failed
          console.error("error while uploading : "+err);
          return "";
        } else {
          console.log(`Image uploaded successfully. URL: ${data.Location}`);
          return data.location;
        }
      });
      
      
}
