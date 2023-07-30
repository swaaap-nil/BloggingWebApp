 import generateRandomName from '../customFunctions/random-name-generator';
import getUploadPromiseFor from './upload-to-s3';
export default async function customUploadRequestHandler(options){
    //fix upload request handler
    const { file, onSuccess, onError } = options;
  
    console.log("Request Recieved To Upload File "+file)
    let fileName :string  = generateRandomName()
    const contentType = 'image/png'
    const uploadAndGetUrlPromise = getUploadPromiseFor(file,fileName,contentType)
      
    uploadAndGetUrlPromise.then((uploadedFileUrl) => {onSuccess(uploadedFileUrl, file)})
    uploadAndGetUrlPromise.catch((blankUrl)=>{onError(blankUrl,file)})
    
}