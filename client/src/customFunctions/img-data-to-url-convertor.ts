import { Buffer } from "buffer"
export default function convertdataArrayToImgUrl(imageData : number[] | any,contentType : string){
    const imageBuffer = Buffer.from(imageData as number[]);
    const imgUrl = `data:${contentType};base64,${imageBuffer.toString("base64")}`;
    console.log("imgUrl ="+imgUrl)
    return imgUrl
}