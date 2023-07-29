  import React from "react";
  import { PlusOutlined } from '@ant-design/icons';
  import { Form, Input, Divider,Upload} from 'antd';
  interface WriteChunkProps {
    title: string;
    content : string
  }

  function WriteChunkComponent(props:WriteChunkProps) {
    const normFile = (e: any) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };
    
    const {title,content} = props;
    return <>
              <Form.Item name={['blog', title]} label={title} rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name={['blog', `${title}image`]} label= {`${title}image`} valuePropName="fileList">
              <Upload listType="picture-card" >
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
  }

  export function createComponentsArray(noofComponentsToBeCreated:number): React.FC[]{
      
      //checking if the no of components to be created is an integer
      if (!Number.isInteger(noofComponentsToBeCreated)) {
        throw new Error("Parameter must be an integer.");
    }
      const componentsArray : React.FC[] = [];
      for(let i = 0; i<noofComponentsToBeCreated;i++){
        const title = `title${i}`;
        const content = `content${i}`
        componentsArray.push(() => <WriteChunkComponent title={title} content = {content}/>)
      }
      return componentsArray;
  }
    