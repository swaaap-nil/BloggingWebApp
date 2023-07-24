import { type } from "os";
import UploadToS3 from "./uploadToS3";
import { Buffer } from "buffer";
import { json } from "stream/consumers";

function convertToBufferFromBase64(base64String ){
    

    if (!base64String || base64String.trim() === '') 
      throw new Error('Base64 string cannot be empty.');
    
    const base64WithoutPrefix = base64String.split(',')[1];

    console.log("base64StringwithoutPrefix = "+base64WithoutPrefix)

    if (!base64WithoutPrefix || base64WithoutPrefix.trim() === '') 
      throw new Error('Base64 string does not contain valid data.');
    
      // Create a Buffer from the base64 string
    return Buffer.from(base64WithoutPrefix, 'base64');
    
  }


export default function normaliseAndUploadTheFile(e){

    // To be used only if multiple files are uploaded
    // e looks like : [{file,fileList},{...},{...}] if multiple files are present for same upload button
    // e looks like : {file,fileList} if only single image
    // actually its not fixed e may or may not be an array depending on platform

    

    if (e === null) {
      console.error("Error: 'e' is null in normaliseAndUploadTheFile function.");
    }
    
    console.log('Upload event from 2nd func:', e);
    console.log('Type of fileList:', Array.isArray(e.fileList));
    console.log('Value of e.fileList[0]:', e.fileList[0]);
    console.log('Length of e.fileList[0] object keys array:', Object.keys(e.fileList[0]).length);
    console.log('Length of e.fileList[0] object values array :', Object.values(e.fileList[0]).length);
    console.log('Length of thumbUrl property:', e.fileList[0].thumbUrl.length);

    console.log('Value of thumburl:', e.fileList[0].thumbUrl);

    const thumbUrlRegex = /^data:image\/\w+;base64,(.*)$/;
    const valuesArray = Object.values(e.fileList[0]);
    var thumbUrlValue ;
    for (const value of valuesArray) {
      if (typeof value === 'string' && thumbUrlRegex.test(value)) {
        thumbUrlValue = value;
        break; // Exit the loop if a matching value is found
      }
    }

    let base64image;
    if (Array.isArray(e.fileList) && e.fileList.length > 0) {
      // If so, take the first item (index 0) and then extract the thumbUrl
      base64image = e.fileList[0].thumbUrl;
    } else {
      // If e.fileList is not an array, directly extract the thumbUrl
      base64image = e.fileList.thumbUrl;
    }

    const nameOfImageToBeUploaded = "name"

    console.log(JSON.stringify(base64image))

    if (!base64image || base64image.trim() === '') {
      console.error('base64image empty')
    
    const imageConvertedInBuffer = convertToBufferFromBase64(thumbUrlValue);

    //figure out content type from imageDataBase64 
    //for now going with png
    const contentType = 'image/png'

    const url = UploadToS3(nameOfImageToBeUploaded ,imageConvertedInBuffer, contentType);

    return {
      status: 'done', // Set the status to 'done' to indicate the upload is complete
      url: url, // Set the url property to the thumbUrl value to provide the link to the uploaded file
    };

   }
};