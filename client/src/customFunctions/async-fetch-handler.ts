import getDownloadPromiseFor from "./download-from-s3"

import convertdataArrayToImgUrl from "../customFunctions/img-data-to-url-convertor"


interface recievedDataFromS3Type{
  LastModified :string
  ContentLength :string
  ContentType :string
  Metadata : any
  Body : {
    type : string
    data : number[]
  }
}


export  async function promiseToGetCorrectUrl2(keyNameForThumbnail : string):Promise<string>{

  let recievedFileFromAWS : recievedDataFromS3Type ;
  let finalImageUrl : string

    try {
      recievedFileFromAWS = await getDownloadPromiseFor(keyNameForThumbnail)
      // dataFromFile = await readBfromA(recievedFileFromAWS.Body,"data")
      //dataFromFile = await readData(recievedFileFromAWS);
      //console.log("data from file ="+dataFromFile)

    } catch (error) {
      finalImageUrl=''
    }
    
    
  return new Promise((resolve,reject)=>{
        
        if(finalImageUrl!="")
        finalImageUrl = convertdataArrayToImgUrl(recievedFileFromAWS.Body,recievedFileFromAWS.ContentType)
        resolve(finalImageUrl)
        
    })
            
    
}

export default async function promiseToGetCorrectUrl(imageKey : string):Promise<string>{

  let recievedFileFromAWS : recievedDataFromS3Type ;
  let finalImageUrl : string

    
  return new Promise(async (resolve,reject)=>{
        
    try {

      const response = await fetch(`${process.env.REACT_APP_IMAGE_API}/get/${imageKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      resolve(imageUrl);
    } catch (error:any) {
      console.error('Error fetching image:', error.message);
      reject("")
    }
        
    })
        
    
        
    
}