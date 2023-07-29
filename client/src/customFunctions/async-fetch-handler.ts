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


export default async function promiseToGetCorrectUrl(keyNameForThumbnail : string):Promise<string>{

  
  
  let recievedFileFromAWS : recievedDataFromS3Type ;
  let dataFromFile : any
  let finalImageUrl : string

    try {
      recievedFileFromAWS = await getDownloadPromiseFor(keyNameForThumbnail)
      // dataFromFile = await readBfromA(recievedFileFromAWS.Body,"data")
      //dataFromFile = await readData(recievedFileFromAWS);
      console.log("data from file ="+dataFromFile)

    } catch (error) {
      finalImageUrl=''
    }
    
    
  return new Promise((resolve,reject)=>{
        
        if(finalImageUrl!="")
        finalImageUrl = convertdataArrayToImgUrl(recievedFileFromAWS.Body,recievedFileFromAWS.ContentType)
        resolve(finalImageUrl)
        
    })
        
    
        
    
}