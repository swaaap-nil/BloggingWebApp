import { Buffer } from "buffer"
import iPromiseIwillReadBFromA from "./async-reading"
interface fileType{
    LastModified :string
  ContentLength :string
  ContentType :string
  Metadata : any
  Body : {
    type : string
    data : number[]
  }
}

export default async function extractImageUrlFromFile(file:fileType){
    return new Promise ((resolve,reject)=>{
      iPromiseIwillReadBFromA(file.Body,"data")
      .then((imageData)=>{
        console.log("imageData read : " + imageData)
        const imageBuffer = Buffer.from(imageData as number[]);
        const contentType = file.ContentType;
        const imgUrl = `data:${contentType};base64,${imageBuffer.toString("base64")}`;
        return imgUrl
      })
      
  
      
  
    })
    

}