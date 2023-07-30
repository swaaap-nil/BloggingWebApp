  import React, { memo, useState } from "react";
  import { PlusOutlined } from '@ant-design/icons';
  import { Form, Input, Divider,Upload} from 'antd';
  import customUploadRequestHandler from "../customFunctions/upload-request-handler";

  interface WriteChunkProps {
    title: string;
    content : string
    image : string
  }

  

  export function createComponentsArray(noofComponentsToBeCreated:number): React.FC[]{
      
      const WriteChunkComponent= memo((props:WriteChunkProps)=> {
        const {title,content,image} = props;
  
        return <>
            <Form.Item name={['blog', title]} label={title} rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name={['blog', image]} label= {image} >
            <Upload listType="picture-card" maxCount={1} customRequest={customUploadRequestHandler} >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        
         <Form.Item name={['blog', content]} label={content} rules={[{required: true}]}>
                <Input.TextArea/>
          </Form.Item>

          <Divider />
        </>;
})
      
    
      const componentsArray : React.FC[] = [];
        for(let i = 0; i<noofComponentsToBeCreated;i++){
        let title = `title${i}`;
        let content = `content${i}`
        let image = `image${i}`

        console.log("generating",title,content,image)

        componentsArray.push(() => <WriteChunkComponent title={title} content = {content} image = {image} />)
      }
      return componentsArray;
  }
    

  